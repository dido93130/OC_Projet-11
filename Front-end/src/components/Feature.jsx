import React from 'react';


const Feature = ({image, descriptionImage, title, description  }) => {
  return (
    <div className="feature-item">
      <img src={image} alt={descriptionImage} className="feature-icon" aria-hidden="true"/>
      <h2 className="feature-item-title">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Feature;