import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    
    AuthRoutingModule,
    
    LoginModule,
    SignupModule
  ],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
