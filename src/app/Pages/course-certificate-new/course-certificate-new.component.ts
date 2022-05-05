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

  courseid:any;
  id:any;
  ngOnInit(): void {
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
    this.LearningService.GetEnrollCourseCertificateNew(ID).subscribe(
      data => {
        debugger
        this.certificate = data;
      })
  }

  public convertToPDF1() {

    debugger

    var data: any = document.getElementById('downloadaplication');

    html2canvas(data).then(canvas => {

      var margin = 5;

      var imgWidth = 208

      // var pageHeight = 295 - 10 * margin;

      var pageHeight = 295;

      var imgHeight = canvas.height * imgWidth / canvas.width;

      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm');

      var position = 0;

      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')

        position = heightLeft - imgHeight;

        doc.addPage();

        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 1500);

        heightLeft -= pageHeight;

      }   


      doc.deletePage(1)

      doc.save('R1A Report.pdf');



      var pdf1 = doc.output('blob');

      var file = new File([pdf1], "R1-A Report.pdf");

      let body = new FormData();

      debugger

      body.append('Dan', file);

      console.log('pdf', pdf1)



    }).then(() => {

    });;

  }
    
















  }





