FROM node:22-slim

WORKDIR /app
COPY index.js ./
RUN npm init -y && npm install express

# Add a script to create a file in the volume
RUN mkdir -p /data
RUN echo "Hello" > /data/file1.txt
RUN echo "World" > /data/file2.txt


EXPOSE 3000
CMD ["node", "index.js"]
