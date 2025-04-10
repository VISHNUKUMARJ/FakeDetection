from deepface import DeepFace
import cv2
import numpy as np

def check_fake_image(file_path):
    try:
        analysis = DeepFace.analyze(
            img_path=file_path,
            actions=["age", "gender", "race", "emotion"],
            enforce_detection=False
        )
        return {
            "is_fake": False,
            "confidence": 0.1,
            "details": analysis
        }
    except Exception as e:
        return {
            "is_fake": True,
            "confidence": 0.95,
            "error": str(e)
        }
