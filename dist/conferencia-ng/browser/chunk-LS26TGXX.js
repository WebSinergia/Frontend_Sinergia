import{a as A,b as q,c as B,d as U,e as z,f as H,g as L,h as Z}from"./chunk-5RXD6CFF.js";import{C as v,D as C,Ea as i,Ga as s,Ha as h,T as _,V as n,Va as x,W as c,Xa as E,_a as y,ba as p,da as l,fb as f,hb as I,jb as g,kb as N,kc as Q,la as o,lb as O,lc as j,ma as t,na as u,nb as P,ob as D,pb as F,tb as G,ua as b,ub as R,vb as T,w as M,wa as S,wb as k,xb as V,yb as w}from"./chunk-XWCZBFVY.js";function W(r,J){r&1&&(o(0,"div",9),i(1," DNI debe tener 8 d\xEDgitos num\xE9ricos. "),t())}function X(r,J){if(r&1&&(o(0,"div")(1,"div",10)(2,"p")(3,"strong"),i(4,"Nombre:"),t(),i(5),t(),o(6,"p")(7,"strong"),i(8,"DNI:"),t(),i(9),t(),o(10,"p")(11,"strong"),i(12,"Tel\xE9fono:"),t(),i(13),t(),o(14,"p")(15,"strong"),i(16,"Zona:"),t(),i(17),t(),o(18,"h5"),i(19,"QR Code"),t(),u(20,"img",11),t()()),r&2){let e=S();n(5),h(" ",e.user.us_nombres," ",e.user.us_apellidos," "),n(4),s(" ",e.user.us_dni,""),n(4),s(" ",e.user.us_telefono,""),n(4),s(" ",e.user.us_zone,""),n(3),l("src",e.getQrCodeUrl(e.user.us_qrcode),_)}}var $=(()=>{class r{inscripcionesService;fb;form;user;constructor(e,a){this.inscripcionesService=e,this.fb=a,this.form=this.fb.group({us_dni:["",[g.required,g.pattern("^[0-9]{8}$")]]})}ngOnInit(){}onSubmit(){this.form.valid?this.inscripcionesService.getUserByDni(this.form.get("us_dni")?.value).subscribe(e=>{console.log("Backend Response 200",e),this.user=e},e=>{console.error("Error al enviar el formulario",e)}):console.log("Formulario no v\xE1lido")}getQrCodeUrl(e){return e.replace("/media/","/conferencia/media/")}static \u0275fac=function(a){return new(a||r)(c(A),c(k))};static \u0275cmp=v({type:r,selectors:[["app-search"]],decls:12,vars:4,consts:[[1,"title"],["novalidate","",3,"ngSubmit","formGroup"],[1,"form-container"],[1,"form-group"],["for","dni"],["id","dni","type","text","formControlName","us_dni","required","","minlength","8","pattern","[0-9]{8}",1,"form-control"],["class","error",4,"ngIf"],["type","submit",1,"btn","btn-primary",3,"disabled"],[4,"ngIf"],[1,"error"],[1,"user-container"],["alt","QR Code",3,"src"]],template:function(a,m){if(a&1&&(o(0,"h5",0),i(1,"Get QR by DNI"),t(),o(2,"form",1),b("ngSubmit",function(){return m.onSubmit()}),o(3,"div",2)(4,"div",3)(5,"label",4),i(6,"DNI:"),t(),u(7,"input",5),p(8,W,2,0,"div",6),t(),o(9,"button",7),i(10," Enviar "),t()()(),p(11,X,21,6,"div",8)),a&2){let d;n(2),l("formGroup",m.form),n(6),l("ngIf",((d=m.form.get("dni"))==null?null:d.invalid)&&((d=m.form.get("dni"))==null?null:d.touched)),n(),l("disabled",m.form.invalid),n(2),l("ngIf",m.user)}},dependencies:[x,P,I,N,O,G,R,T,D,F],styles:[".title[_ngcontent-%COMP%]{margin:1.5rem 2rem}.form-container[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]{margin:1rem}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{margin:.5rem}.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{padding:.4rem;border-radius:.3rem}.error[_ngcontent-%COMP%]{color:red;font-size:12px;margin-top:5px}button[_ngcontent-%COMP%]{background-color:#007bff;color:#fff;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;border:none;cursor:pointer;border-radius:.5rem;padding:.6rem;margin-left:1rem}button[_ngcontent-%COMP%]:disabled{background-color:#ccc;cursor:not-allowed;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;border-radius:.5rem;padding:.8rem;margin-left:1rem}"]})}return r})();var Y=[{path:"",component:$}],be=(()=>{class r{static \u0275fac=function(a){return new(a||r)};static \u0275mod=C({type:r});static \u0275inj=M({imports:[f.forChild(Y),f,y,Q,q,B,j,U,E,z,H,L,V,Z,w]})}return r})();export{be as SearchModule};
