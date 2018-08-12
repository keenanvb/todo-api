const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'password';

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log('hash value: ',hash);
    });
});

let hashedPassworded =  '$2a$10$Ay9kluFLJbgcUozcjQH1ZOAf9Uxuhx9E8OGmBiSrsS2LEr2muSShm';


bcrypt.compare(password,hashedPassworded,(err,result)=>{
    console.log('result',result);
});

// let data ={
//     id: 3
// };

// let token = jwt.sign(data,'this is then secret');

// console.log('token: ',token);
// let decode = jwt.verify(token,'this is then secret');
// console.log('decode: ', decode);

// let msg = 'This is a message';
// let hash = SHA256(msg);

// console.log(`Message: ${hash}`);

// let data = {
//     id:  4
// }

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }

// //man in the middle
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed')
// }else{
//     console.log('data changed')
// }