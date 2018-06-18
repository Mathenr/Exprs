import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { decode } from 'jsonwebtoken';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  username;
  text;
  title;
  postList = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }


  getPosts() {
    this.postList = [];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://localhost:3000/api/posts/', { headers: headers })
      .subscribe(res => {
        for (let i of res.json()) {
          this.postList.push(i);
        }
      });
  }

  ionViewDidLoad() {

    /* Verifica se está logado */

    if (!localStorage.getItem("Login")) {
      this.navCtrl.setRoot(LoginPage);
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let id: any = decode(localStorage.getItem("Login"));

    this.http.get('http://localhost:3000/api/users/' + id.id, { headers: headers })
      .subscribe(res => {
        this.username = res.json().name;
      });

    /* Pegar posts */

    this.getPosts();
  }

  postIt() {
    let post = {
      "title": this.title,
      "text": this.text
    };

    console.log(post);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/api/posts', JSON.stringify(post), {headers: headers})
      .subscribe(res => {
        this.getPosts();
      });  
  }

  logout() {
    localStorage.removeItem("Login");
    this.navCtrl.setRoot(HomePage);
  }
}
