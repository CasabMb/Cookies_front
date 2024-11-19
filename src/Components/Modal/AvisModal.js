
import React, { useState } from 'react';
import '../../css/styleAvis.css';
import ClientService from '../../Services/ClientService';
import CommentaireService from '../../Services/CommentaireService';

export default function AvisModal({ commandeId }) {
    const [modal, setModal] = useState(false);
    const [note, setNote] = useState(0); // État pour la note
    const [hoveredStar, setHoveredStar] = useState(0); // État pour la note survolée
    const [titre, setTitre] = useState('');
    const [commentaire, setCommentaire] = useState('');
    
    const clientId = ClientService.getClientIdFromToken();
    

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleStarClick = (index) => {
        setNote(index); // Met à jour la note selon l'étoile cliquée
    };

    const handleStarMouseEnter = (index) => {
        setHoveredStar(index); // Met à jour la note survolée
    };

    const handleStarMouseLeave = () => {
        setHoveredStar(0); // Réinitialise la note survolée
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const date_commentaire = new Date().toISOString(); // Date du jour au format ISO
        
        const newCommentaire = {
            note,
            titre,
            commentaire,
            date_commentaire,
            commande_id: commandeId,
            client_id: clientId
        };

        try {
            await CommentaireService.addCommentaire(newCommentaire);
            alert("Commentaire ajouté avec succès");
            toggleModal(); // Fermer le modal après la soumission
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
        }
    };

    return (
        <>
            <button className="avis" onClick={toggleModal}>Laisser un avis</button>

            {modal && (
                <div className='modal-overlay' onClick={toggleModal}>
                    <div className='modal' onClick={(e) => e.stopPropagation()}>
                        <h3>Laisser un avis</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='rating_top'>
                                <div>
                                    <input
                                        type="text"
                                        name="titre"
                                        id="titre"
                                        required
                                        placeholder='Titre'
                                        value={titre}
                                        onChange={(e) => setTitre(e.target.value)}
                                    />
                                </div>
                                <div className="star-rating" name="note">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            className={`star ${index <= (hoveredStar || note) ? "filled" : ""}`}
                                            onClick={() => handleStarClick(index)}
                                            onMouseEnter={() => handleStarMouseEnter(index)}
                                            onMouseLeave={handleStarMouseLeave}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="avis"></label>
                                <textarea
                                    id="avis"
                                    name="commentaire"
                                    required
                                    placeholder='Commentaire'
                                    value={commentaire}
                                    onChange={(e) => setCommentaire(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='infos_avis hidden'>
                                <p>Date du commentaire : {new Date().toLocaleDateString()}</p>
                                <p>Commande n°: {commandeId}</p>
                                <p>Client n°: {clientId}</p>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Soumettre</button>
                                <button type="button" onClick={toggleModal}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}


