import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LearningService } from 'src/app/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submitedtests',
  templateUrl: './submitedtests.component.html',
  styleUrls: ['./submitedtests.component.css']
})
export class SubmitedtestsComponent implements OnInit {

  result: any;
  constructor(public LearningService: LearningService) { }
  staffid: any;
  search: any;
  date:any;
 count:any;

  ngOnInit(): void {

    this.staffid = localStorage.getItem('userid');

    this.LearningService.GetTestResponsenew().subscribe(
      data => {
        debugger
        this.result = data.filter(x => x.checked == 1);
        this.result = data;
        this.count = this.result.length;
      })
  }
  public getdate(even:any){
    debugger
this.date=even.target.value;

this.filterdate();
  }
  public filterdate(){
    debugger
    this.LearningService.GetTestResponsenew().subscribe(
      data => {
        debugger
        this.result = data.filter(x => x.checked == 1 && x.modifiedDate==this.date);
        this.count = this.result.length;
      })
  }


}
