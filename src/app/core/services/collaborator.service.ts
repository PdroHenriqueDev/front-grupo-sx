import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Collaborator } from 'src/app/models/collaborator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
  ) { }

  showSnackBar(msg: string, action: string, time: number) {
    this.snackBar.open(msg, action, {
      duration: time,
    });
  }

  getCollaborator(code?: number): Observable<any> {
    const { apiURL } = environment;
    return code
      ? this.http.get(`${apiURL}/collaborator?id=${code}`)
          .pipe(
            catchError(err => {
              const errorMsg  = err.error.error;
              this.showSnackBar(errorMsg, 'Fechar', 2000)
              return throwError(() => err)
            }))
      : this.http.get(`${apiURL}/collaborator`)
          .pipe(
            catchError(err => {
              const errorMsg  = err.error.error;
              this.showSnackBar(errorMsg, 'Fechar', 2000)
              return throwError(() => err)
            }));
  }

  saveCollaborator(data: Collaborator): Observable<any> {
    const { apiURL } = environment;
    return this.http.post(`${apiURL}/collaborator/create`,  data)
      .pipe(
        catchError(err => {
          const errorMsg  = err.error.error;
          this.showSnackBar(errorMsg, 'Fechar', 2000)
          return throwError(() => err)
        }),
        map((res: any) => {
          if (!res?.error) {
            const successMsg = res.data;
            this.showSnackBar(successMsg, 'Fechar', 2000);
          }
        })
      );
  }

  updateCollaborator(code: number, data: Collaborator): Observable<any> {
    const { apiURL } = environment;
    return this.http.put(`${apiURL}/collaborator/${code}`,  data)
      .pipe(
        catchError(err => {
          const errorMsg  = err.error.error;
          this.showSnackBar(errorMsg, 'Fechar', 2000)
          return throwError(() => err)
        }),
        map((res: any) => {
          if (!res?.error) {
            const successMsg = res.data;
            this.showSnackBar(successMsg, 'Fechar', 2000);
          }
        })
      );
  }

  deleteCollaborator(code: number) {
    const { apiURL } = environment;

    return this.http.delete(`${apiURL}/collaborator/${code}`)
      .pipe(
        catchError(err => {
          const errorMsg  = err.error.error;
          this.showSnackBar(errorMsg, 'Fechar', 2000)
          return throwError(() => err)
        }),
        map((res: any) => {
          if (!res?.error) {
            const successMsg = res.data;
            this.showSnackBar(successMsg, 'Fechar', 2000);
          }
        })
      );
  }

}
