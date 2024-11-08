import requests
from flask import Blueprint, jsonify
from models.emotionOutputModel import EmotionOutputModel # 모델 임포트

'''영화 정보를 불러오는 라우트 파일, 외부 API로부터 영화 정보를 가져오고 서버 측에서 처리하여 클라이언트에게 전달하는 역할'''

movie_blueprint = Blueprint('movie', __name__)

@movie_blueprint.route('/list', methods=['GET'])
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
        emotion_prediction = emotion_model.predicted_emotion(poster_url)

        # 영화 정보와 감정/분위기 예측 결과를 함께 추가
        movie_data.append({
            'id': movieId,
            'title': title,
            'summary': summary,
            'genres': genres,
            'poster': poster_url,
            'emotion_prediction': emotion_prediction
        })        
    return jsonify({'movies': movie_data})