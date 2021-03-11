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
					res_img.save(path_new + "/" + str(i) + '.png')
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
					png.load()
					background = Image.new('RGB', png.size,  (255, 255, 255))
					background.paste(png, mask=png.split()[3])
					background.save(path_new + "/" + os.path.splitext(image)[0] + '.jpg')
					os.remove(path_new + "/" + image )


def rgb2one_dim(path):
	dirlist = os.listdir(path)
	for directive in dirlist:
		path_new = path + '/' + directive
		imagesList = os.listdir(path_new)
		print(directive)
		for image in imagesList:
			if image[-3:] in ["jpg"]:
					rgb = Image.open(path_new + "/" + image)
					gray = rgb.convert('L')
					gray.save(path_new + "/" + image)


if __name__ == '__main__':
	# resize(path)
	# png2jpg(path)
	rgb2one_dim(path)
