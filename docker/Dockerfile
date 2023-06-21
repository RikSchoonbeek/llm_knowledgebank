# I tried using this as a (Docker) dev container using PyCharm,
# but that doesn't seem super easy.
FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY manage.py /code/
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN rm requirements.txt
# Remove requirements.txt?
# Remove frontend directory?