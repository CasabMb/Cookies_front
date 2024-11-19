import React from 'react'
import CarouselComponent from '../Components/CarouselComponent'
import BestSellerComponent from '../Components/bestSellerComponent'
import AccueilDivider from '../Components/AccueilSeparateur'
import CommentairesAffichage from '../Components/CommentairesAffichage'

function HomePage() {
    return <>
        <section class="App">
            <div class="App-header">
                <CarouselComponent />
            </div>
            <div id='best-seller'>
                <h1>Nos Best Seller</h1>
                <BestSellerComponent/>
            </div>
            <div>
                <AccueilDivider/>
            </div>
            <div>
                <CommentairesAffichage/>
            </div>
        </section>
    </>

}

export default HomePage