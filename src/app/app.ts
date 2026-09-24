import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const marker = L.marker([51.505, -0.09]).addTo(this.map);

    marker
      .bindPopup('<b>Hello from Angular!</b><br>This is a Leaflet marker.')
      .openPopup();

    const locations = [
      {
        name: 'Big Ben',
        coordinates: [51.5007, -0.1246] as L.LatLngExpression
      },
      {
        name: 'Tower Bridge',
        coordinates: [51.5055, -0.0754] as L.LatLngExpression
      },
      {
        name: 'Buckingham Palace',
        coordinates: [51.5014, -0.1419] as L.LatLngExpression
      }
    ];

    locations.forEach((location) => {
      L.marker(location.coordinates)
        .addTo(this.map)
        .bindPopup(`<b>${location.name}</b>`);
    });


    this.map.on('click', (event: L.LeafletMouseEvent) => {
      L.popup()
        .setLatLng(event.latlng)
        .setContent(
          `You clicked at:<br>
           Latitude: ${event.latlng.lat.toFixed(5)}<br>
           Longitude: ${event.latlng.lng.toFixed(5)}`
        )
        .openOn(this.map);
    });
  }
}