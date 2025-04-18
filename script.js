let destinations = [
    {
      name: "Paris",
      image: "https://source.unsplash.com/400x300/?paris",
      description: "City of lights and love."
    },
    {
      name: "Tokyo",
      image: "https://source.unsplash.com/400x300/?tokyo",
      description: "A blend of tradition and future."
    },
    {
      name: "New York",
      image: "https://source.unsplash.com/400x300/?newyork",
      description: "The city that never sleeps."
    }
  ];
  
  // Load from localStorage if available
  if (localStorage.getItem("destinations")) {
    destinations = JSON.parse(localStorage.getItem("destinations"));
  }
  
  // Display Destinations
  function displayDestinations(filtered = destinations) {
    const container = document.getElementById("destinationCards");
    container.innerHTML = "";
    filtered.forEach(dest => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" />
        <h3>${dest.name}</h3>
        <p>${dest.description}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // Search
  function searchDestinations() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const filtered = destinations.filter(d =>
      d.name.toLowerCase().includes(query)
    );
    displayDestinations(filtered);
  }
  
  // Add New Destination
  document.getElementById("addDestinationForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("newDestName").value;
    const image = document.getElementById("newDestImage").value;
    const description = document.getElementById("newDestDesc").value;
  
    destinations.push({ name, image, description });
    localStorage.setItem("destinations", JSON.stringify(destinations));
    displayDestinations();
    e.target.reset();
  });
  
  // Save Trip Plan
  document.getElementById("tripForm").addEventListener("submit", e => {
    e.preventDefault();
    const destination = document.getElementById("tripDestination").value;
    const date = document.getElementById("tripDate").value;
    const days = document.getElementById("tripDays").value;
    const budget = document.getElementById("budgetPerDay").value || 0;
    const notes = document.getElementById("tripNotes").value;
    const itinerary = document.getElementById("itinerary").value;
  
    const total = budget * days;
    const summary = `
      <h3>Trip Plan Summary</h3>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Start Date:</strong> ${date}</p>
      <p><strong>Days:</strong> ${days}</p>
      <p><strong>Budget:</strong> $${total}</p>
      <p><strong>Notes:</strong> ${notes}</p>
      <p><strong>Itinerary:</strong><br>${itinerary.replace(/\n/g, "<br>")}</p>
    `;
  
    document.getElementById("tripSummary").innerHTML = summary;
    localStorage.setItem("tripSummary", JSON.stringify(summary));
    e.target.reset();
    document.getElementById("itinerary").value = '';
  });
  
  // Google Map Integration
  function showMap() {
    const place = document.getElementById("mapSearch").value;
    const iframe = document.getElementById("mapFrame");
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
  }
  
  // Login/Register (basic frontend)
  function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const saved = JSON.parse(localStorage.getItem("users")) || {};
  
    if (saved[user] && saved[user] === pass) {
      document.getElementById("authMessage").innerText = `Welcome, ${user}!`;
    } else {
      document.getElementById("authMessage").innerText = "Invalid credentials.";
    }
  }
  
  function register() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    let saved = JSON.parse(localStorage.getItem("users")) || {};
    saved[user] = pass;
    localStorage.setItem("users", JSON.stringify(saved));
    document.getElementById("authMessage").innerText = "Registered successfully!";
  }
  
  // On load
  window.onload = () => {
    displayDestinations();
    if (localStorage.getItem("tripSummary")) {
      document.getElementById("tripSummary").innerHTML = JSON.parse(localStorage.getItem("tripSummary"));
    }
  };
  