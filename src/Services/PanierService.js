// src/Services/PaniersService.js
import axios from "axios";
import URL from "../config";

class PanierService {
    // Récupérer tous les Panier d'un client spécifique
    static fetchPanier(client_id) {
        return axios.get(`${URL}/paniers/${client_id}`);
    }

    // Ajouter un produit aux Panier
    static addToPanier({ client_id, produit_id, quantite }) {
        return axios.post(`${URL}/paniers`, { client_id, produit_id, quantite });
    }


    // Supprimer un produit des Panier
    static removeFromPanier(client_id, produit_id, ) {
        return axios.delete(`${URL}/paniers/${client_id}/${produit_id}`);
    }

    // Update de la quantité
    static updateQuantite(client_id, produit_id, quantite) {
        return axios.put(`${URL}/paniers/${client_id}/${produit_id}`, {quantite});
    }

    static clearPanier(clientId){
        return axios.delete(`${URL}/paniers/${clientId}`)
    }
}

export default PanierService;