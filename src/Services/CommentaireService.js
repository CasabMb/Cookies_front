import axios from "axios";
import URL from '../config'


class CommentaireService{
    static fetchCommentaires(){
        // return axios.get('http://127.0.0.1:3001/commentaires');
        return axios.get(`${URL}/commentaires`);

    }

    static addCommentaire(commentaire){
        return axios.post(`${URL}/commentaires`, commentaire)
    }
    static updateCommentaire(id, commentaire){
        return axios.patch(`${URL}/commentaires`+id, commentaire)
    }
    

}
export default CommentaireService;