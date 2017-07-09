import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceSubType } from './class.invoicesubtype';
import { Region } from './class.region';
import { ClaimDate } from './class.claimdate';
import { PPSHeader } from './class.ppsheader';
import { DataService } from './dataservices';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

//cascading dropdownlist example http://www.talkingdotnet.com/cascading-dropdown-select-list-using-angular-js-2/


export class AppComponent {

  @ViewChild("fileInput") fileInput;  

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  invoicesubtypeid:number;
  regionid:number;
  claimstatusid:number;
  //ppsfile:File;
  ppsfileSelected:boolean=false;
  
  selectedInvoiceSubType: InvoiceSubType = new InvoiceSubType(-1, 'Empty');
  selectedRegion: Region = new Region(-1, 'Empty');
  selectedClaimDate: ClaimDate = new ClaimDate(-1, 'Empty');
    
  titleAlert:string = 'This field is required';

  invoiceSubTypeList: InvoiceSubType[];  
  regionList: Region[];
  claimDateList: ClaimDate[];
  ppsHeaderList: PPSHeader[];
  
 
  constructor(private fb: FormBuilder, private dataServices: DataService) {
    
    this.rForm = fb.group({
      //'ppsfile' : ''
      //'name': [null, Validators.required],
      //'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      //'validate' : ''
    });

  }

public FileSelected(file)
{
  //console.log('called FileSelected')
  this.ppsfileSelected=false;
  if (file)
    this.ppsfileSelected=true;
  

}

public OnSelectInvoiceSubType(invoicesubtypeId)
{
  this.getAllRegions(invoicesubtypeId);
}

public OnSelectRegion(invoicesubtypeId, regionId)
{
  this.getAllClaimDates(invoicesubtypeId, regionId);
}


public OnSelectClaimDate(invoicesubtypeId, claimDateId)
{
  this.getAllPPSHeaders(invoicesubtypeId, claimDateId);
}

private getAllInvoiceSubType(): void 
{
  this.dataServices.getInvoiceSubTypeList().subscribe((data:InvoiceSubType[]) => this.invoiceSubTypeList = data, error => console.log(error),() => console.log('Get all invoicesubtypes complete'));
}

private getAllRegions(invoiceSubtypeId): void 
{
  if (invoiceSubtypeId>0)
    this.dataServices.getRegionList(invoiceSubtypeId).subscribe((data:Region[]) => this.regionList = data, error => console.log(error),() => console.log('Get all regions complete for invoice sub type: ' + invoiceSubtypeId));
}  

private getAllClaimDates(invoicesubtypeId, regionId): void 
{
  if (invoicesubtypeId>0 && regionId>0)
  this.dataServices.getClaimDateList(invoicesubtypeId, regionId).subscribe((data:ClaimDate[]) => this.claimDateList = data, error => console.log(error),() => console.log('Get all claim dates'));
}  

private getAllPPSHeaders(invoicesubtypeId, claimDateId): void 
{
  if (invoicesubtypeId>0 && claimDateId>0)
  this.dataServices.getPPSHeaderList(invoicesubtypeId, claimDateId).subscribe((data:PPSHeader[]) => this.ppsHeaderList = data, error => console.log(error),() => console.log('Get all PPS Headers'));
}  


public UploadPPSFile(invoicesubtypeId, regionId, claimStatusId): void 
{
let fi = this.fileInput.nativeElement;
if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];    
    this.dataServices.postPPSFile(invoicesubtypeId, regionId, claimStatusId, fileToUpload).subscribe(res => {this.getAllPPSHeaders(invoicesubtypeId, claimStatusId)});
    }
}

public DeletePPSFile(ppsHeaderId): void
{
  if (confirm('Are you sure you want to delete this PPS?\n\nThis cannot be undone and a new PPS must be imported for the invoice subtype, region, and claim date.'))
  {
    this.dataServices.deletePPSFile(ppsHeaderId).subscribe(res => {this.getAllPPSHeaders(this.selectedInvoiceSubType.Id, this.selectedClaimDate.id)});
  }
}

public details(PPSHeaderId): void
{
  alert('if the code was implemented it would open the details screen with other information.')
}

ngOnInit() 
{
    this.getAllInvoiceSubType();
}  

}
