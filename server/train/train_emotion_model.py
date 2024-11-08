import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from models.emotionModel import create_emotion_model # 모델 정의 파일에서 import
import config

''' FER-2013 csv 데이터셋을 이용해 감정 예측 모델을 학습시키는 파일'''

# 데이터 로드
data = pd.read_csv(config.DATASET_PATH)
pixels = data['pixels'].tolist()
images = np.array([np.fromstring(pixel, dtype=int, sep=' ').reshape(48, 48, 1) for pixel in pixels])
labels = to_categorical(data['emotion'], num_classes=7)

# 데이터 분할
X_train, X_val, y_train, y_val = train_test_split(images, labels, test_size=0.2, random_state=42)

# 모델 생성 및 학습
model = create_emotion_model()
history = model.fit(X_train, y_train, epochs=30, batch_size=64, validation_data=(X_val, y_val))

# 학습된 모델 가중치 저장
model.save(config.MODEL_WEIGHTS_PATH)
print("Model 학습완료 후 저장!")
