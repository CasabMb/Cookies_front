// src/Services/FavorisService.js
import axios from "axios";
import URL from "../config";

class FavorisService {
    // Récupérer tous les favoris d'un client spécifique
    static fetchFavoris(client_id) {
        return axios.get(`${URL}/favoris/${client_id}`);
    }

    // Ajouter un produit aux favoris
    static addToFavori({ client_id, produit_id }) {
        return axios.post(`${URL}/favoris`, { client_id, produit_id });
    }


    // Supprimer un produit des favoris
    static removeFromFavori(client_id, produit_id) {
        return axios.delete(`${URL}/favoris/${client_id}/${produit_id}`);
    }
}

export default FavorisService;