


// map start

L_NO_TOUCH = false;
L_DISABLE_3D = false;
            
var map = L.map(
    "main_live_farm_map",
    {
        center: [10.031328880834819, 77.58923154168474],
        crs: L.CRS.EPSG3857,
        zoom: 6,
        zoomControl: true,
        preferCanvas: false,
        fullscreenControl: true,
        className: 'map-tiles',
        // OR
        fullscreenControl: {
            pseudoFullscreen: false // if true, fullscreen to page width and height
        }
    }
    ).setView([10.031328880834819, 77.58923154168474], 6);
    

// var tile_layer = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
//     subdomains:['mt0','mt1','mt2','mt3'],
//     detectRetina: false,
//     maxNativeZoom: 18,
//     maxZoom: 18,
//     minZoom: 0, 
//     noWrap: false, 
//     opacity: 1, 
//     tms: false 
// }).addTo(map);



new L.basemapsSwitcher([
  {
    layer:  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      attribution: '&copy; <a href="https://www.google.com/intl/en_ALL/help/terms_maps/">Google Map</a> contributors',
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map), //DEFAULT MAP
    icon: '/static/app/img/map_ly1.png',
    name: 'Hybrid'
  },
  {
    layer: L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      attribution: '&copy; <a href="https://www.google.com/intl/en_ALL/help/terms_maps/">Google Map</a> contributors',
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }),
    icon: '/static/app/img/map_ly3.png',
    name: 'Satellite'
  },
  {
    layer: L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      attribution: '&copy; <a href="https://www.google.com/intl/en_ALL/help/terms_maps/">Google Map</a> contributors',
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }),
    icon: '/static/app/img/map_ly2.png',
    name: 'Streets'
  },

  {
    layer: L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
      attribution: '&copy; <a href="https://www.google.com/intl/en_ALL/help/terms_maps/">Google Map</a> contributors',
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }),
    icon: '/static/app/img/map_ly4.jpg',
    name: 'Terrain'
  },

], { position: 'bottomleft' }).addTo(map);





// L.marker([39.889769097989 , -75.2338026927865]).addTo(map).bindPopup('A pretty CSS popup.<br> Easily customizable.').openPopup();


var popup = L.popup({ "maxWidth": "100%" });
var html_Popup = $(`<div id="html_d98c5775adee4e84a08301ce8f03c626" style="width: 100.0%; height: 100.0%;">[24.9039, 67.0586]</div>`)[0];
popup.setContent(html_Popup);



/*===================================================
                      LAYER CONTROL               
===================================================*/

// var baseLayers = {
//     "Satellite":googleSat,
//     "Google Map":googleStreets,
//     "Water Color":Stamen_Watercolor,
//     "OpenStreetMap": osm,
// };

// var overlays = {
//     "Marker": singleMarker,
//     "PointData":pointdata,
//     "LineData":linedata,
//     "PolygonData":polygondata
// };

// L.control.layers(baseLayers, overlays).addTo(map);


// let details = navigator.userAgent;
  
// /* Creating a regular expression 
// containing some mobile devices keywords 
// to search it in details string*/
// let regexp = /android|iphone|kindle|ipad/i;
  
// /* Using test() method to search regexp in details
// it returns boolean value*/
// let isMobileDevice = regexp.test(details);
  
// if (isMobileDevice) {
//     console.log("You are using a Mobile Device");
// } else {
//     console.log("You are using Desktop");
// }