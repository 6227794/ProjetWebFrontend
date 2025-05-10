import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config.js";
import errorbg from '../assets/empty-plate.jpg'


function RecipeListPage() {
    const [tabRecipes, setRecipes] = useState([]);

    useEffect(() => {
        const loadRecettes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recette/getAllRecipes`);
                const rawRecipes = response.data;

                const updatedRecipes = await Promise.all(
                    rawRecipes.map(async (recetteDTO) => {
                        return {
                            ...recetteDTO,
                            imageUrl: `${apiUrl}/images/${recetteDTO.id}`

                        };
                    })
                );

                setRecipes(updatedRecipes);
            } catch (error) {
                console.error("Erreur fetch recettes :", error);
            }
        };

        loadRecettes();
    }, []);

    return (
        <div className='maindivcontent'>
            <h1>Toutes les recettes</h1>

            <div className='recipedisplay'>
                {
                    tabRecipes.map((data) => (
                        <Link to={`/ViewRecipe/${data.id}`} key={data.id}
                              className='linkrecipecard'>
                            <div className='recipecard'>
                                <div>
                                    <img src={data.imageUrl}
                                         onError={(e) => {e.target.src = errorbg}}
                                         alt="Aperçu de la recette"
                                    />
                                    <h2>{data.nomRecette}</h2>
                                    <p>Nombre de portion : {data.nbrPortion}</p>
                                    <p>Temps de préparation : {data.tempsPrep}</p>
                                    <p>Temps de cuisson : {data.tempsCuisson}</p>
                                </div>
                                <div className='tagsdisplay'>
                                    {data.tags.map((tagRecette, index) => (
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
    );
}

export default RecipeListPage;