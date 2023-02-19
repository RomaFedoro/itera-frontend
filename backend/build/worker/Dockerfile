ARG NODE_VERSION=18.12-slim

FROM node:${NODE_VERSION}

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install cron -y && apt-get clean

RUN npm cache clean --force && npm ci

COPY ./build/worker/task.sh .

RUN chmod +x task.sh

ADD ./build/worker/crontab /etc/cron.d/worker

RUN chmod 0644 /etc/cron.d/worker

RUN crontab /etc/cron.d/worker

RUN env > /etc/environment

CMD ["cron", "-f"]
