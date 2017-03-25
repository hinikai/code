(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (factory((global.mapv = global.mapv || {})));
}(this, function (exports) { 'use strict';

   var privateVar = "this is a variable private to the module";
   var publicVar = "and this one is public";

   function returnPrivateVar() {
      return privateVar;
   };

   console.log(returnPrivateVar());
   console.log(publicVar);
   console.log(threejs);

   var nk = returnPrivateVar;

   exports.nk = nk;

}));
