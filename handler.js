'use strict';

const service = require('./service');
const userService = new service();

module.exports.create = (event, context, callback) => {
  const username = event.username;
  const roles = event.roles;
  const plainPassword = event.plainPassword;

  try {
    const createUserCallback = (err, data) => {
        if (err) {
            callback(null, { status: false, errors: err, });
        } else {
            callback(null, { status: true, result: {user: data}});      
        }
    };
    const user = userService.create(createUserCallback, username, roles, plainPassword);
  } catch (error) {  
    callback(null, { status: false, errors: {message: error, code: 500} });
  }
};

module.exports.read = (event, context, callback) => {
  callback(null, { message: 'Go Serverless v1.0!', event});
};

module.exports.update = (event, context, callback) => {
  callback(null, { message: 'Go Serverless v1.0!', event});
};

module.exports.delete = (event, context, callback) => {
  callback(null, { message: 'Go Serverless v1.0!', event});
};



