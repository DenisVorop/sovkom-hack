# README презентация frontend 

# [ ЗДЕСЬ➡️ ](https://gitlab.com/hellohackatons/sovcombank_hakaton2022/-/blob/main/frontend/README.md)

## Стек бекенд

- python 3.09-3.11, sanic, fastapi, asyncio, pydantic, asyncpg - для скорости разработки
- postgres - для хранения транзакций
- redis - для временного хранения, и кеширования
- rabbitMq - для очередей (т.к. на нем проще написать mvp, в проде можно заменить на kafka)
- docker - контейнеры для разделения сервисов

### Стрек фронтенд

- node:16.31.1 / node:16.18-alpine3.15
- react ts styled-components redux-toolkit

### Упрощения:

- Продумал прод вариант для бекенда, но выбрали в начале написать MVP на python, оптимизации логики, чтобы уже можно было все протестировать на frontend функциональность

- Выбран стек python - для скорости (в последствии некоторые сервисы можно переписать на - Go, Rust)

- Вместо socket в начале сделали api, но socket нужен для безпрерывной передачи курсов (чтобы правильно кешировать сессию)

- Убрали email подтверждения из авториазации, добавили заглушки восстановления пароля, т.к. пишем в в ручную авторизацию, = сокращение времени на тестирование

### Коментарий

К сожалению не удалось сделать версию prod backend, по времени ни как не успеть, но были продуманы шаги дальше, такие как

- дальнейшее кеширование графиков и курсов (загрузука пачкой, и отдача)
- отдача графиков и курсов через socket, и кеширование авторизации
- система контроля транзакций, lock mutex, и кеширование данных в ОЗУ/redis, + передача транзакций путем очередей rabbitMq/kafka
- система пополнений, с хренением запросов и видов оплат


### Запуск

```
docker-compose -f db.yml up -d
docker-compose -f frontend.yml up -d
docker-compose -f backend.yml up -d
```

### Остановка

```
docker-compose -f frontend.yml down
docker-compose down
docker-compose -f txs_mvp.yml down
docker-compose -f db.yml down

```

### Очистка бд


```
docker-compose -f all.yml down ; docker rm sovcombank_postgres ; docker volume rm sovcom_sovcombank_postgres ; 

docker-compose -f db.yml up -d
docker-compose -f backend.yml up -d
docker-compose -f frontend.yml up -d
```


### файл настройки frontend

```
nano /frontend/src/libs/const-path.ts
```

### файлы настроек backend
```

nano .env
nano auth/.env
nano auth/settings.py
nano txs_mvp/app/.env

```

### документация api

[здесь](https://documenter.getpostman.com/view/23758491/2s8YmSrLCQ)

Переменные окружения
[здесь](https://planetary-eclipse-662194.postman.co/workspace/New-Team-Workspace~822b4ea5-2120-4086-ad04-07cc69fe49b7/environment/23758491-960a68ae-776d-470d-a7ff-d29dc5d5b8d7)

```


Порты

port 3200
auth_port 3100
txs_port 3200



```

### выбраные api

#### 1) список кодов валют

- Центробанк для получения Кодов списков валют http://www.cbr.ru/development/SXML/ , https://apilayer.com/marketplace/currency_data-api?_gl=1*xd5nvs*_ga*NjkyOTM5Njk5LjE2Njg4MDQ4OTI.*_ga_HGV43FGGVM*MTY2ODgwNDg5Mi4xLjEuMTY2ODgwNDkwNS40Ny4wLjA.#pricing

#### 2) валюты - apilayer, daily

https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP

```
curl -H "apikey: {API-KEY}" -X GET "https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP"
```

https://www.cbr-xml-daily.ru/daily_json.js

```
curl https://www.cbr-xml-daily.ru/daily_json.js
```


#### 3) графики (история, timeframe) - apilayer, yahoo

- https://apilayer.com/, https://apilayer.com/marketplace/currency_data-api - для графика (timeframe), либо для котировок (ограничение 100 запросов в секунду)

```
/bin/curl -H "apikey: {API-KEY}" -X GET "https://api.apilayer.com/currency_data/timeframe?source=USD&currencies=AUD,JPN&start_date=2021-01-01&end_date=2022-01-01"
```

- альтернатива для графика -  https://query1.finance.yahoo.com/v8/finance/chart/USDJPY=X, https://github.com/mxbi/yahoo-finance-api/blob/master/DOCUMENTATION.md

```
curl -d "{'region': 'US', 'lang': 'en-US', 'period1': 1668310504, 'period2': 1668810504, 'includePrePost': 'false', 'interval': '30m', 'corsDomain': 'finance.yahoo.com', '.tsrc': 'finance'}" -X GET https://query1.finance.yahoo.com/v8/finance/chart/USDJPY=X
```





### Доработка

- списки, транзакции

```

transfer a b 500 | 10%
new_wihdraw 500 (немного недоделано)
list_withdraw | user, admin
approve_withdraw | admin

timeframe a b from_d to_d period (кеширование)
```

### Возможные улучшения:

- widthdrow балансы / оттестировать транзакции

- кеширование графиков (загрузка пачкой)

- socket, подгрузка графика и данных на клиенской часи (для экономии авторизации и коннектов)

- Прод вариант (транзакционая сисистема - Rabbit -> Redis, TasksPool service, AccountMutexLockService) + переписать на go, rust

- Доработка авторизации под множество сессий (контроль сесий), и системы ролей

- оптимизация и батчинг запросов

- фишки

### пункт 9 (дополнительные фишки)

- начали делать неросеть для предсказания, на основе следущих примеров

Ноутбук с получением данных

(https://www.kaggle.com/code/aorews/load-data)[]

Ноутбук с обучением модели и предсказаниями

(https://www.kaggle.com/aorews/autots-all-data)[]


