     var user_pref = localStorage.getItem("selectedTheme");
     if(user_pref == null) {
       var user_pref = "yah user default theme ka upyog krta hai";
     
     }
    var hidden_input = document.getElementById("hidden_input");
    hidden_input.value = user_pref;
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // To Stop Default Form Submission
    const formData = new FormData(this); // Collec The Form Data

    // Structure Of Shimmer Loader
    const loader = `
        <div class="text-center shimmer-loader">
            <h3 class="shimmer shimmer-title">█████████████████</h3>
            <p class="shimmer shimmer-text">███████████████████████████</p>
            <p class="shimmer shimmer-button">██████████</p>
        </div>`;
    document.getElementById("contactForm").innerHTML = loader; // Replace The Form From The Loader

     // Track form submission event in Google Analytics
    gtag('event', 'submit', {
        'event_category': 'Form',
        'event_label': 'Contact Form Submission'
    });

    // AJAX request to FormSubmit.co
    fetch("https://formsubmit.co/ajax/skingshopping@gmail.com", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If Form Successfully Submitted, Show Success Message
                document.getElementById("contactForm").innerHTML = `
                    <div class="text-center alert alert-success">
                        <h3 class="text-success">Thank you for your message!</h3>
                        <p>We will get back to you soon.</p>
                        <button class="btn btn-sm btn-primary mt-3" onclick="showForm()">Send Another Message</button>
                    </div>`;
            } else {
                // If Server Has Return An Error Show Error Message
                document.getElementById("contactForm").innerHTML = `
                    <div class="text-center alert alert-warning">
                        <h3 class="text-warning">Oops! Something went wrong.</h3>
                        <p>${
                            data.message ||
                            "Unable to process your request. Please try again later."
                        }</p>
                        <button class="btn btn-sm btn-primary mt-3" onclick="showForm()">Try Again</button>
                    </div>`;
            }
        })
        .catch(error => {
            // Agar network error ho ya form submit nahi ho paya
            document.getElementById("contactForm").innerHTML = `
                <div class="text-center alert alert-danger">
                    <h3 class="text-danger">Submission Failed</h3>
                    <p>We were unable to send your message. Please check your internet connection and try again.</p>
                    <button class="btn btn-sm btn-primary mt-3" onclick="showForm()">Try Again</button>
                </div>`;
        });
});

// Function to show the form again after submitting
function showForm() {
    document.getElementById("contactForm").innerHTML = `
        <div class="mb-4">
        <input type="text" name="pref" id="hidden_input" style="display: none;">
            <label for="name" class="form-label fw-semibold">Your Name</label>
            <input type="text" class="form-control form-control-lg" id="name" name="name" placeholder="John Doe" required>
        </div>
        <div class="mb-4">
            <label for="email" class="form-label fw-semibold">Your Email</label>
            <input type="email" class="form-control form-control-lg" id="email" name="email" placeholder="example@mail.com" required>
        </div>
        <div class="mb-4">
            <label for="subject" class="form-label fw-semibold">Subject</label>
            <input type="text" class="form-control form-control-lg" id="subject" name="subject" placeholder="Enter subject" required>
        </div>
        <div class="mb-4">
            <label for="message" class="form-label fw-semibold">Your Message</label>
            <textarea class="form-control form-control-lg" id="message" name="message" rows="5" placeholder="Write your message here" required></textarea>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary btn-md px-5">Send Message</button>
        </div>
    `;
}
// Select all theme option links
const themeOptions = document.querySelectorAll(".theme-option");
const themeStylesheet = document.getElementById("theme-stylesheet");

// Default theme file (Set your default CSS file path here)
const defaultTheme = "./assets/css/default-style.css";

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("selectedTheme");
if (savedTheme) {
    themeStylesheet.href = savedTheme; // Apply saved theme

    // Add active class to the saved theme option
    themeOptions.forEach(option => {
        if (option.getAttribute("data-theme") === savedTheme) {
            option.classList.add("active");
        } else {
            option.classList.remove("active");
        }
    });
} else {
    themeStylesheet.href = defaultTheme; // Apply default theme
}

// Add event listeners to theme options
themeOptions.forEach(option => {
    option.addEventListener("click", e => {
        e.preventDefault(); // Prevent default anchor behavior
        const selectedTheme = e.target.getAttribute("data-theme"); // Get theme from data attribute

        if (selectedTheme) {
            themeStylesheet.href = selectedTheme; // Apply selected theme
            localStorage.setItem("selectedTheme", selectedTheme); // Save theme to localStorage

            // Update active class for the selected theme
            themeOptions.forEach(opt => opt.classList.remove("active")); // Remove active from all
            e.target.classList.add("active"); // Add active to selected option
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Set a delay of 5 seconds before executing the replacement
    setTimeout(function () {
        // Replace specific paths with images
        const replacements = [
            {
                id: "top-banner",
                href: "https://placehold.co/225x143/EEE/31343C", // Replace with your banner image URL
                x: "251.26731",
                y: "157.45488",
                width: "225",
                height: "143"
            },
            {
                id: "left-banner",
                href: "https://placehold.co/104x34/EEE/31343C",
                x: "373.50512",
                y: "313.64761",
                width: "104",
                height: "34"
            },
            {
                id: "middle-banner",
                href: "https://placehold.co/104x34/EEE/31343C",
                x: "251.50512",
                y: "313.64761",
                width: "104",
                height: "34"
            },
            {
                id: "right-banner",
                href: "https://placehold.co/104x34/EEE/31343C",
                x: "494.77277",
                y: "313.64761",
                width: "104",
                height: "34"
            }
        ];

        // Loop through replacements
        replacements.forEach(({ id, href, x, y, width, height }) => {
            const path = document.getElementById(id);
            if (path) {
                // Create <image> element
                const imageElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "image"
                );
                imageElement.setAttribute("id", id);
                imageElement.setAttribute("href", href);
                imageElement.setAttribute("x", x);
                imageElement.setAttribute("y", y);
                imageElement.setAttribute("width", width);
                imageElement.setAttribute("height", height);

                // Replace <path> with <image>
                path.parentNode.replaceChild(imageElement, path);
            }
        });
        const textReplacements = [
            {
                id: "first-text",
                text: "Bold Text Here",
                x: 494.77277,
                y: 205
            },
            {
                id: "second-text",
                text: "Second Text Here",
                x: 494.77277,
                y: 220
            },
            {
                id: "third-text",
                text: "Third Text Here",
                x: 494.77277,
                y: 235
            },
            {
                id: "fourth-text",
                text: "Fourth Text Here",
                x: 494.77277,
                y: 250
            }
        ];

        textReplacements.forEach(({ id, text, x, y }) => {
            const pathElement = document.getElementById(id);
            if (pathElement) {
                // Change fill color only when text is added
                //pathElement.setAttribute("fill", "#d7d7d7");
                pathElement.style.display = "none";

                // Create text element inside the path
                const textElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                );;
                textElement.setAttribute("id", id);
                textElement.setAttribute("x", x);
                textElement.setAttribute("y", y);
                textElement.textContent = text;

                // Append the text element to the path's parent element
                pathElement.parentNode.appendChild(textElement);
            }
        });
        function changeColorById(pathId) {
            const pathElement = document.getElementById(pathId);
            if (pathElement) {
                pathElement.setAttribute("fill", "#d7d7d7"); // Change color to #d7d7d7
            } else {
                console.log("Path not found with id: " + pathId);
            }
        }
        changeColorById("hide-1"); // Change color of first path
        changeColorById("hide-2");
        changeColorById("hide-3");
        changeColorById("hide-4");
    }, 5000); // Delay of 5 seconds
});
document.addEventListener('DOMContentLoaded', function () {
  // Show modal on page load
  const myModal = new bootstrap.Modal(document.getElementById('infoModal'));
  myModal.show();
});

// Function to track modal close actions in Google Analytics
function trackModalClose(buttonType) {
  // Google Analytics tracking
  gtag('event', 'modal_close', {
    event_category: 'Modal Interaction',
    event_label: buttonType,
    value: 1
  });
}
