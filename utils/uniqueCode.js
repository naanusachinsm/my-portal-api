const { v4: uuidv4 } = require('uuid');

const getUniqueId = () => {
    return uuidv4().replace(/-/g, '')
}

module.exports =  getUniqueId;
