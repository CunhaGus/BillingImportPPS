export class PPSHeader {
  constructor(
              public id: number, 
              public invoicesubtypeName: string,
              public regionName: string, 
              public claimDate: string, 
              public statusName: string, 
              public total: number ) { }
}