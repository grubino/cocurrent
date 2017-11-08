FROM python:3

RUN mkdir -p /usr/share/app/
WORKDIR /usr/share/app/
ADD . /usr/share/app/
RUN pip3 install -r requirements.txt

CMD ["python3", "-m", "swagger_server"]