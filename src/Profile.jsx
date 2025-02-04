import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://3.109.211.104:8001/profile')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch profile');
      })
      .then((data) => {
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
      })
      .catch((error) => {
        console.error('Profile fetch error:', error);
        alert('Failed to fetch profile. Please try again later.');
      });
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('http://3.109.211.104:8001/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setEditMode(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Name: {editMode ? <input value={name} onChange={(e) => setName(e.target.value)} /> : name}</p>
          <p>Email: {editMode ? <input value={email} onChange={(e) => setEmail(e.target.value)} /> : email}</p>
          {editMode ? (
            <button onClick={handleSaveProfile}>Save</button>
          ) : (
            <button onClick={handleEditProfile}>Edit Profile</button>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;