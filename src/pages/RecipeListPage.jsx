import TempImg from "../assets/hazelnut-brownies.jpg";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


function RecipeListPage() {
    const [tabRecipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://localhost:8888/recette/getAllRecipes');
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recettes:", error);
            }
        };

        fetchRecettes();
    }, []);

    return (
        <div className='maindivcontent'>
            <h1>Recipe List Page</h1>

            <div className='recipedisplay'>
                {
                    tabRecipes.map((data) => (
                        <Link to={`http://localhost:8888/recette/getRecipe/${data.id}`} key={data.id}
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
                                    {data.tags.map((tag, index) => (
                                        <p className='recipetag' key={index}>{tag}</p>
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