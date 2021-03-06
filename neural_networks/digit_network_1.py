import os
from os import path
from os.path import basename
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import h5py

from tensorflow import keras
from tensorflow.keras.layers import Dense, Flatten, Dropout, Conv2D, MaxPooling2D
import tensorflowjs as tfjs

import numpy as np
import matplotlib.pyplot as plt

from tensorflow.keras.datasets import mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
x_train, x_test = np.expand_dims(x_train, axis=3), np.expand_dims(x_test, axis=3)


print(f'x_train.shape: {x_train.shape}')
CHECKPOINT_PATH = path.abspath(f'neural_networks/saved_models/{path.splitext(basename(__file__))[0]}/{path.splitext(basename(__file__))[0]}')
EPOCHS = 1
BATCH_SIZE = 32


def create_model(checkpoint_path = CHECKPOINT_PATH):
	if path.exists(checkpoint_path):
		model = keras.models.load_model(checkpoint_path)
	else:
		model =	keras.models.Sequential([
			Conv2D(64, (3,3), padding='same', activation='relu', input_shape=(28, 28, 1)),
			MaxPooling2D((2,2), padding='valid', strides=2),
			Conv2D(128, (3,3), padding='same', activation='relu'),
			MaxPooling2D((2,2), padding='valid', strides=2),
			Flatten(),
			Dense(128, activation='relu'),
			Dropout(0.2),
			Dense(10, activation='softmax')
	])
		model.compile(optimizer='adam',
									loss='sparse_categorical_crossentropy',
									metrics=['accuracy'])
	return model


model = create_model()
callbacks = [
	keras.callbacks.ModelCheckpoint(
		filepath=CHECKPOINT_PATH,
		verbose=1)
]


history = model.fit(x_train, y_train, 
					batch_size = BATCH_SIZE, 
					epochs = EPOCHS, 
					validation_data = (x_test, y_test), 
					callbacks=callbacks)

model.save(CHECKPOINT_PATH + '.h5')

# Сохранение в формате TF.js
# tensorflowjs_converter --input_format keras neural_networks/saved_models/digit_network_1/digit_network_1.h5 neural_networks/saved_models/digit_network_1/digit_network_1/js_model

loss, acc = model.evaluate(x_test, y_test, batch_size=BATCH_SIZE)
print('Restored model, accuracy: {:.2f}%'.format(100*acc))


def main():
	pass


if __name__ == '__main__':
	main()