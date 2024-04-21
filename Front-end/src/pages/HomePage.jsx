import React from 'react'; // Import de la bibliothèque React
import FeaturesItemData from '../data/featuresItemData.json'; // Import des données des fonctionnalités à partir du fichier JSON
import Hero from '../components/Hero'; // Import du composant Hero
import Feature from '../components/Feature'; // Import du composant Feature
import iconChat from "../assets/icons/icon-chat.webp"; // Import de l'icône de chat
import iconMoney from "../assets/icons/icon-money.webp"; // Import de l'icône d'argent
import iconSecurity from "../assets/icons/icon-security.webp"; // Import de l'icône de sécurité

// Composant HomePage pour la page d'accueil
const HomePage = () => {
  // Définition d'un objet pour mapper les noms de fichier d'icônes aux images réelles
  const imageData = {
    "icon-chat.webp": iconChat,
    "icon-money.webp": iconMoney,
    "icon-security.webp": iconSecurity
  }

  return (
    <div> {/* Conteneur principal de la page d'accueil */}
      <main className="main"> {/* Section principale de la page */}
        <Hero /> {/* Composant Hero */}
        <section className="features"> {/* Section des fonctionnalités */}
          {/* Mapping des données des fonctionnalités pour afficher chaque élément Feature */}
          {FeaturesItemData.map((data) => (
            <Feature
              key={data.id} // Clé unique pour chaque élément Feature
              image={imageData[data.image]} // Image associée à la fonctionnalité
              descriptionImage={data.descriptionImage} // Description de l'image
              title={data.title} // Titre de la fonctionnalité
              description={data.description} // Description de la fonctionnalité
            />        
          ))} 
        </section>
      </main>      
    </div>
  );
};

export default HomePage; // Export du composant HomePage
