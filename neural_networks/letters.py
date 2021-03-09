import os, sys
from PIL import Image, ImageOps

path = "F:/Web/Websites/task2/neural_networks/Cyrillic" 
# path = 'F:/Web/Websites/task2/neural_networks/assets'

def resize(path):
	dirlist = os.listdir(path)
	for directive in dirlist:
		path_new = path + '/' + directive
		imagesList = os.listdir(path_new)
		print(directive)
		i=0
		for image in imagesList:
			if image[-3:] in ["png"]:
					img = Image.open(path_new + "/" + image)
					res_img = img.resize((28, 28))
					res_img.convert('LA').save(path_new + "/" + str(i) + '.png')
					os.remove(path_new + "/" + image )
					i = i + 1


def png2jpg(path):
	dirlist = os.listdir(path)
	for directive in dirlist:
		path_new = path + '/' + directive
		imagesList = os.listdir(path_new)
		print(directive)
		for image in imagesList:
			if image[-3:] in ["png"]:
					png = Image.open(path_new + "/" + image)
					# r, g ,b = img.split()
					# rgb = png.convert('RGB')
					# rgb.save(path_new + "/" + os.path.splitext(image)[0] + '.jpg')
					# os.remove(path_new + "/" + image )


if __name__ == '__main__':
	# resize(path)
	png2jpg(path)
