(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{332:function(e,t,n){e.exports={}},478:function(e,t,n){"use strict";n(332)},486:function(e,t){e.exports=function(component,e){var t="function"==typeof component.exports?component.exports.extendOptions:component.options;for(var i in"function"==typeof component.exports&&(t.directives=component.exports.options.directives),t.directives=t.directives||{},e)t.directives[i]=t.directives[i]||e[i]}},538:function(e,t,n){"use strict";n.r(t);var r=n(14),o=(n(55),n(19)),c=n(330),l=n.n(c),f=n(331),v=n.n(f),d=n(32),m=n(53),x=Object(o.a)({components:{ValidationProvider:m.b,ValidationObserver:m.a},setup:function(){Object(o.i)({title:"Coffee With Crypto | "});var e,t=Object(o.h)().$config,n=Object(o.c)().proxy.$vToastify,c=Object(o.f)(null),f=t.ownerAddress,m=t.txConfirmationBlocks,x=Object(o.f)(null),h=Object(o.f)(!1),address=Object(o.f)(null),w=Object(o.f)(0),k=Object(o.f)(""),y=Object(o.f)(""),C=Object(o.f)(0),_=Object(o.f)(0),j=Object(o.f)(""),O=Object(o.f)(!1),R=Object(o.f)(!1);Object(o.e)(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Y();case 2:if(!x.value){t.next=12;break}return(e=new l.a(x.value)).eth.transactionConfirmationBlocks=m,_.value=e.eth.transactionConfirmationBlocks,t.next=8,e.eth.getAccounts();case 8:if(!(t.sent.length>0)){t.next=12;break}return t.next=12,S();case 12:case"end":return t.stop()}}),t)}))));var T=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,x.value){t.next=3;break}throw new Error("No web3 provider detected.");case 3:return t.next=5,e.eth.requestAccounts();case 5:return t.next=7,S();case 7:n.success("Connected."),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),n.error(String(t.t0.message));case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),S=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,z();case 2:return t.next=4,e.eth.net.isListening();case 4:if(t.t0=t.sent,!t.t0){t.next=7;break}t.t0=x.value.isConnected();case 7:if(h.value=t.t0,h.value){t.next=10;break}throw new Error("Connection Error.");case 10:return t.next=12,D();case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c.value.validate();case 3:if(t.sent){t.next=6;break}throw new Error(c.value.errors.message[0]);case 6:if(!O.value){t.next=8;break}throw new Error("Wait until the current tx is finished.");case 8:return t.next=10,e.eth.sendTransaction({from:address.value,to:f,value:e.utils.toWei(k.value,"ether")}).once("sent",W).once("sending",F).once("transactionHash",E).once("receipt",M).on("confirmation",H).on("error",L);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),t.t0&&n.error(String(null===t.t0||void 0===t.t0?void 0:t.t0.message));case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}(),B=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V();case 2:h.value=!1,n.success("Disconnected.");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){x.value.on("chainChanged",$),x.value.on("accountsChanged",N),x.value.on("disconnect",P)},V=function(){x.value.removeListener("chainChanged",$),x.value.removeListener("accountsChanged",N)},W=function(){O.value=!0,n.info("Transaction Status: Transaction sent to Metamask.")},F=function(){n.info("Transaction Status: Waiting to user confirm.")},E=function(e){j.value=e,y.value="Awaiting transaction confirmation.",U(),n.info("Transaction Status: Awaiting transaction confirmation.")},M=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return R.value=!0,y.value="Awaiting block confirmation.",n.success("Transaction Status: Awaiting block confirmation."),n.info("Thank You For Your Support! - @emretepedev"),e.next=6,J();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(e){e>0&&e<=_.value&&(C.value=e,n.info("Confirmation Status: New block found.")),e>=_.value&&(y.value="Confirmed.",G(),n.success("Transaction Status: Confirmed."))},L=function(){y.value="Failed.",G(),n.error("Transaction Status: Failed.")},$=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:n.success("Chain has changed.");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length>0)){e.next=6;break}return e.next=3,z(t[0].toLowerCase());case 3:n.success("Linked account changed to '".concat(t[0],"'")),e.next=8;break;case 6:return e.next=8,B();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V();case 2:h.value=!1;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v()({mustBeMetaMask:!0,silent:!0,timeout:3e3});case 2:x.value=e.sent;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:null,e.next=3,I(t);case 3:return e.next=5,J();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){var n,r=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.length>0&&void 0!==r[0]?r[0]:null,t.t0=n,t.t0){t.next=6;break}return t.next=5,e.eth.getAccounts();case 5:t.t0=t.sent[0].toLowerCase();case 6:address.value=t.t0;case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),J=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=e.utils,t.next=3,e.eth.getBalance(address.value);case 3:t.t1=t.sent,w.value=t.t0.fromWei.call(t.t0,t.t1,"ether");case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),U=function(){c.value.reset(),k.value=""},G=function(){y.value="",j.value="",_.value=0,C.value=0,R.value=!1,O.value=!1},K=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.clipboard.writeText(t);case 3:n.success("Copied"),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();return{provider:x,isConnected:h,amount:k,address:address,balance:w,observer:c,txStatus:y,txConfirmationCount:C,waitForConfirmation:R,txHash:j,totalTxConfirmationCount:_,spinner:O,copyText:K,connectWeb3:T,disconnectWeb3:B,formatBalanceToDisplay:function(e){return(+e).toFixed(6)},formatAddressToDisplay:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return e.substring(0,t)+"..."+e.substring(e.length-t)},send:A,mdiCurrencyUsdOff:d.m}},head:{}}),h=x,w=(n(478),n(39)),k=n(56),y=n.n(k),C=n(182),_=n(319),j=n(479),O=n(321),R=n(527),T=n(486),S=n.n(T),A=n(81),component=Object(w.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"mt-12 flex justify-center"},[n("v-container",[e.provider?n("div",[Boolean(e.isConnected)?n("div",[n("v-row",{class:"my-5 "+(e.$vuetify.breakpoint.smAndDown?"mx-2 grid grid-cols-1 gap-y-5 space-x-0":"space-x-6"),attrs:{align:"center",justify:"center"}},[n("v-tooltip",{attrs:{bottom:"","content-class":"text-xs"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("span",e._g(e._b({directives:[{name:"ripple",rawName:"v-ripple",value:{center:!0},expression:"{ center: true }"}],staticClass:"app-title border-gradient-br-blue-green-gray-900 my-auto cursor-pointer rounded-md border-2 border-solid border-transparent p-3 text-center text-gray-100 shadow-xl",on:{click:function(t){return e.copyText(e.address)}}},"span",o,!1),r),[e._v("\n                  Address:\n                  "+e._s(e.formatAddressToDisplay(e.address))+"\n                ")])]}}],null,!1,3716616190)},[e._v(" "),n("span",[e._v("\n                "+e._s(e.address)+"\n              ")])]),e._v(" "),n("span",{staticClass:"app-title border-gradient-br-blue-green-gray-900 my-auto rounded-md border-2 border-solid border-transparent p-3 text-center text-gray-100"},[e._v("\n              Balance: "+e._s(e.formatBalanceToDisplay(e.balance))+"\n            ")])],1),e._v(" "),n("ValidationObserver",{ref:"observer",scopedSlots:e._u([{key:"default",fn:function(t){var r=t.invalid;return[n("v-row",[n("ValidationProvider",{staticClass:"flex justify-center",attrs:{name:"amount",rules:{required:!0,decimal:!0,min:1,max:8,min_value:1e-6,max_value:e.formatBalanceToDisplay(e.balance)}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[n("v-text-field",{staticClass:"mx-4 mt-4 max-w-sm",attrs:{counter:8,dense:"","error-messages":r,hint:Boolean(e.amount)?"":"For example, `0.01`",label:"Amount",name:"amount",outlined:"",placeholder:"Your amount","prepend-inner-icon":e.mdiCurrencyUsdOff,rounded:"",shaped:"",success:!Boolean(Object.keys(r).length)&&Boolean(e.amount)},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.send.apply(null,arguments)}},model:{value:e.amount,callback:function(t){e.amount=t},expression:"amount"}})]}}],null,!0)})],1),e._v(" "),n("v-row",{class:e.$vuetify.breakpoint.smAndDown?"my-4 grid grid-cols-1 gap-y-2 space-x-0 space-y-1 px-5":"space-x-6",attrs:{align:"center",justify:"center"}},[n("v-btn",{class:e.$vuetify.breakpoint.smAndDown?"w-full":"",attrs:{disabled:r||e.spinner},on:{click:e.send}},[e.spinner?n("svg",{staticClass:"mr-3 h-5 w-5 animate-spin text-white",attrs:{viewBox:"0 0 24 24"}},[n("circle",{staticClass:"opacity-25",attrs:{cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}}),e._v(" "),n("path",{staticClass:"opacity-75",attrs:{d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",fill:"currentColor"}})]):e._e(),e._v(" "),n("span",[e._v("Send")])]),e._v(" "),n("v-btn",{on:{click:e.disconnectWeb3}},[e._v("Disconnect to Metamask")])],1)]}}],null,!1,898198980)}),e._v(" "),n("div",{staticClass:"mt-5 text-center text-sm"},[e._v("\n            Note: Never mind the coffee. As a developer, I prefer testnet\n            tokens which are main :)\n          ")]),e._v(" "),n("div",{staticClass:"mt-5 flex flex-col items-center space-y-1 text-center text-sm"},[e.txHash?n("div",{staticClass:"break-words"},[e._v("\n              Transaction Hash: "+e._s(e.txHash)+"\n            ")]):e._e(),e._v(" "),e.txStatus?n("div",[e._v("Status: "+e._s(e.txStatus))]):e._e(),e._v(" "),e.waitForConfirmation?n("div",[e._v("\n              Confirmation Progress:\n              "+e._s(e.txConfirmationCount)+"/"+e._s(e.totalTxConfirmationCount)+"\n            ")]):e._e()])],1):n("div",{staticClass:"flex items-center justify-center"},[n("v-btn",{on:{click:e.connectWeb3}},[e._v("Connect to Metamask")])],1)]):n("div",{staticClass:"flex items-center justify-center"},[n("v-btn",{attrs:{href:"https://metamask.io/download/",target:"_blank"}},[e._v("\n          Install Metamask\n        ")])],1)])],1)])}),[],!1,null,null,null);t.default=component.exports;y()(component,{VBtn:C.a,VContainer:_.a,VRow:j.a,VTextField:O.a,VTooltip:R.a}),S()(component,{Ripple:A.a})}}]);