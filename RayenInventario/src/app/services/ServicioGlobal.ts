import { Injectable } from '@angular/core';
import { Platform, ToastController, NavController } from '@ionic/angular';
//import { Http, Headers } from '@angular/';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ServicioGlobal{
    constructor(
        private http: HTTP,
        private httpClient: HttpClient,
        public platform : Platform,
        public toast: ToastController,
        private navCtrl: NavController,
      ){ }

    //toast
    async presentToast(mensaje, posicion, duracion) {
        const toas = await this.toast.create(
            {
                message: mensaje,
                position: posicion,
                duration: duracion
            }
        );
        toas.present();
    }

    getArticulos(nodId, lineId) {
        
        //https://mantenedorback.rayensalud.cl/BACKEND/api/mantenedores/MNT0003/2411/2/0/100000/1/ID/asc
        let url = environment.API_ENDPOINT_GET_ARTICULOS + nodId + '/' + lineId + '/0/100000/1/ID/asc';

        let data = this.httpClient.get(url, {});
        return data;
    }

    getArticulosNative(nodId, lineId) {
        //realizar la llamada post nativa
        let url = environment.API_ENDPOINT_GET_ARTICULOS + nodId + '/' + lineId + '/0/100000/1/ID/asc';
        return this.http.get(url, {}, {});
    }
    postLogin(ubicacion, usuario, password){
        let user = usuario + '@' + ubicacion;
        const body = "username=" + user.toLowerCase() + "&password=" + password + "&grant_type=password";

        let url = environment.API_ENDPOINT + 'token';
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
        });
        httpHeaders.set('Access-Control-Allow-Origin', '*');
        httpHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        httpHeaders.set("Access-Control-Allow-Headers", "*");

        let options = { headers: httpHeaders };

        let data = this.httpClient.post(url, body, options);
        return data;
    }

    postLoginNative(ubicacion, usuario, password){
        let user = usuario + '@' + ubicacion;
        //const body = "username=" + user.toLowerCase() + "&password=" + password + "&grant_type=password";
        const body = { username: user.toLowerCase(), password: password, grant_type: "password" };

        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded"
            })
        };
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };

        let url = environment.API_ENDPOINT + 'token';
        //this.http.setDataSerializer('json');

        let data = this.http.post(url, body, headers);
        return data;
    }

    postMovimiento(token, objArticulo){
        let body = JSON.stringify(objArticulo);
        let url = environment.API_ENDPOINT + 'api/rayen/Abastecimiento/ComprobanteMovimiento';
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + token
        });
        httpHeaders.set('Access-Control-Allow-Origin', '*');
        httpHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        httpHeaders.set("Access-Control-Allow-Headers", "*");

        let options = { headers: httpHeaders };

        let data = this.httpClient.post(url, body, options);
        return data;

    }
    postMovimientoNative(token, objArticulo){
        let body = objArticulo;
        let url = environment.API_ENDPOINT + 'api/rayen/Abastecimiento/ComprobanteMovimiento';
        const headers = {
            'Authorization': 'Bearer ' + token
        };

        this.http.setDataSerializer('json');
        let data = this.http.post(url, body, headers);
        return data;

    }
    obtenerBodegas(token, nodId){
        let url = environment.API_ENDPOINT + 'api/rayen/Abastecimiento/Bodega/IdNodo=' + nodId;

        let httpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        var options = {
            headers: httpHeaders
        };

        let data = this.httpClient.get(url, options);
        return data;
    }
    obtenerBodegasNative(token, nodId){
        let url = environment.API_ENDPOINT + 'api/rayen/Abastecimiento/Bodega/IdNodo=' + nodId;
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        //this.http.setDataSerializer('json');
        let data = this.http.get(url, {}, headers);
        return data;
    }

    cerrarSesion(){
        localStorage.removeItem('FUNCIONARIO_PRESTADOR');
        sessionStorage.clear();
        this.navCtrl.navigateRoot('login');
    }
    entregaFechaStr(){
        var date = new Date();
        var strDate = '';
        var strDia = '';
        var strMes = '';
        var strAnio = '';

        strDia = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
        strMes = date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString();
        strAnio = date.getFullYear().toString();

        strDate = strAnio + strMes + strDia + ' 000000';

        return strDate;
    }

}