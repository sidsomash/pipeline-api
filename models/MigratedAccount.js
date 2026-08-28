/**
 * Account model after migration, stored in data.json.
 */
const MigratedAccount = {
  id: 0,
  customer_name: "",
  account_open_date: "",
  account_age: 0,
  balance_due: 0,
  card_expiration: "",
  card_model: "",
  payment_network: "",
  
  migration_status: "",
  migration_timestamp: ""
};

module.exports = MigratedAccount;