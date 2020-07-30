import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '@core/auth/store/auth.actions';
import { selectAuthLoading } from '@core/auth/store/auth.selectors';
import { AppState } from '@core/core.state';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  onDestroy$ = new Subject();
  $authLoading = this.store.select(selectAuthLoading);

  registerGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(128),
    ]),
    password0: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get firstname() {
    return this.registerGroup.get('firstname');
  }

  get lastname() {
    return this.registerGroup.get('lastname');
  }

  get email() {
    return this.registerGroup.get('email');
  }

  get password0() {
    return this.registerGroup.get('password0');
  }

  get password1() {
    return this.registerGroup.get('password1');
  }

  constructor(private store: Store<AppState>, updates$: Actions) {
    updates$
      .pipe(
        ofType(AuthActions.registerFail),
        takeUntil(this.onDestroy$),
        tap(() => this.registerGroup.enable())
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  register() {
    const firstname: string = this.firstname.value;
    const lastname: string = this.lastname.value;
    const email: string = this.email.value;
    const password: string = this.password0.value;
    const passwordConfirm: string = this.password1.value;

    this.registerGroup.disable();

    if (password !== passwordConfirm) {
      this.registerGroup.enable();
      return;
    }

    if (!email || !password) {
      this.registerGroup.enable();
      return;
    }

    this.store.dispatch(
      AuthActions.register({
        request: {
          firstname,
          lastname,
          email,
          password,
        },
      })
    );
  }
}
