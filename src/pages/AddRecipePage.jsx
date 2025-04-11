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
        categorie: {
            id: 0,
            categorieNom: ""},
        tags: [{

        }],
        ingredients: [{
            quantite : "",
            unite : "",
            ingredientNom : ""
        }],
        etapes: [{
            numEtape : "",
            description : ""
        }]
    })

    const [tabUnites, setUnites] = useState([]);

    const [tabCategories, setCategories] = useState([]);

    const recipeValues = (e) => {
        setRecette({...recette, [e.target.name]: e.target.value})
        console.log(recette);
    }

    const navigate = useNavigate();

    const submitNewRecipe = async (e) => {
        // clean empty values des instructions et ingredients

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

    const populateCategories = async () => {
        const result = await axios.get(`http://localhost:8888/categorie/getAllCategorie`);
        setCategories(result.data);
    }

    function addIngredientInput() {
        console.log("add ingredient");
        //var listeIngredients = document.getElementById("listeIngredients");
        setRecette({...recette, ingredients: [...recette.ingredients, {quantite : "", unite : "", ingredientNom : ""}]});
    }

    function addEtapeInput() {
        setRecette({...recette, etapes: [...recette.etapes, {numEtape: "", description: ""}]});
    }

    const instructionValues = (index, e)=> {
        const majEtapes = [...recette.etapes];
        const updateEtape = { ...majEtapes[index] };

        updateEtape.numEtape = index+1;
        updateEtape.description = e.target.value;

        majEtapes[index] = updateEtape;

        setRecette({ ...recette, etapes: majEtapes });
    }

    const categoryValue = (e) => {
        const majCategory = {...recette.categorie};

        majCategory.id = e.target.value;
        var x = document.getElementById("categorie");
        var i = x.selectedIndex;
        majCategory.categorieNom = x.options[i].text;

        setRecette({...recette, categorie: majCategory})

        console.log(recette);
    }

    useEffect(() => {
        populateUnits();
        populateCategories();
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
                    <label htmlFor="categorie">Catégorie</label>
                    {tabCategories && tabCategories.length > 0 ? (
                        <select name="categorie" id="categorie" onChange={(e) => categoryValue(e)}>
                            {tabCategories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id} >
                                    {categorie.categorieNom}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>erreur</p>
                    )}
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

                <div id='listeEtapes'>
                    {recette.etapes.map((instruction, index) => (
                        <div id='etapeDiv' key={index}>
                            <p className='numEtape'>{index + 1}.</p>
                            <div className='etapeDesc'>
                                <label htmlFor={`description-${index}`}>Instruction</label>
                                <input
                                    type="text"
                                    id={`description-${index}`}
                                    name="description"
                                    value={instruction.description}
                                    onChange={(e) => instructionValues(index, e)}
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