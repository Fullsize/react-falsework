FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# 镜像工作文件夹
WORKDIR /app
# 复制dockerfile 所在文件的文件至app
COPY . .

# dev 依赖
FROM base AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile

# 打包
FROM dev-deps AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules/ /app/node_modules
RUN pnpm run build


FROM nginx:alpine 
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]