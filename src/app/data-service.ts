import { Persona } from './persona.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

//clase se encarga para recuperar la informacion de la bbdd y conectarse con services de java
//para gestionar y hacer los arreglos a Angular haremos otra clase llamada PersonaSrv
@Injectable() //configurador para que sea un servicio que se pueda usar de todas partes
export class DataService {

/**
 * Constructor del cliente
 *
 * @param httpClient
 */
constructor(private httpClient: HttpClient){}
urlBase = 'http://localhost:8080/personas/webservice/personas';

/**
 * Equivale al select para obtener una lista de  personas  de la base de datos
 *
 */
cargarPersonas(){
  return this.httpClient.get(this.urlBase);


}

/**
 * Metodo para agregar una persona  desde Angular
 * @param persona
 */
agregarPersona(persona: Persona){

  return this.httpClient.post(this.urlBase, persona);


}
/**
 * Metodo para modificar una persona desdde Angular
 * @param idPersona
 *
 * @param persona
 */
modificaPersona(idPersona:number, persona:Persona){
//debemos crear una nueva url para saber cual registro de personas vamos a modificar
let url:string;
url=this.urlBase+ '/'+ idPersona;
this.httpClient.put(url, persona).subscribe(

  (response)=>{
    console.log('resultado modificar persona: '+ response);

  },
  (error)=> console.log("Error en modificar Persona: "+ error)
);


}


eliminarPersona(idPersona:number){
  let url:string;
  url=this.urlBase+ '/'+ idPersona;
  this.httpClient.delete(url).subscribe(

    (response)=>{
      console.log('resultado modificar persona: '+ response);

    },
    (error)=> console.log("Error en modificar Persona: "+ error)
  );



}



}
