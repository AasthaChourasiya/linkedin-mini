import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      alert('Failed to load posts');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        { content: newPost },
        { headers: { Authorization: token } }
      );
      setNewPost('');
      fetchPosts(); // Reload posts
    } catch (err) {
      alert(err.response?.data?.error || 'Post failed');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Home Feed</h2>

      <form onSubmit={handlePostSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        /><br />
        <button type="submit">Post</button>
      </form>

      <hr />

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p>{post.content}</p>
            <small>By {post.author.name} on {new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeFeed;

