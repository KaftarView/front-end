
import React from 'react';
import './ProfileImage.css'; // Import the new CSS file

interface ProfileImageProps {}

const ProfileImage: React.FC<ProfileImageProps> = () => {
  return (
    <div className="profile-container">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/26c8d01ecaea3732c32e92cabda469bf8a96ff3d00e45d32737b1a5a5683202c?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e"
        alt="Profile"
        className="profile-image"
      />
       
    </div>
  );
};

export default ProfileImage;

