import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

''' 포스터의 감정/분위기 예측을 위한 모델 정의 및 학습 '''

# CNN 모델 정의
def create_model():
    model = Sequential([
        Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
        MaxPooling2D(pool_size=(2,2)),
        Conv2D(64, (3,3), activation="relu"),
        MaxPooling2D(pool_size=(2,2)),
        Flatten(),
        Dense(128, activation='relu'),
        Dense(5, activation='softmax') # 5개의 감정/분위기 카테고리 예측
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# 모델을 저장 후, Flask에서 이를 불러와 예측에 사용하게 된다.
# model.save('path_to_save_model.h5')    