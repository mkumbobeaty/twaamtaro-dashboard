import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import { DrainsUrlService } from "./drains-url.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';



@Injectable()
export class DrainsService {

  private headers = new Headers({'Accept': 'application/json', 'charset': 'utf-8'});
  private headersCustom = new Headers({'Content-Type': 'application/json'});
  private options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private urlService: DrainsUrlService) { }
  drainData: any;
  ranksData: any;
  helpDrains: any;
  getDrains(): Observable<any[]> {
    return this.http.get(this.urlService.apiUrl+this.urlService.drainsUrl)
           .map((response: Response) => response.json().drains)
           .catch(this.errorHandler);
          }
  getCleanDrains():Observable<any[]>  {
    return this.http.get(this.urlService.apiUrl+this.urlService.cleanDrainsUrl)
           .map((response: Response) =>  response.json().drains)
           .catch(this.errorHandler);
          }
  getDirtyDrains(): Observable<any[]> {
    return this.http.get(this.urlService.apiUrl+this.urlService.dirtyDrainsUrl)
           .map((response: Response) => response.json().drains)
           .catch(this.errorHandler);
          }
  getHelpDetails(): any {

    return this.http.get(this.urlService.apiUrl+this.urlService.helpDetailsUrl)
           .map((response: Response) => {
            this.helpDrains = response.json();
        })
           .catch(this.errorHandler);
          }
  getHelpDrains(): Observable<any[]> {
    return this.http.get(this.urlService.apiUrl+this.urlService.helpDrainsUrl)
      .map((response: Response) => response.json().drains)
      .catch(this.errorHandler);
  }

  getFilteredHelp(status?) {
    if (status == null ) {
      console.log("Null Service")
      return this.getHelpDetails();
    }
    else {
      console.log("Non-Null Service")
      return this.getHelpDetails()
      .map(drains => drains.find(drain => drain.status === status))
      .catch(this.errorHandler);
    }

  }
  getUnknownDrains():Observable<any[]> {
    return this.http.get(this.urlService.apiUrl+this.urlService.unknownDrainsUrl)
          .map((response: Response) => response.json().drains)
          .catch(this.errorHandler);
  }
  getDrainData():Observable<any> {
    return this.http.get(this.urlService.apiUrl + this.urlService.drainDataUrl)
          .map((response: Response) => {
              this.drainData = response.json();
          })
          .catch(this.errorHandler);

  }
  getRanksData():Observable<any[]> {
    return this.http.get(this.urlService.apiUrl +this.urlService.ranksDataUrl)
          .map((response: Response) => {
            this.ranksData = response.json().ranking;
          })
          .catch(this.errorHandler);

  }
  alertVEO(street): any {
    return this.http.post(street, {headers: this.headers})
      .subscribe(res => {
        let alertData = res.json();
      });
  }


    status(roleRequest): any {

      return this.http.post(this.urlService.apiUrl+this.urlService.verifyUrl, roleRequest, {headers: this.headers})
      .map(res => {

      })
      .catch(this.errorHandler);
    }

    update_status(data): any {

      return this.http.post(this.urlService.apiUrl+this.urlService.status, JSON.stringify(data), {headers: this.headersCustom})
      .map(res => { res.json();

      })
      .catch(this.errorHandler);
    }

  searchNeedHelps(data): Observable<any[]>{

    return this.http.post(this.urlService.apiUrl+this.urlService.search, JSON.stringify(data), {headers: this.headersCustom})
      .map(res => res.json())
      .catch(this.errorHandler);
  }



  errorHandler(error: Response) {
             console.error(error);
             return Observable.throw(error || 'Sorry, something went wrong');

  }




}


