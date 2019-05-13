import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../../services/admin/airline/airline.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.scss']
})
export class AirlinesComponent implements OnInit {
  airlineList = [];
  isLoading = false;
  searchairline = '';
  actionToolBarConfig = {
    moduleName: 'airlines',
    enableSearch: true,
    enableCreate: false,
    id: 'btn-airlines',
    filterIds : {
      filterListId: 'filter-airlines-list',
      filterText: 'inp-filter-airlines-text'
    },
    buttonList : []
  };
  constructor(
    private airlineService: AirlineService) { }

  ngOnInit() {
    this.isLoading = false;
    this.getUserAirline();
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
