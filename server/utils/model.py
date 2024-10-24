from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input
import numpy as np

''' VGG16 모델을 로드하고 이미지를 전처리하여 특성 추출'''

# VGG26 모델 로드 (사전 확습된 가중치 사용)
model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# 이미지 로드 및 전처리
def load_and_preprocess_image(img_path):
    # img_path 이미지 경로에서 이미지를 로드하고 target_size에 맞게 이미지를 리사이즈
    img = image.load_img(img_path, target_size=(224, 224))
    # 로드한 이미지를 Numpy 배열로 변환
    img_array = image.img_to_array(img)
    # 배열의 차원 추가
    img_array = np.expand_dims(img_array, axis=0)
    # VGG16 모델의 입려에 맞게 이미지를 전처리하는 것으로, 색상 값의 스케일링 등 포함
    img_array = preprocess_input(img_array)
    return img_array

# 특징 추출
def extract_feature(img_path):
    # 이미지 전처리
    img_array = load_and_preprocess_image(img_path)
    # 전처리된 이미지를 VGG16 모델에 입력하여 특징 추출
    features = model.predict(img_array)        
    return features