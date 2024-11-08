import requests
from flask import Blueprint, jsonify
from models.emotionModel import create_emotion_model # 모델 임포트
import config
import numpy as np
import cv2
import tensorflow as tf

'''영화 정보를 불러오는 라우트 파일, 외부 API로부터 영화 정보를 가져오고 감정을 예측하여 저장해서 전달하는 앤드포인트 파일'''

movie_blueprint = Blueprint('movie', __name__)

# 모델 로드
model = create_emotion_model()
model.load_weights(config.MODEL_WEIGHTS_PATH)

def preprocess_image_from_url(url):
    response = requests.get(url, stream=True).raw
    img = cv2.imdecode(np.asarray(bytearray(response.read()), dtype="unit8"), cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (48, 48))
    img = img.reshape(48, 48, 1) / 255.0
    return np.array([img])

@movie_blueprint.route('/movies', methods=['GET'])
def get_movies():
    response = requests.get("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
    movies =response.json().get("data", {}).get("movies", [])

    # 영화 정보 리스트에 감정/분위기 예측 결과 추가
    movie_data = []
    for movie in movies:
        movieId = movie.get('id')
        title = movie.get('title')
        summary = movie.get('summary')
        genres = movie.get('genres')
        poster_url = movie.get('medium_cover_image')

        # 포스터 이미지 감정/분위기 예측 결과 얻기
        input_image = preprocess_image_from_url(poster_url)
        predicted_emotion  = model.predict(input_image)
        emotion_label = np.argmax(predicted_emotion, axis=1)[0]

        # 영화 정보와 감정/분위기 예측 결과를 함께 추가
        movie_data.append({
            'id': movieId,
            'title': title,
            'summary': summary,
            'genres': genres,
            'poster': poster_url,
            'emotion_prediction': emotion_label
        })        
    return jsonify({'movies': movie_data})