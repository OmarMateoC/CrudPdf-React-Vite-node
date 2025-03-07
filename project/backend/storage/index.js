const DatabaseStorage = require('./databaseStorage');
const FileSystemStorage = require('./fileSystemStorage');
require('dotenv').config();

const getStorage = () => {
  const storageType = process.env.STORAGE_TYPE || 'database';
  return storageType === 'filesystem' ? new FileSystemStorage() : new DatabaseStorage();
};

module.exports = { getStorage };