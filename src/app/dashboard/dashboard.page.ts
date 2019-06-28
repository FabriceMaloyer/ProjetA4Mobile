import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  item : any;
  public domain : any;
  constructor(public navCtrl: NavController, public httpClient: HttpClient,) { }
  
  ngOnInit() {

    let token = location.href.split('=')[1];
    console.log(token); // 'abcd'
    localStorage.setItem('token', token);
  }

  ionViewDidEnter(){
    this.httpClient.get("http://192.168.43.154:8080/atlantisProject/webresources/domain/").subscribe((response) => {
     
     this.item = response;
      
  });
  
  //   // this.httpClient.get("http://8.8.8.8:3000/devices").subscribe((response) => {
  //   //   console.log(response);
  //   //   this.item = response;

     
  // });
  }
  
  getdomain() {
    
    this.httpClient.get("http://192.168.43.154:8080/atlantisProject/webresources/domain/").subscribe((response) => {    
    this.item = response;
    }); 
  };
   
  goToDevices(item2){

    //console.log(item2.id);
    this.domain = item2.id;
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          currency: JSON.stringify(this.domain),
          
      }     
  };
  this.navCtrl.navigateForward(['devices'], navigationExtras); 
    
    return this.domain;
   
  }

}

