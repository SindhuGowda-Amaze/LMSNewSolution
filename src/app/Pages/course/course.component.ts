import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(public LearningService: LearningService, private ActivatedRoute: ActivatedRoute) { }
  result: any;
  id: any;
  venue: any;
  password: any;
  userName: any;
  trainingLink: any
  categoryid: any;
  categoryName: any;
  name: any;
  description: any;
  duration: any;
  fee: any;
  entryCriteria: any;
  exitCriteria: any;
  trainingType: any;
  updatephoto:any;

  ngOnInit(): void {
    this.categoryid = 0;
    this.categoryName = 0;
    this.trainingType = 0;
    this.GetCategoryMaster();
    this.GetCourse();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetCourse();
      }
    })

  }

   public GetCourse() {
    this.LearningService.GetCourse().subscribe(
      data => {
        debugger
        this.result = data.filter(x => x.id == this.id);
        this.updatephoto = this.result[0].updatephoto;
        this.categoryid = this.result[0].categoryID;
        this.name = this.result[0].name;
        this.description = this.result[0].description;
        this.Course_Photo = this.result[0].photo;
        this.duration = this.result[0].duration;
        this.fee = this.result[0].fee;
        this.entryCriteria = this.result[0].entryCriteria;
        this.exitCriteria = this.result[0].exitCriteria;
        this.trainingLink = this.result[0].trainingLink;
        this.userName = this.result[0].userName;
        this.password = this.result[0].password;
        this.venue = this.result[0].venue;
        this.trainingType = this.result[0].trainingType;
      }
    )
  }

  GetCategoryid(even: any) {
    debugger
    // var list = even.target.value.split(",");
    // this.categoryName = even.name
    this.categoryid = even.target.value;

    this.LearningService.GetCategoryMaster().subscribe(
      data => {
        debugger
        let temp: any = data.filter(x => x.id == this.categoryid);
        this.categoryName = temp[0].name;
      })

  }

  GetTrainingType(even: any) {

  }

  Save() {
    debugger
    if (this.name == undefined || this.description == undefined || this.categoryName == undefined ||
      this.Course_Photo == undefined || this.duration == undefined || this.entryCriteria ==
      undefined || this.exitCriteria == undefined  || this.trainingType
      == undefined||this.categoryid == undefined || this.duration=="" || this.trainingType=="") {
      Swal.fire("Please fill all the fields");
    }
    else {
      var json = {
        // "categoryName": this.categoryName,
        "name": this.name,
        "description": this.description,
        
        "photo": this.Course_Photo,
        "duration": this.duration,
        "fee":this.fee,
        "entryCriteria": this.entryCriteria,
        "exitCriteria": this.exitCriteria,
         "CategoryID": this.categoryid,
        "trainingLink": this.trainingLink,
        "userName": this.userName,
        "password": this.password,
        "venue": this.venue,
        "trainingType": this.trainingType
      };
      this.LearningService.InsertCourse(json).subscribe(
        data => {
          debugger
          let id = data;
          Swal.fire("Saved Successfully");
          location.href = "#/CourseDashboard"
        })
    }
  }

  Update() {
    debugger
    if(this.Course_Photo.includes('http://103.133.214.197/')){
      var json = {
        'ID': this.id,
        // "categoryName": this.categoryName,
        "name": this.name,
        "description": this.description,
        "photo": this.updatephoto,
        "duration": this.duration,
        "fee": this.fee,
        "entryCriteria": this.entryCriteria,
        "exitCriteria": this.exitCriteria,
        "CategoryID": this.categoryid,
        "trainingLink": this.trainingLink,
        "userName": this.userName,
        "password": this.password,
        "venue": this.venue,
        "trainingType": this.trainingType
      };
  
    }
    else{
      var json = {
        'ID': this.id,
        // "categoryName": this.categoryName,
        "name": this.name,
        "description": this.description,
        "photo": this.Course_Photo,
        "duration": this.duration,
        "fee": this.fee,
        "entryCriteria": this.entryCriteria,
        "exitCriteria": this.exitCriteria,
        "CategoryID": this.categoryid,
        "trainingLink": this.trainingLink,
        "userName": this.userName,
        "password": this.password,
        "venue": this.venue,
        "trainingType": this.trainingType
      };
    }
   
    

    this.LearningService.UpdateCourse(json).subscribe(
      data => {
        debugger
        let result = data;
        Swal.fire("Updated Successfully");
        location.href = "#/CourseDashboard";
      })
  }


  categoryList: any
  public GetCategoryMaster() {
    debugger
    this.LearningService.GetCategoryMaster().subscribe(
      data => {
        debugger
        this.categoryList = data;
      })
  }


  cancel() {
    location.href = "#/CourseDashboard";
  }
  Course_Photo: any;

  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }


  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.LearningService.AttachmentsUpload(this.files).subscribe(res => {
      debugger
      this.Course_Photo = res;
      Swal.fire("Attachment Uploaded");
    })
  }


}
