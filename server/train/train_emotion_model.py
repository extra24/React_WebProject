import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator # 이미지를 실시간으로 전처리하는 도구
from models.emotionModel import create_emotion_model # 모델 정의 파일에서 import

''' 감정/분위기 예측 모델을 생성하고 학습, 학습 후 가중치를 파일로 저장'''

#모델 생성
model = create_emotion_model()

# 데이터 전처리 및 학습/검증 데이터 생성기
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
train_generator = train_datagen.flow_from_directory(
    'dataset', # 이미지 데이터셋 경로
    target_size={224, 224},
    batch_size=32,
    class_mode='categorical',
    subset='training' # 훈련 데이터
)
validation_generator = train_datagen.flow_from_directory(
    'dataset',
    target_size={224, 224},
    batch_size=32,
    class_mode='categorical',
    subset='validation' #검증 데이터
)

# 모델 학습  train_generator 미니 배치를 가져와 모델에 학습시키고 validation_data로 성능을 평가
history = model.fit(
    train_generator,
    epochs=10,
    validation_data=validation_generator
)

# 학습된 모델 가중치 저장
model.save('models/emotion_model_weights.h5')
print("Model Trained!!!!")
