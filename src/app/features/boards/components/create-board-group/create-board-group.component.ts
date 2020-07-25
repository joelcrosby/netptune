import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@app/core/core.state';
import * as GroupSelectors from '@boards/store/groups/board-groups.selectors';
import { BoardGroupDialogComponent } from '@entry/dialogs/board-group-dialog/board-group-dialog.component';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-board-group',
  templateUrl: './create-board-group.component.html',
  styleUrls: ['./create-board-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBoardGroupComponent {
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  onClick() {
    this.store
      .select(GroupSelectors.selectBoardId)
      .pipe(
        first(),
        tap((boardId) =>
          this.dialog.open(BoardGroupDialogComponent, {
            width: '600px',
            data: {
              boardId,
            },
          })
        )
      )
      .subscribe();
  }
}
