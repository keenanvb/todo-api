const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data ={
    id: 3
};

let token = jwt.sign(data,'this is then secret');

console.log('token: ',token);
let decode = jwt.verify(token,'this is then secret');
console.log('decode: ', decode);

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