# node 運行環境
FROM node:20

# 存放image的目錄

RUN mkdir -p /docker_app
COPY . /docker_app
WORKDIR /docker_app

# 如果需要相關的環境變數請自行調整路徑
#COPY ./env/.prod-env /app/env/.prod-env

# 對外的port
ENV HOST 0.0.0.0 
EXPOSE 3000

# 安裝套件並build專案
RUN npm install

# 執行專案
CMD [ "npm", "run", "dev" ]