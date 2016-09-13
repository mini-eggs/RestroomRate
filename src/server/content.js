
function content () {

    const encryptionKey = require("../creds/encryption.js");

    const aesjs = require('aes-js');

    var methods = require('../methods/server.js');

    var encrypt = methods.encrypt;

    content.prototype.example = function(Defaults, Data){

        //defaults every function should receive
        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        //data specific to this function
        var device = Data.device;

        //example using mysql
        // connection.query('UPDATE reddit_users SET users_loggedin = ? WHERE users_device = ? AND users_username = ?', [true, device, username], function(err, results) {
        //     returnUser();
        // });

        resolve({
            status:1,
            text: 'This is just a test. The device you are own is: ' + device
        });
    };

    content.prototype.register = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        var insert = {
            users_username:Data.username,
            users_email:Data.email,
            users_device:Data.device,
            users_password:JSON.stringify(encrypt((Data.password))),
            users_loggedin:true
        };

        // reset all logged in where device
        connection.query('UPDATE rr_users SET users_loggedin = ? WHERE users_device = ? AND users_username = ?', [false, Data.device, Data.username], function(err, results) {
            if(err){resolve({status: -1, text: 'MySQL errors 1', error:err})}
            //check if user already exists
            connection.query('SELECT * FROM rr_users WHERE users_username = ?', [Data.username], function(err, results) {
                if(err){resolve({status: -1, text: 'MySQL errors 2', error:err})}
                if(results.length > 0) {
                    resolve({
                        status:0,
                        text: 'User ' + Data.username + ' already exists in the database'
                    });
                } else {
                    //insert user
                    connection.query('INSERT INTO rr_users SET ?', insert, function (err, result) {
                        if(err){resolve({status: -1, text: 'MySQL errors 3', error:err})}
                        connection.query('SELECT * FROM rr_users WHERE users_id = ?', [result.insertId], function (err, results) {
                            if(err){resolve({status: -1, text: 'MySQL errors 3', error:err})}
                            resolve({
                                status:1,
                                text: 'User ' + Data.username + ' has been created',
                                data: results[0]
                            });
                        });
                    });
                }
            });
        });
    };

    content.prototype.logout = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        // reset all logged in where device
        connection.query('UPDATE rr_users SET users_loggedin = ? WHERE users_username = ?', [false, Data.username], function(err, results) {
            if(err){resolve({status: -1, text: 'MySQL errors 1', error:err})}
            resolve({
                status:1,
                text:'User ' + Data.username + ' has been logged out.',
                data:results
            });
        });
    };
}

exports = module.exports = content;