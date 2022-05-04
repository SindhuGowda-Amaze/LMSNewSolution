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
  result: any;
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
      this.result =  data.filter(x => x.type == 'Manager Assign')
      this.count = this.result.length;
    })
}

public Ondelete(id:any) {
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
      this.LearningService.DeleteEnroll(id).subscribe(
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

edit(id: any) {
  debugger
  location.href = "#/AssignCourseToEmployee/" + id;
}

}




