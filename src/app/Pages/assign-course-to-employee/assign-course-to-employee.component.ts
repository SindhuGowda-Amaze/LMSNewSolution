import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/learning.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-assign-course-to-employee',
  templateUrl: './assign-course-to-employee.component.html',
  styleUrls: ['./assign-course-to-employee.component.css']
})
export class AssignCourseToEmployeeComponent implements OnInit {

  constructor(private LearningService: LearningService, private ActivatedRoute: ActivatedRoute) { }

  courselist: any;
  userid: any;
  stafflist: any;
  type: any;
  manager: any;
  courseid: any;
  name: any;
  mobile: any;
  emailID: any;
  staffId: any;
  name123: any;
  stafflist1: any;
  id:any;

  ngOnInit(): void {
    this.userid = sessionStorage.getItem('userid');
    this.GetCourse();
    this.GetStaff();
  }


  public GetCourse() {
    debugger
    this.LearningService.GetCourse().subscribe(
      data => {
        debugger
        this.courselist = data;
        // this.count = this.courselist.length;
      })
  }
 
  public GetStaff() {
    this.LearningService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.id != this.userid && x.role != 'Admin')
      // this.name= this.stafflist[0].employeeName
      // this.mobile=this.stafflist[0].phoneNo
      // this.emailID=this.stafflist[0].emailID
    });
  }

  Cancel() {
    location.href = "#/AssignCourseDashboard";
  }
  public getcoureid(id: any) {
    this.staffId = id
  }

  public getdata(name: any) {
    this.name = name
  }
 
  // enroll() {
  //   debugger

  //   Swal.fire({
  //     title: 'Enroll Confirmation',
  //     text: "Please click on OK to Assign Course To Employee",
  //     icon: 'warning',
  //     // icon: 'success',
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'OK'
  //   }).then((result) => {

  //     if (result.isConfirmed) {
  //       debugger
  //       var json = {
  //         "staffid": this.staffId,
  //         "manager": this.manager,
  //         "courseid": this.courseid,
  //         "status": 'Manager Assign',
  //         "employeeName": this.name123,
  //         "phoneNo": this.mobile,
  //         "email": this.emailID,
  //         "type": "Manager Assign"
  //       };
  //       this.LearningService.InsertEnroll(json).subscribe(
  //         data => {
  //           debugger
  //           let id = data;
  //         })
  //       Swal.fire(
  //         'Cousre Assigned Successfully!!!',
  //         'success'
  //       );
  //       location.href = "#/AssignCourseDashboard";
  //     }
  //   });
  // }

  enroll() {
    debugger
    if (this.name123 == undefined || this.courseid == undefined) {
      Swal.fire("Please fill all the fields");
    }
    else {
      var json = {
        "employeeName": this.name123,
        "courseid": this.courseid
      };
      this.LearningService.InsertEnroll(json).subscribe(
        data => {
          debugger
          let id = data;
        })
          Swal.fire('Course Assigned Successfully!!!');
          location.href = "#/AssignCourseDashboard";

       
    }
  }

  Update(){
    debugger
     var json = {
      "employeeName": this.name123,
      "courseid": this.courseid        
      };
    
      this.LearningService.UpdateEnroll(json).subscribe(
        data => {
        debugger
        let id = data;
        Swal.fire("Successfully Updated...!");
        location.href="#/AssignCourseDashboard";
      })
  }



}



