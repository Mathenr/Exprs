import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  data: any;
  email;
  password;

  TIME_IN_MS = 1000;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    this.data = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }

  save() {
    let user = {
      email: this.email,
      senha: this.password
    };
    this.login(user);
  }

  login(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/login', JSON.stringify(user), { headers: headers })
      .subscribe(res => {
        console.log(res.json());

        if (res.json().token) {
          localStorage.setItem("Login", res.json().token);
        }
      });

    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 1000
    });

    loader.present();

    setTimeout(() => { this.toTimeline() }, this.TIME_IN_MS);
  }
}
