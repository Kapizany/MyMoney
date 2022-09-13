# Base Image
FROM python:3.8

# Set default environment variables
ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app
# ENV PATH="${PATH}:/root/.poetry/bin"

# Install project dependencies
COPY ./pyproject.toml pyproject.toml
ENV POETRY_HOME="/opt/poetry"

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python - && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false


# RUN curl -sSL https://install.python-poetry.org | python3 -
# RUN export PATH="/root/.local/bin:$PATH"
# RUN poetry config virtualenvs.create false
RUN poetry install

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Add current directory code to working directory
COPY . .

CMD python /app/manage.py runserver 0.0.0.0:8000
