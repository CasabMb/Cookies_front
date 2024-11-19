// src/components/Panier.js
import React from 'react';
import PanierCard from '../Components/PanierCard';
import PanierTicketComponent from '../Components/PanierTicketComponent';


function Panier() {
    
    return <>
        <section id='Panier'>
            <PanierCard/>
            <PanierTicketComponent/>
        </section>
    </>
    
}

export default Panier;