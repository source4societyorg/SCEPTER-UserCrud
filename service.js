'use strict'

const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const DynamoDB = require('@source4society/scepter-dynamodb-lib');
const saltRounds = 8;

class UserService {

    hashPassword (plainPassword) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainPassword, salt);
        return hash;
    }

    assignUid () {
        return uuidv4();        
        if(roles.length === 0) {
            validationErrors = true;
            validationMessage = 'At least one role must be specified.';          
        }

       if(roles.length === 0) {
            validationErrors = true;
            validationMessage = 'At least one role must be specified.';          
        }

       if(roles.length === 0) {
            validationErrors = true;
            validationMessage = 'At least one role must be specified.';          
        }

    }

    constructor (stage = 'dev') {
         const credentials = require('./credentials.json');        
         this.dynamoDB = new DynamoDB();
         this.dynamoDB.setConfiguration(credentials, stage);        
         this.userTableName = credentials.environments[stage].userTableName;
         this.usernameTableName = credentials.environments[stage].usernameTableName;
    }  

    create (callback, username = '', roles = [], plainPassword = '', id = null, passwordHash = null)  {
        let validationErrors = false;
        let validationMessage = '';
        if(username === '' || typeof username === 'undefined') {
            validationErrors = true;
            validationMessage = 'At least one role must be specified.';          
        }

        if(roles.length === 0) {
            validationErrors = true;
            validationMessage += ' At least one role must be specified.';          
        }

        if(plainPassword === '' || typeof plainPassword === 'undefined') {
            validationErrors = true;
            validationMessage += 'Please specify your password. ';          
        }

        if(validationErrors) {
            throw new Error(validationMessage);
        } else {
            const userId = id || this.assignUid();
            const passwordHashed = passwordHash || this.hashPassword(plainPassword);
            const userObject = {
                userId: userId,
                roles: roles,      
                passwordHash: passwordHashed
            };
            const usernameObject = {
                username: username,
                userId: userId,
            };     
            const finalObject = Object.assign(userObject, usernameObject);
            this.dynamoDB.putItem(this.usernameTableName, usernameObject, (err, data) => {           
                if(err) {                 
                    callback(err, data);
                } else {
                    this.dynamoDB.putItem(this.userTableName, userObject, (err, data) => callback(err, finalObject) );
                }
            }, {Expected: { 'username': { Exists: false } }} );
        }         
      }

    read (id) {
    }
};

module.exports = UserService;
