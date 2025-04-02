import TempImg from "../assets/hazelnut-brownies.jpg";
import {useEffect, useState} from "react";
import axios from "axios";


function RecipeListPage() {
    const [tabRecipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://localhost:8888/recette/getAllRecipes');
                setRecipes(response.data); // Sauvegarder les données dans l'état
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
                        <div className='recipecard' key={data.id}>
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
                    ))
                }
            </div>
        </div>
    );
}

export default RecipeListPage;