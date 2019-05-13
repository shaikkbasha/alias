import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivateChild, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserRoleAuthGuard implements CanActivateChild {
  private userHasAccess = new BehaviorSubject(null);
  hasAccess = this.userHasAccess.asObservable();

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  canActivateChild() {
    setTimeout(() => {
      this.getAccess();
    });
    return true;
  }

  getAccess() {
    if (this.route.snapshot.firstChild.children[0]) {
      let data: any;
      const airline = 'JBU';
      if (this.route.snapshot.firstChild.children[0].params.airlineIcao.toLowerCase() === airline.toLowerCase()) {
        data = {
          hasAirlineAccess: (this.route.snapshot.firstChild.children[0].params.airlineIcao.toLowerCase() === airline.toLowerCase())
        };
      } else {
        data = {
          hasAirlineAccess: false
        };
      }
      this.userHasAccess.next(data);

    }
  }

  checkJBUAccess(data) {
    if (data && !data['hasAirlineAccess']) {
      if ((this.router.url.indexOf('tv-performance') !== -1) ||
      (this.router.url.indexOf('scores') !== -1) ) {
        this.router.navigate(['access-denied']);
      }
      return false;
    } else {
      return true;
    }
  }

}
