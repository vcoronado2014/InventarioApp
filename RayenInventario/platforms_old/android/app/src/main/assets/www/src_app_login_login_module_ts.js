(self["webpackChunkRayenInventario"] = self["webpackChunkRayenInventario"] || []).push([["src_app_login_login_module_ts"],{

/***/ 107:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/components.module */ 5642);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page */ 6825);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 3166);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 1095);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 6627);













let LoginPageModule = class LoginPageModule {
};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelectModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInputModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIconModule,
            _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild([
                {
                    path: '',
                    component: _login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage
                }
            ])
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage]
    })
], LoginPageModule);



/***/ }),

/***/ 6825:
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./login.page.html */ 6770);
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss */ 1339);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _app_services_ServicioGlobal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/services/ServicioGlobal */ 2106);







//servicios

let LoginPage = class LoginPage {
    constructor(navCtrl, loading, formBuilder, activatedRoute, router, platform, global) {
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.platform = platform;
        this.global = global;
        this.hide = true;
        this.nombreMostrar = '';
        //para validar
        this.patternOnlyLetter = '[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$';
        this.expCelular = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/gm;
        this.expPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/gm;
        this.expEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/gm;
        this.estaCargando = false;
        this.articulos = [];
        this.recordarme = false;
    }
    ngOnInit() {
        this.cargarForma();
    }
    cargarForma() {
        this.forma = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
            'ubicacion': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]),
            'usuario': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]),
            'clave': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.maxLength(10)]),
            'recordarmeForm': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(this.recordarme)
        });
        if (localStorage.getItem('RECUERDA_LOGUEADO')) {
            this.recordarme = localStorage.getItem('RECUERDA_LOGUEADO') == 'true' ? true : false;
            if (this.recordarme) {
                this.forma.setValue({
                    ubicacion: localStorage.getItem('UBICACION_LOGUEADO'),
                    usuario: localStorage.getItem('USUARIO_LOGUEADO'),
                    clave: '',
                    recordarmeForm: this.recordarme
                });
            }
        }
        if (localStorage.getItem('NOMBRE_LOGUEADO')) {
            this.nombreMostrar = localStorage.getItem('NOMBRE_LOGUEADO');
        }
    }
    onChange(event) {
        //console.log(event);
        if (this.forma.invalid) {
            this.global.presentToast('Datos inválidos', 'bottom', 3000);
            return;
        }
        var ubicacion = this.forma.controls.ubicacion.value;
        var usuario = this.forma.controls.usuario.value;
        if (event.detail) {
            this.recordarme = event.detail.checked;
            //console.log(this.recordarme);
            localStorage.setItem('RECUERDA_LOGUEADO', this.recordarme.toString().toLowerCase());
            if (this.recordarme) {
                //guardar los valores en varibales locales
                localStorage.setItem('USUARIO_LOGUEADO', usuario);
                localStorage.setItem('UBICACION_LOGUEADO', ubicacion);
            }
            else {
                localStorage.removeItem('USUARIO_LOGUEADO');
                localStorage.removeItem('UBICACION_LOGUEADO');
            }
        }
    }
    setDatosUsuario(datos) {
        if (datos) {
            let userLogued = {
                access_token: datos.access_token,
                nombreCompleto: datos.nombre + ' ' + datos.apellidoPaterno + ' ' + datos.apellidoMaterno,
                refresh_token: datos.refresh_token,
                configuracionNodo: JSON.parse(datos.configuracionNodo),
                funcionarioPrestador: JSON.parse(datos.funcionarioPrestador)
            };
            this.nombreMostrar = datos.nombre;
            localStorage.setItem('NOMBRE_LOGUEADO', this.nombreMostrar);
            localStorage.setItem('FUNCIONARIO_PRESTADOR', JSON.stringify(userLogued));
        }
    }
    /*   async onSubmit(){
        if (this.forma.invalid) {
          return;
        }
        var ubicacion = this.forma.controls.ubicacion.value;
        var usuario = this.forma.controls.usuario.value;
        var password = this.forma.controls.clave.value;
    
        this.estaCargando = true;
        let loader = await this.loading.create({
          //cssClass: 'loading-vacio',
          showBackdrop: false,
          spinner: 'circles',
        });
    
        await loader.present().then(async () => {
          if (!this.isAppOnDevice()) {
            //web
            this.global.postLogin(ubicacion, usuario, password).subscribe((data)=>{
              let respuesta = data;
              console.log(respuesta);
              //transformar la respuesta
              this.estaCargando = false;
              this.setDatosUsuario(respuesta);
              loader.dismiss();
              this.irAHome();
    
            },
            error => {
              this.estaCargando = false;
              loader.dismiss();
              let err = error.error;
              
              //console.log(JSON.parse(error));
              //console.log(error.json());
              let mensaje = err.error_description ? err.error_description : 'Error de comunicación';
              if (err.error == 'invalid_grant'){
                this.global.presentToast(mensaje, 'bottom', 3000);
              }
              else{
                this.global.presentToast(mensaje, 'bottom', 3000);
              }
            }
            
            );
          }
          else{
            //nativa
            this.global.postLoginNative(ubicacion,usuario,password).then((data:any)=>{
              let respuesta = JSON.parse(data.data);
              console.log(respuesta);
              //transformar la respuesta
              this.estaCargando = false;
              this.setDatosUsuario(respuesta);
              loader.dismiss();
              this.irAHome();
            }, (error)=>{
              this.estaCargando = false;
              loader.dismiss();
              let err = JSON.parse(error.error);
    
              let mensaje = err.error_description ? err.error_description : 'Error de comunicación';
              if (err.error == 'invalid_grant'){
                this.global.presentToast(mensaje, 'bottom', 3000);
              }
              else{
                this.global.presentToast(mensaje, 'bottom', 3000);
              }
            })
          }
    
        });
    
      } */
    onSubmit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (this.forma.invalid) {
                return;
            }
            var ubicacion = this.forma.controls.ubicacion.value;
            var usuario = this.forma.controls.usuario.value;
            var password = this.forma.controls.clave.value;
            this.estaCargando = true;
            if (!this.isAppOnDevice()) {
                //web
                this.global.postLogin(ubicacion, usuario, password).subscribe((data) => {
                    let respuesta = data;
                    //console.log(respuesta);
                    //transformar la respuesta
                    this.setDatosUsuario(respuesta);
                    this.estaCargando = false;
                    this.irAHome();
                }, error => {
                    this.estaCargando = false;
                    let err = error.error;
                    let mensaje = err.error_description ? err.error_description : 'Error de comunicación';
                    if (err.error == 'invalid_grant') {
                        this.global.presentToast(mensaje, 'bottom', 4000);
                    }
                    else {
                        this.global.presentToast(mensaje, 'bottom', 4000);
                    }
                });
            }
            else {
                //nativa
                this.global.postLoginNative(ubicacion, usuario, password).then((data) => {
                    let respuesta = JSON.parse(data.data);
                    //console.log(respuesta);
                    //transformar la respuesta
                    this.setDatosUsuario(respuesta);
                    this.estaCargando = false;
                    this.irAHome();
                }, (error) => {
                    this.estaCargando = false;
                    let err = JSON.parse(error.error);
                    let mensaje = err.error_description ? err.error_description : 'Error de comunicación';
                    if (err.error == 'invalid_grant') {
                        this.global.presentToast(mensaje, 'bottom', 4000);
                    }
                    else {
                        this.global.presentToast(mensaje, 'bottom', 4000);
                    }
                });
            }
        });
    }
    isAppOnDevice() {
        if (window.location.port === '8100') {
            return false;
        }
        else {
            return true;
        }
    }
    irAHome() {
        this.navCtrl.navigateRoot('home');
    }
    cerrarSesion() {
        this.global.cerrarSesion();
    }
    get f() { return this.forma.controls; }
};
LoginPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.Platform },
    { type: _app_services_ServicioGlobal__WEBPACK_IMPORTED_MODULE_2__.ServicioGlobal }
];
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], LoginPage);



/***/ }),

/***/ 1339:
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".logo {\n  width: 54%;\n  margin-left: 23%;\n  margin-bottom: 16px;\n}\n\n.titulo {\n  font-size: 18pt;\n  color: #000000DE;\n}\n\n.subtitulo {\n  letter-spacing: 0.15pt;\n  font-size: 14pt;\n  color: #212121;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBQ0E7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUFFSjs7QUFBQTtFQUNJLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFHSiIsImZpbGUiOiJsb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9nb3tcclxuICAgIHdpZHRoOiA1NCU7XHJcbiAgICBtYXJnaW4tbGVmdDogMjMlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufVxyXG4udGl0dWxve1xyXG4gICAgZm9udC1zaXplOiAxOHB0O1xyXG4gICAgY29sb3I6ICMwMDAwMDBERTtcclxufVxyXG4uc3VidGl0dWxve1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMTVwdDtcclxuICAgIGZvbnQtc2l6ZTogMTRwdDtcclxuICAgIGNvbG9yOiAjMjEyMTIxO1xyXG59Il19 */");

/***/ }),

/***/ 6770:
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.page.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content class=\"ion-padding\">\n\n  <form [hidden]=\"estaCargando\" [formGroup]=\"forma\" novalidate>\n    <!-- <h1>Login</h1> -->\n    <img src=\"../../assets/imgs/logo.svg\" alt=\"asistente\" class=\"logo\"/>\n    <ion-row class=\"ion-no-margin ion-no-padding\">\n      <div *ngIf=\"nombreMostrar == ''\" class=\"titulo ion-padding-bottom\">Bienvenido</div>\n      <div *ngIf=\"nombreMostrar != ''\" class=\"titulo ion-padding-bottom\">Bienvenido de nuevo {{nombreMostrar}}</div>\n      <div class=\"subtitulo ion-padding-bottom\">Ingresa o completa tus credenciales de Rayen para iniciar sesión</div>\n      <mat-form-field appearance=\"outline\" style=\"width: 100%;\">\n        <mat-label>Ubicación</mat-label>\n        <input matInput placeholder=\"Ubicación\" name=\"ubicacion\" formControlName=\"ubicacion\">\n        <mat-error>Ubicación requerida</mat-error>\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\" style=\"width: 100%;\">\n        <mat-label>Usuario</mat-label>\n        <input matInput placeholder=\"Usuario\" name=\"usuario\" formControlName=\"usuario\">\n        <mat-error>Usuario requerido</mat-error>\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\" style=\"width: 100%;\">\n        <mat-label>Contraseña</mat-label>\n        <input matInput placeholder=\"Contraseña\" type=\"password\" name=\"clave\" formControlName=\"clave\" required>\n        <mat-error [hidden]=\"!(f.clave.errors && f.clave.errors.required)\">Clave requerida</mat-error>\n      </mat-form-field>\n    </ion-row>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <ion-item lines=\"none\" style=\"--ion-item-background: transparent;\">\n            <ion-label style=\"word-wrap: break-word;font-size: 0.9em;white-space: break-spaces;\">Recordarme</ion-label>\n            <ion-toggle name=\"recuerda\" formControlName=\"recordarmeForm\" (ionChange)=\"onChange($event)\" mode=\"ios\">\n            </ion-toggle>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-row class=\"ion-no-padding ion-no-margin\">\n      <button mat-raised-button color=\"primary\" style=\"width: 90%; margin-left: 5%; height:36px;\"\n        (click)=\"onSubmit()\">Ingresar</button>\n    </ion-row>\n\n  </form>\n  <app-progressbar [mostrar]=\"estaCargando\" titulo=\"Ingresando...\"></app-progressbar>\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_login_login_module_ts.js.map