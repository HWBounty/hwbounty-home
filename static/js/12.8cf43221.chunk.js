(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[12],{1506:function(t,e,n){"use strict";n.r(e),n.d(e,"Profile",(function(){return D})),n.d(e,"ProfileInfo",(function(){return A}));var a=n(24),i=n.n(a),r=n(42),o=n(34),c=n(14),s=n(431),l=n(1287),u=n(1325),p=n(1316),d=n(11),b=n(0),g=n.n(b),h=n(202),f=(n(305),n(51)),m=n(52),x=n.n(m),v=n(29),j=n(247),w=n(303),O=n.n(w),I=n(123),y=n(53),S=n(427),N=n(198),z=n(5),k=function(t){return x.a.get("".concat(v.o,"/user/").concat(t)).catch((function(t){console.trace(t)})).then((function(t){return t.data}))},H=Object(l.a)((function(t){return{root:{fontSize:function(t){return"".concat(.8125*t.size,"rem")},height:function(t){return"".concat(32*t.size,"px")},borderRadius:"9999px",backgroundColor:function(t){return"".concat(t.color,"!important")},margin:"10px"},avatar:{"&&":{height:function(t){return"".concat(24*t.size,"px")},width:function(t){return"".concat(24*t.size,"px")},fontSize:function(t){return"".concat(.75*t.size,"rem")}}},deleteIcon:{height:function(t){return"".concat(22*t.size,"px")},width:function(t){return"".concat(22*t.size,"px")},color:"green"}}})),T=function(t){var e=t.size,n=void 0===e?1:e,a=t.color,i=void 0===a?"rgb(0,0,0)":a,r=Object(s.a)(t,["size","color"]),o=H({size:n,color:i});return Object(z.jsx)(u.a,Object(c.a)({className:o.root,classes:{avatar:o.avatar,deleteIcon:o.deleteIcon}},r))},C=Object(l.a)({large:{width:"100px",height:"100px"},profileDiv:{position:"relative",top:0,left:0,transform:"translate(25%,0%)",marginTop:"1vh",borderRadius:1e3,width:"20vw",height:"20vw",boxShadow:"0px 2px 5px -1px rgb(0 0 0 / 20%), 4px 6px 8px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"},hoverBlur:{"&:hover":{boxShadow:"14px 20px 20px -1px rgb(0 0 0 / 20%), 4px 6px 8px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important","-webkit-filter":"blur(5px)","-moz-filter":"blur(5px)","-o-filter":"blur(5px)","-ms-filter":"blur(5px)",filter:"blur(5px)"}},profileBuffer:{width:"10vw",height:"24vw"},profileHoverText:{"&:hover":{opacity:.5},fontSize:window.innerWidth/50,color:"rgb(239,239,239)",opacity:0,backgroundColor:"rgba(0,0,0,1)",zIndex:1e5,fontFamily:"Nunito",verticalAlign:"middle"},profileHoverTextText:{fontSize:window.innerWidth/50,zIndex:1e5,fontFamily:"Nunito",position:"absolute",transform:"translate(50%,50%)",color:"rgb(239,239,239)"},card:{borderRadius:"1vw!important",background:function(t){return t?"rgb(67,67,67)":"rgb(239,239,239)"},boxShadow:"0px 2px 5px -1px rgb(0 0 0 / 20%), 4px 6px 8px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"},mainInfoCard:{position:"relative",maxWidth:"30%",maxHeight:"80%",minWidth:"30%",minHeight:"80%",height:"90vh!important",display:"block",marginTop:"5%",marginLeft:"5%"},nameandPasswordCard:{display:"inline-block",position:"absolute",top:"10%",right:"10%",margin:0,maxHeight:"25%",minWidth:"50%",minHeight:"25%"},mainInfoEverything:{display:"flex",alignItems:"center"},name:{marginTop:"3vh",fontSize:48},bio:{marginTop:"3vh",fontFamily:"Nunito",fontSize:window.innerHeight/50,maxWidth:"15vw",display:"inline-block"},text:{color:function(t){return t?"rgb(252,252,252)":"rgb(0,0,0)"}},DMtext:{color:function(t){return t?"rgb(252,252,252)":"rgb(0,0,0)"}},infoLabel:{fontFamily:"Poppins",fontSize:window.innerHeight/50,marginLeft:"5%",textAlign:"left"},infoText:{fontFamily:"Nunito",fontSize:window.innerHeight/30,textAlign:"center"},chip:{size:"large"},balanceCard:{display:"inline-block",position:"absolute",top:"40%",right:"30%",margin:0,padding:0,maxHeight:"10%",minWidth:"30%",minHeight:"10%"},balanceText:{position:"absolute",top:"50%",left:"10%",transform:"translate(0%,-50%)"}}),D=function(t){var e=t.UI.theme,n=Object(f.f)(),a=Object(S.useAsyncResource)(k,"".concat(n.location.pathname.split("/").pop())),i=Object(o.a)(a,2),r=i[0],c=i[1];return Object(b.useEffect)((function(){return n.listen((function(t){c("".concat(t.pathname.split("/").pop()))}))})),Object(z.jsx)(b.Suspense,{fallback:N.a,children:Object(z.jsx)(A,{userDat:r,theme:e})})},A=function(t){var e=t.theme,n=(0,t.userDat)();console.log(n);var a=Object(b.useState)(!1),c=Object(o.a)(a,2),s=c[0],l=(c[1],Object(b.useState)(!1)),u=Object(o.a)(l,2),d=u[0],f=u[1],m=C(e),w=Object(b.useState)(""),y=Object(o.a)(w,2),S=y[0],N=y[1],k=Object(b.useState)(""),H=Object(o.a)(k,2),D=H[0],A=H[1];Object(b.useEffect)((function(){N(n.bio),A(n.pfp)}),[n]);var P=Object(b.useState)(!1),B=Object(o.a)(P,2),W=(B[0],B[1],Object(I.b)().enqueueSnackbar);if(s)return null;var E,F,J=function(){var t=Object(r.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return W("Updating bio..."),t.next=3,x.a.post("".concat(v.o,"/updateSelf"),{bio:S});case 3:t.sent,W("Bio updated!");case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return n?Object(z.jsxs)("div",{children:[Object(z.jsx)("input",{type:"file",onChange:function(t,e){var n=new FileReader;n.onloadend=function(){var e=Object(r.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(W("Setting New Profile Picture..."),["data:image/gif;base64,","data:image/png;base64,","data:image/jpeg;base64,"].includes(n.target.result.substring(0,n.target.result.indexOf(",")+1))){e.next=4;break}return e.abrupt("return",W("Could not set profile picture! GIFs(Premium), JP(E)Gs and PNGs only please!",{variant:"error"}));case 4:return console.log(n.target.result.substring(0,25),n.target.result.substring(n.target.result.indexOf(",")+1)),e.next=7,x.a.post("".concat(v.o,"/changePfp"),{base64:n.target.result.substring(n.target.result.indexOf(",")+1)});case 7:A(n.target.result||t.target.value),W("Set new profile picture!");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.readAsDataURL(document.getElementById("pfpFileInput").files[0])},id:"pfpFileInput",style:{display:"none"}}),Object(z.jsxs)(p.a,{className:"".concat(m.card," ").concat(m.mainInfoCard),children:[Object(z.jsx)("div",{className:m.mainInfoEverything,children:Object(z.jsx)("img",{src:D||"https://github.com/HWBounty/hwbounty-home/blob/gh-pages/logo512.png?raw=true",className:"".concat(m.profileDiv," ").concat((null===(E=JSON.parse(localStorage.getItem("user")))||void 0===E?void 0:E.privateID)===n.privateID&&m.hoverBlur),onClick:(null===(F=JSON.parse(localStorage.getItem("user")))||void 0===F?void 0:F.privateID)===n.privateID&&function(){document.getElementById("pfpFileInput").click()}})}),Object(z.jsxs)(h.a,{variant:"h5",className:m.name,children:[n.firstName," ",n.lastName]}),d?Object(z.jsx)("textarea",{id:"bioTextField",label:"",onBlur:function(){S||N(n.bio),J(),f(!1)},onChange:function(t,e){var n=e||t.target.value;n.length>256&&(W("Your Bio is at the 250 char. limit!"),n=n.substring(0,256)),N(n)},style:{width:"100%",minWidth:"80%",textAlign:"center",background:"rgba(0,0,0,0.25)",height:"30vh",maxHeight:"30vh",minHeight:"30vh",borderRadius:"2vw",border:"none",outline:"none",padding:"2vh"},className:"".concat(m.bio," ").concat(m.DMtext),value:S}):Object(z.jsx)(h.a,{variant:"h5",onClick:function(){var t;n&&localStorage.getItem("user")&&(null===(t=JSON.parse(localStorage.getItem("user")))||void 0===t?void 0:t.privateID)===n.privateID&&f(!0)},className:m.bio,style:{width:"100%",minWidth:"80%",textAlign:"center",background:"rgba(0,0,0,0)",height:"30vh",maxHeight:"30vh",minHeight:"30vh"},children:d?"":S})]}),Object(z.jsxs)(p.a,{className:"".concat(m.card," ").concat(m.nameandPasswordCard),children:[Object(z.jsx)(h.a,{variant:"h5",className:"".concat(m.text," ").concat(m.infoLabel),children:"Username: "}),Object(z.jsxs)(h.a,{variant:"h5",className:"".concat(m.text," ").concat(m.infoText),children:["@",n.publicID]}),Object(z.jsx)(h.a,{variant:"h5",className:"".concat(m.text," ").concat(m.infoLabel),children:"Tags: "}),Object(z.jsxs)("div",{className:"".concat(m.text," ").concat(m.infoText),children:[" ",function(t){var e;return t?(t=t.split(","),parseInt(null===n||void 0===n?void 0:n.premiumEndsAt)&&Date.now()<parseInt(n.premiumEndsAt)&&t.push({name:"Premium Member",color:"rgb(118,137,211)",description:"A Premium member of HWBounty! Ends in ".concat(O()(parseInt(null===(e=JSON.parse(localStorage.getItem("user")))||void 0===e?void 0:e.premiumEndsAt)).fromNow())}),g.a.Children.toArray(t.map((function(t){var e,n;return Object(z.jsx)(T,{label:t.name||(null===(e=j.a[t])||void 0===e?void 0:e.name)||"Unknown Badge!",color:t.color||(null===(n=j.a[t])||void 0===n?void 0:n.color),onClick:function(){return W("".concat(t.description||j.a[t].description))},size:Math.pow(window.innerHeight*window.innerWidth,.025)})})))):null}(n.tags)]})]}),Object(z.jsx)(p.a,{className:"".concat(m.card," ").concat(m.balanceCard),children:Object(z.jsxs)(h.a,{variant:"h5",className:"".concat(m.text," ").concat(m.infoText," ").concat(m.balanceText),children:["Balance: ",n.bal," ",Object(z.jsx)("img",{src:"https://i.ibb.co/Twp60L0/frog.png",height:window.innerHeight/25,width:window.innerHeight/25,style:{verticalAlign:"middle",marginTop:window.innerHeight/-100}})]})})]}):null};e.default=Object(y.b)((function(t){return{UI:t.UI}}))(Object(d.a)((function(t){return Object(c.a)({},t.spreadIt)}))(D))}}]);
//# sourceMappingURL=12.8cf43221.chunk.js.map