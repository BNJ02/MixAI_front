import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../types/user.interface';
import { combineLatest } from 'rxjs';
import { SigninSuccessService } from '../services/signinSuccess.service';
import { SigninSuccess } from '../types/signinSuccess.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public profileForm: FormGroup;
  public signinSuccess: SigninSuccess;
  public user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {    
    this.userService.getMe()
      .subscribe((user) => {
        this.user = user;
        this.profileForm.patchValue(user);
      });
  }

}
