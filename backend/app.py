from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.image_checker import check_fake_image
from utils.video_checker import check_fake_video
from utils.audio_checker import check_fake_audio
from utils.text_checker import check_fake_text
from flask import Flask, request, jsonify
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

# Your routes here...


app = Flask(__name__)
CORS(app)  # Allows frontend JS to talk to backend

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/check_image', methods=['POST'])
def check_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files['image']
    filepath = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(filepath)

    result = check_fake_image(filepath)
    return jsonify(result)

@app.route('/check_video', methods=['POST'])
def check_video():
    if 'video' not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    video = request.files['video']
    unique_filename = f"{uuid.uuid4().hex}_{video.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
    video.save(filepath)

    result = check_fake_video(filepath)
    return jsonify(result)

@app.route('/check_audio', methods=['POST'])
def check_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio uploaded"}), 400

    audio = request.files['audio']
    unique_filename = f"{uuid.uuid4().hex}_{audio.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
    audio.save(filepath)

    result = check_fake_audio(filepath)
    return jsonify(result)

@app.route('/check_text', methods=['POST'])
def check_text():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    result = check_fake_text(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
