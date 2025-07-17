// Define global variables
let map;
let pathPolyline;
let mainPathCoordinates;
let markers = [];
// City data
const cities = 
    [
  { name: "My Home", lat: 17.4657, lng: 78.3975 },
  { name: "Apollo Hospitals", lat: 17.4349, lng: 78.3902 },
  { name: "KIMS Hospitals", lat: 17.4334, lng: 78.4491 },
  { name: "Yashoda Hospitals", lat: 17.4441, lng: 78.4662 },
  { name: "Continental Hospitals", lat: 17.4381, lng: 78.3803 },
  { name: "Sunshine Hospitals", lat: 17.4329, lng: 78.4433 },
  { name: "Osmania General Hospital", lat: 17.3881, lng: 78.4761 },
  { name: "Care Hospitals", lat: 17.4436, lng: 78.3794 },
  { name: "Medwin Hospitals", lat: 17.3824, lng: 78.4821 },
  { name: "Fernandez Hospital", lat: 17.4002, lng: 78.4653 },
  { name: "Asian Institute of Gastroenterology (AIG)", lat: 17.4286, lng: 78.4543 },
  { name: "Nizam's Institute of Medical Sciences (NIMS)", lat: 17.3850, lng: 78.4867 },
  { name: "Sunrise Hospitals", lat: 17.4468, lng: 78.3916 },
  { name: "Citizens Hospitals", lat: 17.5045, lng: 78.3778 },
  { name: "Star Hospitals", lat: 17.4346, lng: 78.3931 },
  { name: "Rainbow Children's Hospital", lat: 17.4450, lng: 78.3831 },
  { name: "Kamineni Hospitals", lat: 17.4194, lng: 78.5600 },
  { name: "Aster Prime Hospitals", lat: 17.4098, lng: 78.4482 },
  { name: "Virinchi Hospitals", lat: 17.4110, lng: 78.4018 },
  { name: "Olive Hospitals", lat: 17.4561, lng: 78.3609 },
  { name: "Krishna Institute of Medical Sciences (KIMS)", lat: 17.4706, lng: 78.3670 },
  { name: "Premier Hospital", lat: 17.3925, lng: 78.5026 },
  { name: "Hyderabad Nursing Home", lat: 17.3887, lng: 78.4767 },
  { name: "Deccan Hospital", lat: 17.3923, lng: 78.4741 },
  { name: "Prathima Hospitals", lat: 17.4806, lng: 78.3935 },
  { name: "Medicover Hospitals", lat: 17.4022, lng: 78.4843 },
  { name: "Kamineni Hospitals (King Koti)", lat: 17.3920, lng: 78.4882 },
  { name: "Continental Hospitals (Gachibowli)", lat: 17.4212, lng: 78.3445 },
  { name: "Mediciti Hospitals", lat: 17.4147, lng: 78.5019 },
  { name: "Vijaya Hospitals", lat: 17.4342, lng: 78.4507 },
  { name: "Sunrise Hospital (Secunderabad)", lat: 17.4434, lng: 78.5013 },
  { name: "Lotus Children's Hospital", lat: 17.4431, lng: 78.4491 },
  { name: "Mahaveer Hospital", lat: 17.4902, lng: 78.4085 },
  { name: "MaxCure Hospitals (Madhapur)", lat: 17.4466, lng: 78.3825 },
  { name: "Omkar Hospital", lat: 17.5005, lng: 78.3626 },
  { name: "Ankura Hospital", lat: 17.3835, lng: 78.4294 },
  { name: "Sunshine Hospitals (Gachibowli)", lat: 17.4366, lng: 78.3489 },
  { name: "CARE Hospitals (Banjara Hills)", lat: 17.4076, lng: 78.4521 },
  { name: "Matrika Hospitals", lat: 17.4912, lng: 78.3883 },
  { name: "Aditya Hospital", lat: 17.3868, lng: 78.4757 },
  { name: "Yashoda Hospitals (Malakpet)", lat: 17.3689, lng: 78.5114 },
  { name: "Gleneagles Global Hospitals (Lakdi-ka-pul)", lat: 17.3986, lng: 78.4688 },
  { name: "CARE Hospitals (Secunderabad)", lat: 17.4393, lng: 78.4978 },
  { name: "Olive Hospitals (Kukatpally)", lat: 17.4865, lng: 78.3984 },
  { name: "Pranaam Hospital", lat: 17.3590, lng: 78.5449 },
  { name: "Dr. Agarwal's Eye Hospital (Banjara Hills)", lat: 17.4169, lng: 78.4396 },
  { name: "American Oncology Institute", lat: 17.4693, lng: 78.3901 },
  { name: "Vasan Eye Care (Kukatpally)", lat: 17.4921, lng: 78.3988 },
  { name: "Neelima Hospitals (Sanath Nagar)", lat: 17.4547, lng: 78.4433 },
  { name: "Sai Sanjeevini Hospitals", lat: 17.5046, lng: 78.3704 },
  { name: "Erragada General Hospital", lat: 17.4641, lng: 78.4360, link: "geo:17.4641,78.4360?q=Erragada General Hospital" },
  { name: "Green Hills Hospital", lat: 17.4236, lng: 78.4291, link: "geo:17.4236,78.4291?q=Green Hills Hospital" },
  { name: "Pinnacle Medical Center", lat: 17.4093, lng: 78.4146, link: "geo:17.4093,78.4146?q=Pinnacle Medical Center" },
  { name: "Valley View Clinic", lat: 17.3978, lng: 78.4027, link: "geo:17.3978,78.4027?q=Valley View Clinic" },
  { name: "Hilltop Hospital", lat: 17.3839, lng: 78.3895, link: "geo:17.3839,78.3895?q=Hilltop Hospital" },
  { name: "Sunrise Medical Center", lat: 17.3725, lng: 78.3758, link: "geo:17.3725,78.3758?q=Sunrise Medical Center" },
   
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

  const startCityDropdown = document.getElementById("startCity");
  const endCityDropdown = document.getElementById("endCity");

  cities.forEach((city) => {
    const startOption = document.createElement("option");
    startOption.text = city.name;
    startOption.value = JSON.stringify(city);
    startCityDropdown.appendChild(startOption);

    const endOption = document.createElement("option");
    endOption.text = city.name;
    endOption.value = JSON.stringify(city);
    endCityDropdown.appendChild(endOption);
  });
  drawCityConnections();
}
// Draw grey connections between cities
function drawCityConnections() {
  cities.forEach((city) => {
    const neighbors = getNeighbors(city);
    const closestNeighbors = getClosestNeighbors(city, neighbors, 3); // Get the three closest neighbors
    closestNeighbors.forEach((neighbor) => {
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
// Visualize Dijkstra's Algorithm
function visualizeAlgorithm() {
  
  const startCityDropdown = document.getElementById("startCity");
  const endCityDropdown = document.getElementById("endCity");

  const startCity = JSON.parse(startCityDropdown.value);
  const endCity = JSON.parse(endCityDropdown.value);

  clearMarkers();
  addMarker(startCity);
  addMarker(endCity);

 const pathCoordinates =calculateShortestPath(startCity, endCity);
}

async function calculateShortestPath(startCity, endCity) {
  // Create a map instance
  const graph = new Map();
  cities.forEach(city => {
    graph.set(city.name, { 
      name: city.name, 
      lat: city.lat, 
      lng: city.lng, 
      distance: Infinity, 
      previous: null 
    });
  });
  
  // Set the distance of the start city to 0
  graph.get(startCity.name).distance = 0;
  
  // Create a queue to track the shortest paths
  const queue = Array.from(graph.values());
  
  // Helper function to get the city with the shortest distance
  function getCityWithShortestDistance() {
    let shortestDistance = Infinity;
    let shortestCity = null;
    queue.forEach(city => {
      if (city.distance < shortestDistance) {
        shortestDistance = city.distance;
        shortestCity = city;
      }
    });
    return shortestCity;
  }
  // Function to visualize each step of the algorithm with a delay
  async function visualizeSteps() {
    let count = 0;
    while (queue.length > 0) {
      const currentCity = getCityWithShortestDistance();
      if (currentCity === endCity) {
        break; // Found the end city, exit the loop
      }

      queue.splice(queue.indexOf(currentCity), 1);

      const neighbors = getClosestNeighbors(currentCity, queue, 3); // Get the three closest neighbors
      neighbors.forEach((neighbor) => {
        const distance = currentCity.distance + getDistance(currentCity, neighbor);

        if (distance < neighbor.distance) {
          neighbor.distance = distance;
          neighbor.previous = currentCity;
        }
      });

      await sleep(1000); // Delay each step by 1 second
      // calculate temp path

      const tempCoordinates = await makePath(currentCity, graph);
      console.log(tempCoordinates);
      await drawPath(tempCoordinates);

      count++;
      console.log("Step", count);
    }
  }
  await visualizeSteps();
  // construct the final path coordinates from the end city to the start city
  const pathCoordinates = makePath(endCity, graph);

  return pathCoordinates;
}

//helpers
// Helper function to introduce a delay using setTimeout
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function makePath(endCity,graph){
  let currentCity = graph.get(endCity.name);
  const pathCoordinates = [];
  while (currentCity) {
    pathCoordinates.unshift({ lat: currentCity.lat, lng: currentCity.lng });
    currentCity = currentCity.previous;
  }
  console.log(pathCoordinates);
  await drawPath(pathCoordinates);
  return pathCoordinates;
}

//  function to draw a path on the map
async function drawPath(pathCoordinates) {
  // Clear existing path if any
  if (pathPolyline) {
    pathPolyline.setMap(null);
  }
  pathPolyline = new google.maps.Polyline({
    path: pathCoordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  pathPolyline.setMap(map);
}
function getClosestNeighbors(city, neighbors, count) {
  neighbors.sort((a, b) => {
    const distanceA = getDistance(city, a);
    const distanceB = getDistance(city, b);
    return distanceA - distanceB;
  });
  return neighbors.slice(0, count);
}
function getNeighbors(city) {
  const neighbors = [];
  cities.forEach(otherCity => {
    if (city && otherCity && city.name !== otherCity.name && isAllowedPath(city, otherCity)) {
      neighbors.push(otherCity);
    }
  });
  return neighbors;

}
function isAllowedPath(city1, city2) {
  return true; // Allow  wanted type paths between any two cities, custumisable
}
// to calculate distance cities
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
function addMarker(city) {
  const marker = new google.maps.Marker({
    position: { lat: city.lat, lng: city.lng },
    map: map,
    title: city.name,
  });
  markers.push(marker); // Add the marker to the `markers` array
}