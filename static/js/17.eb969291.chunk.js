(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[17],{1247:function(e,t,n){"use strict";n.r(t),n.d(t,"VanityInvite",(function(){return I}));var a=n(25),r=n.n(a),o=n(43),c=n(36),i=n(988),s=n(949),l=n(1051),u=n(1234),d=n(154),m=n(1023),b=n(954),h=n(47),p=n.n(h),g=n(118),f=n(0),j=n(45),x=n(46),v=(n(1215),n(28)),O=n(105),w=n(989),y=n(6),k=Object(i.a)((function(e){return{logoButton:{height:"2rem"}}})),B=Object(j.b)()(Object(g.c)((function(e){var t=k(e),n=function(){var e=Object(o.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("".concat(v.p,"/schoologyAuth"),{redirectURL:"".concat(window.location.href)});case 2:(t=(t=e.sent).data||t)&&t.nonce&&t.url&&(localStorage.setItem("SchoologyNonce",t.nonce),window.location.href=t.url);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),a=Object(g.b)().enqueueSnackbar,c=Object(x.f)();return Object(f.useEffect)((function(){window.location.search&&window.location.search.match(/\?oauth_token=/)&&Object(o.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("".concat(v.p,"/schoologyAuth"),{redirectURL:"".concat(window.location.href),oauth_token:window.location.search.split("?oauth_token=").pop(),nonce:localStorage.getItem("SchoologyNonce")}).catch((function(e){console.log(e),a(e.response.data.error||e.response.data)}));case 2:if(t=e.sent){e.next=5;break}return e.abrupt("return");case 5:Object(O.d)(t.data),a("Signed in!"),setTimeout((function(){return c.push("/")}),500);case 8:case"end":return e.stop()}}),e)})))()}),[]),Object(y.jsx)(w.a,{onClick:n,children:Object(y.jsx)("img",{src:"https://images-na.ssl-images-amazon.com/images/I/410R0kTkO4L.png",className:t.logoButton})})}))),S=Object(i.a)((function(e){return{headBar:{height:"7.5rem",padding:"1rem",paddingBottom:0,display:"flex",alignItems:"center",background:function(e){return 1===e?"rgb(42,42,42)":"rgb(255,255,255)"}},hwBountyText:{fontSize:"3rem",textAlign:"left",fontFamily:"Nunito"},hwBountyMotto:{fontSize:"1.875rem",fontFamily:"Nunito"},greetingIMG:{width:"7.5rem"},mainPart:{width:"100%",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},schoolPhoto:{width:"100%",height:"100vh",position:"absolute",top:"0%",left:"0%",filter:"brightness(0.5)"},tealOverlay:{width:"100%",height:"100vh",position:"absolute",top:"0%",left:"0%",backgroundColor:"rgba(105,180,172,0.5)"},tagLine:{fontFamily:"Oswald",fontSize:"5rem",textAlign:"left"},infoLine:{fontFamily:"Nunito",fontSize:"2.5rem",textAlign:"left"},infoLine2:{fontFamily:"Nunito",fontSize:"2rem",textAlign:"left"},top:{zIndex:3},topDivWrapper:{display:"flex",flexWrap:"wrap",flexDirection:"column",alignItems:"flex-start"},joinButton:{backgroundColor:"rgb(23,178,172)","&:hover":{backgroundColor:"rgb(71 212 206)",transition:"transform 1s"},width:"16rem",height:"4rem",borderRadius:"0.5rem",fontFamily:"Poppins",textTransform:"none",fontSize:"2rem",fontWeight:"400",transition:"transform 2s",color:function(e){return 0===e?"rgb(42,42,42)":"rgb(255,255,255)"},marginLeft:"4rem"},joinButtonScaled:{fontSize:-1e5,width:"8rem",height:"8rem",transform:"scale(50)",transition:"all 2s",position:"absolute",zIndex:100,backgroundColor:"rgb(23,178,172)","&:hover":{backgroundColor:"rgb(23,178,172)!important"}},joinButtonPreScaled:{position:"absolute",width:"8rem",height:"8rem",top:"50%",left:"50%",transform:"scale(50)",zIndex:1e7,"&:hover":{backgroundColor:"rgb(23,178,172)!important"}},joinButtonDescaled:{fontSize:-1e5,width:"8rem",height:"8rem",borderRadius:"100rem",transform:"scale(0.01)",transition:"all 0.7s",backgroundColor:"rgb(23,178,172)!important","&:hover":{backgroundColor:"rgb(23,178,172)!important"},zIndex:1e7},inputBox:{margin:"2rem",marginBottom:"0.5rem",marginTop:"0.25rem"},inputBoxWide:{margin:"2rem",marginTop:"0rem",marginBottom:"2rem"},signupLeftDiv:{position:"absolute",top:0,left:0,borderRadius:0,height:"100vh"},signupText:{fontSize:"1.875rem",fontFamily:"Nunito"},signUpButton:{height:"3rem",minWidth:"10rem",fontSize:"2rem",textTransform:"none",fontFamily:"Poppins",fontWeight:"300",backgroundColor:"rgb(23,178,172)","&:hover":{backgroundColor:"rgb(50,200,200)"},"&:disabled":{backgroundColor:"rgb(100,100,100)"},color:function(e){return 0===e?"rgb(42,42,42)":"rgb(255,255,255)"}},cuteHopper:{margin:"1rem",marginBottom:0,height:"8rem",width:"8rem"}}})),N=function(e){return Object(y.jsx)("span",{style:{color:"rgb(105,180,172)"},children:"\u2666"})},I=function(e){var t=S(e.UI.theme),n=Object(f.useState)(null),a=Object(c.a)(n,2),i=a[0],h=a[1];Object(f.useEffect)(Object(o.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("".concat(v.p,"/invite/").concat(window.location.pathname.split("/").pop())).catch(console.trace);case 2:if(null===(t=e.sent)||void 0===t?void 0:t.data){e.next=5;break}return e.abrupt("return");case 5:h(t.data);case 6:case"end":return e.stop()}}),e)}))),[]);var j=Object(x.f)(),w=Object(g.b)().enqueueSnackbar;Object(f.useEffect)((function(){window.location.search&&window.location.search.match(/\?oauth_token=/)&&Object(o.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("".concat(v.p,"/schoologyAuth"),{redirectURL:"".concat(window.location.href),oauth_token:window.location.search.split("?oauth_token=").pop(),nonce:localStorage.getItem("SchoologyNonce")}).catch((function(e){console.log(e),w(e.response.data.error||e.response.data)}));case 2:if(t=e.sent){e.next=5;break}return e.abrupt("return");case 5:Object(O.d)(t.data),w("Signed in!"),setTimeout((function(){return j.push("/")}),500);case 8:case"end":return e.stop()}}),e)})))()}),[]);var k=Object(f.useState)(!1),I=Object(c.a)(k,2),C=I[0],T=I[1],E=Object(f.useState)(""),L=Object(c.a)(E,2),z=L[0],U=L[1],P=Object(f.useState)(""),W=Object(c.a)(P,2),D=W[0],F=W[1],A=Object(f.useState)(""),H=Object(c.a)(A,2),R=H[0],_=H[1],M=Object(f.useState)(!1),q=Object(c.a)(M,2),G=q[0],J=q[1],V=Object(f.useState)(!1),Z=Object(c.a)(V,2),$=Z[0],K=Z[1],Q=function(e){return new Promise((function(t){return setTimeout(t,e)}))};if(!i)return null;var X=function(){var e=Object(o.a)(r.a.mark((function e(){var t,n,a,o,c,i,s,l,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!$){e.next=2;break}return e.abrupt("return");case 2:if(J(!0),a=document.getElementById("fname").value,o=document.getElementById("lname").value,c=document.getElementById("email").value,i=document.getElementById("uname").value,s=document.getElementById("p1").value,l=document.getElementById("cp").value,s===l){e.next=13;break}return _("Passwords do not match!"),J(!1),e.abrupt("return");case 13:if(!(i.length<3)){e.next=17;break}return F("Username too short! (min. 3 characters)"),J(!1),e.abrupt("return");case 17:if(!(i.length>32)){e.next=21;break}return F("Username too long! (max. 32 characters)"),J(!1),e.abrupt("return");case 21:if(i.match(/^[a-zA-Z0-9_]*$/g)){e.next=25;break}return F("Username must be alphanumeric. Underscores are allowed."),J(!1),e.abrupt("return");case 25:return e.next=27,p.a.get("".concat(v.p,"/usernameTaken/").concat(i));case 27:if(e.t1=t=e.sent,e.t0=null===e.t1,e.t0){e.next=31;break}e.t0=void 0===t;case 31:if(!e.t0){e.next=35;break}e.t2=void 0,e.next=36;break;case 35:e.t2=t.data;case 36:if(!e.t2){e.next=41;break}return F("Username already exists!"),J(!1),e.abrupt("return");case 41:if(c.match(/\S+@\S+\.\S+/)){e.next=45;break}return U("Invalid Email!"),J(!1),e.abrupt("return");case 45:return e.next=47,p.a.get("https://api.hwbounty.help/emailTaken/".concat(c)).catch(console.trace);case 47:if(e.t4=n=e.sent,e.t3=null===e.t4,e.t3){e.next=51;break}e.t3=void 0===n;case 51:if(!e.t3){e.next=55;break}e.t5=void 0,e.next=56;break;case 55:e.t5=n.data;case 56:if(!e.t5){e.next=60;break}return U("Email already in use!"),J(!1),e.abrupt("return");case 60:return u={email:c,firstName:a,lastName:o,username:i,password:s,vanitySignup:window.location.pathname.split("/").pop()},console.log(u),e.next=64,p.a.post("".concat(v.p,"/signup"),u).catch((function(e){return console.log(e)}));case 64:e.sent&&(document.getElementById("signup").childNodes.item(0).innerText="Check your Email!",document.getElementById("signup").disabled=!0),J(!1),K(!0);case 68:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(C)return Object(y.jsxs)("div",{children:[Object(y.jsx)("div",{className:t.joinButtonPreScaled,id:"signup2"}),Object(y.jsxs)("div",{className:t.mainPart,children:[Object(y.jsx)("div",{className:t.schoolPhoto,style:{background:"url(".concat(i.backgroundImage,")center/cover"),width:"100%",height:"100vh",overflow:"hidden"}}),Object(y.jsx)("div",{className:t.tealOverlay,style:{width:"100%",height:"100vh",overflow:"hidden"}}),Object(y.jsx)("div",{className:"".concat(t.top," ").concat(t.topDivWrapper),children:Object(y.jsx)("div",{class:"box",style:{},children:Object(y.jsx)("div",{class:"container",children:Object(y.jsx)(s.a,{direction:"right",in:!0,style:{transitionDelay:"500ms"},timeout:500,children:Object(y.jsxs)(l.a,{className:t.signupLeftDiv,children:[G&&Object(y.jsx)(u.a,{}),Object(y.jsx)("img",{className:t.cuteHopper,src:"https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png"}),Object(y.jsx)("div",{children:Object(y.jsx)(B,{})}),Object(y.jsx)(d.a,{className:t.signupText,children:"HWBounty Sign Up"}),Object(y.jsxs)("form",{style:{display:"flex",flexDirection:"column",alignItems:"stretch"},children:[Object(y.jsxs)("div",{children:[Object(y.jsx)(m.a,{label:"First Name",variant:"outlined",className:t.inputBox,id:"fname"}),Object(y.jsx)(m.a,{label:"Last Name",variant:"outlined",className:t.inputBox,id:"lname"})]}),Object(y.jsx)("br",{}),Object(y.jsx)(m.a,{label:"Email",variant:"outlined",className:t.inputBoxWide,helperText:z,error:!!z,id:"email",onChange:function(){return U("")}}),Object(y.jsx)(m.a,{label:"Username",variant:"outlined",className:t.inputBoxWide,helperText:D,error:!!D,id:"uname",onChange:function(){return F("")}}),Object(y.jsxs)("div",{children:[Object(y.jsx)(m.a,{label:"Password",variant:"outlined",className:t.inputBoxWide,type:"password",helperText:R,error:!!R,id:"p1",onChange:function(){return _("")}}),Object(y.jsx)(m.a,{label:"Confirm Password",variant:"outlined",className:t.inputBoxWide,type:"password",helperText:R,error:!!R,id:"cp",onChange:function(){return _("")}})]}),Object(y.jsx)(b.a,{style:{alignSelf:"center"},variant:"contained",className:"".concat(t.signUpButton),onClick:X,id:"signup",children:"Go!"})]})]})})})})})]})]});return Object(y.jsx)("div",{style:{height:"100%",display:"flex"},children:Object(y.jsxs)("div",{className:t.mainPart,children:[Object(y.jsx)("div",{className:t.schoolPhoto,style:{background:"url(".concat(i.backgroundImage,")center/cover")}}),Object(y.jsx)("div",{className:t.tealOverlay}),Object(y.jsxs)("div",{className:"".concat(t.top," ").concat(t.topDivWrapper),children:[Object(y.jsx)(d.a,{className:t.tagLine,children:"The modern student\u2019s best friend"}),Object(y.jsxs)(d.a,{className:t.infoLine,children:[Object(y.jsx)("b",{children:i.user.firstName})," invited you to join HWBounty - [ ",i.name," ]"]}),Object(y.jsx)("br",{}),Object(y.jsx)("br",{}),Object(y.jsxs)(d.a,{className:t.infoLine2,children:["Schedules  ",Object(y.jsx)(N,{}),"  Calculators  ",Object(y.jsx)(N,{}),"  Homework Help"]}),Object(y.jsx)("br",{}),Object(y.jsx)(b.a,{variant:"contained",className:t.joinButton,id:"signup",onClick:function(){document.getElementById("signup").classList.add(t.joinButtonScaled),document.getElementById("signup").innerHTML="",localStorage.setItem("vanityInvite",window.location.pathname.split("/").pop()),Object(o.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q(400);case 2:return T(!0),e.next=5,Q(5);case 5:return document.getElementById("signup2").classList.add(t.joinButtonDescaled),e.next=8,Q(2005);case 8:document.getElementById("signup2").remove();case 9:case"end":return e.stop()}}),e)})))()},children:"Sign me up!"})]})]})})};t.default=Object(j.b)((function(e){return{user:e.user,UI:e.UI}}))(Object(g.c)(I))}}]);
//# sourceMappingURL=17.eb969291.chunk.js.map