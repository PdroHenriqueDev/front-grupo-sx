import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  showSnackBar(msg: string, action: string, time: number) {
    this.snackBar.open(msg, action, {
      duration: time,
    });
  }

  getCompany(code?: number): Observable<any> {
    const { apiURL } = environment;
    return code
      ? this.http.get(`${apiURL}/company?id=${code}`)
          .pipe(
            catchError(err => {
              const errorMsg  = err.error.error;
              this.showSnackBar(errorMsg, 'Fechar', 2000)
              return throwError(() => err)
            }))
      : this.http.get(`${apiURL}/company`)
          .pipe(
            catchError(err => {
              const errorMsg  = err.error.error;
              this.showSnackBar(errorMsg, 'Fechar', 2000)
              return throwError(() => err)
            }));
  }

  saveCompany(data: Company): Observable<any> {
    const { apiURL } = environment;
    return this.http.post(`${apiURL}/company/create`,  data)
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

  updateCompany(code: number, data: Company): Observable<any> {
    const { apiURL } = environment;
    return this.http.put(`${apiURL}/company/${code}`,  data)
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

  deleteCompany(code: number) {
    const { apiURL } = environment;

    return this.http.delete(`${apiURL}/company/${code}`)
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
