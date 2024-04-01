import React from 'react';
import FeaturesItemData from '../data/featuresItemData.json';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import iconChat from "../assets/icon-chat.png";
import iconMoney from "../assets/icon-money.png";
import iconSecurity from "../assets/icon-security.png";


const HomePage = () => {
  const imageData = {
    "icon-chat.png": iconChat,
    "icon-money.png": iconMoney,
    "icon-security.png": iconSecurity
}

  return (
    <div>      
      <main className="main">     
      <Hero />
      <section className="features">
          {FeaturesItemData.map((data) => (
            <Feature
              key={data.id}
              image={imageData[data.image]}
              descriptionImage={data.descriptionImage}
              title={data.title}
              description={data.description}
            />        
          ))} 
        </section>
      </main>      
    </div>
  );
};

export default HomePage;