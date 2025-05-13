import {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../config.js";
import RecipeListDisplay from "../components/RecipeListDisplay.jsx";
import {useParams} from "react-router-dom";


function RecipeListByCategoryPage() {
    const {id} = useParams();
    const [tabRecipes, setRecipes] = useState([]);
    const [categoryName, setCategoryName] = useState("")

    useEffect(() => {
        const loadRecettes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recette/getRecipesByCategorie/${id}`);
                const category = await axios.get(`${apiUrl}/categorie/getCategorie/${id}`);
                const recipes = response.data;
                setCategoryName(category.data.categorieNom);

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
                console.error("Erreur fetch recettes :", error);
            }
        };

        loadRecettes();
    }, [id]);

    return (
        <div className='maindivcontent'>
            <h1>{categoryName}</h1>
            <RecipeListDisplay recipeList={tabRecipes}/>
        </div>
    );
}

export default RecipeListByCategoryPage;