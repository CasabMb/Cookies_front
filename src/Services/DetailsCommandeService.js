// src/Services/DetailsCommandeService.js
import axios from "axios";


class DetailsCommandeService{
    static fetchDetailsCommandes(){
        return axios.get(`${URL}/detailscommandes`);
    }

    static fetchDetailsCommandesById(id){
        return axios.get(`${URL}/detailscommandes`+id);
    }
    static getDetailsCommandeByCommandeId(id){
        return axios.get(`${URL}/detailscommandes`+id);
    }

    static addDetailsCommande(detailsCommande){
        return axios.post(`${URL}/detailscommandes`, detailsCommande);
    }
    static updateDetailsCommande(id, detailsCommande){
        return axios.put(`${URL}/detailscommandes`+id, detailsCommande);
    }
}
export default DetailsCommandeService

