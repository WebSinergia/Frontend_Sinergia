import{Xa as h,Ya as p,f as o,i as e,m as n,u as i,x as a}from"./chunk-Z3PF5OZX.js";var m=(()=>{class s{http;basePath="https://backend-sinergia.onrender.com/conferencia/user";httpOptions={headers:new h({"Content-Type":"application/json"})};constructor(t){this.http=t}handleError(t){return t.error instanceof ErrorEvent?console.log(`An error occurred: ${t.error.message} `):console.error(`Backend returned code ${t.status}, body was: ${t.error}`),o(()=>new Error("Something happened with request, please try again later"))}getUserList(){let t=`${this.basePath}/list`;return this.http.get(t).pipe(n(2),e(this.handleError))}getUserByDni(t){let r=`${this.basePath}/search?dni=${t}`;return this.http.get(r).pipe(n(2),e(this.handleError))}editUserById(t){let r=`${this.basePath}/confirm/${t}`;return this.http.put(r,null).pipe(n(2),e(this.handleError))}createUser(t){let r=`${this.basePath}/create`;return this.http.post(r,t).pipe(n(2),e(this.handleError))}getImageByZone(t){let r=`${this.basePath}/payment/${t}`;return this.http.get(r).pipe(n(2),e(this.handleError))}static \u0275fac=function(r){return new(r||s)(a(p))};static \u0275prov=i({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();export{m as a};
