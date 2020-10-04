import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { currentUser } from '@core/auth/store/auth.actions';
import { selectCurrentUser } from '@core/auth/store/auth.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as actions from './profile.actions';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProfile),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([_, user]) =>
        this.profileService.get(user.userId).pipe(
          map((profile) => actions.loadProfileSuccess({ profile })),
          catchError((error) => of(actions.loadProfileFail({ error })))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateProfile),
      switchMap((action) =>
        this.profileService.put(action.profile).pipe(
          tap(() => this.snackbar.open('Profile Updated')),
          tap(() =>
            this.store.dispatch(
              actions.uploadProfilePicture({ data: action.data })
            )
          ),
          map((profile) => actions.updateProfileSuccess({ profile })),
          catchError((error) => of(actions.updateProfileFail({ error })))
        )
      )
    )
  );

  updateProfileSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateProfileSuccess, actions.uploadProfilePictureSuccess),
      debounceTime(280),
      map(() => currentUser())
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changePassword),
      switchMap((action) =>
        this.profileService.changePassword(action.request).pipe(
          tap((res) => res.isSuccess && this.snackbar.open('Password Changed')),
          map((response) => actions.changePasswordSuccess({ response })),
          catchError(() => of(actions.changePasswordFail()))
        )
      )
    )
  );

  uploadProfilePicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.uploadProfilePicture),
      filter((action) => !!action.data),
      switchMap((action) =>
        this.profileService.uloadProfilePicture(action.data).pipe(
          map((response) => actions.uploadProfilePictureSuccess({ response })),
          catchError((error) => of(actions.uploadProfilePictureFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions<Action>,
    private profileService: ProfileService,
    private store: Store,
    private snackbar: MatSnackBar
  ) {}
}
