import {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import TempImg from "../assets/hazelnut-brownies.jpg";
import {apiUrl} from "../../config.js";

function MyRecipesPage() {
    const [tabRecipes, setRecipes] = useState([]);

    const loadRecette = async () => {
        try {
            const result1 = await axios.get(`${apiUrl}/recette/getRecipesByUserId/1`);

            setRecipes(result1.data);
        } catch (error) {
            console.error("Error fetching recettes:", error);
        }
    };

    const deleteRecipe = async (id) => {
        await axios.delete(`${apiUrl}/recette/deleteRecipe/${id}`);
        loadRecette();
    };

    useEffect(() => {
        loadRecette();
    }, []);

    return (
        <div className='maindivcontent'>
            <h1>Favorite Recipe Page</h1>
            <div className='myrecipedisplay'>
                {
                    tabRecipes.map((data) => (
                            <div className='myrecipecard' key={data.id}>
                                <img src={TempImg} alt="Hazelnut brownies"/>
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