import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//servicios
import { ServicioGlobal } from '../../app/services/ServicioGlobal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  funcionarioPrestador;
  mostrarProgress = false;
  articulos = [];
  bodegas = [];
  articulosFiltrados = [];

  comboSeleccionado = 'Selecciona...';
  idComboSeleccionado = 0;
  disabledCombo = false;

  constructor(
    private navCtrl: NavController,
    public loading: LoadingController,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public platform: Platform,
    public global: ServicioGlobal

  ) {}

  ngOnInit() {
    //obtención del funcionario prestador
    if (localStorage.getItem('FUNCIONARIO_PRESTADOR')){
      this.funcionarioPrestador = JSON.parse(localStorage.getItem('FUNCIONARIO_PRESTADOR'));
    }
    var nodId = this.funcionarioPrestador.configuracionNodo != null ? this.funcionarioPrestador.configuracionNodo.IdNodo : 0;
    this.obtenerArticulos(nodId);

  }
  obtenerArticulos(nodId){
    this.mostrarProgress = true;
    if (this.isAppOnDevice()){
      //nativa
      this.global.getArticulosNative(nodId, 2).then((data:any)=>{
        this.articulos = JSON.parse(data.data);

        this.global.getArticulos(nodId, 3).subscribe((dataDos: any)=>{
          var insumos = dataDos;
          this.articulos = this.articulos.concat(insumos);
          //console.log(this.articulos);
          this.procesarBodegas();
          this.mostrarProgress = false;
        }, (error)=>{
          this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
          this.mostrarProgress = false;
        })
      }, (error)=>{
        this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
        this.mostrarProgress = false;
      })
    }
    else{
      //web
      this.global.getArticulos(nodId, 2).subscribe((data:any)=>{
        this.articulos = data;

        this.global.getArticulos(nodId, 3).subscribe((dataDos: any)=>{
          var insumos = dataDos;
          this.articulos = this.articulos.concat(insumos);
          //console.log(this.articulos);
          this.procesarBodegas();
          this.mostrarProgress = false;
        }, error=>{
          this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
          this.mostrarProgress = false;
        })
      }, error=>{
        this.global.presentToast('Se ha producido un error al obtener los artículos', 'bottom', 4000);
        this.mostrarProgress = false;
      })
    }
  }


  isAppOnDevice(): boolean {
    if (window.location.port === '8100') {
      return false;
    } else {
      return true;
    }
  }
  irAHome() {
    this.navCtrl.navigateRoot('home');
  }
  cerrarSesion(){
    this.global.cerrarSesion();
  }
  procesarBodegas(){
    this.bodegas = [];
    this.disabledCombo = true;
    if (this.articulos){
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

        var buscar = this.bodegas.filter(e=>e.Id == articulo.BODE_ID);
        if (buscar.length == 0){
          //agregamos la bodega
          var entidadBodega = {
            Id: articulo.BODE_ID,
            Nombre: articulo.BODE_NOMBRE
          }
          this.bodegas.push(entidadBodega);
        }
      });
    }
    //console.log(this.bodegas);
    this.disabledCombo = false;
  }
  buscarBodegas(event){
    if (event.value){
      this.mostrarProgress = true;
      this.idComboSeleccionado = event.value;
      //console.log(event.value);
      this.articulosFiltrados = this.articulos.filter(a=>a.BODE_ID == event.value);
      //console.log(this.articulosFiltrados);
      this.mostrarProgress = false;
    }
  }
  siguiente(){
    if (this.idComboSeleccionado == 0){
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

}
