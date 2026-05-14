# 1. Use the lightweight Alpine version of Node 22
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first
# (This caches the npm install step so builds are faster)
COPY package*.json ./

# 4. Install dependencies (Production only to save space)
RUN npm install --omit=dev

# 5. Copy the rest of the backend code into the container
COPY . .

# 6. Expose the port your app runs on
EXPOSE 5000

# 7. Start the server (using Node directly, not nodemon)
CMD ["node", "server.js"]