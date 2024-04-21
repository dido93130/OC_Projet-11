import React from "react"; // Import de la bibliothèque React
import { Link } from "react-router-dom"; // Import du composant Link de React Router pour la navigation
import ErrorImage from '../assets/images/404.webp'; // Import de l'image d'erreur

/* Composant Error affiché lorsque l'utilisateur accède à une route inconnue */
function Error () {
    return (
        <div className="error-page"> {/* Conteneur de la page d'erreur */}
            <main>
                <section className="error"> {/* Section principale pour l'affichage de l'erreur */}
                    <h2 className="sr-only">Error 404</h2> {/* Titre de l'erreur (accessible uniquement pour les lecteurs d'écran) */}
                    <img src={ErrorImage} alt="error 404" className="green-error"/> {/* Image d'erreur */}
                    <p className="text-error">The requested page doesn't exist...</p> {/* Message d'erreur */}
                    <p className="text-error">Please return to homepage</p> {/* Message suggérant de retourner à la page d'accueil */}
                    < Link to="/"> {/* Bouton de retour à la page d'accueil */}
                        <button className="button-404">Back to the homepage</button> {/* Bouton de retour à la page d'accueil */}
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default Error; // Export du composant Error
