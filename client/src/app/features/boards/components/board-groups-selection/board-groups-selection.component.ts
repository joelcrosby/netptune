import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as selectors from '@boards/store/groups/board-groups.selectors';
import * as actions from '@boards/store/groups/board-groups.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-groups-selection',
  templateUrl: './board-groups-selection.component.html',
  styleUrls: ['./board-groups-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardGroupsSelectionComponent implements OnInit {
  selected$: Observable<number[]>;
  count$: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.selected$ = this.store.select(selectors.selectSelectedTasks);
    this.count$ = this.store.select(selectors.selectSelectedTasksCount);
  }

  onClearClicked() {
    this.store.dispatch(actions.clearTaskSelection());
  }

  onDeleteClicked() {
    this.store.dispatch(actions.deleteSelectedTasks());
  }
}
