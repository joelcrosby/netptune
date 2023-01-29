import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import * as BoardGroupActions from '@boards/store/groups/board-groups.actions';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';

export interface BoardGroupDialogData {
  boardId: number;
  identifier: string;
}

@Component({
  selector: 'app-board-group-dialog',
  templateUrl: './board-group-dialog.component.html',
  styleUrls: ['./board-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardGroupDialogComponent {
  form = this.fb.nonNullable.group({
    group: '',
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BoardGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardGroupDialogData
  ) {}

  onSubmit() {
    const name = this.form.getRawValue().group;
    const identifier = this.data.identifier;

    this.store.dispatch(
      BoardGroupActions.createBoardGroup({
        identifier,
        request: {
          name,
          boardId: this.data.boardId,
        },
      })
    );

    this.dialogRef.close();
  }
}
