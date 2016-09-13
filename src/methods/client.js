
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const aesjs = require('aes-js');

const encryptionKey = require("../creds/encryption.js");

const Fingerprint2 = require('fingerprintjs2');

/**
 *
 * @param htmlWithEntities
 */

const getDecodedHtml = function(htmlWithEntities){
    return entities.decode(htmlWithEntities);
};
export{getDecodedHtml}

/**
 *
 * @param Obj
 */

const request = function(Obj){
    return new Promise(function(resolve, reject){
        new Fingerprint2().get(function(deviceHash, components){
            let url = window.location.href;
            let arr = url.split("/");
            let resultUrl = arr[0] + "//" + arr[2];
            let toGet = resultUrl + Obj.url + '&device=' + deviceHash;

            console.log(toGet);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let toReturn;
                    if(this.responseText.length > 0) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                    }
                } else if (this.readyState == 4){
                    reject({
                        status:-2,
                        text: "error connecting to server"
                    })
                }
            };
            xhttp.open("GET", toGet, true);
            xhttp.send();
        });
    })
};
export{request}

/**
 *
 * @param obj
 * @param prefix
 * @returns {string}
 */

const serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};
export{serialize}

/**
 *
 * @param text
 */

const decrypt = function(text){
    var key = aesjs.util.convertStringToBytes(encryptionKey);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(text);
    return aesjs.util.convertBytesToString(decryptedBytes);
};
export{decrypt}

/**
 *
 * @param text
 */

const encrypt = function(text){
    var key = aesjs.util.convertStringToBytes(encryptionKey);
    var textBytes = aesjs.util.convertStringToBytes(text);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    return aesCtr.encrypt(textBytes);
};
export{encrypt}