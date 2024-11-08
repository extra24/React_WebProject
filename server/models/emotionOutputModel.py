import tensorflow as tf
import requests
from PIL import Image
from io import BytesIO
import numpy as np

''' 감정/분위기 예측 모델을 정의하고 URL로부터 이미지를 받아서 결과를 반환하는 메서드까지 포함'''

class EmotionOutputModel:
    def __init__(self):
        # 모델 로드
        self.model = tf.keras.models.load_model('models') # 모델 파일 경로 설정

    def preprocess_image(self, image_url):
        # 이미지 URL에서 이미지 로드 및 전처리
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).resize((224, 224)) # 모델 크기에 맞게 조정
        img_array - np.array(img) / 255.0
        return np.expand_dims(image_url, axis=0)

    def predicted_emotion(self, image_url):
        # 이미지 전처리
        processed_image = self.predicted_emotion(image_url)

        # 모델을 통해 예측 수행
        prediction = self.model.predict(processed_image)

        # 예측 결과를 적절한 형식으로 변환
        emotion_label = self.map_prediction_to_emotion(prediction)
        return emotion_label

    def map_prediction_to_emotion(self, prediction):
        # 예측 결과를 감정 이름으로 매핑하는 함수
        emotion_labels = ['Happy', 'Sad', 'Excited', 'Fearful', 'Neutral']
        return emotion_labels[np.argmax(prediction)]                