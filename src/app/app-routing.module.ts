import { FormularioComponent } from './formulario/formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasComponent } from './personas/personas.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', component: PersonasComponent},
  {path:'personas', component: PersonasComponent, children:[
    {path: 'agregar', component: FormularioComponent},
    {path:':idPersona', component: FormularioComponent}
  ]}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
''
