/**
 * Account model stored in datastore2.json after successful migration.
 */
const TargetAccount = {
  id: 0,
  customer_name: "",
  account_open_date: "",
  account_age: 0,
  balance_due: 0,
  card_expiration: "",
  card_model: "",
  payment_network: "",
  
  migration_timestamp: ""
};

module.exports = TargetAccount;
