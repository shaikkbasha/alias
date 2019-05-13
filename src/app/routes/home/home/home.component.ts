import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/services/user/user';
import { Router } from '@angular/router';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  airlineList = [];
  userDetails: User;
  isUserAuthenticated = false;
  enableRepairModule = true;
  isLoading = false;
  searchairline = '';
  constructor(private userService: UserService,
    private airlineService: AirlineService, private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
    this.getUser();
    this.getUserAirline();
  }

  getUser() {
    this.enableRepairModule = true;
    this.userService.identity().then((user) => {
      console.log('userblock#getUser: ', user);
      this.userDetails = user;
      this.isUserAuthenticated = true;
      // Repairs link on the Home Page is displayed for users with 'repairs' role/group
      const role = user.roles ? (user.roles.indexOf('repairs') === -1) : ([].indexOf('repairs') === -1);
      const groups = user.groups ? (user.groups.indexOf('repairs') === -1) : ([].indexOf('repairs') === -1);
      if (user) {
        if (role && groups) {
          this.enableRepairModule = false;
        }
      }
    });
  }

  getUserAirline() {
    this.isLoading = true;
    this.airlineService.getAirlineForUser().subscribe(list => {
      this.isLoading = false;
      if (list && list.length) {
      list.forEach(value => {
        if (value.icao) {
          this.airlineList.push(value);
        }
      });
    }
    });

  }
}
