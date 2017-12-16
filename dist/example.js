/*!
* Crip Vue Loading v1.2.1
* Forged by Igors Krasjukovs <tahq69@gmail.com>
* Released under the MIT License.
*/
!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=20)}([function(t,e){t.exports=Vue},function(t,e,n){"use strict";function o(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})}function i(t,e){var n=0===t?0:100/(2*t);return n+(0===n?0:(100-n)*e/t)}function r(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];window&&window.__cripVerbose&&console[t].apply(console,["[crip-vue-loading]"].concat(e))}e.b=o,e.c=i,e.a=r},function(t,e){t.exports=function(t,e,n,o,i){var r,s=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(r=t,s=t.default);var u="function"==typeof s?s.options:s;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns),o&&(u._scopeId=o);var c;if(i?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=c):n&&(c=n),c){var l=u.functional,f=l?u.render:u.beforeCreate;l?u.render=function(t,e){return c.call(e),f(t,e)}:u.beforeCreate=f?[].concat(f,c):[c]}return{esModule:r,exports:s,options:u}}},function(t,e,n){"use strict";var o=n(1),i=n(9),r=n.n(i),s=null,a=null,u=function(){function t(t,e){this.version="1.2.1",this.completed=0,this.total=0,this.lastChange=Date.now(),this.resetTimeout=1e3,this.requests=[],a=t,this.options=e,this.intercept(this.options.axios),this.createInstance(t)}return Object.defineProperty(t.prototype,"width",{get:function(){return n.i(o.c)(this.total,this.completed)},enumerable:!0,configurable:!0}),t.prototype.start=function(t){var e=t||n.i(o.b)();return this.requests.push(e),this.pushRequest(e),e},t.prototype.complete=function(t){if(!t)return this.requests.shift(),void this.pushResponse(-1);if(this.requests.indexOf(t)>-1){var e=this.requests.indexOf(t);this.requests.splice(e,1),this.pushResponse(e)}throw Error("Crip loading element "+t+" not found to complete.")},t.prototype.fail=function(t,e){0!==this.total&&(e||this.complete(t?t.id:void 0),s&&(s.color=this.options.failColor)),t&&this.notice(t.notice)},t.prototype.canResetProgress=function(){var t=Date.now()-this.lastChange>this.resetTimeout,e=this.width>100&&t||this.total>0&&this.total===this.completed&&t;return e&&(this.requests=[],this.total=this.completed=0,s&&(s.width="0",s.color=this.options.color)),e},t.prototype.configure=function(t){s&&s.configure(t),t.failColor&&(this.options.failColor=t.failColor)},t.prototype.intercept=function(t){var e=this;t&&(t.interceptors.request.use(function(t){return e.pushRequest(t)},function(t){return e.pushResponse(t,!0)}),t.interceptors.response.use(function(t){return e.pushResponse(t)},function(t){return e.pushResponse(t,!0)}))},t.prototype.pushRequest=function(t,e){return void 0===e&&(e=Date.now()),this.lastChange=e,this.total++,s&&(s.width=this.width.toString()),t},t.prototype.pushResponse=function(t,e,i){return void 0===e&&(e=!1),void 0===i&&(i=Date.now()),this.lastChange=i,this.completed++,this.completed>this.total&&(n.i(o.a)("warn","Response count exceeds maximum count",{requests:this.total,responses:this.completed}),this.completed=this.total),s&&(s.width=this.width.toString()),e?(this.fail(void 0,!0),Promise.reject(t)):t},t.prototype.createInstance=function(t){var e=new t({render:function(t){return t(r.a)}}).$mount();document.body.appendChild(e.$el),s=e.$children[0],s.init(this.options)},t.prototype.notice=function(t){a&&t&&a.notice&&a.notice.error(t)},t}();e.a=u},function(t,e,n){"use strict";function o(t,e){if(!a){if(!e)throw new Error("Options with axios instance is required");a=!0;var o={applyOnRouter:!0,axios:e.axios,color:"#204d74",direction:"right",failColor:"#ac2925",height:"2px",verbose:!1},u=Object.assign({},o,e);u.verbose&&(window.__cripVerbose=!0),n.i(i.a)("debug","install",{options:e,settings:u});var c=new r.a(t,u);t.loading=c,t.prototype.$loading=c,n.i(s.a)({loading:c,options:u,vue:t})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var i=n(1),r=n(3),s=n(5),a=!1;"undefined"!=typeof window&&window.Vue&&window.axios&&window.Vue.use(o,{axios:window.axios})},function(t,e,n){"use strict";function o(t){t.options.applyOnRouter&&t.vue.mixin({beforeCreate:function(){this.$options.router&&(this.$options.router.beforeEach(function(e,o,r){t.loading.start(n.i(i.b)()),r()}),this.$options.router.afterEach(function(e,n){t.loading.complete()}))}})}e.a=o;var i=n(1)},function(t,e,n){e=t.exports=n(7)(),e.push([t.i,".crip-loading{background:#585ba9;height:3px;opacity:1;position:fixed;top:0;transition:all .9s ease;z-index:1101}.crip-loading--to-right{left:0}.crip-loading--to-left{right:0}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n.n(o);e.default=i.a.extend({name:"CripLoadingBar",computed:{progress:function(){return(this.width||0)+"%"}},data:function(){return{color:"",direction:"",height:"",visible:!1,width:""}},methods:{recheck:function(){var t=this;this.$loading.canResetProgress()&&(this.visible=!1,setTimeout(function(){return t.visible=!0},100))},init:function(t){this.color=t.color,this.direction=t.direction,this.height=t.height,this.visible=!0},configure:function(t){t.color&&(this.color=t.color),t.direction&&(this.direction=t.direction),t.height&&(this.height=t.height)}},created:function(){setInterval(this.recheck,250)}})},function(t,e,n){function o(t){n(11)}var i=n(2)(n(8),n(10),o,null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visible?n("div",{staticClass:"crip-loading",class:["crip-loading--to-"+t.direction],style:{width:t.progress,background:t.color,height:t.height}}):t._e()},staticRenderFns:[]}},function(t,e,n){var o=n(6);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(12)("5c5ebc7c",o,!0)},function(t,e,n){function o(t){for(var e=0;e<t.length;e++){var n=t[e],o=l[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(r(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{for(var s=[],i=0;i<n.parts.length;i++)s.push(r(n.parts[i]));l[n.id]={id:n.id,refs:1,parts:s}}}}function i(){var t=document.createElement("style");return t.type="text/css",f.appendChild(t),t}function r(t){var e,n,o=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(o){if(h)return v;o.parentNode.removeChild(o)}if(g){var r=p++;o=d||(d=i()),e=s.bind(null,o,r,!1),n=s.bind(null,o,r,!0)}else o=i(),e=a.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}function s(t,e,n,o){var i=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var r=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function a(t,e){var n=e.css,o=e.media,i=e.sourceMap;if(o&&t.setAttribute("media",o),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(13),l={},f=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,h=!1,v=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){h=n;var i=c(t,e);return o(i),function(e){for(var n=[],r=0;r<i.length;r++){var s=i[r],a=l[s.id];a.refs--,n.push(a)}e?(i=c(t,e),o(i)):i=[];for(var r=0;r<n.length;r++){var a=n[r];if(0===a.refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete l[a.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],o={},i=0;i<e.length;i++){var r=e[i],s=r[0],a=r[1],u=r[2],c=r[3],l={id:t+":"+i,css:a,media:u,sourceMap:c};o[s]?o[s].parts.push(l):n.push(o[s]={id:s,parts:[l]})}return n}},function(t,e){t.exports=axios},function(t,e,n){"use strict";var o=n(0),i=n.n(o),r=n(26),s=n.n(r),a=n(21),u=n.n(a),c=n(22),l=n.n(c);i.a.use(s.a),e.a=new s.a({mode:"history",routes:[{path:"/",component:u.a},{path:"/1",component:u.a},{path:"/2",component:l.a},{path:"*",redirect:"/"}]})},function(t,e,n){var o=n(2)(n(17),n(25),null,null,null);t.exports=o.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(14),i=n.n(o),r=n(0),s=n.n(r),a=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(i,r){function s(t){try{u(o.next(t))}catch(t){r(t)}}function a(t){try{u(o.throw(t))}catch(t){r(t)}}function u(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(s,a)}u((o=o.apply(t,e||[])).next())})},u=this&&this.__generator||function(t,e){function n(t){return function(e){return o([t,e])}}function o(n){if(i)throw new TypeError("Generator is already executing.");for(;u;)try{if(i=1,r&&(s=r[2&n[0]?"return":n[0]?"throw":"next"])&&!(s=s.call(r,n[1])).done)return s;switch(r=0,s&&(n=[0,s.value]),n[0]){case 0:case 1:s=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,r=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(s=u.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){u.label=n[1];break}if(6===n[0]&&u.label<s[1]){u.label=s[1],s=n;break}if(s&&u.label<s[2]){u.label=s[2],u.ops.push(n);break}s[2]&&u.ops.pop(),u.trys.pop();continue}n=e.call(t,u)}catch(t){n=[6,t],r=0}finally{i=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,r,s,a,u={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a};e.default=s.a.extend({name:"example",data:function(){return{direction:"right",timeout:1}},methods:{request:function(t){return void 0===t&&(t=0),a(this,void 0,void 0,function(){var e,n;return u(this,function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,i.a.get("http://www.fakeresponse.com/api/?sleep="+(t||this.timeout))];case 1:return e=o.sent(),console.log(e.data),[3,3];case 2:return n=o.sent(),n instanceof Error?console.error(n.message):console.error(n.data),[3,3];case 3:return[2]}})})},manualRequest:function(){var t=this.$loading.start();console.log("manualRequest",{id:t})},manualResponse:function(){this.$loading.complete()},fail:function(){this.$loading.fail()},failNotice:function(){this.$loading.fail({notice:{title:"Request failed notification"}})},tripleRequest:function(){Promise.all([this.request(),this.request(this.timeout+1),this.request(this.timeout+2)])}},watch:{direction:function(t){this.$loading.configure({direction:t})}}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n.n(o);e.default=i.a.extend({name:"Page1",created:function(){console.log(this.$options.name)}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n.n(o);e.default=i.a.extend({name:"Page2",created:function(){console.log(this.$options.name)}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(14),i=n.n(o),r=n(0),s=n.n(r),a=n(4),u=n(16),c=n.n(u),l=n(15);s.a.use(a.default,{axios:i.a,color:"rgba(88, 91, 169, 1)",height:"3px",verbose:!0}),new s.a({render:function(t){return t(c.a)},router:l.a}).$mount(document.getElementById("app")||void 0)},function(t,e,n){var o=n(2)(n(18),n(24),null,null,null);t.exports=o.exports},function(t,e,n){var o=n(2)(n(19),n(23),null,null,null);t.exports=o.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{attrs:{id:"page2"}},[t._v("Page 2")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{attrs:{id:"page1"}},[t._v("Page 1")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"},[n("h1",[t._v("Crip Vue.js axios loading bar.")]),t._v(" "),n("router-view"),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"form-group"},[n("router-link",{staticClass:"btn btn-default",attrs:{to:"/1"}},[t._v("Page 1")]),t._v(" "),n("router-link",{staticClass:"btn btn-default",attrs:{to:"/2"}},[t._v("Page 2")]),t._v(" "),n("button",{staticClass:"btn btn-default",attrs:{disabled:"left"==t.direction},on:{click:function(e){t.direction="left"}}},[t._v("\n          Direction Left\n        ")]),t._v(" "),n("button",{staticClass:"btn btn-default",attrs:{disabled:"right"==t.direction},on:{click:function(e){t.direction="right"}}},[t._v("\n          Direction Right\n        ")])],1),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"timeout"}},[t._v("Request timeout")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.timeout,expression:"timeout"}],staticClass:"form-control",attrs:{type:"number",id:"timeout"},domProps:{value:t.timeout},on:{input:function(e){e.target.composing||(t.timeout=e.target.value)}}})]),t._v(" "),n("button",{staticClass:"btn btn-primary",on:{click:t.request}},[t._v("Create request")]),t._v(" "),n("button",{staticClass:"btn btn-primary",on:{click:t.tripleRequest}},[t._v("Create triple request")]),t._v(" "),n("button",{staticClass:"btn btn-default",on:{click:t.manualRequest}},[t._v("Manual request")]),t._v(" "),n("button",{staticClass:"btn btn-default",on:{click:t.manualResponse}},[t._v("Manual response")]),t._v(" "),n("button",{staticClass:"btn btn-danger",on:{click:t.fail}},[t._v("Fail")]),t._v(" "),n("button",{staticClass:"btn btn-danger",on:{click:t.failNotice}},[t._v("Fail with notification")])],1)]),t._v(" "),t._m(0,!1,!1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("small",{staticClass:"pull-right"},[t._v("\n    Thanks\n    "),n("a",{attrs:{href:"http://www.fakeresponse.com",target:"_blank"}},[t._v("FakeResponse")]),t._v(" and\n    "),n("a",{attrs:{href:"http://www.crip.lv",target:"_blank"}},[t._v("CRIP")])])}]}},function(t,e){t.exports=VueRouter}]);
//# sourceMappingURL=example.js.map