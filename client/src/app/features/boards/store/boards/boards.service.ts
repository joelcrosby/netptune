import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ClientResponse
} from '@core/models/client-response';
import { IsSlugUniqueResponse } from '@core/models/is-slug-unique-response';
import { AddBoardRequest } from '@core/models/requests/add-board-request';
import { BoardViewModel } from '@core/models/view-models/board-view-model';
import { environment } from '@env/environment';

@Injectable()
export class BoardsService {
  constructor(private http: HttpClient) {}

  get(projectId: number) {
    return this.http.get<BoardViewModel[]>(
      environment.apiEndpoint + `api/boards`,
      {
        params: new HttpParams().append('projectId', projectId.toString()),
      }
    );
  }

  getByWorkspace(slug: string) {
    return this.http.get<BoardViewModel[]>(
      environment.apiEndpoint + `api/boards/workspace/${slug}`
    );
  }

  post(request: AddBoardRequest) {
    return this.http.post<ClientResponse<BoardViewModel>>(
      environment.apiEndpoint + 'api/boards',
      request
    );
  }

  delete(boardId: number) {
    return this.http.delete<ClientResponse>(
      environment.apiEndpoint + `api/boards/${boardId}`
    );
  }

  isIdentifierUnique(identifier: string) {
    return this.http.get<ClientResponse<IsSlugUniqueResponse>>(
      environment.apiEndpoint + `api/boards/is-unique/${identifier}`
    );
  }
}
