from flask import Flask
from routes.movie_routes import movie_blueprint

'''Flask 애플리케이션 실행하고, routes 폴더의 앤드포인트를 등록'''

app = Flask(__name__)
app.register_blueprint(movie_blueprint)

# 메인 함수 - 서버 실행 및 디버그 모드 활성화
if __name__ == '__main__':
    app.run(debug=True)  