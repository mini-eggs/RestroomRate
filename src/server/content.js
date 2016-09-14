
function content () {

    const encryptionKey = require("../creds/encryption.js");

    const aesjs = require('aes-js');

    var methods = require('../methods/server.js');

    var encrypt = methods.encrypt;

    content.prototype.create = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        var rate = {
            rate_name:Data.name,
            rate_desc:Data.desc,
            rate_rate:Data.rate,
            rate_file:Data.file,
            rate_lat:Data.lat,
            rate_long:Data.long,
            rate_location:Data.location,
            rate_user:Data.users_id
        };

        connection.query('INSERT INTO rr_rate SET ?', rate, function (err, results) {
            if(err){resolve({status: -1, text: 'MySQL errors 1', error:err})}
            resolve({
                status:1,
                text: 'Rate has been created',
                data: results[0]
            });
        });
    };

    content.prototype.recent = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        var params = {
            type:Data.type,
            users_id:Data.users_id,
            page:Data.page,
            length:Data.length
        };

        var limit = parseInt(params.length);
        var offset = parseInt(params.length * params.page);

        connection.query('SELECT * FROM rr_rate ORDER BY rate_time DESC LIMIT ? OFFSET ?', [limit, offset], function (err, results) {
            if(err){resolve({status: -1, text: 'MySQL errors 9', error:err})}
            resolve({
                status:1,
                text: 'Recent has been queried from database',
                data: results
            });
        });
    };

    content.prototype.yours = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        var params = {
            type:Data.type,
            users_id:Data.users_id,
            page:Data.page,
            length:Data.length
        };

        var limit = parseInt(params.length);
        var offset = parseInt(params.length * params.page);

        connection.query('SELECT * FROM `rr_rate` WHERE `rate_user` = ? ORDER BY `rr_rate`.`rate_time` DESC LIMIT ? OFFSET ?', [params.users_id, limit, offset], function (err, results) {
            if(err){resolve({status: -1, text: 'MySQL errors 1', error:err})}
            resolve({
                status:1,
                text: 'Yours has been queried from database',
                data: results
            });
        });
    };
    
    content.prototype.nearby = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        var params = {
            type:Data.type,
            users_id:Data.users_id,
            page:Data.page,
            long:Data.long,
            lat:Data.lat,
            length:Data.length
        };

        var limit = parseInt(params.length);
        var offset = parseInt(params.length * params.page);

        connection.query(`SELECT *, 
        SQRT(POW(69.1 * (rate_lat - ?), 2) + POW(69.1 * (? - rate_long) * COS(rate_lat / 57.3), 2)) AS distance 
        FROM rr_rate ORDER BY distance LIMIT ? OFFSET ?`, [params.lat, params.long, limit,offset],function(err,results){
            if(err){resolve({status: -1, text: 'MySQL errors 1', error:err})}
            resolve({
                status:1,
                text: 'Nearby has been queried from database',
                data: results
            });
        })
    }

}

exports = module.exports = content;