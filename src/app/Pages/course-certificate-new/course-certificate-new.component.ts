import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/learning.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
@Component({
  selector: 'app-course-certificate-new',
  templateUrl: './course-certificate-new.component.html',
  styleUrls: ['./course-certificate-new.component.css']
})
export class CourseCertificateNewComponent implements OnInit {

  constructor(private LearningService:LearningService,private ActivatedRoute:ActivatedRoute) { }
  userid:any;
  courseid:any;
  id:any;
  ngOnInit(): void {

    this.userid = sessionStorage.getItem('userid');
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params['id'];
      this.GetEnrollCourseCertificateNew(this.id)
    }
    )     
    // debugger
    // this.UserName = sessionStorage.getItem('UserName');
    // this.getmycertiifcate();    
  }

  certificate:any;
  public GetEnrollCourseCertificateNew(ID:any) {
    debugger
    // this.LearningService.GetEnrollCourseCertificateNew(ID).subscribe(
    //   data => {
    //     debugger
    //     this.certificate = data;
    //   })

      this.LearningService.GetTestResponse().subscribe(data=>{
        this.certificate=data.filter(x=>x.userID== this.userid )
      }
       )
  }

  public convertToPDF1() {

    debugger

    var data: any = document.getElementById('downloadaplication');

    html2canvas(data).then(canvas => {

      var imgWidth = 300;

      var pageHeight = 400;

      var imgHeight = canvas.height * imgWidth / canvas.width;

      var heightLeft = imgHeight;

      var doc = new jsPDF('l', 'mm', 'a4');

      var position = 0;

      while (heightLeft >= 0) {

        const contentDataURL = canvas.toDataURL('image/png')

        position = heightLeft - imgHeight;

        doc.addPage();

        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');

        heightLeft -= pageHeight;



      }

      doc.deletePage(1);

doc.save('Certificate.pdf'); 



    



    }).then(() => {

    });;

  }
    
















  }





