import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-support-tickets-dashboard',
  templateUrl: './support-tickets-dashboard.component.html',
  styleUrls: ['./support-tickets-dashboard.component.css']
})
export class SupportTicketsDashboardComponent implements OnInit {

  constructor(public LearningService: LearningService) { }

  ticketlist:any;
  search:any;
  count:any;
  staffID:any;
  ngOnInit(): void {
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.GetSupportTickets();
  }



  public GetSupportTickets(){
    debugger
    this.LearningService.GetSupportTickets().subscribe(
      data=>{
        this.ticketlist=data.filter(x=>x.applicationName=='L' && x.staffID==this.staffID );
        this.count=this.ticketlist.length;
      }
    )
  }


  attachmentlist:any;
  image(id:any){
    debugger
    this.LearningService.GetSupportAttachment().subscribe(
      data=>{
        debugger
       this.attachmentlist=data.filter(x=>x.ticketID==id);
      
      }
    )
    
  }

  public DeleteSupportTickets(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteSupportTickets(ID).subscribe(data => {
          debugger
          Swal.fire('Deleted Successfully')
          location.reload();
        })
      }
    })
  }


}

