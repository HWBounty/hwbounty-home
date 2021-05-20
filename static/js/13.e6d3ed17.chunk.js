(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[13],{1510:function(e,t,a){"use strict";a.r(t),a.d(t,"ScheduleCatalog",(function(){return T}));var c=a(24),n=a.n(c),s=a(42),l=a(34),i=a(1288),o=a(1304),r=a(997),d=a(203),h=a(1291),u=a(1293),m=a(304),j=a(1320),f=a(1316),b=a(450),x=a(1317),p=a(1322),g=a(52),y=a.n(g),O=a(0),v=a.n(O),w=a(53),S=a(4),N=Object(i.a)({catalogLeft:{width:"40%",height:"100%",display:"inline-flex",alignItems:"center",flexDirection:"column",verticalAlign:"top"},catalogLeftTitle:{width:"80%",marginLeft:"20%",marginRight:"0%",margin:"5%",textAlign:"left"},catalogLeftSearchBox:{width:"70%",marginLeft:"10%",height:"200px",fontSize:"2vw"},catalogTitleText:{fontSize:"4vw",fontFamily:"Oswald",fontWeight:"100"},catalogTitleCaption:{fontSize:"1.5vw",fontFamily:"Nunito",fontWeight:"100"},catalogItemCard:{width:"384px",display:"inline-flex",justifyContent:"flex-start",flexDirection:"column",height:"80%",margin:"5vmin",padding:"1rem",borderRadius:"1rem",background:function(e){return 1===e?"#353839ff":"#f3f3f3ff"},boxShadow:"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)!important"},catalogItemCardButton:{display:"inline-flex",flexDirection:"column",justifyContent:"flex-start",padding:"0px",width:"100%"},catalogItemTitle:{fontSize:"2vw",textAlign:"center",fontFamily:"Poppins",fontWeight:"800",marginTop:"1vmin",marginBottom:"1vmin"},catalogItemsDiv:{width:"55%",minWidth:"512px",height:"90vh",display:"inline-flex",alignContent:"center",justifyContent:"center",alignItems:"center",flexDirection:"row"},scheduleDisplay:{width:"100%",borderColor:function(e){return 1===e?"#b7b7b7":"#666666"},borderWidth:"0.05rem!important",borderRadius:"2rem",minHeight:"90%",height:"90%",maxHeight:"50vh",background:"rgba(0,0,0,0)",boxShadow:"none",alignSelf:"flex-start"},scheduleList:{overflowY:"auto",maxHeight:"50vh",flexGrow:"1"},scheduleDisplayTab:{maxWidth:"14.283%",width:"14.283%",minWidth:"14.283%"},scheduleDisplayPeriod:{fontSize:"2.5vmin",fontFamily:"Nunito",textAlign:"left",fontWeight:"750",textOverflow:"elipsis",overflow:"hidden",whiteSpace:"nowrap",margin:"1vmin",color:function(e){return 0===e?"#5c5c5c":"#ffffff"}},scheduleDisplayPeriodTime:{fontSize:"1.5vmin",fontFamily:"Nunito",whiteSpace:"nowrap"}}),T=function(e){var t=e.UI.theme,a=Object(O.useState)(null),c=Object(l.a)(a,2),i=c[0],o=c[1],r=Object(O.useState)(!1),d=Object(l.a)(r,2),h=d[0],u=d[1],m=Object(O.useState)([]),j=Object(l.a)(m,2),f=j[0],b=j[1];return i&&h!==i&&(u(i),Object(s.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.get("https://api.hwbounty.help/schedules/search/".concat(i)).catch(console.trace);case 2:t=e.sent,b(t.data),console.log(f);case 5:case"end":return e.stop()}}),e)})))()),window.innerWidth<1300?null:Object(S.jsx)(I,{theme:t,schedulesSearch:i,setSchedulesSearch:o,schedulesResult:f})},D=function(e){var t=e.classes,a=e.data,c=e.day,n=JSON.parse(a.nameOverrides),s=JSON.parse(a.schedule)[["monday","tuesday","wednesday","thursday","friday","saturday","sunday"][c]].map((function(e){return Object.assign(e,{period:n[e.period]||e.period})}));return Object(S.jsx)(u.a,{style:{marginBottom:"5%"},className:"".concat(t.scheduleList),children:function(){for(var e=[],a=0;a<s.length;a++)e.push(s[a]),a+1!==s.length&&e.push("divider");s=e;var c=v.a.Children.toArray(s.map((function(e){return"divider"===e?Object(S.jsx)(o.a,{}):Object(S.jsxs)(r.a,{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"row"},children:[Object(S.jsx)(d.a,{className:"".concat(t.scheduleDisplayPeriod),children:e.period}),Object(S.jsxs)(d.a,{className:"".concat(t.scheduleDisplayPeriodTime),children:[e.timeStart,"-",e.timeEnd]})]})})));return c.length?Object(S.jsx)(h.a,{children:c}):Object(S.jsx)(d.a,{variant:"h3",children:"No School Today!"})}()})},C=function(e){var t=e.schedule,a=e.theme,c=N(a),n=Object(O.useState)(0),s=Object(l.a)(n,2),i=s[0],o=s[1];return Object(S.jsxs)(m.a,{className:"".concat(c.scheduleDisplay),children:[Object(S.jsxs)(j.a,{variant:"fullWidth",centered:!0,scrollButtons:"auto",indicatorColor:"primary",textColor:"primary",value:i,onChange:function(e,t){o(t)},children:[Object(S.jsx)(f.a,{label:"M",className:"".concat(c.scheduleDisplayTab)}),Object(S.jsx)(f.a,{label:"T",className:"".concat(c.scheduleDisplayTab)}),Object(S.jsx)(f.a,{label:"W",className:"".concat(c.scheduleDisplayTab)}),Object(S.jsx)(f.a,{label:"Th",className:"".concat(c.scheduleDisplayTab)}),Object(S.jsx)(f.a,{label:"F",className:"".concat(c.scheduleDisplayTab)}),Object(S.jsx)(f.a,{label:"Sa",className:"".concat(c.scheduleDisplayTab)}),Object(S.jsx)(f.a,{label:"Su",className:"".concat(c.scheduleDisplayTab)})]}),Object(S.jsxs)(h.a,{children:[0===i&&Object(S.jsx)(D,{day:i,data:t,classes:c}),1===i&&Object(S.jsx)(D,{day:i,data:t,classes:c}),2===i&&Object(S.jsx)(D,{day:i,data:t,classes:c}),3===i&&Object(S.jsx)(D,{day:i,data:t,classes:c}),4===i&&Object(S.jsx)(D,{day:i,data:t,classes:c}),5===i&&Object(S.jsx)(D,{day:i,data:t,classes:c}),6===i&&Object(S.jsx)(D,{day:i,data:t,classes:c})]})]})},I=function(e){var t,a=e.theme,c=e.schedulesSearch,n=e.setSchedulesSearch,s=e.schedulesResult,l=N(a);return Object(S.jsxs)("div",{children:[Object(S.jsxs)("div",{className:"".concat(l.catalogLeft),children:[Object(S.jsxs)("div",{className:"".concat(l.catalogLeftTitle),children:[Object(S.jsx)(d.a,{className:"".concat(l.catalogTitleText),children:"Schedule Catalog"}),Object(S.jsx)(d.a,{className:"".concat(l.catalogTitleCaption),children:"Find the schedule format for your school!"})]}),Object(S.jsx)(p.a,{id:"searchBox",variant:"outlined",label:"What school are you from?",className:"".concat(l.catalogLeftSearchBox),value:c,onChange:function(e,t){n(t||e.target.value)}})]}),Object(S.jsx)("div",{className:"".concat(l.catalogItemsDiv),children:c?(t=s,v.a.Children.toArray(t.map((function(e){return Object(S.jsx)(b.a,{in:!0,timeout:300,style:{transitionDelay:"0ms"},children:Object(S.jsxs)(x.a,{className:"".concat(l.catalogItemCard),onClick:null,children:[Object(S.jsx)(d.a,{className:"".concat(l.catalogItemTitle),children:e.name}),Object(S.jsx)("div",{style:{flexGrow:1,display:"flex",alignItems:"center",justifyItems:"center"},children:Object(S.jsx)(C,{schedule:e,theme:a})})]})})})))):null})]})};t.default=Object(w.b)((function(e){return{user:e.user,UI:e.UI}}))(T)}}]);
//# sourceMappingURL=13.e6d3ed17.chunk.js.map