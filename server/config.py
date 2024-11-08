import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, 'dataset', 'fer2013.csv') # FER-2013 데이터셋 경로
MODEL_WEIGHTS_PATH = os.path.join(BASE_DIR, 'models', 'emotion_model_weights.h5') # 훈련된 모델 가중치 경로
