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

  constructor(public LearningService: LearningService,private ActivatedRoute: ActivatedRoute) { }
  result: any;
  id:any;
  venue:any;
  password:any;
  userName:any;
  trainingLink:any
  ngOnInit(): void {
    this.categoryName=0;
    this.trainingType=0;
  this.GetCategoryMaster();

    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetCourse();
      }
    })

  }

  categoryName:any;
  name:any;
  description:any;
  duration:any;
  fee:any;
  entryCriteria:any;
  exitCriteria:any;
  trainingType:any;

  public GetCourse(){
  this.LearningService.GetCourse().subscribe(
    data => {
    debugger
    this.result = data;
		this.result=this.result.filter((x: { id: any; })=>x.id==Number(this.id));
		this.categoryName=this.result[0].categoryName;
		this.name=this.result[0].name;
    this.description=this.result[0].description;
    this.Course_Photo=this.result[0].photo;
    this.duration=this.result[0].duration;
    this.fee=this.result[0].fee;
    this.entryCriteria=this.result[0].entryCriteria;
    this.exitCriteria=this.result[0].exitCriteria;
    this.trainingLink=this.result[0].trainingLink;
    this.userName=this.result[0].userName;
    this.password=this.result[0].password;
    this.venue=this.result[0].venue;
    this.trainingType=this.result[0].trainingType;
      }
    ) 
  }
categoryid:any;

  GetCategoryid(even:any)
  {
    debugger
    var list=even.target.value.split(",");
this.categoryName=list[0]
this.categoryid=list[1];
  }

  GetTrainingType(even:any){

  }

  Save(){
    debugger 
    if(this.name==undefined || this.description==undefined || this.categoryName==undefined || 
      this.Course_Photo==undefined || this.duration==undefined || this.entryCriteria==
      undefined ||  this.exitCriteria==undefined || this.categoryid==undefined || this.trainingType
      == undefined)
    {
      Swal.fire("Please fill all the fields");
    }
  else{
    var json = {
      "categoryName":this.categoryName,
      "name": this.name,
      "description":this.description,  
      "photo": this.Course_Photo,
      "duration": this.duration,
      "entryCriteria":this.entryCriteria,
      "exitCriteria":this.exitCriteria,    
      "CategoryID":this.categoryid,
      "trainingLink":this.trainingLink,
      "userName":this.userName,
      "password":this.password,
      "venue":this.venue,
      "trainingType":this.trainingType  
    };
    this.LearningService.InsertCourse(json).subscribe(
      data => {
        debugger
        let id = data;
        Swal.fire("Saved Successfully");
        location.href="#/CourseDashboard"
      })
  }
  }

    Update(){
     debugger
     var json = {
      'ID': this.id,
     "categoryName":this.categoryName,
      "name": this.name,
      "description":this.description,  
      "photo": this.Course_Photo,
      "duration": this.duration,
      "fee":this.fee,
      "entryCriteria":this.entryCriteria,
      "exitCriteria":this.exitCriteria,    
      "CategoryID":this.categoryid,
      "trainingLink":this.trainingLink,
      "userName":this.userName,
      "password":this.password,
      "venue":this.venue,
      "trainingType":this.trainingType
      };
    
      this.LearningService.UpdateCourse(json).subscribe(
        data => {
        debugger
        let result = data;
        Swal.fire("Updated Successfully");
      location.href="#/CourseDashboard";
      })
    }



    public GetCategoryMaster() {
      debugger
      this.LearningService.GetCategoryMaster().subscribe(
        data => {
          debugger
          this.result = data;
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
