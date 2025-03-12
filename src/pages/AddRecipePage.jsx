import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AddRecipePage() {

    const [recette, setRecette] = useState({
        nomRecette: "",
        tempsPrep: "",
        tempsCuisson: "",
        nbrPortion: "",
        imageUrl: "",
        user: "",
        categorie: ""
    })

    const recipeValues = (e) => {
        setRecette({...recette, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();

    const submitNewRecipe = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8888/recette/newRecipe", recette)
            .then(() => {navigate("/")})
            .catch((error) => {
                console.log(error);
            })
    }

    function addIngredientInput() {
        console.log("add ingredient")
        // var divIngredient = document.getElementById("ingredientDiv");
        // document.body.appendChild(divIngredient);
    }
    function addEtapeInput() {
        console.log("add ingredient")
    }

    return (
        <div className='maindivcontent'>
            <h1>Ajouter une recette</h1>
            <form onSubmit={(e) => submitNewRecipe(e)} method="post">
                <div>
                    <label htmlFor="nomRecette">Nom de la recette</label>
                    <input type="text" id="nomRecette" name="nomRecette"
                           placeholder="Nom de la recette" required onChange={(e) => recipeValues(e)}/>
                </div>
                <div>
                    <label htmlFor="tempsPrep">Temps de préparation</label>
                    <input type="text" id="tempsPrep" name="tempsPrep"
                           onChange={(e) => recipeValues(e)}/>
                </div>
                <div>
                    <label htmlFor="tempsCuisson">Temps de cuisson</label>
                    <input type="text" id="tempsCuisson" name="tempsCuisson"
                           onChange={(e) => recipeValues(e)}/>
                </div>
                <div>
                    <label htmlFor="nbrPortion">Nombre de portion</label>
                    <input type="text" id="nbrPortion" name="nbrPortion"
                           onChange={(e) => recipeValues(e)}/>
                </div>
                {/*
                <div className='ingredientdiv' id='ingredientdiv'>
                    <div>
                        <label htmlFor="ingredient">Qtt</label>
                        <input type="text" id="ingredient" name="ingredient" />
                    </div>
                    <div>
                        <label htmlFor="ingredient">Unite</label>
                        <select name="unite" id="unite">
                            // MAP UNITE?
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ingredientNom">Nom de l'ingrédient</label>
                        <input type="text" id="ingredientNom" name="ingredientNom" />
                    </div>
                </div>
                <button type="button" className='addbutton' onClick={addIngredientInput}>Ajouter un ingrédient</button>
                <div id='etapediv'>
                    <label htmlFor="description">Instructions</label>
                    <input type="text" id="description" name="description" />
                </div>
                <button type="button" className='addbutton' onClick={addEtapeInput}>Ajouter une étape</button>
                */}
                <button type="submit" className="mainbutton">Publier</button>
            </form>
        </div>
    );
}

export default AddRecipePage;