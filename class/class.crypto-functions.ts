'use strict';
var crypto = require('crypto');

export class CryptoFunctions
{
    public static generateRandomString(length:number)
    {
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
    }
    public static hashPassword(password:string, salt:string)
    {
        
        let hash = crypto.createHmac('sha512', salt.toString()); /** Hashing algorithm sha512 */
        hash.update(password);
        return hash.digest('hex');
    };
    public static maskNumber(number:string)
    {
        let result=number.toLowerCase().replace(new RegExp("[0]", 'g'),'o');
        result=result.replace(new RegExp("[3]", 'g'),'e');
        result=result.replace(new RegExp("[1]", 'g'),'l');
        result=result.replace(new RegExp("[5]", 'g'),'s');
        return result.replace(new RegExp("[6]", 'g'),'b');
    }
    public static unmaskNumber(number:string)
    {
        let result=number.toLowerCase().replace(new RegExp("[o]", 'g'),'0');
        result=result.replace(new RegExp("[e]", 'g'),'3');
        result=result.replace(new RegExp("[l]", 'g'),'1');
        result=result.replace(new RegExp("[s]", 'g'),'5');
        return result.replace(new RegExp("[b]", 'g'),'6');
    }
    public static md5(text:string)
    {
        let hash = crypto.createHash('md5');
        hash.update(text);
        return hash.digest('hex');
    }
    public static aes256Encrypt(text:string,key:string) 
    {
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    public static aes256Decrypt(text:any,key:string) 
    {
        let textParts = text.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
        let decrypted = decipher.update(encryptedText);
       
        decrypted = Buffer.concat([decrypted, decipher.final()]);
       
        return decrypted.toString();
    }
    public static get256BitKey(seeds:string[])
    {
        let key="";
        seeds.forEach(seed=>
            {
                key=key+seed.substring(0,32-key.length);
            })
        return key;
    }
}