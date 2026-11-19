import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import { environtment } from '../../../environments/environment';
import {v4 as UUIDV4} from 'uuid';
import { JsonPipe } from '@angular/common';
interface Marker {
  id:string;
  mapboxMarker:mapboxgl.Marker;
}

@Component({
  imports: [JsonPipe],
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
 
  divElement = viewChild<ElementRef>('map1');
  map = signal<mapboxgl.Map |null>(null);
  markers = signal<Marker[]>([])
  zoom= signal(14);
coordinates= signal({
  lng:-122.40985,
  lat:37.793085,

})

 async ngAfterViewInit(){
      if(!this.divElement()?.nativeElement)return;
         const element = this.divElement()!.nativeElement;
         const{ lng,lat} = this.coordinates();
    
          const map = new mapboxgl.Map({
          accessToken: environtment.mapboxKey, // associates the map with your Mapbox account and its permissions
          container: element, // container ID
          center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
          zoom: this.zoom(), // starting zoom
      });
      // aca se adiciono el marker
      // const marker = new mapboxgl.Marker({
      //   // aca se indico que se puede arrastrar
      //   color:'red',
      //   draggable:true,
      // })
      // .setLngLat([-122.40985,37.793085])
      // .addTo(map);
      // marker.on('dragend',(event)=>{
      //   console.log(event);
      // })

     this.mapListeners(map);
    
  }

  mapListeners(map:mapboxgl.Map){
   map.on('click',(event)=>this.mapClick(event))
    this.map.set(map);
  }

  mapClick(event:mapboxgl.MapMouseEvent){
    if(!this.map()) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
  ((Math.random() * 16) | 0).toString(16)
);
   
const coords = event.lngLat;
const map = this.map()!;
   const marker = new mapboxgl.Marker({
         // aca se indico que se puede arrastrar
        color:color,
        draggable:true,
       })
       .setLngLat(coords)
       .addTo(map);

       const newMarker:Marker={
        id:UUIDV4(),
        mapboxMarker:marker

       }
      this.markers.set([newMarker,...this.markers()])
      console.log(this.markers())
   
  }

  flyToMarker(lngLat:mapboxgl.LngLatLike){

    if(!this.map()) return;

    this.map()?.flyTo({
      center:lngLat
    })

  }

  deleteMarker(marker:Marker){
    if(!this.map()) return;
    const map = this.map()!
    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m)=>m.id != marker.id))
  }
}
