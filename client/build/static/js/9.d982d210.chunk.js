(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{100:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(94),l=t.n(o);a.a=function(e){var a=null,t=[l.a.Form_field];switch(e.invalid&&e.shouldValidate&&e.touched&&t.push(l.a.Invalid),e.elementType){case"input":a=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":a=r.a.createElement("textarea",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":a=r.a.createElement("select",{className:t.join(" "),onChange:e.changed},e.elementConfig.options.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:a=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return r.a.createElement("div",{className:l.a.Form_group},a)}},116:function(e,a,t){"use strict";t.r(a);var n=t(39),r=t(15),o=t(16),l=t(18),i=t(17),c=t(19),s=t(0),u=t.n(s),m=t(13),p=t(11),d=t(20),h=t(94),g=t.n(h),f=t(98),v=t(99),_=t(25),b=t(100),y=t(2),E=t(38),C=function(e){function a(){var e,t;Object(r.a)(this,a);for(var o=arguments.length,c=new Array(o),s=0;s<o;s++)c[s]=arguments[s];return(t=Object(l.a)(this,(e=Object(i.a)(a)).call.apply(e,[this].concat(c)))).state={controls:{name:{elementType:"input",elementConfig:{type:"text",name:"name",placeholder:"Your Name"},value:"",validation:{required:!0},valid:!1,touched:!1},email:{elementType:"input",elementConfig:{type:"email",name:"email",placeholder:"Your Email"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},phone:{elementType:"input",elementConfig:{type:"tel",name:"phone",placeholder:"Your Phone Number"},value:"",validation:{required:!0,isNumeric:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",name:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:7},valid:!1,touched:!1},confirm_password:{elementType:"input",elementConfig:{type:"password",name:"confirm_password",placeholder:"Confirm Password"},value:"",validation:{required:!0,minLength:7},valid:!1,touched:!1}},formIsValid:!1},t.handleUserRegister=function(e){e.preventDefault();var a={};for(var n in t.state.controls)a[n]=t.state.controls[n].value;t.props.onUserSignUp(a)},t.inputChangeHandler=function(e,a){var r=Object(y.b)(t.state.controls[a],{value:e.target.value,valid:Object(y.a)(e.target.value,t.state.controls[a].validation),touched:!0}),o=Object(y.b)(t.state.controls,Object(n.a)({},a,r)),l=!0;for(var i in o)l=o[i].valid&&l;t.setState({controls:o,formIsValid:l})},t}return Object(c.a)(a,e),Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.loading||this.props.onSetAuthRedirect("/menu")}},{key:"render",value:function(){var e=this,a=Object.keys(this.state.controls).map(function(a){return{id:a,config:e.state.controls[a]}}),t=null;this.props.userAuthenticated&&(t=u.a.createElement(m.a,{to:this.props.authRedirectPath}));var n=u.a.createElement(f.a,null,u.a.createElement("form",{onSubmit:this.handleUserRegister,action:"#",method:"post",className:g.a.Page_form,id:"registerForm"},u.a.createElement(v.a,{user:"user",type:"register"}),a.map(function(a){return u.a.createElement(b.a,{key:a.id,elementType:a.config.elementType,elementConfig:a.config.elementConfig,value:a.config.value,invalid:!a.config.valid,touched:a.config.touched,shouldValidate:a.config.validation,changed:function(t){return e.inputChangeHandler(t,a.id)}})}),u.a.createElement("button",{type:"submit"},"Register"),u.a.createElement("p",{className:g.a.Page_link},"Already Have an Account? ",u.a.createElement(p.b,{to:"/login"},"Login")),u.a.createElement("p",{className:g.a.Page_link},"Back to Home? ",u.a.createElement(p.b,{to:"/"},"Click Here"))));return this.props.loading&&(n=u.a.createElement(_.a,null)),u.a.createElement(u.a.Fragment,null,t,n)}}]),a}(s.Component);a.default=Object(d.b)(function(e){return{loading:e.auth.loading,userAuthenticated:e.auth.userAuthenticated}},function(e){return{onUserSignUp:function(a){return e(E.n(a))},onSetAuthRedirect:function(a){return e(E.j(a))}}})(C)},94:function(e,a,t){e.exports={Form_wrapper:"Form_Form_wrapper__QqSsD",Form_page:"Form_Form_page__7wk-h",Page_form:"Form_Page_form__4SeNr",Form_group:"Form_Form_group__1phnD",Form_field:"Form_Form_field__3UJZr",Invalid:"Form_Invalid__2diAN",Page_link:"Form_Page_link__1y_3j"}},98:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(94),l=t.n(o);a.a=function(e){return r.a.createElement("main",{className:l.a.Form_wrapper},r.a.createElement("section",{className:l.a.Form_page},e.children))}},99:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){return r.a.createElement("h3",null,r.a.createElement("span",{className:"Red"},"B"),"ook ",r.a.createElement("span",{className:"Red"},"A")," Mea",r.a.createElement("span",{className:"Red"},"l")," ",e.user.charAt(0).toUpperCase()+e.user.slice(1)," ",r.a.createElement("span",{className:"Red"},e.type.charAt(0).toUpperCase()+e.type.slice(1)))}}}]);
//# sourceMappingURL=9.d982d210.chunk.js.map