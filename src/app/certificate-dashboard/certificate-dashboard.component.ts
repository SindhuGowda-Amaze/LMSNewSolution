import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/learning.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-certificate-dashboard',
  templateUrl: './certificate-dashboard.component.html',
  styleUrls: ['./certificate-dashboard.component.css']
})
export class CertificateDashboardComponent implements OnInit {
  
  constructor(private LearningService:LearningService,private ActivatedRoute:ActivatedRoute ) { }
  userid:any
  courseList:any;
  ngOnInit(): void {
    this.userid = sessionStorage.getItem('userid');
    this.GetTrainerReport();
    this.GetDepartmentMaster();

    this.LearningService.GetCourse().subscribe(
      data => {
        debugger
        this.courseList = data;
      })
  }
  search:any;
  dummemployeereportlist: any;
  traininglist: any;
  employeereportlist: any;
  courseid: any;
  count: any;
  departmentid: any;
  dumdeptlist: any
  departmentlist: any;
  date:any;

   public GetTrainerReport(){
     debugger
     this.LearningService.GetTrainerReport(0,0).subscribe(data=>{
       this.employeereportlist=data.filter(x=>x.staffID== this.userid )
       this.dummemployeereportlist=data;
   
     }
      )
   }


   fileName = 'Approved Applicants Reports.xlsx';
   exportexcel(): void {
     /* table id is passed over here */
     let element = document.getElementById('download');
     debugger
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     debugger
 
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
 
   }

  public GetDepartmentMaster(){
    debugger
    this.LearningService.GetDepartmentMaster().subscribe(
      data => {
        debugger
        this.departmentlist = data;
      })
  }

  getdepartmentid(even:any){
    debugger
    this.departmentid = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.dummemployeereportlist.filter((x: { departmentID: any; }) => x.departmentID == this.departmentid)
    }
    else{
      this.GetTrainerReport();
    }
  }
  
    getcourseid(even:any){
      debugger
      this.courseid=even.target.value;
      if(even.target.value !=0){
        this.employeereportlist = this.dummemployeereportlist.filter((x: { courseName: any; }) => x.courseName == this.courseid)
        this.count = this.employeereportlist.length;
      }
      else{
        this.GetTrainerReport();
      }
    }





}

