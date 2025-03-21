# 使用Python作为基础镜像
FROM python:3.7-slim

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    libcrypt1 \          # 安装 libcrypt.so.1 \
    libssl-dev \         # 可选:SSL 相关库 \
    && rm -rf /var/lib/apt/lists/*

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