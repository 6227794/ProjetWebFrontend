import {useEffect, useState} from 'react';
import homebg from '../assets/vegetable-quinoa-bowl.jpg'
import TempRecipeCard from '../components/TempRecipeCard';
import TempImg from "../assets/hazelnut-brownies.jpg";
import axios from "axios";
import {useParams} from "react-router-dom";

function HomePage() {
    /*const {id} = useParams();

    const [recette, setRecette] = useState({
    });

    useEffect(() => {
        loadRecette();
    }, []);

    const loadRecette = async () => {
        const result = await axios.get(`http://localhost:8888/api1/customer/${id}`);
        setRecette(result.data);
    }*/

    return (
        <div>
            <div className='homepagesection'>
                <img className='homebg' src={homebg} alt="Vegetable and quinoa bowl" />
                <div className='homebgeffect' />
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
                    {/*<div className='recipecard'>
                        <div>
                            <img src={TempImg} alt="Hazelnut brownies"/>
                            <h2>{recette.nomRecette}</h2>
                            <p>Nombre de portion : {recette.nbrPortion}</p>
                            <p>Temps de préparation : {recette.tempsPrep}</p>
                            <p>Temps de cuisson : {recette.tempsCuisson}</p>
                        </div>
                        <div className='tagsdisplay'>
                            {recette.tags.map((tag, index) => (
                                <p className='recipetag' key={index}>{tag}</p>
                            ))}
                        </div>
                    </div>*/}
                    <TempRecipeCard/>
                    <TempRecipeCard/>
                    <TempRecipeCard/>
                    <TempRecipeCard/>
                </div>
            </div>
        </div>

    );
}

export default HomePage;