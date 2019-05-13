import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { UserService } from '../../../shared/services/user/user.service';
import { UserRoleAuthGuard } from './user-role-auth.guard';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
describe('UserRoleAuthGuard', () => {

 let oktaAuthService: jasmine.SpyObj<OktaAuthService>;
 let userService: jasmine.SpyObj<UserService>;
 const mockoktaAuthService = {
  isAuthenticated(): Promise<any> {
    return new Promise<any>(resolve => resolve(true));
  },
  getOktaConfig: function() {
    const obj = {
      onAuthRequired: function() {}
    };
    return obj;
  },
  getUser: function() {
    return new Promise<any>(resolve => resolve({}));
  },
  setFromUri: function() {}
 };
 const mockUserService = {
  hasAnyAuthority(): Promise<any> {
    return new Promise<any>(resolve => resolve(true));
  },
  hasAirlineAccess: function() { return true; },
  hasSeveralAirlines: function() { return true; }
 };

 beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRoleAuthGuard,
        { provide: OktaAuthService, useValue: mockoktaAuthService },
        { provide: UserService, useValue: mockUserService },
        {  provide: ActivatedRoute, useValue: {
          params: Observable.of({ id: 'test' }),
          snapshot: {
            firstChild: {
              children: [
                {
                  params: {
                    airlineIcao: 'JBU'
                  }
                }
              ]
            },
            children: [
              {
                params: {
                  airlineIcao: 'AAL'
                }
              }
            ]
          }
        } }
     ],
      imports: [RouterTestingModule]
    });
    oktaAuthService = TestBed.get(OktaAuthService);
    userService = TestBed.get(UserService);

 }));

  it('checks if a user is valid',

    // inject your guard service AND Router
    async(inject([UserRoleAuthGuard], (auth) => {

      auth.canActivateChild();
      auth.getAccess();
      expect(auth.getAccess).toBeDefined();
    })
  ));
});
