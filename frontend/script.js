  // IMAGE CHECK
function checkImage() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Please upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  fetch("http://127.0.0.1:5000/check_image", {  // Make sure this URL matches the Flask backend endpoint
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('imageResult').innerText = JSON.stringify(data, null, 2);
    recordDetection('image', data);
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error processing the image.");
  });
}

// VIDEO CHECK
function checkVideo() {
  const file = document.getElementById('videoInput').files[0];
  if (!file) return alert("Please upload a video.");

  const formData = new FormData();
  formData.append("video", file);

  fetch("http://127.0.0.1:5000/check_video", {  // Make sure this URL matches the Flask backend endpoint
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('videoResult').innerText = JSON.stringify(data, null, 2);
    recordDetection('video', data);
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error processing the video.");
  });
}

// AUDIO CHECK
function checkAudio() {
  const file = document.getElementById('audioInput').files[0];
  if (!file) return alert("Please upload an audio file.");

  const formData = new FormData();
  formData.append("audio", file);

  fetch("http://127.0.0.1:5000/check_audio", {  // Make sure this URL matches the Flask backend endpoint
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('audioResult').innerText = JSON.stringify(data, null, 2);
    recordDetection('audio', data);
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error processing the audio.");
  });
}

// TEXT CHECK
function checkText() {
  const text = document.getElementById('textInput').value.trim();
  if (!text) return alert("Please enter some text.");

  fetch("http://127.0.0.1:5000/check_text", {  // Make sure this URL matches the Flask backend endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('textResult').innerText = JSON.stringify(data, null, 2);
    recordDetection('text', data);
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error processing the text.");
  });
}

// Global detection history array
let detectionHistory = JSON.parse(localStorage.getItem('detectionHistory')) || [];

// Clear Function to reset all fields
function clearFields() {
  // Reset all file inputs
  document.getElementById('imageInput').value = '';
  document.getElementById('videoInput').value = '';
  document.getElementById('audioInput').value = '';

  // Reset text input
  document.getElementById('textInput').value = '';

  // Clear result sections
  document.getElementById('imageResult').innerText = '';
  document.getElementById('videoResult').innerText = '';
  document.getElementById('audioResult').innerText = '';
  document.getElementById('textResult').innerText = '';
}

// Clear activity log
function clearActivityLog() {
  detectionHistory = [];
  localStorage.setItem('detectionHistory', JSON.stringify(detectionHistory));
  document.getElementById('activityLog').innerHTML = '<p>No activity yet.</p>';
  document.getElementById('totalChecks').textContent = '0';
  document.getElementById('lastCheckedType').textContent = '—';
}

function updateDashboard() {
  const total = detectionHistory.length;
  const lastType = total ? detectionHistory[total - 1].type : "—";

  document.getElementById('totalChecks').innerText = total;
  document.getElementById('lastCheckedType').innerText = lastType.charAt(0).toUpperCase() + lastType.slice(1);

  const activityLog = document.getElementById('activityLog');
  if (total === 0) {
    activityLog.innerHTML = "<p>No activity yet.</p>";
  } else {
    activityLog.innerHTML = detectionHistory.slice(-10).reverse().map(entry => {
      const isFake = entry.result.label && entry.result.label.toLowerCase().includes("fake");
      return `<p>
        <span>${entry.type.toUpperCase()}</span>
        <span class="${isFake ? "fake" : "genuine"}">${entry.result.label || "Unknown"}</span>
      </p>`;
    }).join('');
  }
}

function recordDetection(type, result) {
  detectionHistory.push({
    type,
    result, 
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('detectionHistory', JSON.stringify(detectionHistory));
  
  // Immediately update counters
  document.getElementById('totalChecks').textContent = detectionHistory.length;
  document.getElementById('lastCheckedType').textContent = 
    type.charAt(0).toUpperCase() + type.slice(1);
  
  updateDashboard(); // Also update full dashboard
}

function checkImage() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Please upload an image.");
  
  showLoading();  // Show the loading spinner

  const formData = new FormData();
  formData.append("image", file);

  fetch("http://127.0.0.1:5000/check_image", {  
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('imageResult').innerText = JSON.stringify(data, null, 2);
    recordDetection('image', data);
    hideLoading();  // Hide the spinner after receiving response
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error processing the image.");
    hideLoading();  // Hide the spinner on error
  });
}

function clearActivityLog() {
  if (confirm("Are you sure you want to clear the activity log?")) {
    detectionHistory = [];
    localStorage.setItem('detectionHistory', JSON.stringify(detectionHistory));
    document.getElementById('activityLog').innerHTML = '<p>No activity yet.</p>';
    document.getElementById('totalChecks').textContent = '0';
    document.getElementById('lastCheckedType').textContent = '—';
  }
}

// Call this function to periodically update the dashboard
setInterval(updateDashboard, 5000); // Update every 5 seconds 

function showSection(type) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
  
  // Show the selected section
  document.getElementById(`${type}Section`).style.display = 'block';
}


// Show loading spinner before the request and hide it when done
function showLoading() {
  document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loadingSpinner').style.display = 'none';
}


// Call this on page load
window.onload = updateDashboard;
