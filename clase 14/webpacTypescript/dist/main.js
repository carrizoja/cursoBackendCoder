(()=>{"use strict";var e={731:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t){this.getFullName=()=>`${this.first_name} ${this.last_name}}`,this.first_name=e,this.last_name=t}}},752:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(s(860)),n=s(974),o=new(r(s(731)).default)("Alejandro","Huertas"),a=(0,i.default)();a.get("/",((e,t)=>{t.send({time:(0,n.getTime)(),name:o.getFullName()})})),a.listen(8080,(()=>console.log("Listening on 8080")))},974:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getTime=void 0,t.getTime=()=>({fyh:(new Date).toLocaleString(),timestamp:Date.now()})},860:e=>{e.exports=require("express")}},t={};!function s(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,s),n.exports}(752)})();