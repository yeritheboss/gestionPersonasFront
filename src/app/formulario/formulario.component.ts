import { PersonaService } from './../persona-service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../persona.model';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',

})
export class FormularioComponent implements OnInit {
  idPersona: number;
  nombreInput: string;



  constructor(private personasService: PersonaService,
              private router: Router,
              private route: ActivatedRoute)

    { }

  ngOnInit(): void {
    this.idPersona= this.route.snapshot.params.idPersona;
    console.log('recuperamos el parametro idPersona: '+ this.idPersona)
    if (this.idPersona!=null){
      const persona = this.personasService.encontrarPersona(this.idPersona);
      if(persona!=null){
        this.nombreInput= persona.nombre;
      }
    }
  }


  onGuardarPersonas(){

    const personaAGuardar = new Persona(this.idPersona,this.nombreInput);

    if(this.idPersona!=null){
    this.personasService.modificaPersona(this.idPersona, personaAGuardar)
    }else{

  this.personasService.agregarPersona(personaAGuardar);
    }
  this.router.navigate(['personas']);
}

onEliminarPersona(){
  if(this.idPersona !=null){
    console.log('persona a eliminar: '+ this.idPersona);
    this.personasService.eliminarPersona(this.idPersona);

  }
  this.router.navigate(['personas'])
}

}
