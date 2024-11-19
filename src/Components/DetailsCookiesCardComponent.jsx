import React, { useState, useEffect } from 'react';
import iconePanier from '../asset/Images/icon_shopping_bag.png';
import { useFavoris } from '../Contexts/FavorisContext';
import { usePanier } from '../Contexts/PanierContext'; 
import ClientService from '../Services/ClientService';

const DetailsCookiesCardComponent = ({ produit }) => {
    const { favoris, addFavori, removeFavori } = useFavoris();
    const { panier, ajouterAuPanier, augmenterQuantite } = usePanier();    
    const [isFavori, setIsFavori] = useState(false);
    
    
    // Fonction pour récupérer l'ID du client
    const getClientId = () => {
        return ClientService.getClientIdFromToken();
    };
    
    // Vérifiez si le produit est déjà dans les favoris
    useEffect(() => {
        setIsFavori(favoris.some(fav => fav.produit_id === produit.produit_id));
    }, [favoris, produit.produit_id]);


    // Toggle ajouter et enlever le produit des favoris
    const handleToggleFavoris = () => {
        const clientId = getClientId(); // Récupérer l'ID du client

        if (clientId) {
            if (isFavori) {
                removeFavori(clientId, produit.produit_id); // Passer l'ID du client à la fonction
            } else {
                addFavori(clientId, produit.produit_id); // Passer l'ID du client à la fonction
            }
            setIsFavori(!isFavori); // Mettre à jour l'état local
        }
    };



    // Ajoute le produit au panier
    const handleAddToPanier = () => {
        const clientId = getClientId();
        if (clientId) {
            const produitDansPanier = panier.find(item => item.produit_id === produit.produit_id);
            if (produitDansPanier) {
                augmenterQuantite(clientId, produit.produit_id);  // Assurez-vous que clientId et produit_id sont passés correctement
            } else {
                ajouterAuPanier(clientId, produit.produit_id, 1);  // Passer une quantité de 1
            }
        }
    };


    return (
        <>
            <div className="img_cookie_detail" >
                <img src={produit.image_produit} alt="" />
            </div>

            <div className="details_cookie">
                <h5>{produit.nom_produit}</h5>
                <p>{produit.description_produit}</p>
                <p>{produit.prix_produit}€</p>
                <div className='icone_favori'>
                    <span className={`material-icons-outlined ${isFavori ? 'favorite' : 'favorite-border'}`} onClick={handleToggleFavoris}>
                        {isFavori ? 'favorite' : 'favorite_border'}
                    </span>
                </div>
                <div className='icone_panier_detail' onClick={handleAddToPanier}>
                    <img src={iconePanier} alt="icone panier" />
                </div>
            </div>
        </>
    );
};

export default DetailsCookiesCardComponent;




