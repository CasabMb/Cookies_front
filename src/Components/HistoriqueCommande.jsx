// src/Components/HistoriqueCommande.jsx
import React, { useEffect, useState } from 'react';
import '../css/styleMesCommandes.css';
import { useNavigate } from 'react-router-dom';
import CommandeService from '../Services/CommandeService';
import ClientService from '../Services/ClientService';
import DetailsCommandeService from '../Services/DetailsCommandeService';

function HistoriqueCommande() {
    const [commandes, setCommandes] = useState([]);
    const [detailsCommandes, setDetailsCommandes] = useState({});
    const navigate = useNavigate();

    // Fonction pour récupérer les commandes et leurs détails
    const fetchCommandes = async () => {
        try {
            const clientId = ClientService.getClientIdFromToken();
            if (!clientId) {
                console.error('Impossible de récupérer l\'ID du client.');
                return;
            }
    
            const response = await CommandeService.fetchCommandesByClientId(clientId);
            if (response.data && Array.isArray(response.data)) {
                const commandesData = response.data;
    
                // Récupérer les détails des commandes
                const detailsResponses = await Promise.all(
                    commandesData.map(commande =>
                        DetailsCommandeService.getDetailsCommandeByCommandeId(commande.commande_id)
                    )
                );
    
                // Créer une carte pour les détails
                const detailsMap = detailsResponses.reduce((acc, response) => {
                    const details = response.data;
                    if (Array.isArray(details)) {
                        const commandeId = details[0]?.commande_id;
                        if (commandeId) {
                            acc[commandeId] = details;
                        }
                    }
                    return acc;
                }, {});
    
                // Calculer le nombre total d'articles pour chaque commande
                const commandesWithDetails = commandesData.map(commande => {
                    const details = detailsMap[commande.commande_id] || [];
                    const nombreArticles = details.reduce((total, article) => total + article.quantite, 0);
                    return { ...commande, nombre_articles: nombreArticles };
                });
    
                setCommandes(commandesWithDetails);
                setDetailsCommandes(detailsMap);
            } else {
                console.error('Les données reçues ne sont pas dans le format attendu.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
    };

    useEffect(() => {
        fetchCommandes();
    }, []);

    return (
        <section id='mes_commandes'>
            <div id="historique_commandes">
                <h2>Historique des commandes</h2>
                <div className="historique_commande_cards">
                    {commandes.length > 0 ? (
                        commandes.map((commande) => (
                            <div key={commande.commande_id} id='historique_card'>
                                <div className='historique_commande_card'>
                                    <p>Commande n°<span id='commande_id'>{commande.commande_id}</span></p>
                                    <div className='infos_historique'>
                                        <p>Date: {commande.date_commande}</p>
                                        <p><span>{commande.nombre_articles}</span> Articles</p>
                                        <p>Statut: {commande.statut_commande}</p>
                                    </div>
                                    <div className='historique_commande_img'>
                                        {detailsCommandes[commande.commande_id]?.map((item) => (
                                            <img 
                                                key={item.produit_id} 
                                                src={item.Produits.image_produit} 
                                                alt={item.Produits.nom_produit} 
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => navigate(`/DetailsCommande/${commande.commande_id}`)}> 
                                    <span>Details</span> Laisser un avis
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Aucune commande disponible pour l'instant.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HistoriqueCommande;