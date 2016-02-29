var Orm = function(entityManager) {

    this.entityManager = entityManager;

    this.getRepository = function(entityName) {
        return this.entityManager.getRepository(entityName);
    }
}

module.exports = Orm;