import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
import { InvoiceSubType } from './class.invoicesubtype';
import { Region } from './class.region';
import { ClaimDate } from './class.claimdate';
import { PPSHeader } from './class.ppsheader';
//import "@types/node/index.d.ts"

/// <reference types="node" />

@Injectable()
export class DataService {



//private billingAPI_URL: string = 'http://billingtest.azurewebsites.net/billingdataapi/'; // In Azure
//Environment['billingdataapi_url'] || 
private billingAPI_URL: string = 'http://localhost:8080/billingdataapi/'; // Local
//private actionUrl: string;
private headers: Headers;

constructor(private http: Http) {

        //this.actionUrl = _configuration.ServerWithApiUrl + 'myItem/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

/*
  getInvoiceSubTypeList(): Promise<InvoiceSubType[]> {
    console.log('It will invoke BillingDataAPI');
    const endpoint = 'http://billingtest.azurewebsites.net/billingdataapi/invoicesubtype';
    return this.http.get(endpoint)
    .toPromise()
    .then(response=>response.jason().data as InvoiceSubType[])
    .map(res => <InvoiceSubType[]>res.json())
    //return this.http.get(endpoint).map(res => res.json().main)
  //      .subscribe(res => this.invoicesubtype = (InvoiceSubtype)res);
}
*/


  getInvoiceSubTypeList() 
  {
    const endpoint = this.billingAPI_URL + 'invoicesubtype/1'; //looks for PPS type only
    return this.http.get(endpoint).map(res => <InvoiceSubType[]>res.json())
  }

  getRegionList(invoiceSubtypeId) 
  {
    const endpoint = this.billingAPI_URL + 'region/' + invoiceSubtypeId;
    return this.http.get(endpoint).map(res => <Region[]>res.json())
  }  

 getClaimDateList(invoiceSubtypeId, regionId) 
  {
    const endpoint = this.billingAPI_URL + 'claimdate/' + invoiceSubtypeId + '/region/' + regionId;
    return this.http.get(endpoint).map(res => <ClaimDate[]>res.json())
  }    

 getPPSHeaderList(invoiceSubtypeId, claimDateId) 
  {
    const endpoint = this.billingAPI_URL + 'ppsheader/invoicesubtype/' + invoiceSubtypeId + '/claimdate/' + claimDateId;
    return this.http.get(endpoint).map(res => <PPSHeader[]>res.json())
  }      

  postPPSFile(invoicesubtypeId, regionId, claimStatusId, fileToUpload: any)
  {
    console.log('called postPPSFile from data service')
    const endpoint = this.billingAPI_URL + 'importppsfile';

    let form = new FormData();
    form.append("ppsfile", fileToUpload);
    form.append("invoiceSubTypeId", invoicesubtypeId);
    form.append("regionId", regionId);
    form.append("claimStatusId", claimStatusId);

    //console.log('endpoint:' + endpoint, this.headers);
    //return this.http.post(endpoint, form).map(res => res.json())
    return this.http.post(endpoint, form).map(res => res.json());
  }

  deletePPSFile(ppsHeaderId)
  {
    console.log('called deletePPSFile from data service')
    const endpoint = this.billingAPI_URL + 'deleteppsfile/'+ppsHeaderId;  
    return this.http.delete(endpoint).map(res => res.json());
  }  

/*
  getInvoiceSubType() {
    return [
     new InvoiceSubType(1, 'test1' ),
     new InvoiceSubType(2, 'test2' ),
    ];
  }
  
  getRegion() {
   return [
      new Region(1, 'test1' ),
      new Region(2, 'test2' ),
    ];
  }

  getClaimDate() {
   return [
      new ClaimDate(1, 'test1' ),
      new ClaimDate(2, 'test2' ),
    ];
  }  
  */
}
