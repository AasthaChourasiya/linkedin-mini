import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${id}`);
      setProfile(res.data);
    } catch (err) {
      alert('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{profile.user.name}'s Profile</h2>
      <p><strong>Email:</strong> {profile.user.email}</p>
      <p><strong>Bio:</strong> {profile.user.bio}</p>

      <hr />
      <h3>Posts</h3>
      {profile.posts.length === 0 ? (
        <p>No posts by this user.</p>
      ) : (
        profile.posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;

