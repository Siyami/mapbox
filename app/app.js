import './app.scss';

let MAPBOX_TOKEN = 'pk.eyJ1IjoiaW50ZWdyYWxnaXMiLCJhIjoiY2plajNiOXAwM2RhbTJwbG45cnYyd2kycyJ9.5ayhl9GwdjpTpC1zE8A0xg';
let MAPBOX_STYLE = 'mapbox://styles/integralgis/cjnf43ayw05dp2tn034rr5mk2';
let people = [];
let peopleUnderAge30 = [];

mapboxgl.accessToken = MAPBOX_TOKEN;
var map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_STYLE,
    // center: [87.485721, -22.168051],
    zoom: 1
});


/////
// var map = new mapboxgl.Map({
//     container: 'map', // HTML container id
//     style: 'mapbox://styles/mapbox/streets-v9', // style URL
//     center: [-21.92661562, 64.14356426], // starting position as [lng, lat]
//     zoom: 13
//   });
  
//   var popup = new mapboxgl.Popup()
//   .setHTML('<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>');
  
//   var marker = new mapboxgl.Marker()
//   .setLngLat([-21.92661562, 64.14356426])
//   .setPopup(popup)
//   .addTo(map);

function getPeople(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function filterList(filter) {
    let filteredList = [];
    let div = document.getElementById('emp');                

    var child = div.lastElementChild;  
    while (child) { 
        div.removeChild(child); 
        child = div.lastElementChild; 
    } 

    for(let el of people) {
        if(el.age < filter) filteredList.push(el);
    }
    
    let list = document.createElement('ul'); 
    for(let el of filteredList) {
        let item = document.createElement('li');
        item.appendChild(document.createTextNode(el.name));
        list.appendChild(item);
    }
    document.getElementById('emp').appendChild(list);
}

let range = document.getElementById('range');
range.addEventListener('change', function(event) {
    let fil = event.target.value;
    document.getElementById('filter-text').innerText = `Show ages ${fil} and under`;
    filterList(fil);
});

getPeople('https://cors-anywhere.herokuapp.com/https://apps.integralgis.com/node/integralgis/people.json', function(data){
    people = JSON.parse(data);
    for(let el of people) {
        var marker = new mapboxgl.Marker()
        .setLngLat([el.longitude, el.latitude])
        .addTo(map);
    }

    filterList(30);
});
