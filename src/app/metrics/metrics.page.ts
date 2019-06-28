import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ModalController, NavController, NavParams ,} from '@ionic/angular';

import { Chart } from 'chart.js';
import { EChartOption } from 'echarts';

import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {
  id:any;
  item:any;
  Ndays: any;
  options: any;
  show: any;
  header:any;
  v1:any;
  v2: any;

  constructor(  private modalController: ModalController,private navCtrl: NavController,  private http : HttpClient,private route: ActivatedRoute) { //,private oauthService: OAuthService
    
    this.route.queryParams.subscribe(params => {
      // this.refresh = params["refresh"];
       this.id = JSON.parse(params["currency"]);
   });
  }

   tablestyle = 'bootstrap';

   @ViewChild('lineChart') lineChart;

  onViewdidEnter

   ngOnInit() {
   }
   ionViewDidEnter(){ 
     let days = 2;
    this.http.get("http://192.168.43.154:8080/atlantisProject/webresources/metric/"+this.id + "/"+days+"/").subscribe((response) => {
    
    this.Ndays = days;
    this.header = response;
    
    this.v1 = this.header[0]
    this.v2 = this.header[0]
    this.v1 = this.v1["value"];
    this.v2 = this.v2["createdAt"]
     return this.header, this.v1

    //  return v1;
    });
  }

   test(days){
    this.http.get("http://192.168.43.154:8080/atlantisProject/webresources/metric/"+this.id + "/"+days+"/").subscribe((response) => {
    
    this.Ndays = days;
    this.header = response;
    let lg = Object.keys(this.header).length
    
    return this.header
    });
  }
     

  sendPostRequestBeep() {
  
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   
    let postData = {
            "method": "beep"           
    }

    this.http.post("http://192.168.43.154:8080/customers", postData)  //adresse machine
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }
 
  sendPostRequestLED() {
  
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   
    let postData = {
            "method": "led"
   }

    this.http.post("http://192.168.43.154:8080/customers", postData)   //adresse machine
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
    });}

    ShowChart() {
      
      console.log(this.Ndays)
      let x = this.Ndays 
      let lg = Object.keys(this.header).length
      let h = this.header
      this.show = true;
            
      this.options = {
    color: ['#3398DB'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: (function() {
          var data = [];
          for (let i = 0; i< x; i += 1) {
            data[i]=i+1
          }
          return data;
        }())
        
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Test',
        type: 'bar',
        barWidth: '30%',
        data: (function() {
          var data = [];
          for (let i = 0; i< x; i ++) {
            
            const element = h[i];
             console.log(element["value"])
            
            data[i]=element["value"]
          }
          return data;
        }())
      }
    ]
  };
    }
    }