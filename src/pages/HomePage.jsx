import {useEffect, useState} from 'react';
import homebg from '../assets/vegetable-quinoa-bowl.jpg'
import TempImg from "../assets/hazelnut-brownies.jpg";
import axios from "axios";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config.js";

function HomePage() {
    const [tabRecipes, setRecipes] = useState([]);

    useEffect(() => {
        const loadRecette = async () => {
            try {
                const result1 = await axios.get(`${apiUrl}/recette/getRecipe/4`);
                const result2 = await axios.get(`${apiUrl}/recette/getRecipe/16`);
                const result3 = await axios.get(`${apiUrl}/recette/getRecipe/25`);
                const result4 = await axios.get(`${apiUrl}/recette/getRecipe/10`);

                setRecipes([
                    result1.data,
                    result2.data,
                    result3.data,
                    result4.data
                ]);
            } catch (error) {
                console.error("Error fetching recettes:", error);
            }
        };

        loadRecette();
    }, []);

    return (
        <div>
            <div className='homepagesection'>
                <img className='homebg' src={homebg} alt="Vegetable and quinoa bowl" />
                <div className='homebgeffect' />
                <div className='homeintro'>
                  <h1 className='comicallylargetitle'>C'est l'été{'\u00A0'}!</h1>
                <h1>Enfin presque...</h1>
                <p>Dégustez l'été avec cette belle salade de couscous aux légumes frais, idéale pour vos repas ensoleillés !</p>
                <a className='homebutton' href={`${apiUrl}/recette/getRecipe/6`}>Cuisinez cette recette</a>
                </div>
            </div>
            <div className='homepagearticle'>
                <h1>Recettes à la une</h1>
                    <div className='recipedisplay'>
                        {
                            tabRecipes.map((data) => (
                                <Link to={`/ViewRecipe/${data.id}`} key={data.id}
                                      className='linkrecipecard'>
                                    <div className='recipecard'>
                                        <div>
                                            <img src={TempImg} alt="Hazelnut brownies"/>
                                            <h2>{data.nomRecette}</h2>
                                            <p>Nombre de portion : {data.nbrPortion}</p>
                                            <p>Temps de préparation : {data.tempsPrep}</p>
                                            <p>Temps de cuisson : {data.tempsCuisson}</p>
                                        </div>
                                        <div className='tagsdisplay'>
                                            {Array.isArray(data.tags) && data.tags.map((tagRecette, index) => (
                                                <p className='recipetag' key={index}>
                                                    {tagRecette.tag ? tagRecette.tag.tagNom : ""}
                                                </p>
                                            ))}
                                        </div>

                                    </div>
                                </Link>
                            ))
                        }
                    </div>
            </div>
        </div>

    );
}

export default HomePage;