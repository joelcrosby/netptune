function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,o){return e&&_defineProperties(t.prototype,e),o&&_defineProperties(t,o),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{XUCH:function(t,e,o){"use strict";o.r(e),o.d(e,"WorkspacesModule",(function(){return L}));var n=o("iInd"),c=o("Rn6e"),a=o("s7LF"),r=o("iELJ"),i=o("M1vg"),l=o("lc/E"),s=o("8Y7J"),b=o("DQLy"),d=o("Q2Ze"),u=o("e6WT"),m=o("ZTz/"),p=o("SVse"),f=o("Dxy4"),g=o("UhP/");function h(t,e){if(1&t&&(s.Ub(0,"mat-option",15),s.Ub(1,"div",7),s.Pb(2,"div",8),s.Ub(3,"div",9),s.Bc(4),s.Tb(),s.Tb(),s.Tb()),2&t){var o=e.$implicit;s.mc("value",o.color),s.Cb(2),s.yc("background-color",o.color),s.Cb(2),s.Dc(" ",o.name," ")}}var k,C=((k=function(){function t(e,o,n){_classCallCheck(this,t),this.store=e,this.dialogRef=o,this.data=n,this.workspaceFromGroup=new a.e({name:new a.c("",[a.q.required]),description:new a.c,color:new a.c("")}),this.colors=Object(i.b)()}return _createClass(t,[{key:"ngOnInit",value:function(){if(this.data){var t=this.data;this.name.setValue(t.name),this.description.setValue(t.description),this.color.setValue(t.metaInfo.color)}}},{key:"close",value:function(){this.dialogRef.close()}},{key:"getResult",value:function(){var t=Object.assign(Object.assign({},this.data),{name:this.name.value,description:this.description.value,metaInfo:{color:this.selectedColor},users:[],projects:[]});this.store.dispatch(this.isEditMode?Object(l.g)({workspace:t}):Object(l.a)({workspace:t})),this.dialogRef.close()}},{key:"getColorLabel",value:function(t){var e=this.colors.find((function(e){return e.color===t}));return e&&e.name}},{key:"name",get:function(){return this.workspaceFromGroup.get("name")}},{key:"description",get:function(){return this.workspaceFromGroup.get("description")}},{key:"color",get:function(){return this.workspaceFromGroup.get("color")}},{key:"selectedColor",get:function(){return this.color.value}},{key:"isEditMode",get:function(){return!!this.data}}]),t}()).\u0275fac=function(t){return new(t||k)(s.Ob(b.h),s.Ob(r.f),s.Ob(r.a,8))},k.\u0275cmp=s.Ib({type:k,selectors:[["app-workspace-dialog"]],decls:28,vars:7,consts:[["mat-dialog-title",""],[1,"form-auth",3,"formGroup"],[1,"name-color-row"],["appearance","outline",1,"w-100"],["matInput","","id","name","placeholder","Workspace Name","name","name","formControlName","name",1,"form-control"],["appearance","outline",1,"w-100","color-field"],["placeholder","Color","formControlName","color"],[1,"color-option"],[1,"color-pallete"],[1,"label"],[3,"value",4,"ngFor","ngForOf"],["matInput","","id","description","placeholder","Description","name","description","aria-label","With textarea","formControlName","description",1,"form-control"],["mat-dialog-actions",""],["mat-button","",3,"click"],["mat-button","","type","button",3,"click"],[3,"value"]],template:function(t,e){1&t&&(s.Ub(0,"h1",0),s.Bc(1),s.Tb(),s.Ub(2,"form",1),s.Ub(3,"div",2),s.Ub(4,"mat-form-field",3),s.Ub(5,"mat-label"),s.Bc(6,"Enter Workspace Name"),s.Tb(),s.Pb(7,"input",4),s.Tb(),s.Ub(8,"mat-form-field",5),s.Ub(9,"mat-label"),s.Bc(10,"Choose Color"),s.Tb(),s.Ub(11,"mat-select",6),s.Ub(12,"mat-select-trigger"),s.Ub(13,"div",7),s.Pb(14,"div",8),s.Ub(15,"div",9),s.Bc(16),s.Tb(),s.Tb(),s.Tb(),s.zc(17,h,5,4,"mat-option",10),s.Tb(),s.Tb(),s.Tb(),s.Ub(18,"mat-form-field",3),s.Ub(19,"mat-label"),s.Bc(20,"Enter Workspace Summary"),s.Tb(),s.Ub(21,"textarea",11),s.Bc(22,"    "),s.Tb(),s.Tb(),s.Tb(),s.Ub(23,"div",12),s.Ub(24,"button",13),s.cc("click",(function(){return e.close()})),s.Bc(25,"Close"),s.Tb(),s.Ub(26,"button",14),s.cc("click",(function(){return e.getResult()})),s.Bc(27),s.Tb(),s.Tb()),2&t&&(s.Cb(1),s.Cc(e.isEditMode?"Edit Workspace":"Add new Workspace"),s.Cb(1),s.mc("formGroup",e.workspaceFromGroup),s.Cb(12),s.yc("background-color",e.selectedColor),s.Cb(2),s.Dc(" ",e.getColorLabel(e.selectedColor)," "),s.Cb(1),s.mc("ngForOf",e.colors),s.Cb(10),s.Dc(" ",e.isEditMode?"Save Changes":"Save Workspace"," "))},directives:[r.g,a.r,a.l,a.f,d.c,d.g,u.b,a.b,a.k,a.d,m.a,m.c,p.k,r.c,f.b,g.n],styles:[".color-pallete[_ngcontent-%COMP%]{border-radius:.55rem;height:24px;width:24px}.color-option[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.label[_ngcontent-%COMP%]{margin-left:1rem}.name-color-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:stretch;align-items:center}.color-field[_ngcontent-%COMP%]{margin-left:1rem;max-width:200px}"]}),k),y=o("bm5G"),w=o("jHLV"),T=o("cahD"),v=o("O13u"),U=o("PDjf"),O=o("Tj54"),P=function(t){return["/app/",t]},_=function(t){return["/app/",t,"users"]};function B(t,e){if(1&t){var o=s.Vb();s.Ub(0,"mat-card"),s.Ub(1,"mat-card-title"),s.Bc(2),s.Ub(3,"button",8),s.cc("click",(function(){s.tc(o);var t=e.$implicit;return s.gc().deleteClicked(t)})),s.Ub(4,"mat-icon"),s.Bc(5,"close"),s.Tb(),s.Tb(),s.Tb(),s.Ub(6,"mat-card-content"),s.Ub(7,"p"),s.Bc(8),s.Tb(),s.Ub(9,"small",7),s.Bc(10),s.hc(11,"date"),s.Tb(),s.Tb(),s.Ub(12,"mat-card-actions"),s.Ub(13,"a",9),s.Ub(14,"mat-icon",10),s.Bc(15,"assessment"),s.Tb(),s.Bc(16," Go To Projects "),s.Tb(),s.Ub(17,"a",11),s.Bc(18," Manage Users "),s.Tb(),s.Ub(19,"a",12),s.cc("click",(function(){s.tc(o);var t=e.$implicit;return s.gc().onEditClicked(t)})),s.Bc(20," Edit Workspace "),s.Tb(),s.Tb(),s.Tb()}if(2&t){var n=e.$implicit;s.Cb(2),s.Dc(" ",n.name," "),s.Cb(6),s.Cc(n.description),s.Cb(2),s.Dc("Last updated ",s.jc(11,5,n.updatedAt,"shortTime"),""),s.Cb(3),s.mc("routerLink",s.oc(8,P,n.slug)),s.Cb(4),s.mc("routerLink",s.oc(10,_,n.slug))}}var M,x,j,F=[{path:"**",component:(M=function(){function t(e,o){_classCallCheck(this,t),this.store=e,this.dialog=o,this.workspaces$=this.store.select(T.b)}return _createClass(t,[{key:"ngOnInit",value:function(){this.store.dispatch(Object(l.j)())}},{key:"trackById",value:function(t,e){return e.id}},{key:"openWorkspaceDialog",value:function(){this.dialog.open(C,{data:null,width:"600px"})}},{key:"onEditClicked",value:function(t){this.dialog.open(C,{data:t,width:"600px"})}},{key:"deleteClicked",value:function(t){var e=this;this.dialog.open(c.a,{data:{title:"Delete Workspace",content:"Are you sure you want to delete ".concat(w.a.truncate(t.name)),confirm:"Delete"}}).afterClosed().subscribe((function(o){o&&e.store.dispatch(Object(l.d)({workspace:t}))}))}}]),t}(),M.\u0275fac=function(t){return new(t||M)(s.Ob(b.h),s.Ob(r.b))},M.\u0275cmp=s.Ib({type:M,selectors:[["app-workspaces"]],decls:16,vars:4,consts:[[1,"card-group"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"card-body"],[1,"card-title"],[1,"card-text"],["mat-button","","color","primary",3,"click"],[1,"card-footer"],[1,"text-muted"],["mat-button","","color","primary","type","button",3,"click"],["mat-flat-button","","color","primary","type","button",1,"action-button",3,"routerLink"],[1,"action-mat-icon"],["mat-button","","color","primary","type","button",1,"action-button",3,"routerLink"],["mat-button","","color","primary","type","button",1,"action-button",3,"click"]],template:function(t,e){1&t&&(s.Ub(0,"app-page-container"),s.Ub(1,"div",0),s.zc(2,B,21,12,"mat-card",1),s.hc(3,"async"),s.Ub(4,"mat-card"),s.Ub(5,"div",2),s.Ub(6,"h5",3),s.Bc(7,"Create a new Workspace"),s.Tb(),s.Ub(8,"p",4),s.Bc(9," Worksapces allow for team collobaration on multiple projectes and are the foundation of all workflows within Neptuna. "),s.Tb(),s.Ub(10,"mat-card-actions"),s.Ub(11,"button",5),s.cc("click",(function(){return e.openWorkspaceDialog()})),s.Bc(12,"Create"),s.Tb(),s.Tb(),s.Tb(),s.Ub(13,"div",6),s.Ub(14,"small",7),s.Bc(15,"Created with by \u2764 Joel"),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb()),2&t&&(s.Cb(2),s.mc("ngForOf",s.ic(3,2,e.workspaces$))("ngForTrackBy",e.trackById))},directives:[v.a,p.k,U.a,U.b,f.b,U.h,O.a,U.d,f.a,n.h],pipes:[p.b,p.e],styles:["mat-card[_ngcontent-%COMP%]{min-width:300px;min-height:200px;margin-bottom:2rem;padding:1.6rem;border-top:2px solid #6611d6}.card-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:2rem}.mat-card-actions[_ngcontent-%COMP%]{padding:1.6rem;margin-bottom:2rem}.mat-card[_ngcontent-%COMP%] > .mat-card-actions[_ngcontent-%COMP%]:last-child{margin-bottom:0!important;padding-bottom:0}.action-button[_ngcontent-%COMP%]{margin-right:.8rem}.action-button[_ngcontent-%COMP%]:first-child, .mat-card-actions[_ngcontent-%COMP%]   .mat-raised-button[_ngcontent-%COMP%]:first-child{margin-left:0;margin-right:.8rem!important}.action-mat-icon[_ngcontent-%COMP%]{margin-right:.6rem}mat-card-title[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}"],data:{animation:[y.a]}}),M)}],W=((x=function t(){_classCallCheck(this,t)}).\u0275mod=s.Mb({type:x}),x.\u0275inj=s.Lb({factory:function(t){return new(t||x)},imports:[[n.i.forChild(F)],n.i]}),x),D=o("PCNd"),E=o("Fk/C"),L=((j=function t(){_classCallCheck(this,t)}).\u0275mod=s.Mb({type:j}),j.\u0275inj=s.Lb({factory:function(t){return new(t||j)},imports:[[D.a,E.a,W]]}),j)}}]);