import {useEffect, useState} from 'react';
import homebg from '../assets/vegetable-quinoa-bowl.jpg'
import axios from "axios";
import {apiUrl} from "../../config.js";
import RecipeListDisplay from "../components/RecipeListDisplay.jsx";

function HomePage() {
    const [tabRecipes, setRecipes] = useState([]);

    useEffect(() => {
        const loadRecette = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recette/getRecipesByTag/20`);
                const recipes = response.data;

                const updatedRecipes = await Promise.all(
                    recipes.map(async (recetteDTO) => {
                        return {
                            ...recetteDTO,
                            imageUrl: `${apiUrl}/images/${recetteDTO.imageId}`

                        };
                    })
                );

                setRecipes(updatedRecipes);
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
                    <a className='homebutton' href={`/ViewRecipe/6`}>Cuisinez cette recette</a>
                </div>
            </div>
            <div className='homepagearticle'>
                <h1>Recettes à la une</h1>
                <RecipeListDisplay recipeList={tabRecipes}/>
            </div>
        </div>

    );
}

export default HomePage;