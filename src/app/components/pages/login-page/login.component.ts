import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { APIServices } from '../../../services/api.service';
import { AuthServices } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';
  isSubmit = false;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: APIServices,
    private auth: AuthServices,
    private router: Router,
    public toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  onSubmit() {

    this.isSubmit = true;
    if (this.loginForm.valid) {
      // Handle form submission here
      const { username, password } = this.loginForm.value;
      // Add logic to send login request to the server
      this.api.login({ username, password }).subscribe((res) => {
        if (res.isSuccess) {
          this.toastr.success(res.message);
          this.auth.setToken(res.token);
          this.auth.login();
          this.router.navigateByUrl('/');
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }
  setValue() {
    this.username = 'red';
    this.loginForm.controls['username'].setValue("red")
  }
}
