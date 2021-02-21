import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public perfilForm: FormGroup;
  public formSubmitted: boolean;
  public usuario: Usuario;
  public subirImagen: File;
  public imgTemp: string = null;


  constructor( private fb: FormBuilder, private usersService: UsersService, private fileUploadService: FileUploadService ) { 
    this.usuario = usersService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [Validators.required, Validators.email] ],
    });
    
  }

  actualizarPerfil() {
    this.formSubmitted = true;
    console.log( this.perfilForm.value );

    this.usersService.actualizarPerfil( this.perfilForm.value )
        .subscribe( resp => {
          Swal.fire('Actualización Correcta', this.perfilForm.get('nombre').value, 'success');
          this.usuario.nombre = this.perfilForm.get('nombre').value;
          this.usuario.email = this.perfilForm.get('email').value;
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        })
    
  }

  
  campoNoValido( campo: string): boolean {
    if( this.perfilForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }

  cambiarImagen( file: File ) {
    this.subirImagen = file;

    if( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result.toString();
    }  
     
  }

  cargarImagen(){

    this.fileUploadService.actualizarFoto( this.subirImagen, 'usuarios', this.usuario._id )
        .then( img => { 
          this.usuario.img = img 
          Swal.fire('Guardado', 'Imágen Actualizada', 'success');
        });

  }

  cancelar(){
    return this.imgTemp = null;
  }

}
