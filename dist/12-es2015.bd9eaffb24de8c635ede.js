(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{qRw5:function(e,t,r){"use strict";r.r(t),r.d(t,"UsersModule",(function(){return A}));var s=r("iInd"),a=r("DQLy"),c=r("DRwZ");const n=Object(c.a)(),i=n.getInitialState({loading:!1,loaded:!1,loadingCreate:!1}),o=Object(a.o)("users"),{selectAll:b}=n.getSelectors(),d=Object(a.q)(o,e=>e),u=Object(a.q)(d,b);Object(a.q)(o,e=>e.loading),Object(a.q)(o,e=>e.loaded);var p=r("bm5G");const l=Object(a.n)("[Users] Clear State"),g=Object(a.n)("[Users] Load Users"),O=Object(a.n)("[Users] Load Users Success ",Object(a.s)()),m=Object(a.n)("[Users] Load Users Fail",Object(a.s)());var h=r("8Y7J"),j=r("zHaW"),f=r("iELJ"),U=r("O13u"),v=r("SVse"),y=r("PDjf"),k=r("f44v");let w=(()=>{class e{transform(e,...t){return(r=e).firstname&&r.lastname?`${r.firstname} ${r.lastname}`:r.email;var r}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=h.Nb({name:"username",type:e,pure:!0}),e})();function C(e,t){if(1&e&&(h.Ub(0,"mat-card"),h.Ub(1,"mat-card-header"),h.Pb(2,"div",2),h.Ub(3,"mat-card-title"),h.Bc(4),h.hc(5,"username"),h.Tb(),h.Ub(6,"mat-card-subtitle"),h.Bc(7),h.Tb(),h.Tb(),h.Ub(8,"mat-card-content"),h.Ub(9,"mat-chip-list"),h.Ub(10,"mat-chip"),h.Bc(11),h.hc(12,"date"),h.Tb(),h.Ub(13,"mat-chip"),h.Bc(14),h.hc(15,"date"),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&e){const e=t.$implicit;h.Cb(4),h.Cc(h.ic(5,4,e)),h.Cb(3),h.Cc(e.email),h.Cb(4),h.Dc(" ",h.ic(12,6,e.lastLoginTime),""),h.Cb(3),h.Dc(" ",h.ic(15,8,e.registrationDate),"")}}const T=[{path:"**",component:(()=>{class e{constructor(e,t,r){this.snackBar=e,this.dialog=t,this.store=r,this.users$=this.store.pipe(Object(a.t)(u))}ngOnInit(){this.store.dispatch(g())}trackById(e,t){return t.id}}return e.\u0275fac=function(t){return new(t||e)(h.Ob(j.b),h.Ob(f.b),h.Ob(a.h))},e.\u0275cmp=h.Ib({type:e,selectors:[["app-users"]],decls:4,vars:4,consts:[[1,"user-card-group"],[4,"ngFor","ngForOf","ngForTrackBy"],["mat-card-avatar","",1,"user-header-image"]],template:function(e,t){1&e&&(h.Ub(0,"app-page-container"),h.Ub(1,"div",0),h.zc(2,C,16,10,"mat-card",1),h.hc(3,"async"),h.Tb(),h.Tb()),2&e&&(h.Cb(2),h.mc("ngForOf",h.ic(3,2,t.users$))("ngForTrackBy",t.trackById))},directives:[U.a,v.k,y.a,y.e,y.c,y.h,y.g,y.d,k.b,k.a],pipes:[v.b,w,v.e],styles:[".user-card-group[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:140px;grid-gap:1em}.mat-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:.6rem}.user-header-image[_ngcontent-%COMP%]{background-image:url(apple-touch-icon.fd212c25ad0970240be0.png);background-size:cover}"],data:{animation:[p.a]}}),e})()}];let I=(()=>{class e{}return e.\u0275mod=h.Mb({type:e}),e.\u0275inj=h.Lb({factory:function(t){return new(t||e)},imports:[[s.i.forChild(T)],s.i]}),e})();var $=r("PCNd"),B=r("AytR"),F=r("IheW");let L=(()=>{class e{constructor(e){this.http=e}getUsersInWorkspace(e){return this.http.get(B.a.apiEndpoint+`api/users?workspaceSlug=${e}`)}}return e.\u0275fac=function(t){return new(t||e)(h.Yb(F.b))},e.\u0275prov=h.Kb({token:e,factory:e.\u0275fac}),e})();var S=r("Yml6"),D=r("cahD"),M=r("LRne"),P=r("zp1y"),J=r("eIep"),Y=r("lJxs"),q=r("JIr8"),W=r("lc/E");let z=(()=>{class e{constructor(e,t,r){this.actions$=e,this.usersService=t,this.store=r,this.loadUsers$=Object(S.d)(()=>this.actions$.pipe(Object(S.e)(g),Object(P.a)(this.store.select(D.a)),Object(J.a)(([e,t])=>this.usersService.getUsersInWorkspace(t.slug).pipe(Object(Y.a)(e=>O({users:e})),Object(q.a)(e=>Object(M.a)(m({error:e}))))))),this.onWorkspaceSelected$=Object(S.d)(()=>this.actions$.pipe(Object(S.e)(W.m),Object(Y.a)(l)))}}return e.\u0275fac=function(t){return new(t||e)(h.Yb(S.a),h.Yb(L),h.Yb(a.h))},e.\u0275prov=h.Kb({token:e,factory:e.\u0275fac}),e})();const E=Object(a.p)(i,Object(a.r)(l,()=>i),Object(a.r)(g,e=>Object.assign(Object.assign({},e),{loading:!0})),Object(a.r)(m,(e,{error:t})=>Object.assign(Object.assign({},e),{loading:!1,loadUsersError:t})),Object(a.r)(O,(e,{users:t})=>n.setAll(t,Object.assign(Object.assign({},e),{loading:!1,loaded:!0}))));function R(e,t){return E(e,t)}var _=r("Fk/C");let A=(()=>{class e{}return e.\u0275mod=h.Mb({type:e}),e.\u0275inj=h.Lb({factory:function(t){return new(t||e)},providers:[L],imports:[[$.a,_.a,a.j.forFeature("users",R),S.c.forFeature([z]),I]]}),e})()}}]);