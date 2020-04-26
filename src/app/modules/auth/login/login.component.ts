import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

   constructor( public _loginService:LoginService,
               public router:Router, ) {
  }

  ngOnInit() { }

  ngOnDestroy(): void {  }

  login (forma:NgForm){

    this.router.navigate(['/dashboard']);


    /*if(this.usuario.sede == ''){

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe Seleccionar Una Sede',
      });

    }else{

      let seguir:boolean = false;

      this._loginService.login( forma ).subscribe(response => {
      let seguir:boolean = false;
        seguir = this.guardarDatosStorage( response, forma );

        console.log("usuario",forma);

        if(seguir){
         this.router.navigate(['/dashboard']);
        }
      },
      error =>{
        console.log("error--------------",error);
      });

    }*/

    
      
  }

}
