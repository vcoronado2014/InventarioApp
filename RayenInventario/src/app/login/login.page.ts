import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//servicios
import { ServicioGlobal } from '../../app/services/ServicioGlobal';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true;

  registro;
  forma: FormGroup;
  nombreMostrar = '';
  //para validar
  patternOnlyLetter = '[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$';
  expCelular = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/gm;
  expPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/gm;
  expEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/gm;
  isLogged: boolean;
  loggedIn: boolean;
  CodigoMensaje: any;
  Mensaje: string;
  estaCargando = false;
  articulos = [];
  recordarme = false;

  constructor(
    private navCtrl: NavController,
    public loading: LoadingController,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public platform: Platform,
    public global: ServicioGlobal
  ) { }

  ngOnInit() {
    this.cargarForma();
  }

  cargarForma() {
    this.forma = new FormGroup({
      'ubicacion': new FormControl('', [Validators.required]),
      'usuario': new FormControl('', [Validators.required]),
      'clave': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      'recordarmeForm': new FormControl(this.recordarme)
    });

    if (localStorage.getItem('RECUERDA_LOGUEADO')){
      this.recordarme = localStorage.getItem('RECUERDA_LOGUEADO') == 'true' ? true : false;
      if (this.recordarme){
        this.forma.setValue({
          ubicacion: localStorage.getItem('UBICACION_LOGUEADO'),
          usuario: localStorage.getItem('USUARIO_LOGUEADO'),
          clave: '',
          recordarmeForm: this.recordarme
        })
      }
    }
    if(localStorage.getItem('NOMBRE_LOGUEADO')){
      this.nombreMostrar = localStorage.getItem('NOMBRE_LOGUEADO');
    }
  }
  onChange(event){
    //console.log(event);
    if (this.forma.invalid){
      this.global.presentToast('Datos inválidos', 'bottom', 3000);
      return;
    }
    var ubicacion = this.forma.controls.ubicacion.value;
    var usuario = this.forma.controls.usuario.value;
    
    if (event.detail){
      this.recordarme = event.detail.checked;
      //console.log(this.recordarme);
      localStorage.setItem('RECUERDA_LOGUEADO', this.recordarme.toString().toLowerCase());
      if (this.recordarme){
        //guardar los valores en varibales locales
        localStorage.setItem('USUARIO_LOGUEADO', usuario);
        localStorage.setItem('UBICACION_LOGUEADO', ubicacion);
      }
      else{
        localStorage.removeItem('USUARIO_LOGUEADO');
        localStorage.removeItem('UBICACION_LOGUEADO');
      }
    }
  }
  setDatosUsuario(datos){
    if (datos){
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

  async onSubmit() {
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
      },
        error => {
          this.estaCargando = false;
          let err = error.error;
          let mensaje = err.error_description ? err.error_description : 'Error de comunicación';
          if (err.error == 'invalid_grant') {
            this.global.presentToast(mensaje, 'bottom', 4000);
          }
          else {
            this.global.presentToast(mensaje, 'bottom', 4000);
          }
        }

      );
    }
    else {
      //nativa
      this.global.postLoginNative(ubicacion, usuario, password).then((data: any) => {
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

  get f() { return this.forma.controls; }

}
