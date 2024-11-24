FROM node:latest
LABEL authors="Ihar Tsitou"

# Workdir
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Run installation script
RUN npm install

# Copy project files into container
COPY . .

# Set ENV
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
