import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface ILogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = fb.group({
      email: [''],
      password: [''],
    });
  }

  submit() {
    const { email, password } = this.form.getRawValue();
    this.authService.login(email, password).subscribe((res) => {
      if (res["Jwt"]) {
        this.router.navigate(['chatrooms']);
      }
    });
  }

}
