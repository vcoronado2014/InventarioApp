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

  articulos = [];
  articulosFiltrados = [];

  textoBuscar = '';

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
    this.textoBuscar = '';
    if (sessionStorage.getItem('ARTICULOS_FILTRADOS')) {
      this.articulos = JSON.parse(sessionStorage.getItem('ARTICULOS_FILTRADOS'));
      this.articulosFiltrados = JSON.parse(sessionStorage.getItem('ARTICULOS_FILTRADOS'));
      console.log(this.articulos);
      console.log(this.articulosFiltrados);
    }
  }
  ngOnInit() {
    this.loadData();
  }
  guardarTodo(){
    console.log(this.articulos);
  }
  onChangeEvent(arti){
    console.log(arti);
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
      console.log(this.articulos);
      console.log(this.articulosFiltrados);
      //estoy probando
      sessionStorage.setItem('ARTICULOS_FILTRADOS', JSON.stringify(this.articulos));
    }
  }
  buscarTexto(){
    this.articulosFiltrados = [];
    if (this.textoBuscar == ''){
      this.loadData();
    }
    if(this.textoBuscar.length >= 3){
      if (this.articulos && this.articulos.length > 0){
        this.articulos.forEach((arti: any) => {
          if (arti.NOMBRE_GENERICO.toUpperCase().includes(this.textoBuscar.toUpperCase())) {
            this.articulosFiltrados.push(arti);
          }
        })
      }
    }

  }

}
