FROM python:3.10-alpine

WORKDIR /stackoverflow

# Update and install necessary packages in a single RUN command
RUN apk update && \
    apk add --no-cache \
        gcc \
        libc-dev \
        python3-dev \
        py3-pip \
        libpq-dev

# Copy the application code to the container
COPY . .

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose the port the application will run on
EXPOSE 5000

# Specify the command to run your application
CMD ["flask", "--app", "stackoverflow", "run", "--host", "0.0.0.0"]
