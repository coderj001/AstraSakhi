# Use an official lightweight Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install uv, the Python package installer
RUN pip install uv

# Copy the dependency definitions and lock file
COPY pyproject.toml uv.lock ./

# Install dependencies using uv
RUN uv pip sync

# Copy the rest of the application source code
COPY . .

# The command to run the application
# It uses the PORT environment variable if set, otherwise defaults to 8000
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
