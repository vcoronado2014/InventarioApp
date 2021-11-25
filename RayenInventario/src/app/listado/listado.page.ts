import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//servicios
import { ServicioGlobal } from '../../app/services/ServicioGlobal';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  funcionario;
  articulos = [];
  articulosFiltrados = [];

  textoBuscar = '';
  mostrarProgress = false;

  constructor(
    private navCtrl: NavController,
    public loading: LoadingController,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public platform: Platform,
    public global: ServicioGlobal
  ) { }

  loadData() {
    this.mostrarProgress = true;
    this.textoBuscar = '';
    if (sessionStorage.getItem('ARTICULOS_FILTRADOS')) {
      this.articulos = JSON.parse(sessionStorage.getItem('ARTICULOS_FILTRADOS'));
      this.articulosFiltrados = JSON.parse(sessionStorage.getItem('ARTICULOS_FILTRADOS'));
      //console.log(this.articulos);
      //console.log(this.articulosFiltrados);
    }
    this.mostrarProgress = false;
  }
  ngOnInit() {
    if (localStorage.getItem('FUNCIONARIO_PRESTADOR')){
      this.funcionario = JSON.parse(localStorage.getItem('FUNCIONARIO_PRESTADOR'));
    }
    this.loadData();
  }
  guardarTodo(){
    //console.log(this.articulos);
    //debemos sacar los articulos a guardar en este caso quitar y agregar
    //el formato es el siguiente
    //primero todos los que se esttán editando
    var articulosEditando = this.articulos.filter(a=>a.Editando == true);
    if (articulosEditando.length > 0){
      //los agregando
      var articulosAgregando = articulosEditando.filter(a=>a.Agrega == true);
      var articulosQuitando = articulosEditando.filter(a=>a.Quita == true);

      if (articulosAgregando.length > 0){
        //console.log('Hay que agregar ' + articulosAgregando.length);
        //obtenemos el objetto final
        var objetoAgregar = this.agregarArticulos(articulosAgregando);
        //este objeto hay que enviarlo a guardar
        //console.log(objetoAgregar);

        //prueba
        this.mostrarProgress = true;
        //llamada a guardar
        if(this.isAppOnDevice()){
          //nativa
          this.global.postMovimientoNative(this.funcionario.access_token, objetoAgregar).then((data:any)=>{
            //console.log(data);
            this.mostrarProgress = false;
            this.global.presentToast('Datos guardados correctamente', 'bottom', 3500);
            this.irAHome();
          }, (error)=>{
            console.log(error);
            this.mostrarProgress = false;
            this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
          })
        }
        else{
          //web
          this.global.postMovimiento(this.funcionario.access_token, objetoAgregar).subscribe((data:any)=>{
            //console.log(data);
            this.mostrarProgress = false;
            this.global.presentToast('Datos guardados correctamente', 'bottom', 3500);
            this.irAHome();
          }, error=>{
            console.log(error);
            this.mostrarProgress = false;
            this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
          })
        }
      }
      if (articulosQuitando.length > 0){
        console.log('Hay que quitar ' + articulosQuitando.length);
        //obtenemos el objeto final
        var objetoQuitar = this.quitarArticulos(articulosQuitando);
        //este objeto hay que enviarlo a guardar
        console.log(objetoQuitar);
        //prueba
        this.mostrarProgress = true;
        if(this.isAppOnDevice()){
          //nativa
          this.global.postMovimientoNative(this.funcionario.access_token, objetoQuitar).then((data: any) => {
            //console.log(data);
            this.mostrarProgress = false;
            this.global.presentToast('Datos guardados correctamente', 'bottom', 3500);
            this.irAHome();
          }, (error) => {
            //console.log(error);
            this.mostrarProgress = false;
            this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
          })
        }
        else{
          //web
          this.global.postMovimiento(this.funcionario.access_token, objetoQuitar).subscribe((data: any) => {
            //console.log(data);
            this.mostrarProgress = false;
            this.global.presentToast('Datos guardados correctamente', 'bottom', 3500);
            this.irAHome();
          }, error => {
            console.log(error);
            this.mostrarProgress = false;
            this.global.presentToast('Ocurrió un error al guardar', 'bottom', 3500);
          })
        }
      }

    }
    else{
      this.global.presentToast('No hay artículos que guardar', 'bottom', 4000);
    }
  }

  quitarArticulos(articulosQuitando){
    //debemos construir el request
    var tipo = '4';
    var tipoOrigen = '1';
    var nodId = this.funcionario.configuracionNodo != null ? this.funcionario.configuracionNodo.IdNodo : 0;
    var idMotivo = '16';
    var idFuncionarioOrigen = 0;
    var idFuncionarioDestino = this.funcionario.funcionarioPrestador != null ? this.funcionario.funcionarioPrestador.id : 0;
    var idBodegaOrigen = articulosQuitando.length > 0 ? articulosQuitando[0].BODE_ID : 0;
    var idBodegaDestino = articulosQuitando.length > 0 ? articulosQuitando[0].BODE_ID : 0;
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
        Id:0,
        EsNuevo: true,
        EsModificado: true,
        EsBorrado: false,
        Cantidad: diferencia,
        FechaVencimiento: "20221230 160517",
        IdComprobanteMovimiento:0,
        Lote: null,
        Precio: 1,
        IdNodoActual: nodId,
        IdCenabast: 0,
        TipoMovimiento:0,
        XCantidad:0,
        LotesBodegas:
          [
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
        UbicacionesBodegas:[],
        UbicacionesBodegasOrigen:[]
      }
      articuloMover.push(nuevaEntidad);
    });

    var entidadPrincipal = [{
      Id:0,
      Tipo: tipo,
      TipoOrigen: tipoOrigen,
      IdOrigen:nodId,
      TipoDestino: 1,
      FuncionarioResponsableDestino: '',
      IdDestino:nodId,
      IdNodoRegistrador:nodId,
      Observacion:"",
      IdMotivo:idMotivo,
      IdFuncionarioOrigen: idFuncionarioDestino,
      IdFuncionarioDestino:idFuncionarioDestino,
      IdBodegaOrigen: idBodegaOrigen,
      IdBodegaDestino:idBodegaDestino,
      NumeroDocumentoExterno: numeroDocumentoExterno,
      TipoDocumentoExterno: tipoDocumentoExterno,
      Correlativo: correlativo,
      DestinoNotificacion: destinoNotificacion,
      IdSolicitudPedido: idSolicitudPedido,
      EsNuevo:esNuevo,
      EsModificado:esModificado,
      EsBorrado:esBorrado,
      FechaGeneracion: this.global.entregaFechaStr(),
      ArticuloAMover: articuloMover,
      IdFuncionarioRecepciona:idFuncionarioDestino.toString()
    }];

    //console.log(entidadPrincipal);
    return entidadPrincipal;
  }

  agregarArticulos(articulosAgregando){
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
        LotesBodegas:
          [
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
      }
      articuloMover.push(nuevaEntidad);
    });

    var entidadPrincipal = [{
      Tipo: tipo,
      TipoOrigen: tipoOrigen,
      IdOrigen:nodId,
      TipoDestino: 1,
      IdDestino:nodId,
      IdNodoRegistrador:nodId,
      IdMotivo:idMotivo,
      IdFuncionarioOrigen: idFuncionarioOrigen,
      IdFuncionarioDestino:idFuncionarioDestino,
      IdBodegaOrigen: idBodegaOrigen,
      IdBodegaDestino:idBodegaDestino,
      NumeroDocumentoExterno: numeroDocumentoExterno,
      TipoDocumentoExterno: tipoDocumentoExterno,
      Correlativo: correlativo,
      DestinoNotificacion: destinoNotificacion,
      IdSolicitudPedido: idSolicitudPedido,
      EsNuevo:esNuevo,
      EsModificado:esModificado,
      EsBorrado:esBorrado,
      FechaGeneracion: this.global.entregaFechaStr(),
      ArticuloAMover: articuloMover
    }];

    //console.log(entidadPrincipal);
    return entidadPrincipal;
  }
  onChangeEvent(arti){
    //console.log(arti);
    this.mostrarProgress = true;
    //buscamos el articulo especifico
    if (arti != null){
      if (this.articulos){
        this.articulos.forEach(articulo => {
          if (articulo.ID == arti.ID){
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
      if (this.articulosFiltrados){
        this.articulosFiltrados.forEach(artiF => {
          if (artiF.ID == arti.ID){
            var estaQuitando = arti.StockActual < artiF.STOCK ? true : false;
            var estaAgregando = arti.StockActual > artiF.STOCK ? true : false;
            artiF.Agrega = estaAgregando;
            artiF.Quita = estaQuitando;
            artiF.Editando = estaQuitando || estaAgregando ? true : false;
          }
        })
      }
     // console.log(this.articulos);
     // console.log(this.articulosFiltrados);
      //estoy probando
      sessionStorage.setItem('ARTICULOS_FILTRADOS', JSON.stringify(this.articulos));
      this.mostrarProgress = false;
    }
  }
  buscarTexto(){
    this.articulosFiltrados = [];
    if (this.textoBuscar == ''){
      this.loadData();
    }
    if(this.textoBuscar.length >= 3){
      this.mostrarProgress = true;
      if (this.articulos && this.articulos.length > 0){
        this.articulos.forEach((arti: any) => {
          if (arti.NOMBRE_GENERICO.toUpperCase().includes(this.textoBuscar.toUpperCase())) {
            this.articulosFiltrados.push(arti);
          }
        })
      }
      this.mostrarProgress = false;
    }

  }
  irAHome() {
    this.navCtrl.navigateRoot('home');
  }

  isAppOnDevice(): boolean {
    if (window.location.port === '8100') {
      return false;
    } else {
      return true;
    }
  }

}
