# 使用Node.js作为基础镜像
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件
COPY . .

# 构建应用
RUN npm run build

# 使用nginx来提供静态文件服务
FROM nginx:alpine

# 复制构建产物到nginx目录
COPY --from=build /app/build /usr/share/nginx/html

# 复制nginx配置文件（可选）
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]