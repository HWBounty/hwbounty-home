(this["webpackJsonphwbounty-home"]=this["webpackJsonphwbounty-home"]||[]).push([[22],{1532:function(e,t,a){"use strict";a.r(t),a.d(t,"Settings",(function(){return B}));var o=a(14),n=a(0),c=a(3),r=a(9),l=(a(13),a(10)),i=a(115),d=a(11),s=a(178),p=a(24),h=n.forwardRef((function(e,t){e.checked;var a=e.classes,o=e.className,d=e.control,h=e.disabled,u=(e.inputRef,e.label),b=e.labelPlacement,m=void 0===b?"end":b,g=(e.name,e.onChange,e.value,Object(r.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),f=Object(i.a)(),k=h;"undefined"===typeof k&&"undefined"!==typeof d.props.disabled&&(k=d.props.disabled),"undefined"===typeof k&&f&&(k=f.disabled);var y={disabled:k};return["checked","name","onChange","value","inputRef"].forEach((function(t){"undefined"===typeof d.props[t]&&"undefined"!==typeof e[t]&&(y[t]=e[t])})),n.createElement("label",Object(c.a)({className:Object(l.a)(a.root,o,"end"!==m&&a["labelPlacement".concat(Object(p.a)(m))],k&&a.disabled),ref:t},g),n.cloneElement(d,y),n.createElement(s.a,{component:"span",className:Object(l.a)(a.label,k&&a.disabled)},u))})),u=Object(d.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(h),b=n.forwardRef((function(e,t){var a=e.classes,o=e.className,i=e.row,d=void 0!==i&&i,s=Object(r.a)(e,["classes","className","row"]);return n.createElement("div",Object(c.a)({className:Object(l.a)(a.root,o,d&&a.row),ref:t},s))})),m=Object(d.a)({root:{display:"flex",flexDirection:"column",flexWrap:"wrap"},row:{flexDirection:"row"}},{name:"MuiFormGroup"})(b),g=a(444),f=a(50),k=a(98),y=a(169),j=a(1279),O=n.forwardRef((function(e,t){var a=e.autoFocus,o=e.checked,d=e.checkedIcon,s=e.classes,p=e.className,h=e.defaultChecked,u=e.disabled,b=e.icon,m=e.id,g=e.inputProps,f=e.inputRef,O=e.name,w=e.onBlur,v=e.onChange,x=e.onFocus,C=e.readOnly,$=e.required,N=e.tabIndex,I=e.type,S=e.value,R=Object(r.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),E=Object(y.a)({controlled:o,default:Boolean(h),name:"SwitchBase",state:"checked"}),B=Object(k.a)(E,2),z=B[0],F=B[1],P=Object(i.a)(),L=u;P&&"undefined"===typeof L&&(L=P.disabled);var D="checkbox"===I||"radio"===I;return n.createElement(j.a,Object(c.a)({component:"span",className:Object(l.a)(s.root,p,z&&s.checked,L&&s.disabled),disabled:L,tabIndex:null,role:void 0,onFocus:function(e){x&&x(e),P&&P.onFocus&&P.onFocus(e)},onBlur:function(e){w&&w(e),P&&P.onBlur&&P.onBlur(e)},ref:t},R),n.createElement("input",Object(c.a)({autoFocus:a,checked:o,defaultChecked:h,className:s.input,disabled:L,id:D&&m,name:O,onChange:function(e){var t=e.target.checked;F(t),v&&v(e,t)},readOnly:C,ref:f,required:$,tabIndex:N,type:I,value:S},g)),z?d:b)})),w=Object(d.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(O),v=n.forwardRef((function(e,t){var a=e.classes,o=e.className,i=e.color,d=void 0===i?"secondary":i,s=e.edge,h=void 0!==s&&s,u=e.size,b=void 0===u?"medium":u,m=Object(r.a)(e,["classes","className","color","edge","size"]),g=n.createElement("span",{className:a.thumb});return n.createElement("span",{className:Object(l.a)(a.root,o,{start:a.edgeStart,end:a.edgeEnd}[h],"small"===b&&a["size".concat(Object(p.a)(b))])},n.createElement(w,Object(c.a)({type:"checkbox",icon:g,checkedIcon:g,classes:{root:Object(l.a)(a.switchBase,a["color".concat(Object(p.a)(d))]),input:a.input,checked:a.checked,disabled:a.disabled},ref:t},m)),n.createElement("span",{className:a.track}))})),x=Object(d.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(f.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(f.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(v),C=a(306),$=a.n(C),N=a(52),I=a(147),S=a(138),R=a(5),E=$()((function(e){return Object(o.a)(Object(o.a)({},e.spreadIt),{},{root:{display:"flex","& > *":{margin:e.spacing(1)}},small:{width:e.spacing(3),height:e.spacing(3)},large:{width:e.spacing(16),height:e.spacing(16)},paper:{width:"80vw",height:"80vw",display:"inline-block"},title:{fontSize:"60px"},formLabel:{display:"block"},formGroup:{display:"inline"}})})),B=function(e){var t=E(),a=e.UI.theme,o=e.setTheme,n=Object(S.b)().enqueueSnackbar;return Object(R.jsxs)(g.a,{className:t.paper,children:[Object(R.jsx)(s.a,{variant:"h5",className:t.title,children:"Settings"}),Object(R.jsx)(m,{row:!0,className:t.formGroup,children:Object(R.jsx)(u,{control:Object(R.jsx)(x,{checked:1===a,onChange:function(e,t){var a=t?1:0;n(0===a?"Ouchy, my eyes":"Ahhhh much better"),localStorage.setItem("theme",a),o(a)},name:"darkmodeToggle"}),label:"Dark Mode :)",className:t.formLabel})})]})};t.default=Object(N.b)((function(e){return{UI:e.UI,user:e.user}}),{setTheme:I.c})(B)}}]);
//# sourceMappingURL=22.28820f12.chunk.js.map