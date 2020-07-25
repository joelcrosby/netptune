import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService } from '@core/services/confirmation.service';
import { ConfirmDialogOptions } from '@entry/dialogs/confirm-dialog/confirm-dialog.component';
import { AppState, selectRouterState } from '@core/core.state';
import * as ProjectTaskActions from '@core/store/tasks/tasks.actions';
import { selectWorkspace } from '@core/store/workspaces/workspaces.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as actions from './board-groups.actions';
import { BoardGroupsService } from './board-groups.service';

@Injectable()
export class BoardGroupsEffects {
  loadBoardGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBoardGroups),
      withLatestFrom(this.store.select(selectRouterState)),
      map(([action, router]) => {
        const id = router.state.params.id;
        return [action, id];
      }),
      switchMap(([action, id]) =>
        this.boardGroupsService.get(id).pipe(
          map((boardGroups) => actions.loadBoardGroupsSuccess({ boardGroups })),
          catchError((error) => of(actions.loadBoardGroupsFail({ error })))
        )
      )
    )
  );

  loadBoardGroupsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadBoardGroupsFail),
        tap(() => {
          const url = this.router.routerState.snapshot.url;
          const parts = url.split('/');
          parts.pop();
          const base = parts.join('/');

          this.router.navigateByUrl(base);
        })
      ),
    { dispatch: false }
  );

  createBoardGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createBoardGroup),
      switchMap((action) =>
        this.boardGroupsService.post(action.request).pipe(
          map((boardGroup) => actions.createBoardGroupSuccess({ boardGroup })),
          catchError((error) => of(actions.createBoardGroupFail({ error })))
        )
      )
    )
  );

  createProjectTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectTaskActions.createProjectTasksSuccess),
      map(() => actions.loadBoardGroups())
    )
  );

  taskDeleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectTaskActions.deleteProjectTasksSuccess),
      map(() => actions.loadBoardGroups())
    )
  );

  deleteBoardGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteBoardGroup),
      switchMap((action) =>
        this.confirmation.open(DELETE_CONFIRMATION).pipe(
          switchMap((result) => {
            if (!result) return of({ type: 'NO_ACTION' });

            return this.boardGroupsService.delete(action.boardGroup).pipe(
              tap(() => this.snackbar.open('Board Group Deleted')),
              map((boardGroup) =>
                actions.deleteBoardGroupSuccess({ boardGroup })
              ),
              catchError((error) => of(actions.deleteBoardGroupFail({ error })))
            );
          })
        )
      )
    )
  );

  editBoardGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editBoardGroup),
      switchMap((action) =>
        this.boardGroupsService.put(action.boardGroup).pipe(
          map((boardGroup) => actions.editBoardGroupSuccess({ boardGroup })),
          catchError((error) => of(actions.editBoardGroupFail({ error })))
        )
      )
    )
  );

  moveTaskInBoardGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.moveTaskInBoardGroup),
      switchMap((action) =>
        this.boardGroupsService.moveTaskInBoardGroup(action.request).pipe(
          map(actions.moveTaskInBoardGroupSuccess),
          catchError((error) => of(actions.moveTaskInBoardGroupFail({ error })))
        )
      )
    )
  );

  onWorkspaceSelected$ = createEffect(() =>
    this.actions$.pipe(ofType(selectWorkspace), map(actions.clearState))
  );

  constructor(
    private actions$: Actions<Action>,
    private boardGroupsService: BoardGroupsService,
    private store: Store<AppState>,
    private confirmation: ConfirmationService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
}

const DELETE_CONFIRMATION: ConfirmDialogOptions = {
  acceptLabel: 'Delete',
  cancelLabel: 'Cancel',
  message: 'Are you sure you want to delete this group?',
  title: 'Delete Group',
};
