FROM node:20.11.1

WORKDIR /app

# 1. Nur die Abhängigkeiten kopieren für schnelleres Caching
COPY package.json package-lock.json ./
RUN npm install

# 2. JETZT den kompletten Rest kopieren (index.html, src, vite.config.js, etc.)
COPY . . 

EXPOSE 5173

# 3. Startbefehl
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]