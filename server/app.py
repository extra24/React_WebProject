from flask import Flask
from routes.predict import predict_bp # 블루프린트 import
from flask_cors import CORS # React와 Flask 간의 통신을 위한 CORS 설정을 위해 추가
import os
import sys

''' Flask 애플리케이션 설정 및 API 라우트 등록
    - FLask 앱을 실행하면 /predict 경로를 통해 이미지 파일을 POST 방식으로 업로드하고 예측 결과 받아볼 수 있다. '''

# 현재 디렉토리를 sys.path에 추가
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 모델 학습 및 API 작성
app = Flask(__name__)

# CORS 설정: React와의 원활한 통신을 위해 모든 도메인 허용
CORS(app)

# 업로드된 이미지를 저장할 디렉토리 생성
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# 예측 blueprint 등록
app.register_blueprint(predict_bp)    

# 홈페이지 라우트로 기본 경로 /에 접근했을 때 메시지 반환
@app.route('/')
def home():
    return "FLask Start!"

# 메인 함수 - 서버 실행 및 디버그 모드 활성화
if __name__ == '__main__':
    app.run(debug=True)  