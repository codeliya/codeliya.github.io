window.onload = function() {
  // Set a 3 second delay to hide the preloader after page load
  setTimeout(function() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none'; // Hide preloader after 3 seconds
  }, 3000); // 3000 milliseconds = 3 seconds
};
document.addEventListener("DOMContentLoaded", function() {
    // Select all progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    // Create an observer to trigger when the progress bar comes into view
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const skillValue = progressBar.getAttribute('data-skill');
          progressBar.style.width = skillValue + '%';
          progressBar.innerText = skillValue + '%';
          observer.unobserve(progressBar); // Stop observing once animation is done
        }
      });
    }, {
      threshold: 0.5 // Trigger animation when 50% of the progress bar is in view
    });

    // Start observing each progress bar
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  });
  // Replace with your IPInfo API Token
const token = "6c747a91e7aab2";
// Your fixed location (latitude, longitude)
const myLocation = { latitude: 25.4448, longitude: 81.8432 }; // Mumbai coordinates
// Fetch User's Location
async function getUserLocation() {
  try {
    const response = await fetch(`https://ipinfo.io?token=${token}`);
    const data = await response.json();

    const [userLat, userLon] = data.loc.split(",").map(Number);
    const userCity = data.city;

    const distance = calculateDistance(myLocation.latitude, myLocation.longitude, userLat, userLon);

    // Greet User
    const greeting = `Hello I'm Mohammad from Prayagraj, India, roughly ${distance}km away from your current location ${userCity}, according to your IP address.`;
    document.getElementById("greeting").innerText = greeting;
  } catch (error) {
    document.getElementById("greeting").innerText = "Hello I'm Mohammad from Prayagraj, India.";
  }
}
document.getElementById("greeting").innerText = "Calculating..."
// Calculate Distance (Haversine Formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in kilometers
}
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
// Call Function on Page Load
window.onload = getUserLocation;
function handleSubmit(event) {
  event.preventDefault();  // Prevent default form submission

  const loader = document.getElementById('loader');
  const successMessage = document.getElementById('success-message');
  loader.style.display = 'inline-block';  // Show loader

  const form = document.getElementById('contact-form');
  const formData = new FormData(form);

  // Use fetch to submit the form asynchronously
  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // Handle successful form submission (can be customized)
    loader.style.display = 'none';  // Hide loader
    successMessage.style.display = 'block';  // Show success message
    setTimeout(() => {
      successMessage.style.opacity = '1';  // Fade in success message after a delay
    }, 10);  // Small delay before opacity change (to trigger transition)
    form.reset();  // Reset form after submission
  })
  .catch(error => {
    // Handle error (optional)
    alert("Oops! Something went wrong. Please try again later.");
    loader.style.display = 'none';  // Hide loader
  });
}