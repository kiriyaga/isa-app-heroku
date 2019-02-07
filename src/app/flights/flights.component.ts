import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AvioCompanyService } from '../services/avio-company.service';
import { CompanyModule } from '../avio-company/company/company.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  searchForm = new FormGroup({
    class: new FormControl('', Validators.required),
    typetrip: new FormControl('', Validators.required),
    num: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    takeoff: new FormControl(new Date(), Validators.required),
    landing: new FormControl(new Date(), Validators.required),
  });

  
  SearchForFlights(){
    
    let type= this.searchForm.get('typetrip').value;
    let num= this.searchForm.get('num').value;
    let classs = this.searchForm.get('class').value;
    let from= this.searchForm.get('from').value;
    let to=  this.searchForm.get('to').value;
    let takeoff=  this.searchForm.get('takeoff').value;
    let landing=  this.searchForm.get('landing').value;

    alert(type + num + classs + from + to + takeoff + landing);
    
    this.router.navigate(['/avio/search/'+type+'/'+num+'/'+classs+'/'+from+'/'+to+'/'+takeoff+'/'+landing]);
  }

  constructor(private avioService: AvioCompanyService,private router:Router) { }

  allComp: Array<CompanyModule>;

  ngOnInit() {

    this.searchForm.get("typetrip").setValue('ONE-WAY');
    this.searchForm.get("num").setValue(1);
    this.searchForm.get("class").setValue('ECONOMIC');

    this.avioService.getCompanies().subscribe(
      data=>{
        this.allComp = data;
      },
      error=>{
        alert("dsada");
      }
    )
  }


}
