from flask import Flask
from flask_cors import CORS # CORS 추가
from routes.movieRoutes import movie_blueprint

'''Flask 애플리케이션 실행하고, routes 폴더의 앤드포인트를 등록'''

app = Flask(__name__)

# 모든 출처에서 CORS를 허용
CORS(app)

app.register_blueprint(movie_blueprint)

# 메인 함수 - 서버 실행 및 디버그 모드 활성화
if __name__ == '__main__':
    app.run(debug=True)  