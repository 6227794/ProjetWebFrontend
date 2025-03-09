import React from 'react';
import homebg from '../assets/vegetable-quinoa-bowl.jpg'
import TempRecipeCard from '../components/TempRecipeCard';

function HomePage() {
    return (
        <div>
            <div className='homepagesection'>
                <img className='homebg' src={homebg} alt="Vegetable and quinoa bowl" />
                <div className='homebgeffect'></div>
                <div className='homeintro'>
                  <h1 className='comicallylargetitle'>C'est l'été{'\u00A0'}!</h1>
                <h1>Enfin presque...</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque assumenda molestiae, aspernatur voluptate at illo modi soluta dolores beatae pariatur!</p>
                <button className='homebutton'>Yumyumyum</button>  
                </div>
            </div>
            <div className='homepagearticle'>
                <h1>Recettes à la une</h1>
                <div className='homepagerecipes'>
                    <TempRecipeCard />
                    <TempRecipeCard />
                    <TempRecipeCard />
                    <TempRecipeCard />
                </div>
            </div>
        </div>

    );
}

export default HomePage;