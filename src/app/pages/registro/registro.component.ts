import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();
    this.usuario.email = '';

  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Epere por favor...'
    });
    Swal.showLoading();
    // console.log('Formulario enviado');
    // console.log(this.usuario);
    // console.log(form);
    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {

        Swal.close();
        console.log(resp);

        if( this.recordarme ){
          localStorage.setItem('email', this.usuario.email);
        }
        
        this.router.navigateByUrl('/home');
        
      }, ( err ) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al autenticar',
          icon: 'error',
          text: err.error.error.message
        });
      });
  }


}
