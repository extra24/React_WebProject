from flask import Blueprint, request, jsonify
from models.featureExtractionModel import extract_feature
from models.emotionModel import create_model # 감정/분위기 예측 모델 로드
import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

''' FLask 라우트를 설정하여 클라이언트로부터 이미지를 받고 아래의 model 기능 불러오는 기능
        - 특성을 추출하여 반환 모델
        - 감정/분위기 예측 모델'''

# BluePrint 생성 (BluePrint : 여러 라우트를 그룹화하여 관리할 수 있게 해줌)
predict_bp = Blueprint('predict',__name__)

# 사전에 저장된 감성/분위기 모델 불러오기
emotion_model = create_model()
emotion_model.load_weights('path_to_saved_model.h5') # 저장된 모델의 가중치를 불러온다.

# 감정 카테고리 정의 (5개의 감정 - 기쁨/슬픔/흥분됨/두려움/중립적)
emotion_labels = ['Happy', 'Sad', 'Excited', 'Fearful', 'Neutral']

# API 앤드포인트 정의 , 클라이언트가 이 경로로 이미지를 업로드할 수 있도록 도와줌
@predict_bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files: # 파일 존제 여부 체크
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file'] # 파일 객체 가져오기

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 파일 저장(임시 저장)
    img_path = os.path.join('uploads', file.filename)
    file.save(img_path)

    # Step 1 : 이미지에서 특성 추출
    features = extract_feature(img_path)

    # Step 2 : 이미지에서 감정/분위기 예측
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # 모델 입력 형식에 맞게 전처리

    predictions = emotion_model.predict(img_array)
    predicted_emotion = emotion_labels[np.argmax(predictions)] # 예측된 감정/분위기

    # Json 형식으로 변환
    features_list = features.flatten().tolist() # 2D 배열을 1D로 변환 후 리스트로 변환
    return jsonify({
        'features': features_list, # 추출된 특성 반환
        'predicted_emotion': predicted_emotion # 예측된 감정/분위기 반환
    })

