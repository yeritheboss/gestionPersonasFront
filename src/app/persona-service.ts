import { DataService } from './data-service';
import { Persona } from './persona.model';
import { Injectable } from '@angular/core';

// como va a ser un servicio y lo usamos en otras clases

@Injectable()
// las llamadas son asincronas por tanto usamos este array para gestionarlas de cara a angular
// tslint:disable-next-line: max-line-length
// esta clase la vamos a utilizar para administrar el array local, y este arreglo que es el que se usa para angular para
// listar personas, agregar,editar y eliminar elementos
// esto esta conectado a los servicios web por medio de la clase DataService(clase con la que conectamos los servicios
//web de parte de JAVA)

export class PersonaService {

personas: Persona[]=[]; // definicion de array de tipo persona

constructor(private dataService:DataService){}

// se usa para modificar el valor del arreglo debido a la llamada es asincrona
setPersonas(personas: Persona[]){
this.personas= personas;
}


obtenerPersonas(){
return this.dataService.cargarPersonas();
}

agregarPersona(persona: Persona){

console.log('persona a agregar: ' +persona.nombre);
this.dataService.agregarPersona(persona).subscribe(

(persona:Persona) =>{

//recuperamos objeto Persona con el idPersona recien agregado por eso usamos el flush en java para que vuelva con el id
console.log('se agrega al arreglo la persona recien insertada suscriber: '+ persona.idPersona);
this.personas.push(persona);

}

)
}


encontrarPersona(id:number){
const persona:Persona=this.personas.find(persona=>persona.idPersona==id);
console.log('persona encontrada: '+ persona.idPersona+' '+ persona.nombre);
return persona;
}


modificaPersona(id:number, persona:Persona){
console.log('Persona a modificar: '+ persona.idPersona);
//se actualiza el objeto de array
const personaModificadaLocal =this.personas.find(persona=>persona.idPersona==id);
personaModificadaLocal.idPersona=persona.idPersona;
personaModificadaLocal.nombre= persona.nombre;
//guardar la persona en la base de datos
this.dataService.modificaPersona(id,persona);
}


/**
* Eliminar una Persona
*
* @param id
*/
eliminarPersona(id:number){
console.log('Persona a eliminar: '+id);
//hay que eliminar de parte local y de parte de servidor por tanto hay que hacer dos llamadas
const index= this.personas.findIndex(persona=>persona.idPersona==id);//encontramos el indice el array
this.personas.splice(index,1);
this.dataService.eliminarPersona(id);
}

}
