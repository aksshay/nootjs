var Orm = function(entityManager) {

    this.entityManager = entityManager;

    this.getRepository = function(entityName) {
        return this.entityManager.getRepository(entityName);
    }

    this.getEntityManager = function() {
        return this.entityManager;
    }
}

module.exports = Orm;