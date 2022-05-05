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
  coursename:any;

  ngOnInit(): void {
    this.name123=0;
    this.coursename=0;
    this.userid = sessionStorage.getItem('userid');
    this.manager = sessionStorage.getItem('UserName');
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
  // public getcoureid(id: any) {
  //   this.staffId = id
  // }

  public getdata(details: any) {
    this.staffId = details.id
 
  }

  enroll() {
    debugger
    if (this.name123 == undefined || this.coursename == undefined) {
      Swal.fire("Please fill all the fields");
    }
    else {
      var json = {
        "employeeName": this.name123,
        // "name": this.coursename,
        "staffid": this.name123,
        "manager": this.manager,
        "courseid": this.courseid,
        "status": 'Manager Assign',
        "phoneNo": this.mobile,
        "email": this.emailID,
        "type": "Manager Assign"
      }
      this.LearningService.InsertEnroll(json).subscribe(
        data => {
          debugger
          let id = data;
          Swal.fire('Course Assigned Successfully!!!');
          location.href = "#/AssignCourseDashboard";
        })

       
    }
  }

  Update(){
    debugger
     var json = {
      "employeeName": this.name123,
      "courseid": this.courseid ,
      "status": 'Manager Assign',
      "type": "Manager Assign"
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



