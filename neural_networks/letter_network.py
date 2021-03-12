import os
from os import path
from os.path import basename
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from tensorflow import keras
from tensorflow.keras.layers import Dense, Flatten, Dropout, Conv2D, MaxPooling2D
from tensorflow.keras.preprocessing import image, image_dataset_from_directory
import tensorflowjs as tfjs

import numpy as np
import matplotlib.pyplot as plt

CHECKPOINT_PATH = path.abspath(f'./neural_networks/saved_models/{path.splitext(basename(__file__))[0]}/{path.splitext(basename(__file__))[0]}')
EPOCHS = 2
BATCH_SIZE = 32
IMAGE_SIZE = (28, 28)

train_dataset = image_dataset_from_directory(path.abspath('./neural_networks/Cyrillic'),
  subset='training',
  seed=42,
  validation_split=0.1,
  batch_size=BATCH_SIZE,
  image_size=IMAGE_SIZE)
  
class_names = train_dataset.class_names
print(class_names)


def create_model(checkpoint_path = CHECKPOINT_PATH):
  if path.exists(checkpoint_path):
    model = keras.models.load_model(checkpoint_path)
  else:
    model =	keras.models.Sequential([
      Conv2D(128, (3,3), padding='same', activation='relu', input_shape=(28, 28, 3)),
      MaxPooling2D((2,2), padding='valid', strides=2),
      Conv2D(256, (3,3), padding='same', activation='relu'),
      MaxPooling2D((2,2), padding='valid', strides=2),
      Flatten(),
      Dense(256, activation='relu'),
      Dropout(0.2)
      Dense(33, activation='softmax')
  ])
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    print(model.summary())
  return model


model = create_model()
callbacks = [
  keras.callbacks.ModelCheckpoint(
    filepath=CHECKPOINT_PATH,
    verbose=1)
]


history = model.fit(train_dataset, 
          batch_size = BATCH_SIZE, 
          epochs = EPOCHS, 
          callbacks=callbacks)

model.save(CHECKPOINT_PATH + '.h5')

# Сохранение в формате TF.js
# tensorflowjs_converter --input_format keras neural_networks/saved_models/letter_network/letter_network.h5 src/assets/saved_models/letter_network/js_model


def show():
  fig, ax = plt.subplots()
  ax.plot(history.history['accuracy'])
  ax.set(xlabel='Epoch', ylabel='Accuracy')
  ax.grid()
  
  plt.show()
  
show()

def main():
  pass


if __name__ == '__main__':
  main()