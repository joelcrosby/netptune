import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AppState } from '@core/core.state';
import { loadProjects } from '@core/store/projects/projects.actions';
import { selectProjectsLoading } from '@core/store/projects/projects.selectors';
import { ProjectDialogComponent } from '@entry/dialogs/project-dialog/project-dialog.component';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsViewComponent implements AfterViewInit {
  loading$ = this.store.select(selectProjectsLoading).pipe(debounceTime(200));

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngAfterViewInit() {
    this.store.dispatch(loadProjects());
  }

  showAddModal() {
    this.dialog.open(ProjectDialogComponent, { width: '512px' });
  }
}
