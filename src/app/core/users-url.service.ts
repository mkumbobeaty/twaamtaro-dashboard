import { Injectable }    from '@angular/core';

@Injectable()
export class UsersUrlService {
  
  public apiUrl = 'http://twaamtaro.org/api/v1/'; 
  public localUrl = 'http://localhost:3000/api/v1/'; 
  public usersUrl = 'users/'; 
  public alertUrl = 'users/remind';
  public verifyUrl = 'users/verify';
  public leaderRequestsUrl = 'users/new_leaders';
  public registerUserUrl = 'registrations/';
  public massMessagingUrl = '';
  
  constructor() { }

}


