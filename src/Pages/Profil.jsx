import React from 'react'
import { useNavigate } from 'react-router-dom';
import bag from '../asset/Images/bag.png';
import '../css/styleProfilPage.css'

function Profil() {
    const navigate = useNavigate()
    const navigateTo = (route)=>{
    navigate(route);
    
    }
    return <>
    
        <div id='profil'>
            <h1>Profil</h1>
            <p class="profil_p">Bienvenue sur votre espace personnel. Vous pouvez y gérer vos informations personnelles ainsi que vos commandes.</p>
            <div id='section_redirect'>
                <div class="profil_redirect" onClick={() => {navigateTo('/Favoris')}}>
                    <span class="material-icons-outlined" >favorite_border</span>
                    <p>Mes favoris</p>
                </div>

                <div class="profil_redirect" onClick={() => {navigateTo('/UpdateProfil')}}>
                <span class="material-icons-outlined">person</span>
                    <p>Mes information personnelles</p>
                </div>

                <div class="profil_redirect profil_bag" onClick={() => {navigateTo('/MesCommandes')}}>
                    <img src={bag} alt="" />
                    <p>Mes commandes</p>
                </div>
            </div>
        </div>
    </>
}

export default Profil