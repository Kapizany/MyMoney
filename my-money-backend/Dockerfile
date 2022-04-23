# Base Image
FROM python:3.8

# set default environment variables
ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive 

WORKDIR /app
ENV PATH="${PATH}:/root/.poetry/bin"

# Install project dependencies
COPY ./pyproject.toml pyproject.toml
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
RUN poetry config virtualenvs.create false
RUN poetry install

# Add current directory code to working directory
COPY . /app

CMD python /app/manage.py migrate && python /app/manage.py runserver 0.0.0.0:8000