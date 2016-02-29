var WatchJS = require("watchjs")
var mysql = require("mysql");
var EntityRepository = require("nootjs/Component/Orm/Repository/EntityRepository");

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

var EntityManager = function(hostname, username, password, database) {

    this.queriesExecuted = 0;

    this.connection = mysql.createConnection({
        host: hostname,
        user: username,
        password: password,
        database: database,
    });

    this.repositories = {};
    this.managedObjects = [];
    this.updatedObjects = [];
    this.insertedObjects = [];
    this.managedEntities = {};

    /**
     * Load managed entities
     * @param entities
     */
    this.loadEntities = function(entities) {
        this.managedEntities = entities;
    }

    this.connect = function() {
        this.connection.connect();
    }

    /**
     * Persist an object
     * @param object
     */
    this.persist = function(object) {
        var objectHash = this.getObjectHash(object);
        if(!this.managedObjects[objectHash]) {
            this.managedObjects[objectHash] = object;
            this.insertedObjects[objectHash] = object;
        }
    }

    /**
     * Get unique hash for an object
     * @param object
     * @returns {string}
     */
    this.getObjectHash = function(object) {
        var repository = this.getObjectRepository(object);
        var id = object[repository.entity.orm.identifier];
        return this.getHash(repository, id);
    }

    /**
     * Get unique hash
     * @param repository
     * @param id
     * @returns {string}
     */
    this.getHash = function(repository, id) {
        return repository.entity.tableName + id;
    }

    this.getEntity = function(entityName) {
        return this.managedEntities[entityName];
    }

    this.getEntityMapping = function(entityName) {
        var entity = this.getEntity(entityName);

        return entity;
    }

    this.manage = function(object) {

        // Watch for changes
        var repository = this.getObjectRepository(object);
        var em = this;
        watch(object, function(){
            em.updatedObjects[object[repository.idField]] = object;
        }.bind(em, repository));

        var objectHash = this.getObjectHash(object);
        this.managedObjects[objectHash] = object;
    }

    this.isManaged = function(objectHash) {
        return this.getManagedObject(objectHash) != undefined;
    }

    this.getManagedObject = function(objectHash) {
        return this.managedObjects[objectHash];
    }

    /**
     * Get object's repository
     * @param object
     * @returns {*}
     */
    this.getObjectRepository = function(object) {
        return this.getRepository(object.mapping.name);
    }

    /**
     * TODO: Move to independent service
     * For now simply execute the query (no transactions)
     * @param object
     */
    this.createUpdateQuery = function(object) {
        var repository = this.getObjectRepository(object);
        var conn = this.connection;
        var tableName = repository.entity.tableName;

        var placeholders = [];
        var args = [];

        for(var key in repository.entity.orm.fields) {
            var value = object[key];
            args.push(key);
            args.push(value);
            placeholders.push("?? = ?");
        }
        for(var key in repository.entity.orm.relations) {
            var relation = repository.entity.orm.relations[key];
            if(relation.type == "manyToOne") {
                var relatedObject = object[key];
                args.push(relation.fieldName);
                args.push(relatedObject[relation.referencedColumnName]);
            }
        }

        var queryString = "UPDATE " + tableName + " SET " + placeholders.join(",") + " WHERE " + repository.idField + " = " + object[repository.idField];

        this.executeQuery(queryString, args);
    }

    this.executeQuery = function(queryString, args) {
        this.connection.query(queryString, args, function(err){
            this.queriesExecuted++;
        }.bind(this));
    }

    /**
     * TODO: Move to independent service
     * For now simply execute the query (no transactions)
     * @param object
     */
    this.createInsertQuery = function(object) {
        var repository = this.getObjectRepository(object);
        var conn = this.connection;
        var tableName = repository.entity.tableName;

        var keyPlaceholders = [];
        var valuePlaceholders = [];
        var keys = [];
        var values = [];

        for(var key in repository.entity.orm.fields) {
            var value = object[key];
            keys.push(key);
            values.push(value);
        }
        for(var key in repository.entity.orm.relations) {
            var relation = repository.entity.orm.relations[key];
            if(relation.type == "manyToOne") {
                var relatedObject = object[key];
                keys.push(relation.fieldName);
                values.push(relatedObject[relation.referencedColumnName]);
            }
        }

        for(var i = 0; i < keys.length; i++) {
            keyPlaceholders.push("??");
        }
        for(var i = 0; i < values.length; i++) {
            valuePlaceholders.push("?");
        }

        var args = keys.concat(values);

        var queryString = "INSERT INTO "+tableName+" ("+keyPlaceholders.join(",")+") VALUES("+valuePlaceholders.join(",")+")";

        this.executeQuery(queryString, args);
    }

    /**
     * Flush the database
     */
    this.flush = function() {
        // 1. Loop through managed objects
        // 2. Create SQL queries
        // 3. Execute them in a transaction
        // Other:
        // Find product identifier
        // Update only changed values?


        for(var k in this.updatedObjects) {
            var object = this.updatedObjects[k];
            this.createUpdateQuery(object);
        }
        for(var k in this.insertedObjects) {
            var object = this.insertedObjects[k];
            this.createInsertQuery(object);
        }

        // Commit transaction..?

        // Clear update/insert
        this.updatedObjects = {};
        this.insertedObjects = {};
    }

    this.getRepository = function(entityName) {
        if(!this.repositories[entityName]) {
            this.repositories[entityName] = new EntityRepository(this, entityName);
        }
        return this.repositories[entityName];
    }
}

module.exports = EntityManager;