import {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import TempImg from "../assets/hazelnut-brownies.jpg";
import {apiUrl} from "../../config.js";
import errorbg from "../assets/empty-plate.jpg";

function MyRecipesPage() {
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

    const deleteRecipe = async (id) => {
        await axios.delete(`${apiUrl}/recette/deleteRecipe/${id}`);
    };

    return (
        <div className='maindivcontent'>
            <h1>Mes recettes</h1>
            <div className='myrecipedisplay'>
                {
                    tabRecipes.map((data) => (
                            <div className='myrecipecard' key={data.id}>
                                <img src={data.imageUrl}
                                     onError={(e) => {
                                         e.target.src = errorbg
                                     }}
                                     alt="Aperçu de la recette"
                                />
                                <div className='myrecipecardactions'>
                                    <h3>{data.nomRecette}</h3>
                                    <div className='recipeactions'>
                                    <Link to={`/ViewRecipe/${data.id}`}>
                                            Voir la recette
                                        </Link>
                                        <Link to={`/UpdateRecipe/${data.id}`} className='updatemyrecipelink'>
                                            Modifier la recette
                                        </Link>
                                        <button className='deletemyrecipelink' onClick={() => deleteRecipe(data.id)}>
                                            Supprimer la recette
                                        </button>
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MyRecipesPage;