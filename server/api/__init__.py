from flask import Blueprint

'''확장성, 모듈성 위한 API 패키지 초기화 파일'''

# 영화 관련 블루프린트 초기화
movie_blueprint = Blueprint('movie', __name__)

from . import movieRoutes # api/movieRoutes.py 임포트