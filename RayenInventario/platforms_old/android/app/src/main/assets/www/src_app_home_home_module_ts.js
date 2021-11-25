(self["webpackChunkRayenInventario"] = self["webpackChunkRayenInventario"] || []).push([["src_app_home_home_module_ts"],{

/***/ 3467:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 2267);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/components.module */ 5642);










let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelectModule,
            _components_components_module__WEBPACK_IMPORTED_MODULE_1__.ComponentsModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
                }
            ])
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage]
    })
], HomePageModule);



/***/ }),

/***/ 2267:
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./home.page.html */ 9764);
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss */ 2610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _app_services_ServicioGlobal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/services/ServicioGlobal */ 2106);







//servicios

let HomePage = class HomePage {
    constructor(navCtrl, loading, formBuilder, activatedRoute, router, platform, global) {
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.platform = platform;
        this.global = global;
        this.mostrarProgress = false;
        this.articulos = [];
        this.bodegas = [];
        this.articulosFiltrados = [];
        this.comboSeleccionado = 'Selecciona...';
        this.idComboSeleccionado = 0;
        this.disabledCombo = false;
    }
    ngOnInit() {
        //obtención del funcionario prestador
        if (localStorage.getItem('FUNCIONARIO_PRESTADOR')) {
            this.funcionarioPrestador = JSON.parse(localStorage.getItem('FUNCIONARIO_PRESTADOR'));
        }
        var nodId = this.funcionarioPrestador.configuracionNodo != null ? this.funcionarioPrestador.configuracionNodo.IdNodo : 0;
        this.obtenerArticulos(nodId);
    }
    obtenerArticulos(nodId) {
        this.mostrarProgress = true;
        if (this.isAppOnDevice()) {
            //nativa
            this.global.getArticulosNative(nodId, 2).then((data) => {
                this.articulos = JSON.parse(data.data);
                this.global.getArticulos(nodId, 3).subscribe((dataDos) => {
                    var insumos = dataDos;
                    this.articulos = this.articulos.concat(insumos);
                    //console.log(this.articulos);
                    this.procesarBodegas();
                    this.mostrarProgress = false;
                }, (error) => {
                    this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
                    this.mostrarProgress = false;
                });
            }, (error) => {
                this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
                this.mostrarProgress = false;
            });
        }
        else {
            //web
            this.global.getArticulos(nodId, 2).subscribe((data) => {
                this.articulos = data;
                this.global.getArticulos(nodId, 3).subscribe((dataDos) => {
                    var insumos = dataDos;
                    this.articulos = this.articulos.concat(insumos);
                    //console.log(this.articulos);
                    this.procesarBodegas();
                    this.mostrarProgress = false;
                }, error => {
                    this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
                    this.mostrarProgress = false;
                });
            }, error => {
                this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
                this.mostrarProgress = false;
            });
        }
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
    procesarBodegas() {
        this.bodegas = [];
        this.disabledCombo = true;
        if (this.articulos) {
            this.articulos.forEach(articulo => {
                /*
                BODE_ID: 11526
                BODE_NOMBRE: "CARRO DE PARO"
                CANTIDAD_DE_RECETAS: 10
                CODIGO_ESTANDAR: "F-8024/01"
                ID: 25235
                LINE_ID: 2
                NOMBRE_GENERICO: "Paracetamol 500 Mg Comprimidos "
                PSICOTROPICO: 0
                STOCK: 798
                
                */
                articulo.Agrega = false;
                articulo.Quita = false;
                articulo.Editando = false;
                articulo.StockActual = articulo.STOCK;
                var buscar = this.bodegas.filter(e => e.Id == articulo.BODE_ID);
                if (buscar.length == 0) {
                    //agregamos la bodega
                    var entidadBodega = {
                        Id: articulo.BODE_ID,
                        Nombre: articulo.BODE_NOMBRE
                    };
                    this.bodegas.push(entidadBodega);
                }
            });
        }
        //console.log(this.bodegas);
        this.disabledCombo = false;
    }
    buscarBodegas(event) {
        if (event.value) {
            this.mostrarProgress = true;
            this.idComboSeleccionado = event.value;
            //console.log(event.value);
            this.articulosFiltrados = this.articulos.filter(a => a.BODE_ID == event.value);
            //console.log(this.articulosFiltrados);
            this.mostrarProgress = false;
        }
    }
    siguiente() {
        if (this.idComboSeleccionado == 0) {
            this.global.presentToast('Debe seleccionar una bodega antes de continuar', 'bottom', 3000);
            return;
        }
        this.mostrarProgress = true;
        //guardamos en una variable de sesión los articulos filtrados
        sessionStorage.setItem('ARTICULOS_FILTRADOS', JSON.stringify(this.articulosFiltrados));
        //vamos a la página del listado
        this.mostrarProgress = false;
        this.irAListado();
    }
    irAListado() {
        this.navCtrl.navigateRoot('listado');
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.LoadingController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.Platform },
    { type: _app_services_ServicioGlobal__WEBPACK_IMPORTED_MODULE_2__.ServicioGlobal }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], HomePage);



/***/ }),

/***/ 2610:
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".combo {\n  width: 100%;\n  max-width: 100%;\n}\n\n.centrado {\n  text-align: center;\n  width: 100%;\n  height: 10%;\n  position: absolute;\n  top: 45%;\n  padding-left: 60px;\n  padding-right: 60px;\n}\n\n.titulo-item {\n  font-size: 14px;\n  color: #000000DE;\n  font-weight: bold;\n}\n\n.titulo-fecha {\n  font-size: 16px;\n  color: #000000DE;\n}\n\n.titulo-hora {\n  font-size: 12px;\n  color: #000000DE;\n}\n\n.no-encontrado {\n  font-size: 16px;\n  color: #0000008A;\n}\n\n.pt-8 {\n  padding-top: 8px;\n}\n\n.pb-8 {\n  padding-bottom: 8px;\n}\n\n.pl-24 {\n  padding-left: 24px;\n}\n\n.pr-24 {\n  padding-right: 24px;\n}\n\n.linea-item {\n  border-bottom-style: solid;\n  border-bottom-width: 1px;\n  border-bottom-color: #0000001F;\n}\n\n.borde {\n  border-radius: 5px;\n  border: 1px solid #0000001F;\n  padding: 5px;\n  padding-top: 0;\n}\n\n.label-tda {\n  position: relative;\n  top: -10px;\n  margin-left: 16px;\n  padding-left: 2px;\n  padding-right: 5px;\n  background: white;\n}\n\n.pt-32 {\n  padding-top: 32px;\n}\n\n.titulo-item-2 {\n  font-size: 16px;\n  color: #000000DE;\n}\n\n/*centrado disponibilidad*/\n\n.centradoDisp {\n  text-align: center;\n  width: 100%;\n  height: 10%;\n  position: absolute;\n  top: 35%;\n  padding-left: 60px;\n  padding-right: 60px;\n}\n\n.bienvenido {\n  padding-top: 80px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.botones {\n  padding-top: 24px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBRUY7O0FBQUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQUdGOztBQURBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBSUY7O0FBRkE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUFLRjs7QUFIQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQU1GOztBQUpBO0VBQ0UsZ0JBQUE7QUFPRjs7QUFMQTtFQUNFLG1CQUFBO0FBUUY7O0FBTkE7RUFDRSxrQkFBQTtBQVNGOztBQVBBO0VBQ0UsbUJBQUE7QUFVRjs7QUFSQTtFQUNFLDBCQUFBO0VBQ0Esd0JBQUE7RUFDQSw4QkFBQTtBQVdGOztBQVRBO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBWUY7O0FBVkE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQWFGOztBQVhBO0VBQ0UsaUJBQUE7QUFjRjs7QUFaQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQWVGOztBQWJBLDBCQUFBOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFnQkY7O0FBZEE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFpQkY7O0FBZkE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFrQkYiLCJmaWxlIjoiaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29tYm97XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG4uY2VudHJhZG97XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7ICAgICAgIFxuICBoZWlnaHQ6IDEwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6NDUlOyAgXG4gIHBhZGRpbmctbGVmdDogNjBweDtcbiAgcGFkZGluZy1yaWdodDogNjBweDsgICAgICAgICBcbn1cbi50aXR1bG8taXRlbXtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzAwMDAwMERFO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbi50aXR1bG8tZmVjaGF7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICMwMDAwMDBERTtcbn1cbi50aXR1bG8taG9yYXtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogIzAwMDAwMERFO1xufVxuLm5vLWVuY29udHJhZG97XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICMwMDAwMDA4QTtcbn1cbi5wdC04e1xuICBwYWRkaW5nLXRvcDogOHB4O1xufVxuLnBiLTh7XG4gIHBhZGRpbmctYm90dG9tOiA4cHg7XG59XG4ucGwtMjR7XG4gIHBhZGRpbmctbGVmdDogMjRweDtcbn1cbi5wci0yNHtcbiAgcGFkZGluZy1yaWdodDogMjRweDtcbn1cbi5saW5lYS1pdGVte1xuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xuICBib3JkZXItYm90dG9tLWNvbG9yOiAjMDAwMDAwMUY7XG59XG4uYm9yZGV7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDFGO1xuICBwYWRkaW5nOiA1cHg7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuLmxhYmVsLXRkYXtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6LTEwcHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICBwYWRkaW5nLWxlZnQ6IDJweDtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cbi5wdC0zMntcbiAgcGFkZGluZy10b3A6IDMycHg7XG59XG4udGl0dWxvLWl0ZW0tMntcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogIzAwMDAwMERFO1xufVxuLypjZW50cmFkbyBkaXNwb25pYmlsaWRhZCovXG4uY2VudHJhZG9EaXNwe1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlOyAgICAgICBcbiAgaGVpZ2h0OiAxMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOjM1JTsgIFxuICBwYWRkaW5nLWxlZnQ6IDYwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDYwcHg7ICAgICAgICAgXG59XG4uYmllbnZlbmlkb3tcbiAgcGFkZGluZy10b3A6IDgwcHg7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbiAgcGFkZGluZy1yaWdodDogMjBweDtcbn1cbi5ib3RvbmVze1xuICBwYWRkaW5nLXRvcDogMjRweDtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xufVxuIl19 */");

/***/ }),

/***/ 9764:
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\" class=\"back-app\">\n\n  <div *ngIf=\"mostrarProgress == false\">\n    <ion-row class=\"bienvenido\">\n      <h1>¡Bienvenido!</h1>\n      <p class=\"pt-32\">Para continuar selecciona la bodega en la cual realizarás el inventario.</p>\n    </ion-row>\n  \n    <ion-row class=\"ion-no-margin ion-no-padding\">\n      <mat-form-field appearance=\"outline\" class=\"field-tipo-atencion\">\n        <mat-label>Selecciona bodega</mat-label>\n        <mat-select [disabled]=\"disabledCombo\" [(ngModel)]=\"comboSeleccionado\" (selectionChange)=\"buscarBodegas($event)\">\n          <mat-option *ngFor=\"let bode of bodegas\" [value]=\"bode.Id\">{{bode.Nombre}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </ion-row>\n  \n    <ion-row class=\"botones\">\n      <ion-col>\n        <ion-button expand=\"full\" fill=\"clear\" color=\"medium\" (click)=\"cerrarSesion()\">Cerrar sesión</ion-button>\n      </ion-col>\n      <ion-col>\n        <ion-button expand=\"full\" fill=\"clear\" (click)=\"siguiente()\">Continuar</ion-button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n\n  <app-progressbar [mostrar]=\"mostrarProgress\" titulo=\"Buscando Bodegas\"></app-progressbar>\n\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_home_home_module_ts.js.map