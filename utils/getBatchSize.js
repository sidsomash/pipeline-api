// utils/getBatchSize.js
module.exports = function getBatchSize(totalRecords, desiredBatchCount = 10) {
  return Math.ceil(totalRecords / desiredBatchCount);
};
