import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AddRecipePage() {

    const [recette, setRecette] = useState({
        nomRecette: "",
        tempsPrep: "",
        tempsCuisson: "",
        nbrPortion: "",
        imageUrl: "",
        user: {id: 1},
        categorie: {id: 1},
        tags: [],
        ingredients: [],
        etapes: []
    })

    const [tabUnites, setUnites] = useState([]);

    const [tabInstruction, setInstruction] = useState([{
        numEtape: "",
        description: "",
        recette: {id: ""}
    }]);

    const recipeValues = (e) => {
        setRecette({...recette, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();

    const submitNewRecipe = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post("http://localhost:8888/recette/newRecipe", recette);

            navigate(`/recette/getRecipe/${result.data}`);
        }catch(error) {
                console.log(error);
        }
    }

    const populateUnits = async () => {
        const result = await axios.get(`http://localhost:8888/unite/getAllUnite`);
        setUnites(result.data);
    }

    function addIngredientInput() {
        console.log("add ingredient")
        var listeIngredients = document.getElementById("listeIngredients");
    }

    function addEtapeInput() {
        setInstruction([
            ...tabInstruction,
            {numEtape: "", description: ""}
        ]);
    }

    useEffect(() => {
        populateUnits();
    }, []);

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

                {/* Liste Ingrédients*/}
                <div className='listeIngredients'>
                    <div className='ingredientdiv' id='ingredientdiv'>
                        <div className='fifthofspace'>
                            <label htmlFor="ingredientQtt">Qtt</label>
                            <input type="text" id="ingredientQtt" name="ingredientQtt"/>
                        </div>
                        <div className='fifthofspace'>
                            <label htmlFor="ingredientUnite">Unite</label>
                            {tabUnites && tabUnites.length > 0 ? (
                                <select name="ingredientUnite" id="ingredientUnite">
                                    {tabUnites.map((unite) => (
                                        <option key={unite.id} value={unite.id}>
                                            {unite.uniteNom}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>erreur</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="ingredientNom">Nom de l'ingrédient</label>
                            <input type="text" id="ingredientNom" name="ingredientNom"/>
                        </div>
                    </div>
                </div>
                <a className='addbutton' onClick={addIngredientInput}>Ajouter un ingrédient</a>

                {/* Liste Étapes*/}
                <div id='listeEtapes'>
                    {tabInstruction.map((instruction, index) => (
                        <div id='etapeDiv' key={index}>
                            <p className='numEtape'>{index + 1}.</p>
                            <div className='etapeDesc'>
                                <label htmlFor={`description-${index}`}>Instruction</label>
                                <input
                                    type="text"
                                    id={`description-${index}`}
                                    name="description"
                                    value={instruction.description}
                                    onChange={(e) => instructionValues(index, e)} // Mise à jour de l'étape spécifique
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <a className='addbutton' onClick={addEtapeInput}>Ajouter une étape</a>

                <button type="submit" className="mainbutton">Publier</button>
            </form>
        </div>
    );
}

export default AddRecipePage;