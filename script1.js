// Define global variables
let map;
let pathPolyline;
let mainPathCoordinates;
let markers = [];
// City data
const cities = [
    { name: "Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
    { name: "Kanyakumari", lat: 8.0844, lng: 77.5495 },
    { name: "Srinagar", lat: 34.0837, lng: 74.7973 },
    { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
    { name: "Panaji", lat: 15.4909, lng: 73.8278 },
    { name: "Patna", lat: 25.5941, lng: 85.1376 },
    { name: "Kochi", lat: 9.9312, lng: 76.2673 },
    { name: "Madurai", lat: 9.9252, lng: 78.1198 },
    { name: "Puri", lat: 19.8135, lng: 85.8312 },
    { name: "Jodhpur", lat: 26.2389, lng: 73.0243 },
    { name: "Raipur", lat: 21.2514, lng: 81.6296 },
    { name: "Ranchi", lat: 23.3441, lng: 85.3096},
    { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
    { name: "Indore", lat: 22.7196, lng: 75.8577 }
  ];

// Initialize the Google Maps API
function initMap() {
  const mapOptions = {
    center: { lat: 20.5937, lng: 78.9629 },
    zoom: 5,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  populateCityDropdowns();
}

// Populate city dropdowns
function populateCityDropdowns() {
  const cityDropdown = document.getElementById("cityDropdown");

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.text = city.name;
    option.value = JSON.stringify(city);
    cityDropdown.appendChild(option);
  });

  drawCityConnections();
}

// Draw grey connections between cities
function drawCityConnections() {
  cities.forEach((city) => {
    const neighbors = getNeighbors(city);
    neighbors.forEach((neighbor) => {
      const pathCoordinates = [city, neighbor].map((coord) => ({
        lat: coord.lat,
        lng: coord.lng,
      }));
      const connection = new google.maps.Polyline({
        path: pathCoordinates,
        strokeColor: "#D3D3D3", // Light grey color
        strokeOpacity: 1,
        strokeWeight: 1,
        map: map,
      });
    });
  });
}

// Visualize the Traveling Salesman Problem solution
function visualizeTSP() {
  const cityDropdown = document.getElementById("cityDropdown");
  const selectedCity = JSON.parse(cityDropdown.value);

  clearMarkers();
  addMarker(selectedCity);

  const pathCoordinates = calculateShortestPath(selectedCity);
  drawPath(pathCoordinates);
}

// Calculate the shortest path for the Traveling Salesman Problem
function calculateShortestPath(startCity) {
  const graph = new Map();
  cities.forEach(city => {
    graph.set(city.name, { 
      name: city.name, 
      lat: city.lat, 
      lng: city.lng, 
      visited: false, 
    });
  });

  const pathCoordinates = [startCity];
  let currentCity = startCity;
  currentCity.visited = true;

  while (pathCoordinates.length < cities.length) {
    const neighbors = getNeighbors(currentCity);
    let nextCity = null;
    let shortestDistance = Infinity;

    neighbors.forEach((neighbor) => {
      if (!neighbor.visited) {
        const distance = getDistance(currentCity, neighbor);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nextCity = neighbor;
        }
      }
    });

    if (nextCity) {
      pathCoordinates.push(nextCity);
      currentCity = nextCity;
      currentCity.visited = true;
    }
  }

  return pathCoordinates;
}

// Helper function to draw a path on the map
function drawPath(pathCoordinates) {
  // Clear existing path if any
  if (pathPolyline) {
    pathPolyline.setMap(null);
  }

  // Add the first city to the end to complete the cycle
  pathCoordinates.push(pathCoordinates[0]);

  pathPolyline = new google.maps.Polyline({
    path: pathCoordinates.map((coord) => ({
      lat: coord.lat,
      lng: coord.lng,
    })),
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  pathPolyline.setMap(map);
}

// Helper function to get the neighbors of a city
function getNeighbors(city) {
  const neighbors = [];
  cities.forEach(otherCity => {
    if (city && otherCity && city.name !== otherCity.name) {
      neighbors.push(otherCity);
    }
  });
  return neighbors;
}

// Helper function to calculate the distance between two cities
function getDistance(city1, city2) {
  const latDiff = Math.abs(city1.lat - city2.lat);
  const lngDiff = Math.abs(city1.lng - city2.lng);
  return Math.sqrt(latDiff ** 2 + lngDiff ** 2);
}

// Helper function to clear existing markers
function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// Helper function to add a marker for a city
function addMarker(city) {
  const marker = new google.maps.Marker({
    position: { lat: city.lat, lng: city.lng },
    map: map,
    title: city.name,
  });
  markers.push(marker);
}
