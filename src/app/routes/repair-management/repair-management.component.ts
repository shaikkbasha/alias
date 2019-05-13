import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair-management.component.html',
  styleUrls: ['./repair-management.component.css']
})
export class RepairManagementComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {

    /**Check Role Acces */
    this.userService.checkUserRole.subscribe((userInfo) => {
      const role = userInfo.roles ? (userInfo.roles.indexOf('repairs') === -1) : ([].indexOf('repairs') === -1);
      const groups = userInfo.groups ? (userInfo.groups.indexOf('repairs') === -1) : ([].indexOf('repairs') === -1);
      if (userInfo) {
        if (role && groups) {
          if (this.router) {
            this.router.navigate(['access-denied']);
          }
        }
      }
    });

  }
  isActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
