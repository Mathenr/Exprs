import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SingupPage } from '../singup/singup';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { decode } from 'jsonwebtoken';
import { TimelinePage } from '../timeline/timeline';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username;

  constructor(public navCtrl: NavController, public http: Http) {
  }

  ionViewDidLoad() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let id: any = decode(localStorage.getItem("Login"));
    if (id) {
      this.navCtrl.setRoot(TimelinePage);
    }
  }

  toLogin() {
    this.navCtrl.push(LoginPage);
  }

  toSingUp() {
    this.navCtrl.push(SingupPage);
  }

}
