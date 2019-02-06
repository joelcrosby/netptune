import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { dropIn } from '@app/core/animations/animations';
import { Maybe } from '@app/core/types/nothing';
import { ConfirmDialogComponent } from '@app/dialogs/confirm-dialog/confirm-dialog.component';
import { ProjectDialogComponent } from '@app/dialogs/project-dialog/project-dialog.component';
import { Project } from '@app/models/project';
import { ProjectTaskCounts } from '@app/models/view-models/project-task-counts';
import { ProjectTaskService } from '@app/services/project-task/project-task.service';
import { ProjectsService } from '@app/services/projects/projects.service';
import { WorkspaceService } from '@app/services/workspace/workspace.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.index.component.html',
  styleUrls: ['./projects.index.component.scss'],
  animations: [dropIn]
})
export class ProjectsComponent implements OnInit {

  exportInProgress = false;
  taskCounts: ProjectTaskCounts[] = [];

  selectedProject: Maybe<Project>;

  constructor(
    public projectsService: ProjectsService,
    public projectTaskService: ProjectTaskService,
    private workspaceService: WorkspaceService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }

  async ngOnInit(): Promise<void> {
    await this.refreshData();
  }

  async refreshData(): Promise<void> {

    if (!this.workspaceService.currentWorkspace) {
      throw new Error('unable to refresh projects when current worksapce is undefined');
    }

    await this.projectsService.refreshProjects(this.workspaceService.currentWorkspace);
    await this.getProjectTaskCounts();
  }

  trackById(index: number, project: Project) {
    return project.id;
  }

  async getProjectTaskCounts(): Promise<void> {
    for (let i = 0; i < this.projectsService.projects.length; i++) {
      const project = this.projectsService.projects[i];
      this.taskCounts.push(
        await this.projectTaskService.getProjectTaskCount(project.id).toPromise()
      );
    }
  }

  addProject(project: Project): void {
    this.projectsService.addProject(project)
      .subscribe((projectResult) => {
        if (projectResult) {
          this.refreshData();
          this.snackBar.open(`Project ${projectResult.name} Added!.`, undefined, {
            duration: 3000,
          });
        }
      }, error => {
        this.snackBar.open('An error occured while trying to create the project. ' + error, undefined, {
          duration: 2000,
        });
      });
  }

  updateProject(project: Project): void {
    this.projectsService.updateProject(project)
      .subscribe(result => {
        project = result;
        this.refreshData();
      });
  }

  deleteProject(project: Project): void {
    this.projectsService.deleteProject(project)
      .subscribe(projectResult => {
        this.projectsService.projects.forEach((item, itemIndex) => {
          if (item.id === projectResult.id) {
            this.projectsService.projects.splice(itemIndex, 1);
          }
        });
      });
  }

  showAddModal(): void {
    this.open();
  }

  showUpdateModal(project: Project): void {
    if (project === null) { return; }

    this.selectedProject = project;
    this.open(this.selectedProject);
  }

  showDeleteModal(project: Project): void {
    if (project === null) { return; }

    this.selectedProject = project;
    this.openConfirmationDialog(this.selectedProject);
  }

  open(project?: Project): void {

    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '600px',
      data: project
    });

    dialogRef.afterClosed().subscribe((result: Project) => {

      if (!result) { return; }

      const workspace = this.workspaceService.currentWorkspace;
      if (!workspace) { throw new Error(`current workspace was undefined`); }

      if (this.selectedProject) {

        const updatedProject = new Project();
        updatedProject.id = this.selectedProject.id;
        updatedProject.name = result.name;
        updatedProject.description = result.description;
        updatedProject.workspaceId = workspace.id;
        this.updateProject(updatedProject);
      } else {
        const newProject = new Project();
        newProject.name = result.name;
        newProject.description = result.description;
        newProject.workspaceId = workspace.id;
        this.addProject(newProject);
      }

      this.clearModalValues();
    });
  }

  openConfirmationDialog(project: Project) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        title: 'Delete Project',
        content: `Are you sure you wish to delete ${project.name}? \nThis will delete all tasks assosiated with it!`,
        confirm: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe((result: Project) => {

      if (result) {
        this.projectsService.deleteProject(project)
          .subscribe((data: Project) => {
            project = data;
            this.refreshData();
            this.snackBar.open('Project Deleted.', 'Undo', {
              duration: 3000,
            });

          }, error => {
            this.snackBar.open('An error occured while trying to delete project' + error, undefined, {
              duration: 2000,
            });
          });
      }

      this.clearModalValues();

    });
  }

  clearModalValues(): void {
    this.selectedProject = null;
  }

}
