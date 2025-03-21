import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost } from '../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('获取文章详情失败');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (err) {
        setError('删除文章失败');
      }
    }
  };

  if (loading) return <div className="text-center">加载中...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div className="alert alert-warning">文章不存在</div>;

  return (
    <div className="post-detail">
      <h1 className="mb-3">{post.title}</h1>
      <div className="text-muted mb-4">
        <span>作者: {post.author}</span>
        {post.created_at && (
          <span className="ms-3">发布时间: {new Date(post.created_at).toLocaleDateString()}</span>
        )}
      </div>
      <div className="post-content mb-4">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="d-flex">
        <Link to={`/edit/${post._id}`} className="btn btn-primary me-2">
          编辑
        </Link>
        <button onClick={handleDelete} className="btn btn-danger me-2">
          删除
        </button>
        <Link to="/" className="btn btn-secondary">
          返回
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;