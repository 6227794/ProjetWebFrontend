import TempImg from "../assets/hazelnut-brownies.jpg";
import {useEffect, useState} from "react";
import axios from "axios";


function RecipeListPage() {
    const [tabRecipes, setRecipes] = useState([]);
    //const [tabTags, setTags] = useState([]);
    //const [tagName, setTagName] = useState([]);

    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://localhost:8888/recetteDetails/allRecipes');
                setRecipes(response.data); // Sauvegarder les données dans l'état
            } catch (error) {
                console.error("Error fetching recettes:", error);
            }
        };

        fetchRecettes();
    }, []);

    /*const loadAllRecipes = async () => {
        const result = await axios.get("http://localhost:8888/recette/allRecipes");

        const recipesWithTags = result.data.map(data => ({
            ...data,
            tags: []
        }));

        setRecipes(recipesWithTags);
    };

    const loadAllTags = (recetteId) => {
        axios.get(`http://localhost:8888/tags/getTagRecetteByRecette/${recetteId}`)
            .then(result => setTags(result.data))
            .catch(error => console.log(error));
    }

    const getTagName = (tagId) => {
        axios.get(`http://localhost:8888/tag/getTagById/${tagId}`)
            .then(result => setTagName(result.data))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        loadAllRecipes();
    }, []);*/


    return (
        <div className='maindivcontent'>
            <h1>Recipe List Page</h1>

            <div className='recipedisplay'>
                {
                    tabRecipes.map((data) => (
                        <div className='recipecard' key={data.i}>
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