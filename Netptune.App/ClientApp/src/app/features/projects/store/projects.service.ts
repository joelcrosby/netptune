import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '@app/core/models/project';
import { environment } from '@env/environment';
import { Workspace } from '@app/core/models/workspace';
import { throwError } from 'rxjs';

@Injectable()
export class ProjectsService {
  constructor(private http: HttpClient) {}

  get(workspace: Workspace) {
    if (!workspace) {
      return throwError('no current workspace');
    }
    return this.http.get<Project[]>(
      environment.apiEndpoint + `api/projects?workspaceId=${workspace.id}`
    );
  }

  post(project: Project) {
    return this.http.post<Project>(environment.apiEndpoint + 'api/projects', project);
  }
}
