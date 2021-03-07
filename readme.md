# Нейросеть по определению чисел

![](./src/assets/screen.jpg)

### Требования

Версия Python - 3.8 ([Скачать Python](https://www.python.org/downloads/release/python-388/))  
Версия Node.js - Current ([Скачать Node.js](https://nodejs.org/en/download/current/))

### Живой пример

Смотреть: [neural.biplane-design.com](http://neural.biplane-design.com/)

### Установка

1. Клонирование репозитория или скачивание ZIP архива:  
   `git clone https://github.com/Artemiy111/project_neural_network.git`
2. Установка зависсимостей: `npm install`

### Запуск

```sh
npm run start
```

### Цель проекта

Создать web-приложение по определению чисел на изображениях

### Принцип работы

Пользователь подаёт изображение, которое которое конвертируется в матрицу [28, 28] со значениями 0..255. Матрица подаётся в функцию предсказания, которая выдаёт вероятность числа. Для предсказания используется свёрточная нейросеть.
