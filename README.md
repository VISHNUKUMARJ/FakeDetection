FakeDetectionSystem using AI

FakeDetectionSystem using AI is a web-based platform designed to detect AI-generated or manipulated content across multiple media types — images, audio, video, and text. It uses a combination of machine learning and deep learning techniques for reliable fake content detection.

🌟 Features

🖼️ Image Detection – Detect AI-manipulated images using DeepFace and RetinaFace.

🎥 Video Detection – Identify video deepfakes using frame-by-frame analysis.

🎧 Audio Detection – Analyze voice cloning and audio synthesis.

📝 Text Detection – Spot AI-generated content using NLP classifiers.

📊 Dashboard Interface – User-friendly UI to access all tools easily.

📊 System Architecture

Frontend (HTML/CSS/JS)
    → Communicates via HTTP requests
Backend (Flask API - Python)
    → Routes: /check_image, /check_video, /check_audio, /check_text
    → ML Models (TensorFlow, DeepFace, etc.)

🧬 Tech Stack

Frontend: HTML5, CSS3, Vanilla JavaScript

Backend: Python (Flask)

Libraries: TensorFlow, DeepFace, RetinaFace, librosa, scikit-learn, transformers

Environment: Anaconda / virtualenv

Hosting (optional): Render, Vercel, or local deployment

⚙️ Installation & Setup

# 1. Clone the repository
git clone (https://github.com/YOURNAME/FakeDetectionSystem.git)
cd FakeDetectionSystem

# 2. Set up Python virtual environment
conda create -n fake_detection_env python=3.9
conda activate fake_detection_env

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the backend
cd backend
python app.py

# 5. Open frontend
Open index.html in your browser (or serve via Live Server in VS Code)

🔄 Usage Guide

Upload your media (image/video/audio/text)

Click the appropriate "Check" button

The result will appear in a styled output section

Click "Clear" to reset input/output

🔬 Modules Explained

app.py: Flask backend routes and handlers

image_checker.py: Image analysis logic

video_checker.py: Video frame processor

audio_checker.py: Audio manipulation detection

text_checker.py: NLP-based classifier

index.html: Main UI with navigation

script.js: Handles uploads, fetch calls, and result rendering

style.css: UI styling and layout

📦 API Endpoints

Endpoint

Method

Description

/check_image

POST

Detect fake images

/check_video

POST

Detect fake videos

/check_audio

POST

Detect fake audio

/check_text

POST

Detect AI-generated text

📂 Sample Input/Output

Request: Upload JPEG image to /check_image

Response:

{
  "prediction": "AI-Generated",
  "confidence": 91.4
}

📸 Screenshots

(*Add screenshots of dashboard, image results, etc.)

🥇 Future Improvements

Deploy on cloud (Render/Heroku)

Add user authentication

Support for real-time webcam input

Improve mobile responsiveness

Add model training UI
