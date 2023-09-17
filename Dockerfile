FROM node:20-slim AS builder
# 镜像工作文件夹
WORKDIR /app
# 复制dockerfile 所在文件的文件至app
COPY . .
# 下载依赖打包
RUN yarn install && yarn build


FROM nginx
# Set working directory to nginx asset directory
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]