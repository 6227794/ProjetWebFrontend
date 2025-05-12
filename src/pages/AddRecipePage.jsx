import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../config.js";
import { FaX } from "react-icons/fa6";

function AddRecipePage() {

    const [recette, setRecette] = useState({
        nomRecette: "",
        tempsPrep: "",
        tempsCuisson: "",
        nbrPortion: "",
        imageUrl: "",
        user: {id: 1},
        categorie: {
            id: 1},
        selectedTags: [],
        ingredients: [{
            quantite : "",
            uniteNom : "g",

            ingredientNom : ""
        }],
        etapes: [{
            numEtape : "",
            description : ""
        }]
    })

    const [tabUnites, setUnites] = useState([]);

    const [tabCategories, setCategories] = useState([]);

    const [tabTags, setTags] = useState([])

    const recipeValues = (e) => {
        setRecette({...recette, [e.target.name]: e.target.value});
    }

    const populateUnits = async () => {
        const result = await axios.get(`${apiUrl}/unite/getAllUnite`);
        setUnites(result.data);
    }

    const populateCategories = async () => {
        const result = await axios.get(`${apiUrl}/categorie/getAllCategorie`);
        setCategories(result.data);
    }

    const populateTags = async () => {
        const result = await axios.get(`${apiUrl}/tag/getAllTag`);
        setTags(result.data);
    }

    function addIngredientInput() {
        setRecette({...recette, ingredients: [...recette.ingredients, {quantite : "", uniteNom : "", ingredientNom : ""}]});
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

    const ingredientsValues = (index, e) => {
        const { name, value } = e.target;

        const updatedIngredients = [...recette.ingredients];
        const ingredientToUpdate = { ...updatedIngredients[index] };

        ingredientToUpdate[name] = value;

        updatedIngredients[index] = ingredientToUpdate;

        setRecette({ ...recette, ingredients: updatedIngredients });
    };

    const categoryValue = (e) => {
        const selectedId = e.target.value;

        setRecette({
            ...recette,
            categorie: {
                id: selectedId
            }
        });
    }

    const tagsValue = (e) => {
        const updateSelectedTags = [...recette.selectedTags];

        if(e.target.checked){
            updateSelectedTags.push({ id: e.target.value})
        } else {
            const pos = updateSelectedTags.map(e => e.id).indexOf(e.target.value);
            updateSelectedTags.splice(pos,1)
        }

        setRecette({...recette, selectedTags: updateSelectedTags});
    }

    const deleteIngredient = (index) =>{
        const updateIngredients = [...recette.ingredients]
        updateIngredients.splice(index, 1);
        setRecette({...recette, ingredients: updateIngredients})
    }

    const deleteEtape = (index) =>{
        const updateEtapes = [...recette.etapes]
        updateEtapes.splice(index, 1);
        setRecette({...recette, etapes: updateEtapes})
    }


    const navigate = useNavigate();

    const submitNewRecipe = async (e) => {
        e.preventDefault();

        console.log(recette)

        try {
            const result = await axios.post(`${apiUrl}/recette/newRecipe`, recette);

            navigate(`/ViewRecipe/${result.data}`);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        populateUnits();
        populateCategories();
        populateTags();
    }, []);

    return (
        <div className='maindivcontent'>
            <h1>Ajouter une recette</h1>
            <form onSubmit={(e) => submitNewRecipe(e)} method="post">
                <div>
                    <label htmlFor="nomRecette">Nom de la recette*</label>
                    <input type="text" id="nomRecette" name="nomRecette"
                           placeholder="Nom de la recette" required onChange={(e) => recipeValues(e)}/>
                </div>
                <div>
                    <label htmlFor="categorie">Catégorie*</label>
                    {tabCategories && tabCategories.length > 0 ? (
                        <select name="categorie" id="categorie" required onChange={(e) => categoryValue(e)}>
                            {tabCategories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id}>
                                    {categorie.categorieNom}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>erreur</p>
                    )}
                </div>
                <div>
                <label htmlFor="tempsPrep">Temps de préparation (en minutes)*</label>
                    <input type="number" id="tempsPrep" name="tempsPrep" required
                           onChange={(e) => recipeValues(e)}/>
                </div>
                <div>
                    <label htmlFor="tempsCuisson">Temps de cuisson (en minutes)</label>
                    <input type="number" id="tempsCuisson" name="tempsCuisson"
                           onChange={(e) => recipeValues(e)}/>
                </div>
                <div>
                    <label htmlFor="nbrPortion">Nombre de portion*</label>
                    <input type="number" id="nbrPortion" name="nbrPortion" required
                           onChange={(e) => recipeValues(e)}/>
                </div>
                <div className='listeIngredients'>
                    {recette.ingredients.map((ingredient, index) => (
                        <div className='ingredientdiv' id='ingredientdiv' key={index}>
                            <div className='fifthofspace'>
                                <label htmlFor={`quantite-${index}`}>Quantité</label>
                                <input
                                    type="number"
                                    id={`quantite-${index}`}
                                    name="quantite"
                                    value={ingredient.quantite}
                                    onChange={(e) => ingredientsValues(index, e)}
                                />
                            </div>
                            <div className='fifthofspace'>
                                <label htmlFor={`uniteNom-${index}`}>Unité</label>
                                {tabUnites && tabUnites.length > 0 ? (
                                    <select name="uniteNom"
                                            id={`uniteNom-${index}`}
                                            onChange={(e) => ingredientsValues(index, e)}>
                                        {tabUnites.map((unite) => (
                                            <option key={unite.id} value={unite.uniteNom}>
                                                {unite.uniteNom}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>erreur</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor={`ingredientNom-${index}`}>Nom de l'ingrédient*</label>
                                <input
                                    type="text"
                                    id={`ingredientNom-${index}`}
                                    name="ingredientNom"
                                    value={ingredient.ingredientNom}
                                    required
                                    onChange={(e) => ingredientsValues(index, e)}
                                />
                            </div>
                            <div className='deletediv'>
                                <a onClick={(e) => deleteIngredient(index, e)} className='deletebutton'><FaX /></a>
                            </div>
                        </div>
                    ))}
                </div>
                <a className='addbutton' onClick={addIngredientInput}>Ajouter un ingrédient</a>

                <div id='listeEtapes'>
                    {recette.etapes.map((instruction, index) => (
                        <div id='etapeDiv' key={index}>
                            <p className='numEtape'>{index + 1}.</p>
                            <div className='etapeDesc'>
                                <label htmlFor={`description-${index}`}>Instruction*</label>
                                <input
                                    type="text"
                                    id={`description-${index}`}
                                    name="description"
                                    value={instruction.description}
                                    required
                                    onChange={(e) => instructionValues(index, e)}
                                />
                            </div>
                            <div className='deletediv'>
                                <a onClick={(e) => deleteEtape(index, e)} className='deletebutton'><FaX /></a>
                            </div>
                        </div>
                    ))}
                </div>
                <a className='addbutton' onClick={addEtapeInput}>Ajouter une étape</a>
                <div>
                    <label className="taglabel">Tags descriptif</label>
                    {tabTags && tabTags.length > 0 ? (
                        <div name="tags" id="tags" className="tagsformdisplay">
                            {tabTags.map((tag, index) => (
                                <div key={tag.id} className="tagcheckbox">
                                    <label htmlFor={`tag-${index}`}>
                                        <input type="checkbox"
                                               id={`tag-${index}`}
                                               value={tag.id}
                                               onChange={(e) => tagsValue(e)}
                                        />
                                        {tag.tagNom}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>erreur</p>
                    )}
                </div>

                <button type="submit" className="mainbutton" id="ajouterrecette">Publier</button>
            </form>
        </div>
    );
}

export default AddRecipePage;