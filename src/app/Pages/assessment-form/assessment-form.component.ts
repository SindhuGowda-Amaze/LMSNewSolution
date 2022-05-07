import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent implements OnInit {
  Course_Photo: any;
  Attachment: any;
  result: any;
  result1: any;
  results: any;
  courseid: any;
  chapterid: any;
  questionid: any;
  courseName: any;
  public Editor = ClassicEditor;
  constructor(public LearningService: LearningService, public ActivatedRoute: ActivatedRoute) { }
  CourseList: any;
  ChapterList: any;
  QuestionList: any;
  id: any;
  userid:any;
  files1: File[] = [];
  files: File[] = [];
  quetionlist:any

  ngOnInit(): void {
    this.courseid=0;
    this.chapterid=0;
    this.questionid=0;
    this.userid = sessionStorage.getItem('userid');

    this.GetQuestionMaster();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.questionid = params["id"];
      if (this.questionid != null && this.questionid != undefined) {
        this.GetQuestionMaster();
      }
    })

    this.GetChapter();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.chapterid = params["id"];
      if (this.chapterid != null && this.chapterid != undefined) {
        this.GetChapter();
      }
    })

    this.GetCourse();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.courseid = params["id"];
      if (this.courseid != null && this.courseid != undefined) {
        this.GetCourse();
      }
    })

    // this.show = 1;
    // this.show2 = 1;
  }

  type:any
  public GetAssessments() {
    debugger
    this.LearningService.GetAssessments().subscribe(
      data => {
        debugger
        this.quetionlist = data;
        this.type= this.quetionlist[0].type
        console.log("questionlist",this.quetionlist)
      
     
      })
  }

  public GetQuestionMaster() {
    debugger
    this.LearningService.GetQuestionMaster().subscribe(
      data => {
        debugger
        this.QuestionList = data;
      })
  }


  dumchapterlist: any;
  public GetChapter() {
    debugger
    this.LearningService.GetChapter().subscribe(
      data => {
        debugger
        this.dumchapterlist = data;
      })
  }
  public GetCourse() {
    debugger
    this.LearningService.GetCourse().subscribe(
      data => {
        debugger
        this.CourseList = data;
      })
  }



  cancel() {
    location.href = "#/Assessmentdashboard";
  }
  
  onSelect1(event: any) {
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadattachments1();
  }

  onRemove1(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  public uploadattachments1() {
    debugger
    this.LearningService.AttachmentsUpload(this.files1).subscribe(res => {
      debugger
      this.Course_Photo = res;
      alert("Attachment Uploaded");
    })
  }


  

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadattachments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.LearningService.AttachmentsUpload(this.files).subscribe(res => {
      debugger
      this.Attachment = res;
      alert("Attachment Uploaded");
    })
  }
  Question: any;
  Option1: any;
  Option2: any;
  Option3: any;
  Option4: any;
  CorrectAnswer: any;
  Weightage: any;
  AssessmentName: any;

  tablecout: any;

  assessmenrArray: any = [];
  ADd() {
    debugger
    if(this.courseid==undefined || this.chapterid==undefined || this.questionid==undefined || this.Question==
      undefined|| this.Weightage==undefined || this.CorrectAnswer==undefined || this.CorrectAnswer=="")
    {
      Swal.fire("Please fill all the fields");
    }
  else{
    this.tablecout = 1;
    var json = {
      "CourseID": this.courseid,
      "ChapterID": this.chapterid,
      "QuestionID": this.questionid,
      "Question": this.Question,
      "Option1": this.Option1,
      "Option2": this.Option2,
      "Option3": this.Option3,
      "Option4": this.Option4,
      "CorrectAnswer": this.CorrectAnswer,
      "weightage": this.Weightage,
      // "AssessmentName": this.AssessmentName,
      "TrainerID":this.userid
    };
  
    this.assessmenrArray.push(json)
    this.Question="";
    this.Option1="";
    this.Option2="";
    this.Option3="";
    this.Option4="";
    this.Weightage="";
    this.AssessmentName="";
    Swal.fire("Saved Successfully");
  }
 

    // this.LearningService.InsertAssessments(json).subscribe(
    //   data => {
    //     debugger
    //     let id = data;
    //     Swal.fire("Saved Successfully!!");
    //     location.href = "#/Assessmentdashboard"
    //   })
  }



  getCorrectAnswer(event: any) {
    debugger
    let value: any = event.target.value;
    if (value == 'A') {
      this.CorrectAnswer = this.Option1;
    }
    if (value == 'B') {
      this.CorrectAnswer = this.Option2;
    }
    if (value == 'C') {
      this.CorrectAnswer = this.Option3;
    }
    if (value == 'D') {
      this.CorrectAnswer = this.Option4;
    }
  }


  entity:any
  save() {
    debugger
    for (let i = 0; i <=this.assessmenrArray.length; i++) {
      debugger
    var entity = {
        "CourseID": this.assessmenrArray[i].CourseID,
        "ChapterID": this.assessmenrArray[i].ChapterID,
        "QuestionID": this.assessmenrArray[i].QuestionID,
        "Question": this.assessmenrArray[i].Question,
        "Option1": this.assessmenrArray[i].Option1,
        "Option2": this.assessmenrArray[i].Option2,
        "Option3": this.assessmenrArray[i].Option3,
        "Option4": this.assessmenrArray[i].Option4,
        "CorrectAnswer": this.assessmenrArray[i].CorrectAnswer,
        "weightage": this.assessmenrArray[i].weightage,
        // "AssessmentName": this.assessmenrArray[i].AssessmentNames,
        "TrainerID":this.assessmenrArray[i].TrainerID
      };
      debugger
        this.LearningService.InsertAssessments(entity).subscribe(
      (data:any) => {
        debugger
        let quetionlist = data;
        if(data!=0)
        {
          Swal.fire("Saved Successfully");
          location.href="#/Assessmentdashboard";
        }
        else{
          Swal.fire("Name Already Exists");
        }
       
      })


    }
   
   
       
  }



  show: any;
  show2: any;

  // ShowObjectives(value:any){
  //   debugger
  //   this.show=value;
  // }
  // ShowSubjectives(value:any){
  //   debugger
  //   this.show2=value;
  // }

  getcourseid(even: any) {
    this.courseid = even.target.value;
    this.ChapterList = this.dumchapterlist.filter((x: { courseID: any; }) => x.courseID == this.courseid)
  }

  update() {
    debugger
   
      debugger
    var entity = {
        "CourseID": this.courseid,
        "ChapterID": this.chapterid,
        "QuestionID": this.questionid,
        "Question": this.Question,
        "Option1": this.Option1,
        "Option2": this.Option2,
        "Option3": this.Option3,
        "Option4": this.Option4,
        "CorrectAnswer": this.CorrectAnswer,
        "weightage": this.Weightage,
        "AssessmentName": this.AssessmentName,
        "TrainerID":this.userid
      };
      debugger
      this.LearningService.UpdateAssessments(entity).subscribe(
        data => {
          debugger
          let id = data;
          Swal.fire("Updated Successfully!!");
          this.tablecout = 0;
          location.href = "#/Assessmentdashboard"
        })      



   
   
   
       
  }

}
