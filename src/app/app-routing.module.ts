import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CaseoneComponent} from './caseone/caseone.component';

import { ErrorComponent } from './error/error.component';


const routes: Routes = [
 
  { path: '', component: CaseoneComponent},
  { path: 'error', component: ErrorComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
