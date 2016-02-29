var SynchResult = require("nootjs/Bundle/OrmBundle/Utils/SynchResult");

var EntityRepository = function(em, entityName)
{
    this.em = em;
    this.entityName = entityName;
    this.entity = em.managedEntities[this.entityName];
    this.entity.name = this.entityName;
    this.idField = this.entity.orm.identifier;

    /**
     * Find a single entity by its identifier field
     * Can be called synchronously
     * @param id
     * @param callback
     * @returns {*}
     */
    this.find = function(id, callback) {

        var synchResult = new SynchResult();

        var objectHash = this.em.getHash(this, id);
        if(!this.em.isManaged(objectHash)) {
            var query = this.em.connection.query("SELECT * FROM " + this.entity.tableName + " WHERE " + this.idField + " = ?", [id]);
            query.on("result", function (row) {
                var object = this.buildObject(row);
                this.em.manage(object);
                if(callback) {
                    callback(null, object);
                }

                synchResult.return(object);

            }.bind(this));

        } else {
            var object = this.em.getManagedObject(objectHash);
            if(callback) {
                callback(null, object);
            }
            synchResult.return(object);
        }

        return synchResult;
    }

    /**
     * Can be called synchronously
     * @param object
     * @param relationName
     * @param callback
     */
    this.getCollection = function(object, relationName, callback) {
        var relation = this.entity.orm.relations[relationName];
        var repository = this.em.getRepository(relation.targetEntity);


        var inverseMapping = this.em.getEntityMapping(relation.targetEntity);
        var inverseRelation = inverseMapping.orm.relations[relation.inversedBy];
        var properties = {};
        properties[inverseRelation.fieldName] = object[inverseRelation.referencedColumnName];

        return repository.findBy(properties, callback);
    }

    this.buildObject = function(row) {

        // Create object from mapping
        var _class = require(this.entity.class);
        var object = new _class();
        for(var k in row) {
            object[k] = row[k];
        }

        var relations = this.entity.orm.relations;
        for(var key in relations) {
            var relation = relations[key];
            if(relation.type == "oneToMany") {
                var methodName = "get" + key.charAt(0).toUpperCase() + key.slice(1);
                object[methodName] = function(callback){
                    return this.getCollection(object, key, callback);
                }.bind(this);
            } else if(relation.type == "manyToOne") {

            } else if(relation.type == "oneToOne") {

            }
        }

        return object;
    }

    /**
     * Find all objects
     */
    this.findAll = function(callback) {
        return this.findBy({}, callback);
    }

    /**
     * Find by
     */
    this.findBy = function(properties, callback) {
        var synchResult = new SynchResult();

        var args = [];
        var placeholders = ["1 = 1"];

        for(var key in properties) {
            var value = properties[key];
            args.push(key);
            args.push(value);
            placeholders.push("?? = ?");
        }

        var queryString = "SELECT * FROM " + this.entity.tableName + " WHERE " + placeholders.join(" AND ");

        this.em.connection.query(queryString, args, function(err, rows){
            if(err) {
                throw err;
            }
            var objects = [];
            for(var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var object = this.buildObject(row);
                this.em.manage(object);
                objects.push(object);
            }
            if(callback) {
                callback(null, objects);
            }

            synchResult.return(objects);

        }.bind(this));

        return synchResult;
    }
}
module.exports = EntityRepository;