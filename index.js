const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const toRadians = (degrees) => degrees * (Math.PI / 180); // Helper function to convert degrees to radians

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
};

// Example drivers with their latitudes, longitudes, and availability
const drivers = [
    { driver_id: 1, name: "Kumar", lat: 12.9715987, lon: 77.5945627, available: true },  // Driver 1 (Bangalore)
    { driver_id: 2, name: "Arjun", lat: 13.0826802, lon: 80.2707184, available: true },  // Driver 2 (Chennai)
    { driver_id: 3, name: "Nithin", lat: 12.2958104, lon: 76.6393805, available: true },  // Driver 3 (Mysore)
    { driver_id: 4, name: "Ajeet", lat: 15.3172775, lon: 75.7138884, available: false },  // Driver 4 (Unavailable - Hubli)
    { driver_id: 5, name: "Ram", lat: 13.02025, lon: 80.15792, available: true }, // Mugalivakkam
    { driver_id: 6, name: "Sri", lat: 13.02906, lon: 80.12964, available: true }, //  Iyyappanthanggit remote add origin al
    { driver_id: 7, name: "Gowtham", lat: 13.03129, lon: 80.19180, available: true } // K. K. Nagar // state of charge 

];

// Pickup location (latitude, longitude) - you can change this
const pickupLat = 13.03477; //12.9141417;  // Pickup location latitude (Mangalore)
const pickupLon = 	80.15615; //74.8559568;  // Pickup location longitude (Mangalore)

// Step 1: Filter out available drivers
const availableDrivers = drivers.filter(driver => driver.available);

// Step 2: Calculate the distance between each available driver and the pickup location
availableDrivers.forEach(driver => {
    driver.distance = haversineDistance(pickupLat, pickupLon, driver.lat, driver.lon);
});

// Step 3: Find the closest driver
if (availableDrivers.length > 0) {
    const closestDriver = availableDrivers.reduce((prev, curr) => (prev.distance < curr.distance) ? prev : curr);
    console.log(`Closest driver assigned: Driver Name ${closestDriver.name} Driver ${closestDriver.id}, Distance: ${closestDriver.distance.toFixed(2)} km`);
} else {
    console.log("No drivers available.");
}