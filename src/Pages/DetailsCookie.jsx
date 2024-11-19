import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProduitService from '../Services/ProduitService';
import DetailsCookiesCardComponent from '../Components/DetailsCookiesCardComponent';

const DetailsCookie = ()=>{
    const {id} = useParams();
    const [produit, setProduit] = useState({});

    const fetchProduitById = async() =>{
        try{
            const response = await ProduitService.fetchProduitById(id);
            setProduit(response.data);
        }catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        fetchProduitById();
    },[])
    return <>

        <section id="details_cookie_page">
            <div class="details_card">
            <h1>Sweet {produit.nom_produit}</h1>
                <DetailsCookiesCardComponent key={"Produit_"+produit.produit_id} produit={produit} />
            </div>
        </section>
    </>
}

export default DetailsCookie