import React, { useEffect, useState } from 'react';
import FavorisService from '../Services/FavorisService';
import ClientService from '../Services/ClientService'; // Importez ClientService
import iconePanier from '../asset/Images/icon_shopping_bag.png';
import { useNavigate } from 'react-router-dom';
import '../css/styleFavoriPage.css';
import { useFavoris } from '../Contexts/FavorisContext';

const Favoris = () => {
    const [favoris, setFavoris] = useState([]);
    const navigate = useNavigate();
    const { removeFavori } = useFavoris(); 

    // Fonction pour obtenir les favoris du client
    const fetchFavoris = async (clientId) => {
        try {
            const response = await FavorisService.fetchFavoris(clientId);
            console.log(response); // Affiche la réponse complète pour débogage
            // Adaptation des données : Extraction des produits depuis la réponse
            const produits = response.data.map(item => item.Produits);
            setFavoris(produits); // Mettre à jour l'état avec les produits
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
        }
    };

    // Fonction pour récupérer et utiliser l'ID du client
    const fetchClientFavoris = () => {
        const clientId = ClientService.getClientIdFromToken(); // Directly get the clientId
        if (clientId) {
            fetchFavoris(clientId);
        } else {
            console.error('Impossible de récupérer l\'ID du client.');
        }
    };

    // Utilisez useEffect pour récupérer les favoris au chargement du composant
    useEffect(() => {
        fetchClientFavoris();
    }, []);

    // Fonction pour gérer la suppression d'un favori
    const handleRemoveFavori = (produit_id) => {
        const clientId = ClientService.getClientIdFromToken();
        if (clientId) {
            removeFavori(clientId, produit_id);
            setFavoris(favoris.filter(produit => produit.produit_id !== produit_id)); // Mettre à jour l'état local
        }
    };


    return (
        <div id='favori_page'>
            <h2>Favoris</h2>
            <div id='page_favori_content'>
                {favoris.length > 0 ? (
                    favoris.map((produit, index) => (
                        <div key={index} id='favori_card'>
                            <div
                                className="img_cookie_favori"
                                onClick={() => navigate("/produit/" + produit.produit_id)}
                            >
                                <img 
                                    src={produit.image_produit || "default_image_url"} 
                                    alt={produit.nom_produit} 
                                />
                            </div>
                            <div className="favori_cookie_content">
                                <h5>{produit.nom_produit}</h5>
                                <p>{produit.description_produit}</p>
                                <p>{produit.prix_produit}€</p>
                                <div className='icone_favori'>
                                    <span
                                        className="material-icons-outlined favorite"
                                        onClick={() => handleRemoveFavori(produit.produit_id)}
                                    >
                                        favorite
                                    </span>
                                </div>
                                <div className='icone_panier_favori'>
                                    <img src={iconePanier} alt="icone panier" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Pas encore de cookies favoris !</p>
                )}
            </div>
        </div>
    );
};

export default Favoris;
