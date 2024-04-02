import React from 'react';
import FeaturesItemData from '../data/featuresItemData.json';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import iconChat from "../assets/icons/icon-chat.webp";
import iconMoney from "../assets/icons/icon-money.webp";
import iconSecurity from "../assets/icons/icon-security.webp";


const HomePage = () => {
  const imageData = {
    "icon-chat.webp": iconChat,
    "icon-money.webp": iconMoney,
    "icon-security.webp": iconSecurity
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