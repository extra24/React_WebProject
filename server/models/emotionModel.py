from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

''' CNN(Convolutional Neural Network) 구조로 만들어진 포스터의 감정/분위기 예측 모델'''

# CNN(Convolutional Neural Network) : 이미지와 같은 데이터 처리를 위해 설계된 특정 구조의 신경망으로, 주로 Conv2D, Pooling Layer 등을 포함하여 특징을 추출하고 분석하는 네트워크
# Sequential 모델 : Keras에서 제공하는 모델 구성 방식 중 하나로, 레이어를 순차적으로 쌓아올리는 구조를 정의한다.
# Con2D : 이미지에서 특징을 추출하는 역할을 하는 레이어
# MaxPooling2D : 공간 크기를 줄이기 위해 사용되는 레이어
# Flatten : 이미지 형태(2D)를 1차원 벡터로 변환하여 마지막 Dense 레이어에 입력할 수 있게 하는 레이어
# Dense : 완전 연결 계층으로 입력을 받아 num_classes 수만큼의 출력을 반환
# Dropout : 학습 시 특정 뉴런을 무작위로 비활성화해 과적합을 방지하는 역할

def create_emotion_model():
    model = Sequential()
    model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(48, 48, 1)))
    model.add(MaxPooling2D((2, 2)))
    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2, 2)))
    model.add(Conv2D(128, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2, 2)))
    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(7, activation='softmax'))
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model