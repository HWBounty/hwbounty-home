(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[0],{17:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(5),o=n.n(a),s=(n(17),n.p+"static/media/logo.db36153e.svg"),i=n(12),l=n(4),u=n(6),j=Object(u.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),b=j.actions,d=b.increment,h=b.decrement,m=b.incrementByAmount,p=function(e){return e.counter.value},x=j.reducer,O=n(3),f=n.n(O),v=n(1);function _(){var e=Object(l.c)(p),t=Object(l.b)(),n=Object(r.useState)("2"),c=Object(i.a)(n,2),a=c[0],o=c[1];return Object(v.jsxs)("div",{children:[Object(v.jsxs)("div",{className:f.a.row,children:[Object(v.jsx)("button",{className:f.a.button,"aria-label":"Increment value",onClick:function(){return t(d())},children:"+"}),Object(v.jsx)("span",{className:f.a.value,children:e}),Object(v.jsx)("button",{className:f.a.button,"aria-label":"Decrement value",onClick:function(){return t(h())},children:"-"})]}),Object(v.jsxs)("div",{className:f.a.row,children:[Object(v.jsx)("input",{className:f.a.textbox,"aria-label":"Set increment amount",value:a,onChange:function(e){return o(e.target.value)}}),Object(v.jsx)("button",{className:f.a.button,onClick:function(){return t(m(Number(a)||0))},children:"Add Amount"}),Object(v.jsx)("button",{className:f.a.asyncButton,onClick:function(){return t((e=Number(a)||0,function(t){setTimeout((function(){t(m(e))}),1e3)}));var e},children:"Add Async"})]})]})}n(25);var g=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsxs)("header",{className:"App-header",children:[Object(v.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),Object(v.jsx)(_,{}),Object(v.jsxs)("p",{children:["Edit ",Object(v.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(v.jsxs)("span",{children:[Object(v.jsx)("span",{children:"Learn "}),Object(v.jsx)("a",{className:"App-link",href:"https://reactjs.org/",target:"_blank",rel:"noopener noreferrer",children:"React"}),Object(v.jsx)("span",{children:", "}),Object(v.jsx)("a",{className:"App-link",href:"https://redux.js.org/",target:"_blank",rel:"noopener noreferrer",children:"Redux"}),Object(v.jsx)("span",{children:", "}),Object(v.jsx)("a",{className:"App-link",href:"https://redux-toolkit.js.org/",target:"_blank",rel:"noopener noreferrer",children:"Redux Toolkit"}),",",Object(v.jsx)("span",{children:" and "}),Object(v.jsx)("a",{className:"App-link",href:"https://react-redux.js.org/",target:"_blank",rel:"noopener noreferrer",children:"React Redux"})]})]})})},k=Object(u.a)({reducer:{counter:x}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(l.a,{store:k,children:Object(v.jsx)(g,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},3:function(e,t,n){e.exports={row:"Counter_row__2Rk63",value:"Counter_value__GKz2b",button:"Counter_button__1A_ay",textbox:"Counter_textbox__19jRK",asyncButton:"Counter_asyncButton__3m3RS Counter_button__1A_ay"}}},[[26,1,2]]]);
//# sourceMappingURL=main.a631f745.chunk.js.map