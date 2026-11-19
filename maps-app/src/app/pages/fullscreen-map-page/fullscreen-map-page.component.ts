import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import { environtment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';




@Component({
  imports: [DecimalPipe, JsonPipe],
  selector: 'app-fullscreen-map-page',
 templateUrl: './fullscreen-map-page.component.html',
 styles:`
 div{
 width:100vw;
 height: calc(100vh - 64px) ;
 
 }
  
 #controls{
  background-color:white;
  padding:10px;
  border-radius:5px;
  position:fixed;
  bottom:25px;
  right: 20px;
  z-index:9999;
  box-shadow:0 0 10px 0 rgbs(0,0,0,0.1);
  border:1px solid #e2e8f0;
  width: 250px;
 }
 `
})
export class FullscreenMapPageComponent implements AfterViewInit{

divElement = viewChild<ElementRef>('map');
map = signal<mapboxgl.Map |null>(null);
zoom= signal(14);
coordinates= signal({
  lng:-74.5,
  lat:40,

})

zoomEffect = effect(()=>{
  if(!this.map()) return;
  this.map()?.setZoom(this.zoom())
  //this.map()?.zoomTo(this.zoom());

})


  async ngAfterViewInit() {
     if(!this.divElement()?.nativeElement)return;
     await new Promise((resolve)=>setTimeout(resolve,80))
     const element = this.divElement()!.nativeElement;
     const{ lng,lat} = this.coordinates();

      const map = new mapboxgl.Map({
      accessToken: environtment.mapboxKey, // associates the map with your Mapbox account and its permissions
      container: element, // container ID
      center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom(), // starting zoom
  });
 this.mapListeners(map);

  }

  mapListeners(map:mapboxgl.Map){

    map.on('zoomend',(event)=>{
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom);
    });
    map.on('moveend',()=>{
     const center = map.getCenter();
     this.coordinates.set(center);

    });

    map.on('load',()=>{
      console.log('object');
    });
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());
      this.map.set(map)
  }

  
}
