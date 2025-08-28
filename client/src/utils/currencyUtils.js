// src/utils/currencyUtils.js

export const convertUSDToPKR = (amount) => {
  return amount;
};

export const formatPKR = (amount) => {
  if (!amount && amount !== 0) return 'N/A';
  return `₨ ${amount.toLocaleString('en-PK')}`;
};