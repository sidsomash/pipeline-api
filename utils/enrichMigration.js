module.exports = function enrichMigration(item) {
  return {
    ...item,
    migration_status: "migrated",
    migration_timestamp: new Date().toISOString()
  };
};
