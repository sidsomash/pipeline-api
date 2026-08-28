/**
 * Base account model used in data.json before migration.
 */
const Account = {
  id: 0,
  customer_name: "",
  account_open_date: "",
  account_age: 0,
  balance_due: 0,
  card_expiration: "",
  card_model: "",
  payment_network: ""
};

module.exports = Account;