import { returnPrivateVar, publicVar } from './a';
console.log(returnPrivateVar());
console.log(publicVar);
console.log(threejs);

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

console.log(arrayLike );

export var nk = returnPrivateVar;
