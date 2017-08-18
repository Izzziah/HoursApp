import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer }     from 'rxjs/Observer';
// import '../rxjs-operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class APIService {

  private static headers: Headers;
  private static accessToken: string = '';
  private apiKey: string = "C86714EE-9246-482F-BF08-00FC7EF4D4EA";

  constructor(private http: Http) {
    if (APIService.headers === undefined) {
      APIService.headers = new Headers();
      APIService.headers.append('Accept', 'application/json');
      APIService.headers.append('Content-Type', 'application/json');
      APIService.headers.append('APIKey', this.apiKey);
      APIService.headers.append('accessToken', APIService.accessToken);
    }
  }

  public httpHeaders(): Headers {
    return APIService.headers;
  }

  public setToken(token: string) {
    APIService.headers.delete('accessToken');
    APIService.headers.append('accessToken', token);
    APIService.accessToken = token;
  }


  public Get(cmd: string) {
    console.log('Get string = ' + environment.birchAPI + cmd);
    return this.http.get(environment.birchAPI + cmd)
      .map(res => res.json())
      .catch(this.handleError);
  }

  public Post(cmd: string, bodyData: string) {
    //  let len = bodyData.length;
    //  if (this.headers["Content-Length"]) {
    //  this.headers.delete("Content-Length")
    //  }
    //  this.headers.append("Content-Length", len.toString());
    return this.http.post(environment.birchAPI + cmd, bodyData, { headers: APIService.headers })
      .map(res =>  { res.json(); } )
      .catch(this.handleError);
  }

  public Put(cmd: string, bodyData: string) {
    let len = bodyData.length;
    return this.http.put(environment.birchAPI + cmd, bodyData, { headers: APIService.headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): any {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error instanceof Response) {
      let resp: Response = error;
      let body = resp.json();
      if (body.Message) {
        errMsg = body.Message;
      }
    }
    error.message = errMsg;
    throw error;
  }
}
