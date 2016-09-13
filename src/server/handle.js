
var content = require('./content.js');

var methods = require('../methods/server.js');

var MySQL = methods.MySQL;

var $_REQUEST = methods.$_REQUEST;

var Content = new content();

var conn = MySQL();

function API (url, urlStructure) {

    return new Promise(function(resolve, reject){

        switch(urlStructure[1]) {

            case"example":

                Content.example({
                    onComplete:resolve,
                    onFail:reject,
                    connection:conn
                },{
                    device:$_REQUEST("device", url)
                });

                break;

            case"register":
                Content.register(
                    {username:url.query.username, email:url.query.email, password:url.query.password, onComplete:resolve, onFail:reject, connection:conn},
                    {device:url.query.device, username:url.query.username, email:url.query.email, password:url.query.password,}
                );
                break;

            case"logout":
                Content.logout(
                    {username:url.query.username, email:url.query.email, password:url.query.password, onComplete:resolve, onFail:reject, connection:conn},
                    {device:url.query.device, username:url.query.username}
                );
                break;

            default:

                resolve({
                    status:0,
                    text:'no data'
                });

                break;
        }
    });
}

exports = module.exports = API;