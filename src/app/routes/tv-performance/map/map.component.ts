import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Stroke, Style, Icon } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import Select from 'ol/interaction/Select.js';
import GeoJSON from 'ol/format/GeoJSON.js';

import { AntennaService } from './../../../shared/services/tv-performance/antenna/antenna.service';
import { TvPerformanceDataService } from '../../../shared/services/tv-performance/tv-performance-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  map: any;
  style: any;
  flightDetails: any;
  overlay: any;
  hideOverlay = true;
  geoData: any;
  airLinesCordinates = {
    source: null,
    dest: null
  };
  private subscribeSer: any;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ViewChild('geoDatails') popUpContent;

  constructor(
    private eleRef: ElementRef,
    private mapService: AntennaService,
    private modalService: NgbModal,
    private dataService: TvPerformanceDataService) { }

  ngOnInit() {
    this.subscribeSer = this.dataService.getData().subscribe(data => {
      if (data['id'] && data['icao']) {
        this.flightDetails = data;
        if (this.flightDetails.arrivalAirport && this.flightDetails.departureAirport) {
          const fData = this.flightDetails;
          if (fData.arrivalAirport.length === 3) {
            this.mapService.getAllAirportData(`${fData.arrivalAirport},${fData.departureAirport}`).subscribe(resp => {
              this.formAirportsSourceDest(resp, 'iata');
            });
          } else {
            this.mapService.getAllAirportData(`${fData.arrivalAirport},${fData.departureAirport}`, true).subscribe(resp => {
              this.formAirportsSourceDest(resp, 'icao');
            });
          }
        }
        this.getFlightLatAndLang();
      }
    });
  }
  formAirportsSourceDest(resp: any, field: string) {
    if (resp) {
      const destIndx = resp.findIndex(x => x[field] === this.flightDetails.arrivalAirport);
      const sourceIndx = resp.findIndex(x => x[field] === this.flightDetails.departureAirport);
      this.airLinesCordinates.source = resp[sourceIndx];
      this.airLinesCordinates.dest = resp[destIndx];
    }
  }


  getFlightLatAndLang() {
    this.mapService.getAntennaDetails(this.flightDetails['icao'], this.flightDetails['id'])
      .subscribe(res => {
        if (res.length) {
          this.getLocationData(res);
        }
      }, err => console.log(err));
  }

  getLocationData(data) {

    // For detail design page
    // geoJson have longitude/latitude coordinates sequence
    //  and projection must be 'EPSG:4326' for geoJson data
    // https://medium.com/@sumit.arora/what-is-geojson-geojson-basics-visualize-geojson-open-geojson-using-qgis-open-geojson-3432039e336d

    const features = [];
    let firstLongitude: string;
    let firstLatitude: string;
    let lastLongitude: string;
    let lastLatitude: string;

    for (let i = 0; i < data.length - 1; i++) {
      const start = i;
      const end = i + 1;

      const longitudeStart = data[start]['longitude'];
      const latitudeStart = data[start]['latitude'];
      const longitudeEnd = data[end]['longitude'];
      const latitudeEnd = data[end]['latitude'];

      features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[longitudeStart, latitudeStart], [longitudeEnd, latitudeEnd]]
        },
        'properties': {
          'antennaState': data[start]['antennaState'],
          'rssi': data[start]['rssi'],
          'timeStamp': data[start]['timeStamp']
        }
      });
    }
    // add first geo point pin
    if (this.airLinesCordinates.source && this.airLinesCordinates.source.latitude) {
      firstLongitude = this.airLinesCordinates.source.longitude;
      firstLatitude = this.airLinesCordinates.source.latitude;
    } else {
      firstLongitude = data[0]['longitude'];
      firstLatitude = data[0]['latitude'];
    }
    features.push({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [firstLongitude, firstLatitude]
      },
      'properties': {
        'name': 'departure'
      }
    });
    // add last point pin
    if (this.airLinesCordinates.dest && this.airLinesCordinates.dest.latitude) {
      lastLongitude = this.airLinesCordinates.dest.longitude;
      lastLatitude = this.airLinesCordinates.dest.latitude;
    } else {
      lastLongitude = data[data.length - 1]['longitude'];
      lastLatitude = data[data.length - 1]['latitude'];
    }

    features.push({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [lastLongitude, lastLatitude]
      },
      'properties': {
        'name': 'arrival'
      }
    });

    const geojsonObject = {
      'type': 'FeatureCollection',
      'features': features,
    };

    const vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(geojsonObject),
    });

    const styles = {
      'route-green': new Style({
        stroke: new Stroke({
          width: 6,
          color: '#00FF00'
        })
      }),
      'route-red': new Style({
        stroke: new Stroke({
          width: 6,
          color: '#FF0000'
        })
      }),
      'startIcon': new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: './../assets/img/tv-map/departure.png'
        })
      }),
      'endIcon': new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: './../assets/img/tv-map/arrival.png'
        })
      })
    };

    const styleFunction = function (feature) {
      const featureProperties = feature.getProperties();

      if (feature.getGeometry().getType() === 'Point') {
        return feature.values_.name === 'departure' ? styles['startIcon'] : styles['endIcon'];
      } else if ((featureProperties.antennaState === 'Tracking') && (featureProperties.rssi >= -5.0)) {
        return styles['route-green'];
      } else {
        return styles['route-red'];
      }
    };

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction
    });

    const view = new View({
      projection: 'EPSG:4326',
      center: [0, 0],
      zoom: 3
    });

    // For good map with terrain but need to pay...
    // const url = 'https://{1-4}.aerial.maps.cit.api.here.com' +
    //   '/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/png' +
    //   '?app_id=Your HERE Maps appId from https://developer.here.com&app_code=Your HERE Maps appCode from https://developer.here.com/';

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer
      ],
      target: 'map',
      view: view
    });

    this.map.on('pointermove', evt => {
      if (!evt.dragging) {
        this.map.getTargetElement().style.cursor = this.map.hasFeatureAtPixel(this.map.getEventPixel(evt.originalEvent)) ? 'pointer' : '';
      }
    });

    // fit map
    const extent = vectorLayer.getSource().getExtent();
    this.map.getView().fit(extent, {
      size: this.map.getSize()
    });

    // https://openlayers.org/en/latest/examples/select-features.html
    const select = new Select();
    this.map.addInteraction(select);
    select.on('select', e => {
      if (e.target.getFeatures().array_[0]) {
        const featureProperties = e.target.getFeatures().array_[0].getProperties();
        if (featureProperties.timeStamp) {
          const scrollPos = document.getElementsByTagName('body')[0].scrollTop;
          this.geoData = undefined;
          this.modalService.open(this.popUpContent, { ariaLabelledBy: 'modal-basic-title', centered: true })
            .result.then((result) => { }, reason => {
              this.scrollFix(scrollPos);
              select.getFeatures().clear();
            });
          this.mapService.getGeographicalData(this.flightDetails['icao'], this.flightDetails['id'], featureProperties.timeStamp)
            .subscribe(res => {
              this.geoData = res;
            }, err => console.log(err));
        } else {
          if (featureProperties.name === 'departure') {
            this.showIconPopup('source');
          } else if (featureProperties.name === 'arrival') {
            this.showIconPopup('dest');
          }
          select.getFeatures().clear();
        }
      }
    });
  }

  showIconPopup(stype: string) {
    const scrollPos = document.getElementsByTagName('body')[0].scrollTop;
    this.geoData = { data: this.airLinesCordinates, isIcon: true, type: stype };
    this.modalService.open(this.popUpContent, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => { }, reason => {
        this.scrollFix(scrollPos);
      });
  }
  scrollFix(scrollPos) {
    setTimeout(() => {
      document.getElementsByTagName('body')[0].scrollTo(0, scrollPos);
    });
  }

  ngOnDestroy() {
    this.geoData = [];
    this.flightDetails = [];
    this.subscribeSer.unsubscribe();
  }
}
