import { Component, AfterViewInit, viewChild, ElementRef, signal, input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import { environtment } from '../../../../environments/environment';
@Component({
  imports: [],
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styles:`
  div{
     width:100%;
     height:260px;
  }
 

  `
})
export class MinimapComponent implements AfterViewInit {
divElement = viewChild<ElementRef>('map');
lngLat = input.required<{lng:number, lat:number}>()
zoom = input<number>(14);
  async ngAfterViewInit() {
     if(!this.divElement()?.nativeElement)return;
         await new Promise((resolve)=>setTimeout(resolve,80))
         const element = this.divElement()!.nativeElement;
        
    
          const map = new mapboxgl.Map({
          accessToken: environtment.mapboxKey, // associates the map with your Mapbox account and its permissions
          container: element, // container ID
          center:  this.lngLat() , // starting position [lng, lat]. Note that lat must be set between -90 and 90
          zoom:this.zoom(), // starting zoom
          interactive:false,
          pitch:30
      });
    
    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
  
}
