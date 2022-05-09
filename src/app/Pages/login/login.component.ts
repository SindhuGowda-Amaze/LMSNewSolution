import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LearningService } from 'src/app/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roledid: any;
  result: any;
  roleID: any;
  userName: any;
  password: any;
  username: any;
  loginTypeList: any;
  temp: any;
  showpassword: any;
  companycode: any;
  loader: boolean | undefined;
  admin: any;
  roleid: any;
  constructor(public LearningService: LearningService, private router: Router) { }
  ngOnInit(): void {


    this.temp = sessionStorage.getItem('temp');
    this.showpassword = 0;

    if (sessionStorage.getItem('temp') == '1') {
      sessionStorage.clear();
      location.reload();

    }
    //   this.GetLoginTypeMaster();

  }

  // public getroleid(event: any) {
  //   this.roledid = event.target.value;
  //  this.username = sessionStorage.getItem('UserName')

  // }

  public getcompanycode() {
    debugger
    sessionStorage.setItem('companycode', this.companycode);
    if (this.companycode == 1001) {
      sessionStorage.setItem('apiurl', 'http://103.133.214.197/digiOfficeV4API');

    }
    else if (this.companycode == 1002) {
      sessionStorage.setItem('apiurl', 'http://103.133.214.197/Dynamic_NCNDAAPI');
    }
  }

  GetLoginTypeMaster() {

    this.LearningService.GetLoginTypeMaster().subscribe(data => {

      this.loginTypeList = data;
    })
  }
  public getRoleID(even: any) {
    debugger
    this.roleID = even.target.value;
  }


  Showhidepassword() {
    debugger
    if (this.showpassword == 0) {
      this.showpassword = 1;
    }
    else {
      this.showpassword = 0;
    }
  }

  public login() {

    debugger
    // let adminCopy = this.admin.toLowerCase();
    // if (this.userName.toLowerCase().includes(adminCopy)  && this.password == '1' && this.roleID==1) {

    //   debugger
    //   sessionStorage.setItem('UserName', 'admin');
    //   sessionStorage.setItem('temp', '1');
    //   sessionStorage.setItem('role', 'Admin');
    //   sessionStorage.setItem('roleid', '1');
    //   sessionStorage.setItem("clickname", "Admin Dashboard")
    //   location.href = "#/Dashboard";
    //   location.reload();
    //   this.loader=false;
    // }
    if (this.roleID == 1) {
      // let adminCopy = this.userName.toLowerCase();
      this.LearningService.GetMyDetails().subscribe((data: any) => {
        debugger
        let temp: any = data.filter((x: { emailID: any; password: any; roleType: any }) => (x.emailID.toUpperCase() === this.userName.toUpperCase() && x.password == this.password) && x.roleType == 1);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        this.result = temp[0];
        if (this.result != undefined || this.result != null || this.roleID == 1) {
          sessionStorage.setItem('UserName', this.result.name);
          sessionStorage.setItem('temp', '1');
          sessionStorage.setItem('role', 'Admin');
          sessionStorage.setItem('roleid', '1');
          sessionStorage.setItem('userid', temp[0].id);
          sessionStorage.setItem("clickname", "Admin Dashboard")
          this.router.navigate(['/Dashboard']).then(() => {
            location.reload();
            this.loader=false;
          });
        }
        else {
          Swal.fire('Username or Password is invalid');
          this.userName = "";
          this.password = "";
          this.loader = false;
        }
      });
    }
    else if (this.roleID == 2) {
      debugger
      // let userNameCopy = this.userName.toLowerCase();
      this.LearningService.GetMyDetails().subscribe(async data => {
        let temp: any = data.filter(x => (x.emailID.toUpperCase() === this.userName.toUpperCase() || x.phoneNo == this.userName) && x.password == this.password);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        this.result = temp[0];
        debugger;

        if (this.result != undefined || this.result != null || this.roleID == 4) {
          debugger
          sessionStorage.setItem('UserName', this.result.name);
          sessionStorage.setItem('userid', this.result.id);
          console.log("Employeid", this.result.id)
          sessionStorage.setItem('temp', '1');
          sessionStorage.setItem('manager', this.result.supervisor)
          sessionStorage.setItem('role', 'Employee');
          debugger
          sessionStorage.setItem('roleid', '2');
          sessionStorage.setItem("clickname", "Employee Dashboard")
          this.Insertattdnace(this.result.id)
          // location.href = "/Dashboard";
          // this.loader = false;
        }
        else {

          Swal.fire('Username or Password is invalid');
          this.userName = "";
          this.password = "";
          this.loader = false;
        }
      })
    }

    else if (this.roleID == 3) {
      debugger
      let userNameCopy = this.userName.toLowerCase();
      this.LearningService.GetMyDetails().subscribe(data => {
        let temp: any = data.filter(x => (x.emailID.toUpperCase() === this.userName.toUpperCase() || x.phoneNo == this.userName) && x.password == this.password);
        this.result = temp[0];
        debugger;
        this.loader = true;
        if (this.result != undefined || this.result != null || this.roleID == 3) {
          sessionStorage.setItem('UserName', this.result.name);
          sessionStorage.setItem('userid', this.result.id);
          sessionStorage.setItem('temp', '1');
          sessionStorage.setItem('role', 'Manager');
          sessionStorage.setItem('roleid', '3');
          sessionStorage.setItem("clickname", "Manager Dashboard")
          location.href = "#/ManagerDashboard";
          this.Insertattdnace(this.result.id)
          // location.reload();
          // this.loader = false;
        }
        else {
          Swal.fire('Username or Password is invalid');
          this.userName = "";
          this.password = "";
          this.loader = false;
        }
      })
    }

    else if (this.roleID == 4) {

      debugger
      let userNameCopy = this.userName.toLowerCase();
      this.LearningService.GetTrainer().subscribe(data => {
        let temp: any = data.filter(x => (x.phoneNo == this.userName || x.email.toUpperCase() === this.userName.toUpperCase()) && x.password == this.password);
        this.result = temp[0];
        debugger;
        // this.loader = true;
        if (this.result != undefined || this.result != null || this.roleID == 4) {
          sessionStorage.setItem('UserName', this.result.name);
          sessionStorage.setItem('userid', this.result.id);
          sessionStorage.setItem('trainerid', this.result.id)
          sessionStorage.setItem('temp', '1');
          sessionStorage.setItem('role', 'Trainer');
          sessionStorage.setItem('roleid', '4');
          sessionStorage.setItem("clickname", "Assessment Dashboard")
          location.href = "#/Assessmentdashboard";
          this.Insertattdnace(this.result.id)
          // location.reload();
          // this.loader = false;
        }
        else {
          Swal.fire('Username or Password is invalid');
          this.userName = "";
          this.password = "";
          this.loader = false;
        }

      })

    }

    else {

      Swal.fire('Username or Password is invalid');
      this.userName = "";
      this.password = "";
      this.loader = false;
    }
  }




  public async Insertattdnace(id: any) {
    debugger




    var entity = {
      'EmpID': id,
      'LoginDate': new Date()
    }
    await this.LearningService.InsertAttendance_New(entity).subscribe(
      (datay: any) => {
        debugger
        if (datay != 0) {
          debugger
          sessionStorage.setItem('loginid', datay);

          location.href = "#/Dashboard";
          this.loader = false;
          location.reload();
          this.loader = false;
        }

      })

  }
}


