import { Component } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal/ngx';
import { NgForm } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpRequest, } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import { headersToString } from 'selenium-webdriver/http';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage     {

  constructor(private msAdal: MSAdal,  private modalController: ModalController,private navCtrl: NavController, private router : Router, private http : HttpClient) { //,private oauthService: OAuthService

    
  }

  
 /* ngOnInit() {
  }*/

login(){

const tokenEndPoint = 'https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_signuporsignin'; 

  const authUrl =
  'https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signuporsignin' +

  `&client_id=${encodeURIComponent('27fb84fe-4baf-4b6b-bfe7-f2d0638f2790')}` +

  `&scope=${encodeURIComponent('openid')}` +

  `&redirect_uri=${encodeURIComponent('http://localhost:8090/login')}` +
  
  `&response_type=${encodeURIComponent('code')}`;

  
  
  window.open(authUrl,'_self');
  
  // let response = this.http.get(tokenEndPoint);
   
  //this.navCtrl.navigateRoot('dashboard');
}

  // testmetrics(){
  //   this.navCtrl.navigateRoot('metrics');
  // }



}


