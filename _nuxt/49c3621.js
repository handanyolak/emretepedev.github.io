(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{375:function(e,n,t){"use strict";t.r(n);var r=t(14),o=(t(55),t(48)),c=t(60),l=t(24),d=Object(o.a)({head:{},components:{ValidationProvider:c.b,ValidationObserver:c.a},setup:function(e,n){Object(o.h)({title:"Contact | ",script:[{charset:"utf-8",src:"https://s.pageclip.co/v1/pageclip.js",defer:!0}],link:[{rel:"stylesheet",href:"https://s.pageclip.co/v1/pageclip.css",media:"screen"}]});var t=Object(o.g)().$config,c=n.root.$recaptcha,d=n.root.$vToastify,m=Object(o.e)(null),f=Object(o.e)(""),v=Object(o.e)(""),h=Object(o.e)(""),x=Object(o.e)(null),k=Object(o.e)(""),j=Object(o.e)(!1),C=Object(o.e)(!1),y=Object(o.e)(0);Object(o.d)(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.init();case 2:y.value=c.render(t.googleRecaptchaV2Size,{sitekey:t.googleRecaptchaV2SiteKey}),S();case 4:case"end":return e.stop()}}),e)})))),Object(o.c)((function(){c.destroy()}));var O=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.value.validate().then((function(e){if(!e)throw new Error("Form Validation: Failed.")}));case 3:return e.next=5,c.getResponse(y.value).catch((function(){throw new Error("reCAPTCHA v2 Verification: Token not found.")}));case 5:return e.next=7,c.execute("login").catch((function(){throw new Error("reCAPTCHA v3 Verification: Token not found.")}));case 7:return e.next=9,c.reset(y.value);case 9:d.info("Mail sent successfully."),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),d.error(String(e.t0)),n.preventDefault();case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n){return e.apply(this,arguments)}}(),S=function(){var e=0,n=setInterval((function(){var t=document.querySelector(".g-recaptcha");if(Boolean(t)||20==e){if(clearInterval(n),20==e)return void d.error("reCAPTCHA Verification: Server Error. Try again later.");t.style.display="flex",t.style.justifyContent="center"}e++}),500)};return{name:f,phone:v,email:h,subject:x,message:k,asap:j,items:["Proposal","Hire","Suggestion","Other"],observer:m,isRecaptched:C,submit:O,onSubmit:function(){},onError:function(){d.error("reCAPTCHA Verification: Error."),C.value=!1},onSuccess:function(){d.success("reCAPTCHA Verification: Success."),C.value=!0},onExpired:function(){d.warning("reCAPTCHA Verification: Expired."),C.value=!1},mdiCloseCircle:l.g,mdiComment:l.i,mdiFormSelect:l.n,mdiPhone:l.s,mdiAt:l.b,mdiFormTextbox:l.o,mdiCheckboxBlankCircleOutline:l.d,mdiCheckboxMarkedCircle:l.e}}}),m=d,f=t(47),v=t(57),h=t.n(v),x=t(374),k=t(226),j=t(380),C=t(331),y=t(335),O=t(370),component=Object(f.a)(m,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"flex justify-center mt-12"},[t("v-container",[t("validation-observer",{ref:"observer",scopedSlots:e._u([{key:"default",fn:function(n){var r=n.invalid;return[t("form",{staticClass:"pageclip-form",attrs:{action:e.$config.pageclipActionUrl,method:"POST"},on:{submit:function(n){return n.preventDefault(),e.onSubmit.apply(null,arguments)}}},[t("validation-provider",{attrs:{name:"name",rules:"required|min:2|max:30"},scopedSlots:e._u([{key:"default",fn:function(n){var r=n.errors;return[t("v-text-field",{attrs:{counter:30,"error-messages":r,success:!Boolean(Object.keys(r).length)&&Boolean(e.name),label:"Name*",placeholder:"Your name",hint:Boolean(e.name)?"":"For example, `John Doe`",name:"name","prepend-inner-icon":e.mdiFormTextbox,outlined:"",rounded:"",dense:"",shaped:""},model:{value:e.name,callback:function(n){e.name=n},expression:"name"}})]}}],null,!0)}),e._v(" "),t("validation-provider",{attrs:{name:"email",rules:{required:!0,min:5,max:30,regex:/^[a-zA-Z0-9_\-.+]+@[a-zA-Z0-9]+.[a-zA-Z]+/,is_not:"emretepedev@gmail.com"}},scopedSlots:e._u([{key:"default",fn:function(n){var r=n.errors;return[t("v-text-field",{attrs:{counter:30,"error-messages":r,success:!Boolean(Object.keys(r).length)&&Boolean(e.email),label:"E-mail*",placeholder:"Your mail address",hint:Boolean(e.email)?"":"For example, `mail@example.com`",name:"email","prepend-inner-icon":e.mdiAt,outlined:"",rounded:"",dense:"",shaped:""},model:{value:e.email,callback:function(n){e.email=n},expression:"email"}})]}}],null,!0)}),e._v(" "),t("validation-provider",{attrs:{name:"subject",rules:"required|oneOf:"+e.items},scopedSlots:e._u([{key:"default",fn:function(n){var r=n.errors;return[t("v-autocomplete",{attrs:{items:e.items,"error-messages":r,success:!Boolean(Object.keys(r).length)&&Boolean(e.subject),label:"Subject*",placeholder:"Your subject",hint:Boolean(e.subject)?"":"For example, `Proposal`",name:"subject","prepend-inner-icon":e.mdiFormSelect,outlined:"",rounded:"",dense:"",shaped:""},model:{value:e.subject,callback:function(n){e.subject=n},expression:"subject"}})]}}],null,!0)}),e._v(" "),t("validation-provider",{attrs:{name:"phone",rules:"integer|min:7|max:20"},scopedSlots:e._u([{key:"default",fn:function(n){var r=n.errors;return[t("v-text-field",{attrs:{counter:20,"error-messages":r,success:!Boolean(Object.keys(r).length)&&Boolean(e.phone),label:"Phone",placeholder:"Your phone",hint:Boolean(e.phone)?"":"For example, `123456789`",name:"phone","prepend-inner-icon":e.mdiPhone,outlined:"",rounded:"",dense:"",shaped:""},model:{value:e.phone,callback:function(n){e.phone=n},expression:"phone"}})]}}],null,!0)}),e._v(" "),t("validation-provider",{attrs:{name:"message",rules:"required|min:10|max:1000"},scopedSlots:e._u([{key:"default",fn:function(n){var r=n.errors;return[t("v-textarea",{attrs:{counter:1e3,"error-messages":r,success:!Boolean(Object.keys(r).length)&&Boolean(e.message),label:"Message*",placeholder:"Your message",hint:Boolean(e.message)?"":"For example, `Hi @emretepedev!`",name:"message",clearable:"","clear-icon":e.mdiCloseCircle,"prepend-inner-icon":e.mdiComment,maxlength:"1000",outlined:"",rounded:"",dense:"",shaped:""},model:{value:e.message,callback:function(n){e.message=n},expression:"message"}})]}}],null,!0)}),e._v(" "),t("v-checkbox",{attrs:{value:Boolean(e.asap),label:"ASAP: "+(Boolean(e.asap)?"yes":"no"),type:"checkbox",name:"asap","off-icon":e.mdiCheckboxBlankCircleOutline,"on-icon":e.mdiCheckboxMarkedCircle,dense:"",shaped:""},model:{value:e.asap,callback:function(n){e.asap=n},expression:"asap"}}),e._v(" "),t("recaptcha",{attrs:{id:e.$config.googleRecaptchaV2Size,"site-key":e.$config.googleRecaptchaV2SiteKey},on:{error:e.onError,success:e.onSuccess,expired:e.onExpired}}),e._v(" "),t("div",{staticClass:"text-center mt-5"},[t("v-btn",{staticClass:"pageclip-form__submit",attrs:{type:"submit",disabled:r||!e.isRecaptched},on:{click:e.submit}},[e._v("\n                            Submit\n                        ")])],1)],1)]}}])})],1)],1)])}),[],!1,null,null,null);n.default=component.exports;h()(component,{VAutocomplete:x.a,VBtn:k.a,VCheckbox:j.a,VContainer:C.a,VTextField:y.a,VTextarea:O.a})}}]);