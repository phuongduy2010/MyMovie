# Stage 1 — build
FROM node:22.12 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Stage 2 — serve with nginx
FROM nginx:stable-alpine
# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*
# Copy built files
COPY --from=builder /app/dist/my-movie-app/usr/share/nginx/html
# Optional: copy custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
