import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent}
    ])
  ]
})
export class UserModule { }
