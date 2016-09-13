
function content () {

    const encryptionKey = require("../creds/encryption.js");

    const aesjs = require('aes-js');

    var methods = require('../methods/server.js');

    var encrypt = methods.encrypt;

    content.prototype.create = function(Defaults, Data){

        var resolve = Defaults.onComplete;
        var reject = Defaults.onFail;
        var connection = Defaults.connection;

        console.log(Data.lat);
        console.log(Data.long);

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

}

exports = module.exports = content;