import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-assign-course-dashboard',
  templateUrl: './assign-course-dashboard.component.html',
  styleUrls: ['./assign-course-dashboard.component.css']
})
export class AssignCourseDashboardComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  search: any;
  id: any;
  assignList: any;
  count: any;
  ngOnInit(): void {
    this.GetEnroll();
  }
public GetEnroll(){
  this.LearningService.GetEnroll().subscribe(
    data => {
      debugger
      // this.result = data.filter(x => x.manager == this.manager );
      // this.result = data.filter(x => x.status == 'Manager Assigned' );
      this.assignList =  data.filter(x => x.type == 'Manager Assign')
      this.assignList=data;
      this.count = this.assignList.length;
    })
}

public Ondelete(ID:any) {
  Swal.fire({
    title: 'Are You Sure ',
    text: "Do you want to delete the Selected Record",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.value == true) {
      this.LearningService.DeleteEnroll(ID).subscribe(
    data => {
      debugger
      this.GetEnroll();
    }
  )
  Swal.fire('Successfully Deleted...!');
  this.ngOnInit();
    }
  });
}

edit(ID: any) {
  debugger
  location.href = "#/AssignCourseToEmployee/" + ID;
}

}




