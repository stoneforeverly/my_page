import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    intro: '',
    skills: [],
    contact: { email: '', github: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${API_URL}/about`);
        setAboutData(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('获取关于我信息失败:', err);
        setError('获取关于我信息失败');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: '', items: '' }]
    }));
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/about`, formData);
      setAboutData(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('更新关于我信息失败:', err);
      setError('更新关于我信息失败');
    }
  };

  if (loading) return <div className="text-center">加载中...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="about-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>关于我</h2>
        {!isEditing ? (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            编辑
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => {
            setIsEditing(false);
            setFormData(aboutData);
          }}>
            取消
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">个人简介</h5>
            <p className="card-text">{aboutData.intro}</p>
            
            <h5 className="card-title mt-4">技能</h5>
            <ul className="list-group list-group-flush mb-3">
              {aboutData.skills.map((skill, index) => (
                <li key={index} className="list-group-item">
                  {skill.category}: {skill.items}
                </li>
              ))}
            </ul>
            
            <h5 className="card-title">联系方式</h5>
            <p className="card-text">
              邮箱: {aboutData.contact.email}<br />
              GitHub: <a href={`https://${aboutData.contact.github}`} target="_blank" rel="noreferrer">
                {aboutData.contact.github}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">个人简介</h5>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="intro"
                  value={formData.intro}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              
              <h5 className="card-title">技能</h5>
              {formData.skills.map((skill, index) => (
                <div key={index} className="mb-3 d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="类别"
                    value={skill.category}
                    onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="技能列表"
                    value={skill.items}
                    onChange={(e) => handleSkillChange(index, 'items', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeSkill(index)}
                  >
                    删除
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={addSkill}
              >
                添加技能
              </button>
              
              <h5 className="card-title">联系方式</h5>
              <div className="mb-3">
                <label className="form-label">邮箱</label>
                <input
                  type="email"
                  className="form-control"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">GitHub</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact.github"
                  value={formData.contact.github}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary me-2">保存</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setFormData(aboutData);
              }}
            >
              取消
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default About;