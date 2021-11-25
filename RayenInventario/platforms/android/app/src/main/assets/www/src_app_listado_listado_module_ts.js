(self["webpackChunkRayenInventario"] = self["webpackChunkRayenInventario"] || []).push([["src_app_listado_listado_module_ts"],{

/***/ 7022:
/*!*******************************************!*\
  !*** ./src/app/listado/listado.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListadoPageModule": () => (/* binding */ ListadoPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 3166);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/components.module */ 5642);
/* harmony import */ var _listado_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listado.page */ 1648);












let ListadoPageModule = class ListadoPageModule {
};
ListadoPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIconModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelectModule,
            _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild([
                {
                    path: '',
                    component: _listado_page__WEBPACK_IMPORTED_MODULE_1__.ListadoPage
                }
            ])
        ],
        declarations: [_listado_page__WEBPACK_IMPORTED_MODULE_1__.ListadoPage]
    })
], ListadoPageModule);



/***/ }),

/***/ 1648:
/*!*****************************************!*\
  !*** ./src/app/listado/listado.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListadoPage": () => (/* binding */ ListadoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_listado_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./listado.page.html */ 7255);
/* harmony import */ var _listado_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listado.page.scss */ 4871);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _app_services_ServicioGlobal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/services/ServicioGlobal */ 2106);







//servicios

let ListadoPage = class ListadoPage {
    constructor(navCtrl, loading, formBuilder, activatedRoute, router, platform, global) {
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.platform = platform;
        this.global = global;
        this.articulos = [];
        this.articulosFiltrados = [];
        this.nombreBodega = '';
        this.bodegas = [];
        this.bodegaTipoUno = null;
        this.textoBuscar = '';
        this.mostrarProgress = false;
        this.mensaje = '';
        this.totalArticulosEditando = 0;
    }
    loadBodegas() {
        if (sessionStorage.getItem('BODEGA_TIPO_1')) {
            this.bodegaTipoUno = JSON.parse(sessionStorage.getItem('BODEGA_TIPO_1'));
        }
        else {
            var nodId = this.funcionario.configuracionNodo != null ? this.funcionario.configuracionNodo.IdNodo : 0;
            this.mostrarProgress = true;
            this.mensaje = 'Obteniendo datos...';
            if (this.isAppOnDevice()) {
                this.global.obtenerBodegasNative(this.funcionario.access_token, nodId).then((bode) => {
                    //console.log(bode);
                    this.bodegas = JSON.parse(bode.data);
                    this.bodegaTipoUno = this.bodegas.length > 0 ? this.bodegas.filter(p => p.TipoBodega == 1)[0] : null;
                    //guardamos la bodega en la variable de sesion
                    sessionStorage.setItem('BODEGA_TIPO_1', JSON.stringify(this.bodegaTipoUno));
                    this.mostrarProgress = false;
                    this.mensaje = '';
                }, (error) => {
                    console.log(error);
                    this.global.presentToast('Ocurrió un error al cargar las bodegas tipo 1', 'bottom', 4000);
                    this.mostrarProgress = false;
                    this.mensaje = '';
                });
            }
            else {
                this.global.obtenerBodegas(this.funcionario.access_token, nodId).subscribe((bode) => {
                    console.log(bode);
                    this.bodegas = bode;
                    this.bodegaTipoUno = bode.length > 0 ? bode.filter(p => p.TipoBodega == 1)[0] : null;
                    //guardamos la bodega en la variable de sesion
                    sessionStorage.setItem('BODEGA_TIPO_1', JSON.stringify(this.bodegaTipoUno));
                    this.mostrarProgress = false;
                    this.mensaje = '';
                }, error => {
                    console.log(error);
                    this.global.presentToast('Ocurrió un error al cargar las bodegas tipo 1', 'bottom', 4000);
                    this.mostrarProgress = false;
                    this.mensaje = '';
                });
            }
        }
    }
    loadData() {
        this.mostrarProgress = true;
        this.textoBuscar = '';
        this.mensaje = 'Obteniendo datos...';
        setTimeout(() => {
            if (sessionStorage.getItem('ARTICULOS_FILTRADOS')) {
                this.articulos = JSON.parse(sessionStorage.getItem('ARTICULOS_FILTRADOS'));
                this.articulosFiltrados = JSON.parse(sessionStorage.getItem('ARTICULOS_FILTRADOS'));
                this.nombreBodega = this.articulos[0].BODE_NOMBRE;
                //console.log(this.articulos);
                //console.log(this.articulosFiltrados);
            }
            this.mostrarProgress = false;
            this.mensaje = '';
        }, 3000);
    }
    ngOnInit() {
        if (localStorage.getItem('FUNCIONARIO_PRESTADOR')) {
            this.funcionario = JSON.parse(localStorage.getItem('FUNCIONARIO_PRESTADOR'));
        }
        this.loadData();
        this.loadBodegas();
    }
    guardarTodo() {
        //console.log(this.articulos);
        //debemos sacar los articulos a guardar en este caso quitar y agregar
        //el formato es el siguiente
        //primero todos los que se esttán editando
        var articulosEditando = this.articulos.filter(a => a.Editando == true);
        if (articulosEditando.length > 0) {
            //los agregando
            var articulosAgregando = articulosEditando.filter(a => a.Agrega == true);
            var articulosQuitando = articulosEditando.filter(a => a.Quita == true);
            if (articulosAgregando.length > 0) {
                //console.log('Hay que agregar ' + articulosAgregando.length);
                //obtenemos el objetto final
                var objetoAgregar = this.agregarArticulos(articulosAgregando);
                //este objeto hay que enviarlo a guardar
                //console.log(objetoAgregar);
                //prueba
                this.mostrarProgress = true;
                this.mensaje = 'Guardando datos...';
                //llamada a guardar
                if (this.isAppOnDevice()) {
                    //nativa
                    this.global.postMovimientoNative(this.funcionario.access_token, objetoAgregar).then((data) => {
                        //console.log(data);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Inventario actualizado con éxito!!', 'bottom', 3500);
                        this.irAHome();
                    }, (error) => {
                        console.log(error);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
                    });
                }
                else {
                    //web
                    this.global.postMovimiento(this.funcionario.access_token, objetoAgregar).subscribe((data) => {
                        //console.log(data);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Inventario actualizado con éxito!!', 'bottom', 3500);
                        this.irAHome();
                    }, error => {
                        console.log(error);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
                    });
                }
            }
            if (articulosQuitando.length > 0) {
                console.log('Hay que quitar ' + articulosQuitando.length);
                //obtenemos el objeto final
                var objetoQuitar = this.quitarArticulos(articulosQuitando);
                //este objeto hay que enviarlo a guardar
                console.log(objetoQuitar);
                //prueba
                this.mostrarProgress = true;
                this.mensaje = 'Guardando datos...';
                if (this.isAppOnDevice()) {
                    //nativa
                    this.global.postMovimientoNative(this.funcionario.access_token, objetoQuitar).then((data) => {
                        //console.log(data);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Inventario actualizado con éxito!!', 'bottom', 3500);
                        this.irAHome();
                    }, (error) => {
                        //console.log(error);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
                    });
                }
                else {
                    //web
                    this.global.postMovimiento(this.funcionario.access_token, objetoQuitar).subscribe((data) => {
                        //console.log(data);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Inventario actualizado con éxito!!', 'bottom', 3500);
                        this.irAHome();
                    }, error => {
                        console.log(error);
                        this.mostrarProgress = false;
                        this.mensaje = '';
                        this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
                    });
                }
            }
        }
        else {
            this.global.presentToast('No hay artículos que guardar', 'bottom', 4000);
        }
    }
    quitarArticulos(articulosQuitando) {
        //debemos construir el request
        var tipo = '4';
        var tipoOrigen = '1';
        var nodId = this.funcionario.configuracionNodo != null ? this.funcionario.configuracionNodo.IdNodo : 0;
        var idMotivo = '16';
        var idFuncionarioOrigen = 0;
        var idFuncionarioDestino = this.funcionario.funcionarioPrestador != null ? this.funcionario.funcionarioPrestador.id : 0;
        var idBodegaOrigen = articulosQuitando.length > 0 ? articulosQuitando[0].BODE_ID : 0;
        var idBodegaDestino = this.bodegaTipoUno != null ? this.bodegaTipoUno.Id : 0;
        var numeroDocumentoExterno = 0;
        var tipoDocumentoExterno = '5';
        var correlativo = 0;
        var destinoNotificacion = 0;
        var idSolicitudPedido = 0;
        var esNuevo = true;
        var esModificado = true;
        var esBorrado = false;
        var fechaGeneracion = this.global.entregaFechaStr();
        var articuloMover = [];
        articulosQuitando.forEach(arti => {
            //la cantidad de articulos aa mover en este caso es la diferencia entre Stcok actual - stock
            var diferencia = arti.STOCK - arti.StockActual;
            var nuevaEntidad = {
                Id: 0,
                EsNuevo: true,
                EsModificado: true,
                EsBorrado: false,
                Cantidad: diferencia,
                FechaVencimiento: "20221230 160517",
                IdComprobanteMovimiento: 0,
                Lote: null,
                Precio: 1,
                IdNodoActual: nodId,
                IdCenabast: 0,
                TipoMovimiento: 0,
                XCantidad: 0,
                LotesBodegas: [
                    {
                        Id: 2,
                        IdArticulo: arti.ID,
                        IdNodo: nodId,
                        Lote: "Lote Genérico",
                        FechaVencimiento: "20221230 160517",
                        Cantidad: diferencia,
                        CantidadAnterior: 0,
                        Eliminado: false,
                        Activo: true,
                        EsBorrado: false,
                        EsModificado: true,
                        EsNuevo: true,
                        EsEliminado: false
                    }
                ],
                IVA: 0,
                IdArticulo: arti.ARTI_ID_PADRE,
                UbicacionesBodegas: [],
                UbicacionesBodegasOrigen: []
            };
            articuloMover.push(nuevaEntidad);
        });
        var entidadPrincipal = [{
                Id: 0,
                Tipo: tipo,
                TipoOrigen: tipoOrigen,
                IdOrigen: nodId,
                TipoDestino: 1,
                FuncionarioResponsableDestino: '',
                IdDestino: nodId,
                IdNodoRegistrador: nodId,
                Observacion: "",
                IdMotivo: idMotivo,
                IdFuncionarioOrigen: idFuncionarioDestino,
                IdFuncionarioDestino: idFuncionarioDestino,
                IdBodegaOrigen: idBodegaOrigen,
                IdBodegaDestino: idBodegaDestino,
                NumeroDocumentoExterno: numeroDocumentoExterno,
                TipoDocumentoExterno: tipoDocumentoExterno,
                Correlativo: correlativo,
                DestinoNotificacion: destinoNotificacion,
                IdSolicitudPedido: idSolicitudPedido,
                EsNuevo: esNuevo,
                EsModificado: esModificado,
                EsBorrado: esBorrado,
                FechaGeneracion: this.global.entregaFechaStr(),
                ArticuloAMover: articuloMover,
                IdFuncionarioRecepciona: idFuncionarioDestino.toString()
            }];
        //console.log(entidadPrincipal);
        return entidadPrincipal;
    }
    agregarArticulos(articulosAgregando) {
        //debemos construir el request
        var tipo = '1';
        var tipoOrigen = '1';
        var nodId = this.funcionario.configuracionNodo != null ? this.funcionario.configuracionNodo.IdNodo : 0;
        var idMotivo = '7';
        var idFuncionarioOrigen = 0;
        var idFuncionarioDestino = this.funcionario.funcionarioPrestador != null ? this.funcionario.funcionarioPrestador.id : 0;
        var idBodegaOrigen = 0;
        var idBodegaDestino = articulosAgregando.length > 0 ? articulosAgregando[0].BODE_ID : 0;
        var numeroDocumentoExterno = 0;
        var tipoDocumentoExterno = '5';
        var correlativo = 0;
        var destinoNotificacion = 0;
        var idSolicitudPedido = 0;
        var esNuevo = true;
        var esModificado = true;
        var esBorrado = false;
        var fechaGeneracion = this.global.entregaFechaStr();
        var articuloMover = [];
        articulosAgregando.forEach(arti => {
            //la cantidad de articulos aa mover en este caso es la diferencia entre Stcok actual - stock
            var diferencia = arti.StockActual - arti.STOCK;
            var nuevaEntidad = {
                EsNuevo: true,
                EsModificado: true,
                Cantidad: diferencia,
                FechaVencimiento: "20221230 160517",
                AplicaUrgencia: false,
                Lote: null,
                Precio: 1,
                IdNodoActual: nodId,
                IdCenabast: 0,
                LotesBodegas: [
                    {
                        Id: 0,
                        IdArticulo: arti.ID,
                        IdBodeArti: 0,
                        IdNodo: nodId,
                        Lote: "Inventario",
                        FechaVencimiento: "20221230 160517",
                        Cantidad: diferencia,
                        CantidadAnterior: 0,
                        Eliminado: false,
                        Activo: true,
                        EsBorrado: false,
                        EsModificado: false,
                        EsNuevo: true,
                        TimeStamp: null
                    }
                ],
                IVA: 2,
                IdArticulo: arti.ARTI_ID_PADRE
            };
            articuloMover.push(nuevaEntidad);
        });
        var entidadPrincipal = [{
                Tipo: tipo,
                TipoOrigen: tipoOrigen,
                IdOrigen: nodId,
                TipoDestino: 1,
                IdDestino: nodId,
                IdNodoRegistrador: nodId,
                IdMotivo: idMotivo,
                IdFuncionarioOrigen: idFuncionarioOrigen,
                IdFuncionarioDestino: idFuncionarioDestino,
                IdBodegaOrigen: idBodegaOrigen,
                IdBodegaDestino: idBodegaDestino,
                NumeroDocumentoExterno: numeroDocumentoExterno,
                TipoDocumentoExterno: tipoDocumentoExterno,
                Correlativo: correlativo,
                DestinoNotificacion: destinoNotificacion,
                IdSolicitudPedido: idSolicitudPedido,
                EsNuevo: esNuevo,
                EsModificado: esModificado,
                EsBorrado: esBorrado,
                FechaGeneracion: this.global.entregaFechaStr(),
                ArticuloAMover: articuloMover
            }];
        //console.log(entidadPrincipal);
        return entidadPrincipal;
    }
    onChangeEvent(arti) {
        //console.log(arti);
        this.mostrarProgress = true;
        this.mensaje = 'Obteniendo datos...';
        //buscamos el articulo especifico
        if (arti != null) {
            if (this.articulos) {
                this.articulos.forEach(articulo => {
                    if (articulo.ID == arti.ID) {
                        var estaQuitando = arti.StockActual < articulo.STOCK ? true : false;
                        var estaAgregando = arti.StockActual > articulo.STOCK ? true : false;
                        articulo.Agrega = estaAgregando;
                        articulo.Quita = estaQuitando;
                        articulo.Editando = estaQuitando || estaAgregando ? true : false;
                        articulo.StockActual = arti.StockActual;
                    }
                });
            }
            //vamos a buscar los artticulos filtrados
            if (this.articulosFiltrados) {
                this.articulosFiltrados.forEach(artiF => {
                    if (artiF.ID == arti.ID) {
                        var estaQuitando = arti.StockActual < artiF.STOCK ? true : false;
                        var estaAgregando = arti.StockActual > artiF.STOCK ? true : false;
                        artiF.Agrega = estaAgregando;
                        artiF.Quita = estaQuitando;
                        artiF.Editando = estaQuitando || estaAgregando ? true : false;
                    }
                });
            }
            this.totalArticulosEditando = this.articulos.filter(a => a.Editando == true).length;
            // console.log(this.articulos);
            // console.log(this.articulosFiltrados);
            //estoy probando
            sessionStorage.setItem('ARTICULOS_FILTRADOS', JSON.stringify(this.articulos));
            this.mostrarProgress = false;
            this.mensaje = '';
        }
    }
    buscarTexto() {
        this.articulosFiltrados = [];
        if (this.textoBuscar == '') {
            this.loadData();
        }
        if (this.textoBuscar.length >= 3) {
            this.mostrarProgress = true;
            this.mensaje = 'Obteniendo datos...';
            if (this.articulos && this.articulos.length > 0) {
                this.articulos.forEach((arti) => {
                    if (arti.NOMBRE_GENERICO.toUpperCase().includes(this.textoBuscar.toUpperCase())) {
                        this.articulosFiltrados.push(arti);
                    }
                });
            }
            this.mostrarProgress = false;
            this.mensaje = '';
        }
    }
    irAHome() {
        this.navCtrl.navigateRoot('home');
    }
    volver() {
        sessionStorage.removeItem('ARTICULOS_FILTRADOS');
        this.navCtrl.navigateRoot('home');
    }
    isAppOnDevice() {
        if (window.location.port === '8100') {
            return false;
        }
        else {
            return true;
        }
    }
};
ListadoPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.LoadingController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.Platform },
    { type: _app_services_ServicioGlobal__WEBPACK_IMPORTED_MODULE_2__.ServicioGlobal }
];
ListadoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-listado',
        template: _raw_loader_listado_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_listado_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ListadoPage);



/***/ }),

/***/ 4871:
/*!*******************************************!*\
  !*** ./src/app/listado/listado.page.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".list-row-1 {\n  font-size: 10pt;\n  color: #00000099;\n  padding-top: 12px;\n}\n\n.list-row-2 {\n  font-size: 16pt;\n  color: #000000DE;\n  padding-top: 16px;\n}\n\n.list-row-3 {\n  font-size: 14pt;\n  color: #00000099;\n  padding-bottom: 16px;\n}\n\n.mat-form-field-appearance-outline .mat-form-field-outline {\n  display: flex;\n  position: absolute;\n  top: 0.25em;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  background: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3RhZG8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFDQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBRUo7O0FBQUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBQUdKOztBQURBO0VBQ0ksYUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QUFJSiIsImZpbGUiOiJsaXN0YWRvLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0LXJvdy0xe1xyXG4gICAgZm9udC1zaXplOiAxMHB0O1xyXG4gICAgY29sb3I6ICMwMDAwMDA5OTtcclxuICAgIHBhZGRpbmctdG9wOiAxMnB4O1xyXG59XHJcbi5saXN0LXJvdy0ye1xyXG4gICAgZm9udC1zaXplOiAxNnB0O1xyXG4gICAgY29sb3I6ICMwMDAwMDBERTtcclxuICAgIHBhZGRpbmctdG9wOiAxNnB4O1xyXG59XHJcbi5saXN0LXJvdy0ze1xyXG4gICAgZm9udC1zaXplOiAxNHB0O1xyXG4gICAgY29sb3I6ICMwMDAwMDA5OTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxNnB4O1xyXG59XHJcbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLW91dGxpbmUge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMC4yNWVtO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxufSJdfQ== */");

/***/ }),

/***/ 7255:
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/listado/listado.page.html ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\" mode=\"md\">\n    <ion-buttons slot=\"start\" (click)=\"volver()\">\n      <ion-icon style=\"padding-left: 8px;\" size=\"large\" name=\"arrow-back\"></ion-icon>\n    </ion-buttons>\n    <ion-title>{{nombreBodega}}</ion-title>\n    <ion-buttons slot=\"end\" style=\"padding-right: 20px;\" (click)=\"guardarTodo()\">\n      <ion-icon size=\"large\" name=\"save\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"back-app\">\n  <!-- busqueda -->\n  <div *ngIf=\"mostrarProgress == false\">\n    <ion-row class=\"ion-padding\" style=\"padding-bottom: 0;\">\n      <mat-form-field appearance=\"outline\" style=\"width: 100%;\">\n        <mat-label>Buscar</mat-label>\n        <input matInput type=\"text\" [(ngModel)]=\"textoBuscar\" placeholder=\"Buscar\" (keyup)=\"buscarTexto()\">\n        <button *ngIf=\"textoBuscar\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"loadData()\">\n          <mat-icon>close</mat-icon>\n        </button>\n      </mat-form-field>\n    </ion-row>\n    <ion-row>\n      <ion-item class=\"ion-no-padding\" style=\"width: 100%;\" *ngIf=\"totalArticulosEditando > 0\">\n        <ion-badge *ngIf=\"totalArticulosEditando == 1\" color=\"medium\" slot=\"end\">{{totalArticulosEditando}} artículo editado.</ion-badge>\n        <ion-badge *ngIf=\"totalArticulosEditando > 1\" color=\"medium\" slot=\"end\">{{totalArticulosEditando}} artículos editados.</ion-badge>\n      </ion-item>\n      \n      <ion-list style=\"width: 100%;\">\n        <ion-item *ngFor=\"let arti of articulosFiltrados\">\n          <!--\n            Agrega: false\n            BODE_ID: 5210\n            BODE_NOMBRE: \"Bodega Central\"\n            CANTIDAD_DE_RECETAS: 10\n            CODIGO_ESTANDAR: \"F-8024/01\"\n            Editando: false\n            ID: 25235\n            LINE_ID: 2\n            NOMBRE_GENERICO: \"Paracetamol 500 Mg Comprimidos \"\n            PSICOTROPICO: 0\n            Quita: false\n            STOCK: 18034\n            StockActual: 18034\n          -->\n          <ion-grid class=\"ion-no-padding\">\n            <ion-row>\n              <ion-col size=\"8\">\n                <ion-label class=\"list-row-1\">{{arti.CODIGO_ESTANDAR}}</ion-label>\n              </ion-col>\n              <ion-col size=\"4\">\n                <!-- <ion-label class=\"list-row-1\">CANTIDAD REAL</ion-label> -->\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col size=\"9\" class=\"ion-no-padding\">\n                <ion-row>\n                  <ion-col size=\"10\">\n                    <p class=\"list-row-2\">{{arti.NOMBRE_GENERICO}}</p>\n                    <div class=\"list-row-3\">Cantidad sistema: {{arti.STOCK}}</div>\n                  </ion-col>\n                  <ion-col size=\"2\" style=\"padding-top: 16px;\">\n                    <ion-icon *ngIf=\"arti.Quita\" name=\"arrow-down\" style=\"font-size: 16pt;\" color=\"danger\"></ion-icon>\n                    <ion-icon *ngIf=\"arti.Agrega\" name=\"arrow-up\" style=\"font-size: 16pt;\" color=\"success\"></ion-icon>\n                  </ion-col>\n                </ion-row>\n              </ion-col>\n              <ion-col size=\"3\">\n                <mat-form-field appearance=\"outline\" style=\"width: 100%;\">\n                  <mat-label>REAL</mat-label>\n                  <input matInput placeholder=\"0\" type=\"number\" name=\"stock\" [(ngModel)]=\"arti.StockActual\"\n                    (change)=\"onChangeEvent(arti)\">\n                </mat-form-field>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n  \n      </ion-list>\n    </ion-row>\n  </div>\n\n  <app-progressbar [mostrar]=\"mostrarProgress\" [titulo]=\"mensaje\"></app-progressbar>\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_listado_listado_module_ts.js.map