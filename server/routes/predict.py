from flask import Blueprint, request, jsonify
from utils.model import extract_feature
import os

''' FLask 라우트를 설정하여 클라이언트로부터 이미지를 받고, 특성을 추출하여 반환하는 API  앤드포인트 정의 '''

# BluePrint 생성 (BluePrint : 여러 라우트를 그룹화하여 관리할 수 있게 해줌)
predict_bp = Blueprint('predict',__name__)

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

    # 이미지에서 특성 추출
    features = extract_feature(img_path)

    # 이미지 특성을 Json 형식으로 변환
    features_list = features.flatten().tolist() # 2D 배열을 1D로 변환 후 리스트로 변환
    return jsonify({'features': features_list})

