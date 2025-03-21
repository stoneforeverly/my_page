# 使用Python作为基础镜像
FROM python:3.13.0

# 安装依赖
RUN apk add --no-cache \
    libcrypto1.1 \
    openssl-dev

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制所有文件
COPY . .

# 暴露5000端口
EXPOSE 5000

# 设置环境变量
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# 启动应用
CMD ["python", "app.py"]