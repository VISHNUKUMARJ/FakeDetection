import librosa
import numpy as np

def check_fake_audio(audio_path):
    try:
        y, sr = librosa.load(audio_path)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        avg_mfcc = np.mean(mfccs, axis=1).tolist()

        # MOCK detection logic: flat/low variation might indicate synthetic voice
        variation = np.std(avg_mfcc)
        is_fake = variation < 10  # arbitrary threshold

        return {
            "is_fake": is_fake,
            "mfcc_variation": variation,
            "message": "Low variation in MFCCs" if is_fake else "Audio looks natural"
        }

    except Exception as e:
        return {
            "error": str(e),
            "is_fake": True,
            "confidence": 0.95
        }
