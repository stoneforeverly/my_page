import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  // 截取内容预览
  const preview = post.content.length > 150 
    ? post.content.substring(0, 150) + '...' 
    : post.content;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">作者: {post.author}</h6>
        <p className="card-text">{preview}</p>
        <Link to={`/posts/${post._id}`} className="btn btn-primary me-2">
          阅读更多
        </Link>
        <Link to={`/edit/${post._id}`} className="btn btn-secondary">
          编辑
        </Link>
      </div>
    </div>
  );
};

export default PostCard;