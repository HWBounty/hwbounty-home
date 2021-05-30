(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[23],{1231:function(e,t,a){"use strict";a.r(t);var s=a(25),n=a.n(s),c=a(36),i=a(43),r=a(35),l=a(37),o=a(67),h=a(66),d=a(998),u=a(1025),p=a(1022),b=a(993),f=a(994),j=a(1051),y=a(154),g=a(1026),v=a(954),m=a(0),O=a.n(m),x=a(47),w=a.n(x),D=a(45),k=a(1031),S=a.n(k),C=a(1066),A=a.n(C),I=a(46),N=a(6),L=function(e){Object(o.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).state={scheduleData:null,fetching:!1,tab:0},s}return Object(l.a)(a,[{key:"fetchScheduleData",value:function(){var e=Object(i.a)(n.a.mark((function e(){var t,a,s,i,r,l;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("FETCHING"),!this.state.scheduleData){e.next=3;break}return e.abrupt("return",console.log(this.state.scheduleData));case 3:return e.prev=3,e.next=6,Promise.all([w.a.get("https://api.hwbounty.help/schedules/view/".concat(this.props.location.pathname.split("/").pop())).catch((function(e){return console.log})),w.a.get("https://api.hwbounty.help/@me").catch(console.trace),w()("https://api.hwbounty.help/sgy/getCourses").catch(console.trace)]);case 6:t=e.sent,a=Object(c.a)(t,3),s=a[0],i=a[1],r=a[2],s.data&&(s.data.nameOverrides=JSON.parse(s.data.nameOverrides),s.data.schedule=JSON.parse(s.data.schedule),l={scheduleData:s.data},i.data&&(l.self=i.data),r.data&&(l.courses=r.data.section),this.setState(l)),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(3),console.trace(e.t0),this.setState({});case 18:case"end":return e.stop()}}),e,this,[[3,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(e){this.props=e}},{key:"parseAllPeriods",value:function(e){var t=new Set;return["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].forEach((function(a){e[a].forEach((function(e){t.add(e.period)}))})),Array.from(t.keys())}},{key:"handleSet",value:function(){var e=Object(i.a)(n.a.mark((function e(t){var a,s;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.state.setting){e.next=2;break}return e.abrupt("return");case 2:return t.setState({setting:!0}),a=t.state.periodChoices,s=this.props.location.pathname.split("/").pop(),console.log(s),e.next=8,w.a.post("https://api.hwbounty.help/schedules/set",{scheduleID:s,classes:a}).catch(console.trace);case 8:200===e.sent.status?location.href="https://hwbounty.help":t.setState({setting:!1});case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleDropdowns",value:function(e){var t=e.state.courses,a=this.parseAllPeriods(e.state.scheduleData.schedule),s=t.map((function(e){return{id:e.id,name:e.course_title}})).concat({id:"None",name:"None"}),n=e.state.scheduleData.nameOverrides;console.log(a);return a.map((function(t){return Object(N.jsxs)(d.a,{style:{width:"30%",minWidth:"30%",margin:"1.5%"},required:!0,children:[Object(N.jsx)(u.a,{id:"inputLabel".concat(t),children:n[t]||t}),Object(N.jsx)(p.a,{labelId:"select".concat(t,"Label"),id:"select".concat(t),value:e.state.periodChoices&&e.state.periodChoices["".concat(t)],onChange:function(a){!function(t,a){var s=e.state.periodChoices||{};s[a]=t.target,e.setState({periodChoices:s})}(a,"".concat(t))},children:O.a.Children.toArray(s.map((function(e){return Object(N.jsx)(b.a,{value:e.id,children:e.name})})))})]})}))}},{key:"render",value:function(){var e=this;return this.state.scheduleData||this.state.fetching?this.state.scheduleData?Object(N.jsx)(f.a,{children:Object(N.jsxs)(j.a,{style:{display:"inline-block",width:"90%",margin:"5%",paddingBottom:"1vh",paddingLeft:"5%",paddingRight:"5%",textAlign:"left",verticalAlign:"middle"},children:[Object(N.jsx)(y.a,{variant:"h4",style:{textAlign:"center"},children:this.state.scheduleData.name}),Object(N.jsx)(f.a,{style:{width:"100%",height:"10%"},children:Object(N.jsxs)("span",{children:[Object(N.jsx)(y.a,{variant:"caption",style:{textAlign:"left",marginRight:"1%"},children:"By:"}),Object(N.jsx)(g.a,{src:this.state.scheduleData.user.pfp,align:"left",style:{display:"inline-block",verticalAlign:"middle"},children:this.state.scheduleData.user.publicID}),Object(N.jsx)(y.a,{variant:"h5",style:{verticalAlign:"middle",marginLeft:"1%",display:"inline-block"},children:this.state.scheduleData.user.publicID})]})}),Object(N.jsxs)(y.a,{children:["Last Updated: ",S()(parseInt(this.state.scheduleData.lastUpdated)).fromNow()]}),Object(N.jsx)(A.a,{children:this.state.scheduleData.description}),Object(N.jsx)(f.a,{style:{width:"100%"},children:O.a.Children.toArray(this.handleDropdowns(this))}),Object(N.jsx)(f.a,{style:{paddingTop:"1vh",borderTop:"2px solid rgba(160, 160, 160, 0.2)",textAlign:"center"},children:Object(N.jsx)(v.a,{onClick:function(t){return e.handleSet(e)},children:"Set Classes"})})]})}):null:(console.log("GoFetch"),this.setState({fetching:!0}),this.fetchScheduleData(),Object(N.jsx)("br",{}))}}]),a}(m.Component);t.default=Object(D.b)()(Object(I.g)(L))}}]);
//# sourceMappingURL=23.8740c9de.chunk.js.map