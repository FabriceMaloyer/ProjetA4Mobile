import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  
})
export class DevicesPage implements OnInit {
  rc : any;
  item:any;
  devices:any;
  constructor(public navCtrl: NavController, public httpClient: HttpClient,private route: ActivatedRoute) {
    
   }

  ngOnInit() {


  }
  ionViewDidEnter(){
    this.route.queryParams.subscribe(params => {
     // this.refresh = params["refresh"];
      this.rc = JSON.parse(params["currency"]);
  });
    console.log(this.rc);
      this.httpClient.get("http://192.168.43.154:8080/atlantisProject/webresources/device/"+this.rc+"/").subscribe((response) => {
      
      this.item = response;
      console.log(this.item);
  });
  }


  goToMetrics(item2){
    this.devices = item2.id;
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          currency: JSON.stringify(this.devices),
          
      }     
  };
  this.navCtrl.navigateForward(['metrics'], navigationExtras); 
  }
}
