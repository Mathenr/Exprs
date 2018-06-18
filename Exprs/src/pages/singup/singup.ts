import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  name;
  email;
  password;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingupPage');
  }

  send() {
    let user = {
      "name": this.name,
      "email": this.email,
      "senha": this.password
    };

    console.log(user);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/api/users', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        const alert = this.alertCtrl.create({
          title: 'Novo usuário',
          subTitle: 'Usuário cadastrado com sucesso',
          buttons: ['Turubom']
        })
        alert.present()

        this.navCtrl.setRoot(LoginPage)

      }); 
  }

}
