import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from '@app/core/services/confirmation.service';
import { ConfirmDialogOptions } from '@app/entry/dialogs/confirm-dialog/confirm-dialog.component';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './workspaces.actions';
import { WorkspacesService } from './workspaces.service';

@Injectable()
export class WorkspacesEffects {
  loadWorkspaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadWorkspaces),
      switchMap(() =>
        this.workspacesService.get().pipe(
          map((workspaces) => actions.loadWorkspacesSuccess({ workspaces })),
          catchError((error) => of(actions.loadWorkspacesFail({ error })))
        )
      )
    )
  );

  createWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createWorkspace),
      switchMap((action) =>
        this.workspacesService.post(action.workspace).pipe(
          map((workspace) => actions.createWorkspaceSuccess({ workspace })),
          catchError((error) => of(actions.createWorkspaceFail({ error })))
        )
      )
    )
  );

  deleteWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteWorkspace),
      switchMap((action) =>
        this.confirmation.open(DELETE_WORKSPACE_CONFIRMATION).pipe(
          switchMap((result) => {
            if (!result) return of({ type: 'NO_ACTION' });

            return this.workspacesService.delete(action.workspace).pipe(
              tap(() => this.snackbar.open('Workspace deleted')),
              map((workspace) => actions.deleteWorkspaceSuccess({ workspace })),
              catchError((error) => of(actions.deleteWorkspaceFail({ error })))
            );
          })
        )
      )
    )
  );

  editWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editWorkspace),
      switchMap((action) =>
        this.workspacesService.put(action.workspace).pipe(
          map((workspace) => actions.editWorkspaceSuccess({ workspace })),
          catchError((error) => of(actions.editWorkspaceFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions<Action>,
    private workspacesService: WorkspacesService,
    private confirmation: ConfirmationService,
    private snackbar: MatSnackBar
  ) {}
}

const DELETE_WORKSPACE_CONFIRMATION: ConfirmDialogOptions = {
  acceptLabel: 'Delete',
  cancelLabel: 'Cancel',
  message: 'Are you sure you want to delete this Workspace?',
  title: 'Delete Workspace',
};
