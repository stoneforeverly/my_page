from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import json
import traceback
import logging

app = Flask(__name__)
CORS(app)  # 启用CORS以允许前端访问

# 配置日志记录
logging.basicConfig(filename='my_page_backend.log', level=logging.INFO)

# 连接MongoDB - 添加错误处理和认证
try:
    # 使用认证连接MongoDB
    client = MongoClient('mongodb://localhost:27017/', authSource='admin')
    db = client['blog_db']
    posts_collection = db['posts']
    about_collection = db['about']  # 添加about集合
    client.server_info()
    print("MongoDB连接成功")
except Exception as e:
    print(f"MongoDB连接错误: {e}")
    traceback.print_exc()

# 自定义JSON编码器处理ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app.json_encoder = JSONEncoder

# 获取所有博客文章
@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        posts = list(posts_collection.find())
        logging.info("获取所有博客文章成功")
        return jsonify(posts)
    except Exception as e:
        logging.error(f"获取文章列表错误: {e}")
        traceback.print_exc()
        return jsonify({"error": f"获取文章列表失败: {str(e)}"}), 500

# 获取单个博客文章
@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    post = posts_collection.find_one({'_id': ObjectId(post_id)})
    if post:
        return jsonify(post)
    return jsonify({'error': '文章不存在'}), 404

# 创建新博客文章
@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    required_fields = ['title', 'content', 'author']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': '缺少必要字段'}), 400
    
    post = {
        'title': data['title'],
        'content': data['content'],
        'author': data['author'],
        'created_at': data.get('created_at', None)
    }
    
    result = posts_collection.insert_one(post)
    post['_id'] = str(result.inserted_id)
    
    return jsonify(post), 201

# 更新博客文章
@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.json
    posts_collection.update_one(
        {'_id': ObjectId(post_id)},
        {'$set': data}
    )
    post = posts_collection.find_one({'_id': ObjectId(post_id)})
    return jsonify(post)

# 删除博客文章
@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    result = posts_collection.delete_one({'_id': ObjectId(post_id)})
    if result.deleted_count:
        return jsonify({'message': '文章已删除'})
    return jsonify({'error': '文章不存在'}), 404

# 在文件末尾添加这些新路由，在if __name__ == '__main__'之前

# 获取关于我信息
@app.route('/api/about', methods=['GET'])
def get_about():
    try:
        about = about_collection.find_one()
        if not about:
            # 如果没有数据，创建默认数据
            default_about = {
                'intro': '欢迎来到我的个人博客！我是一名热爱技术和写作的开发者。这个博客是我分享技术见解、学习心得和个人思考的地方。',
                'skills': [
                    {'category': '前端开发', 'items': 'React, JavaScript, HTML, CSS'},
                    {'category': '后端开发', 'items': 'Python, Flask, Node.js'},
                    {'category': '数据库', 'items': 'MongoDB, MySQL'},
                    {'category': '其他', 'items': 'Git, Docker'}
                ],
                'contact': {
                    'email': 'example@example.com',
                    'github': 'github.com/yourusername'
                }
            }
            about_collection.insert_one(default_about)
            about = default_about
        
        # 将ObjectId转换为字符串
        about['_id'] = str(about['_id'])
        return jsonify(about)
    except Exception as e:
        print(f"获取关于我信息错误: {e}")
        traceback.print_exc()
        return jsonify({"error": f"获取关于我信息失败: {str(e)}"}), 500

# 更新关于我信息
@app.route('/api/about', methods=['PUT'])
def update_about():
    try:
        data = request.json
        print("收到的更新数据:", data)  # 添加日志，查看接收到的数据
        
        # 确保_id字段不在更新数据中
        if '_id' in data:
            del data['_id']
            
        about = about_collection.find_one()
        
        if about:
            about_collection.update_one({'_id': about['_id']}, {'$set': data})
        else:
            about_collection.insert_one(data)
            
        updated_about = about_collection.find_one()
        updated_about['_id'] = str(updated_about['_id'])
        return jsonify(updated_about)
    except Exception as e:
        print(f"更新关于我信息错误: {e}")
        traceback.print_exc()
        return jsonify({"error": f"更新关于我信息失败: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)