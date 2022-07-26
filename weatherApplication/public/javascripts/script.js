var myMap = L.map('worldmap',
{
center: [48.866667, 2.333333],
zoom: 4
}
);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

var cities = document.getElementsByClassName('list-group-item');

for(let i = 0; i < cities.length; i++) {
    var lon = cities[i].dataset.lon
    var lat = cities[i].dataset.lat
    L.marker([lat,lon]).addTo(myMap);
    var cityNamePopup = cities[i].dataset.cityname
    L.marker([lat,lon]).addTo(myMap).bindPopup(cityNamePopup);
}



// var customIcon = L.icon({
//     iconUrl: 'leaf-green.png',
//     shadowUrl: 'leaf-shadow.png',
   
//     iconSize:   [38, 95],
//     shadowSize:  [50, 64],
   
//     iconAnchor:  [22, 94],
//     shadowAnchor: [4, 62],  
   
//     popupAnchor: [-3, -76]
//    });
//    L.marker([48.858370, 2.294481], {icon: customIcon}).addTo(myMap);

//    var circle = L.circle(
//     [48.858370, 2.294481],
//     {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.2,
//     radius: 500
//     }
//    ).addTo(myMap);

//    var polygon = L.polygon([
//     [48.858370, 2.294481],
//     [48.873791, 2.295027],
//     [48.865633, 2.321235]
//    ]).addTo(myMap);