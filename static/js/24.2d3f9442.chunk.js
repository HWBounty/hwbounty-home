(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[24],{662:function(e,t,a){"use strict";a.r(t),a.d(t,"ScheduleBuilder",(function(){return k}));var c=a(5),n=a(17),i=a(0),s=a(357),l=a(401),o=a(78),r=a(354),d=a(206),m=a(352),u=a(315),j=a(210),b=a(407),O=a(211),f=a(663),h=a(664),p=a(665),x=a(675),g=a(388),v=a.n(g),S=a(14),y=a(90),C=a(25),N=a(2),T=Object(s.a)({mainDiv:{display:"flex",height:"100%",width:"100%"},leftSidebar:{minWidth:"10vw",padding:"4vmin",backgroundColor:"rgb(50,50,50)",textAlign:"left",float:"left"},mainSchedule:{backgroundColor:"rgb(100,100,100)",flexGrow:1,paddingTop:"5vmin",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},title:{fontFamily:"Oswald",fontSize:"4rem"},minititle:{fontFamily:"Poppins",fontSize:"1.5rem"},listItemText:{fontFamily:"Nunito",fontSize:"1.25rem",fontWeight:"bold"},classCard:{width:"80%",minHeight:"20vmin",borderRadius:"1vmin",margin:"1.25vmin",position:"relative"},classCardTitle:{marginTop:"5vmin",marginLeft:"5vmin",marginRight:"5vmin",marginBottom:"1vmin",textAlign:"left",fontSize:"3.75rem",fontFamily:"Oswald"},classCardTime:{fontFamily:"Nunito",fontSize:"1.5rem",textAlign:"left",marginLeft:"5vmin",marginRight:"5vmin",marginBottom:"1vmin"},classCardRemoveButton:{position:"absolute",top:"10%",right:"5%"},classCardRemoveButtonIcon:{},addButton:{backgroundColor:"rgb(75,75,75)"},blockBuilderCard:{minWidth:"100vmin",minHeight:"80vmin",display:"flex",alignItems:"flex-start",flexDirection:"column",justifyContent:"flex-start",padding:"5vmin"},flexModal:{display:"flex",alignContent:"center",justifyContent:"center",alignItems:"center",flexWrap:"nowrap"},mediumTitle:{fontFamily:"Poppins",fontSize:"2.5rem",alignSelf:"center",margin:"1.25rem",marginTop:"0"},periodSelector:{fontSize:"1.75rem",height:"500px"},periodTitle:{fontSize:50,fontFamily:"Oswald"},periodInput:{fontSize:50}}),k=function(e){var t=T(e),a=Object(i.useState)([{period:"period1",start:"11:30am",end:"12:30pm"}]),s=Object(n.a)(a,2),g=s[0],S=s[1],k=Object(i.useState)([]),B=Object(n.a)(k,2),I=B[0],w=B[1],z=Object(i.useState)([]),F=Object(n.a)(z,2),R=F[0],D=F[1],M=Object(i.useState)([]),P=Object(n.a)(M,2),W=P[0],A=P[1],L=Object(i.useState)([]),H=Object(n.a)(L,2),J=H[0],U=H[1],G=Object(i.useState)([]),q=Object(n.a)(G,2),E=q[0],K=q[1],Q=Object(i.useState)([]),V=Object(n.a)(Q,2),X=V[0],Y=V[1],Z=Object(i.useState)({period1:"Period 1"}),$=Object(n.a)(Z,2),_=$[0],ee=($[1],Object(i.useState)(0)),te=Object(n.a)(ee,2),ae=te[0],ce=te[1],ne=function(e,t){ce(t)},ie=Object(i.useState)(!1),se=Object(n.a)(ie,2),le=se[0],oe=se[1],re=Object(y.a)(),de=[g,I,R,W,J,E,X][ae],me=[S,w,D,A,U,K,Y][ae];return Object(N.jsxs)("div",{className:"".concat(t.mainDiv),children:[Object(N.jsxs)("div",{className:"".concat(t.leftSidebar),children:[Object(N.jsx)(o.a,{className:"".concat(t.title),children:Object(C.a)("scheduleBuilder.scheduleBuilder")}),Object(N.jsxs)(d.a,{children:[Object(N.jsx)(h.a,{})," ",Object(C.a)("scheduleBuilder.backToSearch")]}),Object(N.jsx)(o.a,{className:"".concat(t.minititle),children:Object(C.a)("scheduleBuilder.makeSchedule")}),Object(N.jsxs)(m.a,{component:"nav","aria-label":"main mailbox folders",children:[Object(N.jsx)(u.a,{button:!0,selected:0===ae,onClick:function(e){return ne(0,0)},className:"".concat(t.listItemText),children:Object(C.a)("days.monday")}),Object(N.jsx)(u.a,{button:!0,selected:1===ae,onClick:function(e){return ne(0,1)},className:"".concat(t.listItemText),children:Object(C.a)("days.tuesday")}),Object(N.jsx)(u.a,{button:!0,selected:2===ae,onClick:function(e){return ne(0,2)},className:"".concat(t.listItemText),children:Object(C.a)("days.wednesday")}),Object(N.jsx)(u.a,{button:!0,selected:3===ae,onClick:function(e){return ne(0,3)},className:"".concat(t.listItemText),children:Object(C.a)("days.thursday")}),Object(N.jsx)(u.a,{button:!0,selected:4===ae,onClick:function(e){return ne(0,4)},className:"".concat(t.listItemText),children:Object(C.a)("days.friday")}),Object(N.jsx)(u.a,{button:!0,selected:5===ae,onClick:function(e){return ne(0,5)},className:"".concat(t.listItemText),children:Object(C.a)("days.saturday")}),Object(N.jsx)(u.a,{button:!0,selected:6===ae,onClick:function(e){return ne(0,6)},className:"".concat(t.listItemText),children:Object(C.a)("days.sunday")})]})]}),Object(N.jsxs)("div",{className:"".concat(t.mainSchedule),children:[de.map((function(e,a){var c=v()(e.start,"hh:mma"),n=v()(e.end,"hh:mma");return Object(N.jsxs)(l.a,{className:"".concat(t.classCard),children:[Object(N.jsx)(o.a,{className:"".concat(t.classCardTitle),children:_[e.period]||e.period}),Object(N.jsx)(o.a,{className:"".concat(t.classCardTime),children:Object(C.a)("scheduleBuilder.formatMinutes",{start:e.start,end:e.end,mins:v.a.duration(n-c).asMinutes()})}),Object(N.jsx)(r.a,{className:"".concat(t.classCardRemoveButton),onClick:function(){return e=a,de.splice(e,1),me(de),void re();var e},children:Object(N.jsx)(f.a,{className:"".concat(t.classCardRemoveButtonIcon)})})]})})),Object(N.jsx)(r.a,{className:"".concat(t.addButton),onClick:function(){oe(!0)},children:Object(N.jsx)(p.a,{})})]}),Object(N.jsx)(j.a,{open:le,onClose:function(){oe(!1)},className:"".concat(t.flexModal),children:Object(N.jsx)(b.a,{in:le,children:Object(N.jsxs)(l.a,{className:"".concat(t.blockBuilderCard),children:[Object(N.jsx)(o.a,{className:"".concat(t.mediumTitle),children:Object(C.a)("scheduleBuilder.createSchedule")}),Object(N.jsxs)("div",{children:[Object(N.jsx)(o.a,{className:"".concat(t.periodTitle),children:Object(C.a)("scheduleBuilder.classStartTime")}),Object(N.jsx)(O.a,{id:"filled-basic",label:"Start Time",variant:"filled"})]}),Object(N.jsx)(x.a,{options:["period1","period2","period3","period4","period5","period6","period7","period8","period9","period10","period11","period12","period13","period14","period15","break"],getOptionLabel:function(e){return _[e]||e},style:{width:300},autocomplete:!0,renderInput:function(e){return Object(N.jsx)(O.a,Object(c.a)(Object(c.a)({},e),{},{label:"Period Name",variant:"outlined",className:"".concat(t.periodSelector)}))}})]})})})]})};t.default=Object(S.b)((function(e){return{user:e.user,UI:e.UI}}))(k)}}]);
//# sourceMappingURL=24.2d3f9442.chunk.js.map