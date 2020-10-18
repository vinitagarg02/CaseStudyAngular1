import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/case.service';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';  
import { Property } from '../Property';
import {Commonmodel} from 'src/app/models/commonmodel';
import { ErrorService } from '../error.service';
@Component({
  selector: 'app-caseone',
  templateUrl: './caseone.component.html',
  styleUrls: ['./caseone.component.css']
})
export class CaseoneComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMsg: any;
  columnData: Commonmodel[];
  page = 1;
  pageSize=10;

  constructor(private caseService: CaseService, 
    private readonly _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  title = 'CaseStudy';
  data: any ;
  dataString: string;
  property:Property[];
  collectionSize=0;
  onFileChangeNew(ev) {
    let workBook = null;
    let jsonData = null;
    
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataString = JSON.stringify(jsonData);     
    }
    reader.readAsBinaryString(file);
  }
  postData(){
    if(this.dataString){
      this.columnData=[];
      this.caseService.postExcelData(this.dataString).subscribe(
          data=>{
            this.property=data;
            var borrower : boolean = false;
            var loan : boolean = false;
            var cost : boolean = false;
            var dob : boolean = false;
            var flood : boolean = false;
            var address : boolean = false;
            this.property.forEach(element => {
              this.collectionSize=this.collectionSize+1;
              if(element['Borrower Name']){
                borrower = true;
              }
              if(element['Loan No']){
                loan = true;
              }
              if(element['Cost']){
                cost =true;
              }
              if(element['DOB']){
                dob=true;
              }
              if(element['Prop Address']){
                address=true;
              }
              if(element['Flood Risk']){
                flood=true;
              }
            });
            if(loan){
              var model: Commonmodel = new Commonmodel();
              model.Text='Loan';
              model.Value = 'Loan No';
              this.columnData.push(model);
            }
            if(borrower){
              var model: Commonmodel = new Commonmodel();
              model.Text='Borrower';
              model.Value = 'Borrower Name';
              this.columnData.push(model);
            }
            if(dob){
              var model: Commonmodel = new Commonmodel();
              model.Text='DOB';
              model.Value = 'DOB';
              this.columnData.push(model);
            }
            if(address){
              var model: Commonmodel = new Commonmodel();
              model.Text='Address';
              model.Value = 'Prop Address';
              this.columnData.push(model);
            }
            if(cost){
              var model: Commonmodel = new Commonmodel();

              model.Text='Cost';
              model.Value = 'Cost';
              this.columnData.push(model);
            }
            if(flood){
              var model: Commonmodel = new Commonmodel();

              model.Text='Flood Risk';
              model.Value = 'Flood Risk';
              this.columnData.push(model);
            }
      },(error) => {
        this._errorService.error(error);
        this.errorMsg = error; 
      },);
    }
  }

}
