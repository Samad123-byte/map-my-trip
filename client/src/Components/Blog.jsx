import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Blog.css';

const BlogPostModal = ({ post, onClose }) => {
  const { t } = useTranslation();

  if (!post) return null;

  return (
    <div className="blog-post-modal-overlay">
      <div className="blog-post-modal">
        <button className="modal-close-button" onClick={onClose}>×</button>
        <img src={post.image} alt={post.title} className="modal-image" />
        <div className="modal-content">
          <h2>{post.title}</h2>
          <div className="modal-meta">
            <span className="blog-author">{post.author}</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <div className="modal-full-content">
            {post.fullContent}
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(t('blog.categories.all'));
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      translationKey: 'hunza',
      title: t('blog.posts.hunza.title'),
      excerpt: t('blog.posts.hunza.excerpt'),
      fullContent: t('blog.posts.hunza.fullContent'),
      author: 'Mountain Explorers',
      date: 'March 27, 2024',
      image: '/hunza.jpg',
      category: t('blog.categories.destinations')
    },
    {
      id: 2,
      translationKey: 'skardu',
      title: t('blog.posts.skardu.title'),
      excerpt: t('blog.posts.skardu.excerpt'),
      fullContent: t('blog.posts.skardu.fullContent'),
      author: 'Adventure Seekers',
      date: 'March 20, 2024',
      image: '/skardu.jpg',
      category: t('blog.categories.adventure')
    },
    {
      id: 3,
      translationKey: 'mountainCuisine',
      title: t('blog.posts.mountainCuisine.title'),
      excerpt: t('blog.posts.mountainCuisine.excerpt'),
      fullContent: t('blog.posts.mountainCuisine.fullContent'),
      author: 'Culinary Traveler',
      date: 'March 15, 2024',
      image: '/Tikka.jpg',
      category: t('blog.categories.food')
    }
  ];

  const categories = [
    t('blog.categories.all'), 
    t('blog.categories.destinations'), 
    t('blog.categories.adventure'), 
    t('blog.categories.food')
  ];

  const filteredPosts = activeCategory === categories[0] 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-container">
      {selectedPost && (
        <BlogPostModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}

      <div className="blog-header">
        <h1>{t('blog.title')}</h1>
        <p>{t('blog.subtitle')}</p>
      </div>
      
      <div className="blog-categories">
        {categories.map(category => (
          <button 
            key={category} 
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="blog-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="blog-card">
            <div className="blog-card-image-container">
              <img 
                src={post.image} 
                alt={post.title} 
                className="blog-card-image"
              />
              <span className="blog-category-tag">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span className="blog-author">{post.author}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <button 
                  className="read-more-button"
                  onClick={() => setSelectedPost(post)}
                >
                  {t('blog.readMore', { defaultValue: 'Read More' })}
                </button>
                <div className="blog-read-time">
                  {t('blog.readTime', { count: 5 })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;