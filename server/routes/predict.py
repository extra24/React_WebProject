from flask import Blueprint, request, jsonify
from models.emotionModel import create_emotion_model # 감정/분위기 예측 모델 로드
import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from PIL import Image, UnidentifiedImageError
import numpy as np
import io
import requests # HTTP 요청을 위해 추가

''' FLask 라우트를 설정하여 클라이언트로부터 이미지를 받고 감정/분위기 예측 모델 불러오는 기능'''

# BluePrint 생성 (BluePrint : 여러 라우트를 그룹화하여 관리할 수 있게 해줌)
predict_bp = Blueprint('predict',__name__)

# 사전에 저장된 감성/분위기 모델 불러오기
emotion_model = create_emotion_model()

# 감정/분위기 모델 가중치 파일 경로
model_weights_path = 'models/emotion_model_weights.h5'

# 가중치 파일이 존재하지 않을 경우 더미 모델을 사용
if not os.path.exists(model_weights_path):
    print(f"{model_weights_path} 파일이 존재하지 않아 더미 모델을 사용합니다.")
    # 더미 모델을 초기화 (아무 동작도 하지 않음)
    emotion_model.build((None, 224, 224, 3))  # 모델 구조를 정의
    emotion_model.summary()  # 모델 구조를 확인
else:
    emotion_model.load_weights(model_weights_path)  # 저장된 모델의 가중치를 불러온다.

# 감정 카테고리 정의 (5개의 감정 - 기쁨/슬픔/흥분됨/두려움/중립적) @TODO 카테고리 랜덤하게 적용되는 것 같음 제대로 적용되는지 확인 필요
emotion_labels = ['Happy', 'Sad', 'Excited', 'Fearful', 'Neutral']

# API 앤드포인트 정의 , 클라이언트가 이 경로로 이미지를 업로드할 수 있도록 도와줌
@predict_bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files: # 파일 존제 여부 체크
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file'] # 파일 객체 가져오기

    if file.filename == 'undefined':
        return jsonify({'error': 'No selected file'}), 400

    # 이미지가 HTTP 주소일 경우 다운로드
    if file.filename.startswith('http'):
        try:
            response = requests.get(file.filename)  # HTTP 요청으로 이미지 다운로드
            response.raise_for_status()  # 요청 오류 발생 시 예외 발생
            img = Image.open(io.BytesIO(response.content))  # 다운로드한 이미지 열기
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to download image from URL.'}), 400
    else:
        # 파일 객체로부터 이미지 열기 @TODO 이슈 있음 수정 필요
        try:
            img = Image.open(io.BytesIO(file.read()))
        except UnidentifiedImageError as e:
            print(e)
            return jsonify({'error': 'Uploaded file is not a valid image.'}), 400
    
    # 이미지 재로딩 및 전처리
    img = img.resize((224, 224))  # 모델이 요구하는 크기로 이미지 리사이징
    img_array = np.expand_dims(np.array(img) / 255.0, axis=0)

    # 이미지에서 감정/분위기 예측
    predictions = emotion_model.predict(img_array)
    predicted_emotion = emotion_labels[np.argmax(predictions)] # 예측된 감정/분위기

    # Json 형식으로 변환
    return jsonify({'predicted_emotion': predicted_emotion # 예측된 감정/분위기 반환
    })

