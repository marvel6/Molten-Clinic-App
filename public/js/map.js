mapboxgl.accessToken =
  'pk.eyJ1IjoibWFydmVsNiIsImEiOiJjbDN0N2dhNjIwNjB1M2NxcWtmcTdsdXhxIn0.7A1eBgOSyyqki-FttiA9rA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [6.9980, 3.4737]
});


async function getStore(store){
   const loc = await fetch('/api/v1/auth/stores');
   const res = await loc.json()


   try {
    
   } catch (error) {
    
   }

}



map.on('load', () => {

  map.addLayer({
    id: 'points',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          // {
          //   type: 'Feature',
          //   geometry: {
          //     type: 'Point',
          //     coordinates: [-77.4144, 25.0759]
          //   },
          //   properties:{
          //     clinicId:'001',
          //     icon:'shop'
          //   }
          // }
        ]
      }
    }, 
    layout: {
      'icon-image': '{icon}-15', 
      'icon-size': 1.5,
      'text-font':['San'],
      'text-offset':[0.0,0.9]
    }
  });

});








map.addSource('point', {
  'type': 'geojson',
  'data': {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.4144, 25.0759]
        }
      }
    ]
  }
}

);
