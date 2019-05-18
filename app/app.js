import './app.scss';

let MAPBOX_TOKEN = 'pk.eyJ1IjoiaW50ZWdyYWxnaXMiLCJhIjoiY2plajNiOXAwM2RhbTJwbG45cnYyd2kycyJ9.5ayhl9GwdjpTpC1zE8A0xg';
let MAPBOX_STYLE = 'mapbox://styles/integralgis/cjnf43ayw05dp2tn034rr5mk2';
let apiUrl = 'https://cors-anywhere.herokuapp.com/https://apps.integralgis.com/node/integralgis/people.json';
let employees = [];

mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_STYLE,
    zoom: 1
});

function getPeople(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) callback(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr; 
}

function filterList(filter) {
    let filteredList = [];
    let div = document.getElementById('emp');                
    let child = div.lastElementChild;  

    // remove if a list exists
    while (child) { 
        div.removeChild(child); 
        child = div.lastElementChild; 
    } 

    for(let el of employees) {
        if(el.age < filter) filteredList.push(el);
    }
    // Sort filtered array by name to make it user friendly
    filteredList.sort((a, b) => {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        // names must be equal
        return 0;
    });
    
    let list = document.createElement('ul'); 
    if(filteredList.length === 0) {
        let li = document.createElement('li');
        li.innerText = 'N/A';
        list.appendChild(li);
    }
    for(let el of filteredList) {
        let item = document.createElement('li');
        item.innerText = el.name;
        list.appendChild(item);
    }
    div.appendChild(list);
}

let range = document.getElementById('range');

range.addEventListener('change', function(event) {
    let fil = event.target.value;
    document.getElementById('filter-text').innerText = `Employees younger than ${fil} years old`;
    filterList(fil);
});

function setMarkers() {
    for(let el of employees) {
        let popup = new mapboxgl.Popup()
        .setHTML(`
            <p>Name: ${el.name}</p>
            <p>Age: ${el.age}</p>
        `);
        
        let marker = new mapboxgl.Marker()
        .setLngLat([el.longitude, el.latitude])
        .setPopup(popup)
        .addTo(map);     
    }
}

getPeople(apiUrl, function(data) { 
    employees = JSON.parse(data);
    
    setMarkers(employees);
    filterList(30);
});
