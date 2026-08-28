module.exports = function validateAccount(item) {
  return (
    typeof item.id === "number" &&
    typeof item.customer_name === "string" &&
    typeof item.account_open_date === "string" &&
    typeof item.account_age === "number" &&
    typeof item.balance_due === "number" &&
    typeof item.card_expiration === "string" &&
    typeof item.card_model === "string" &&
    typeof item.payment_network === "string"
  );
};
