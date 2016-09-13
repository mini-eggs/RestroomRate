
var account = require('./account.js');

var methods = require('../methods/server.js');

var MySQL = methods.MySQL;

var $_REQUEST = methods.$_REQUEST;

var Account = new account();

var conn = MySQL();

function API (url, urlStructure) {

    return new Promise(function(resolve, reject){

        switch(urlStructure[1]) {

            case"register":
                Account.register(
                    {onComplete:resolve, onFail:reject, connection:conn},
                    {device:url.query.device, username:url.query.username, email:url.query.email, password:url.query.password,}
                );
                break;

            case"logout":
                Account.logout(
                    {onComplete:resolve, onFail:reject, connection:conn},
                    {device:url.query.device, username:url.query.username}
                );
                break;

            case"checkLogin":
                Account.checkLogin(
                    {onComplete:resolve, onFail:reject, connection:conn},
                    {device:url.query.device}
                );
                break;

            case"login":
                Account.login(
                    {onComplete:resolve, onFail:reject, connection:conn},
                    {device:url.query.device, username:url.query.username, password:url.query.password}
                );
                break;

            default:
                resolve({status:0, text:'no data'});
                break;
        }
    });
}

exports = module.exports = API;