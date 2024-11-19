//src/Services/CommandeService.js
import axios from "axios";


class CommandeService{
    static fetchCommandes(){
        return axios.get('http://127.0.0.1:3001/commandes');
    }

    static fetchCommandesById(id){
        return axios.get('http://127.0.0.1:3001/commandes/'+id);
    }
    static fetchCommandesByClientId(clientId) {
        return axios.get(`http://127.0.0.1:3001/commandes/client/${clientId}`);
    }

    static addCommande(commande){
        return axios.post('http://127.0.0.1:3001/commandes', commande)
    }
    static updateCommande(id, commande){
        return axios.post('http://127.0.0.1:3001/commandes/'+id, commande)
    }
    

}
export default CommandeService;


