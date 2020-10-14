import { ClientResponse } from '@core/models/client-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function unwrapClientReposne<T>() {
  return <P = {}>(source: Observable<T extends ClientResponse<P> ? T : null>): Observable<P> => {
    return source.pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payload;
        } else {
          throw new Error(`Server responded with failure${response.message ? ': ' + response.message : ''}`);
        }
      })
    );
  };
}
