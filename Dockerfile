FROM python:3.10-alpine

WORKDIR /stackoverflow

RUN <<EOF
apk update
apk add gcc
apk add libc-dev
apk add python3-dev
apk add python3-pip
apk add libpq-dev
EOF

COPY . .
RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["flask", "--app", "stackoverflow", "run", "--host", "0.0.0.0"]