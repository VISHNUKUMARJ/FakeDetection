import cv2
import os
from deepface import DeepFace

def check_fake_video(video_path, frame_interval=30):
    cap = cv2.VideoCapture(video_path)

    frames = []
    frame_count = 0
    total_checked = 0
    suspicious_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret or total_checked >= 5:
            break

        if frame_count % (frame_interval * 1) == 0:  # every ~1 second
            temp_frame_path = f"temp_frame_{frame_count}.jpg"
            cv2.imwrite(temp_frame_path, frame)

            try:
                DeepFace.analyze(
                    img_path=temp_frame_path,
                    actions=["age", "gender", "emotion", "race"],
                    enforce_detection=False
                )
            except:
                suspicious_count += 1  # face detection failed or weird result

            os.remove(temp_frame_path)
            total_checked += 1

        frame_count += 1

    cap.release()

    is_fake = suspicious_count > 2
    return {
        "is_fake": is_fake,
        "checked_frames": total_checked,
        "suspicious_frames": suspicious_count,
        "message": "More than 2 frames failed detection" if is_fake else "Video passed detection"
    }
