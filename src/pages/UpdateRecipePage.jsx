import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../config.js";
import {FaX} from "react-icons/fa6";

function UpdateRecipePage() {

    const {id} = useParams();

    //const [image, setImage] = useState(null);

    const [recette, setRecette] = useState({
        id:"",
        nomRecette: "",
        tempsPrep: "",
        tempsCuisson: "",
        nbrPortion: "",
        user: {id: ""},
        categorie: {
            id: "",
            categorieNom: ""},
        tags:[],
        selectedTags: [],
        ingredients: [{
            quantite : "",
            uniteNom : "",
            ingredientNom : ""
        }],
        etapes: [{
            numEtape : "",
            description : ""
        }]
    })

    useEffect(() => {
        populateUnits();
        populateCategories();
        populateTags();
        loadRecipe();
    }, []);

    useEffect(() => {
        loadSelectedTags();
    }, [recette.tags]);

    const loadRecipe = async () => {
        const result = await axios.get(`${apiUrl}/recette/getRecipe/${id}`);
        setRecette(result.data);
    }

    function loadSelectedTags(){
        const selected = recette.tags.map(tagRecette => ({ id: String(tagRecette.tag.id) }));
        setRecette({...recette, selectedTags: selected})
    }

    const [tabUnites, setUnites] = useState([]);

    const [tabCategories, setCategories] = useState([]);

    const [tabTags, setTags] = useState([])

    const recipeValues = (e) => {
        setRecette({...recette, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();

    const updateRecipe = async (e) => {
        e.preventDefault();

        console.log(recette);

        /*
        const formData = new FormData();
        formData.append("image",image);
        formData.append("recetteDTO", JSON.stringify(recette))

        try {
            const response = await axios.put(`${apiUrl}/recette/updateRecipe`, formData);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }*/
        try {
            const result = await axios.put(`${apiUrl}/recette/updateRecipe`, recette);

            navigate(`/ViewRecipe/${result.data}`);
        }catch(error) {
                console.log(error);
        }
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
        } else if (!e.target.checked) {
            const pos = updateSelectedTags.map(e => e.id).indexOf(e.target.value);
            updateSelectedTags.splice(pos,1)
        }

        setRecette({...recette, selectedTags: updateSelectedTags});
    }

    /*
    const handleFileChange = (e) => {
        //setRecette({...recette, image: e.target.files[0]});
        //setImage(e.target.files[0]);
    };*/

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

    return (
        <div className='maindivcontent'>
            <h1>Modifier la recette</h1>
            <form onSubmit={(e) => updateRecipe(e)} method="post">
                <div>
                    {/*<input type="file" onChange={handleFileChange}/>*/}
                    <label htmlFor="nomRecette">Nom de la recette*</label>
                    <input type="text" id="nomRecette" name="nomRecette"
                           placeholder="Nom de la recette"
                           required
                           onChange={(e) => recipeValues(e)}
                           value={recette.nomRecette || ""}
                    />
                </div>
                <div>
                    <label htmlFor="categorie">Catégorie*</label>
                    {tabCategories && tabCategories.length > 0 ? (
                        <select name="categorie" id="categorie" required
                                onChange={(e) => categoryValue(e)}
                                value={recette.categorie?.id || ""}>
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
                           onChange={(e) => recipeValues(e)}
                           value={recette.tempsPrep || ""}
                    />
                </div>
                <div>
                    <label htmlFor="tempsCuisson">Temps de cuisson (en minutes)</label>
                    <input type="number" id="tempsCuisson" name="tempsCuisson"
                           onChange={(e) => recipeValues(e)}
                           value={recette.tempsCuisson || ""}
                    />
                </div>
                <div>
                    <label htmlFor="nbrPortion">Nombre de portion*</label>
                    <input type="number" id="nbrPortion" name="nbrPortion" required
                           onChange={(e) => recipeValues(e)}
                           value={recette.nbrPortion || ""}
                    />
                </div>

                <div className='listeIngredients'>
                    {recette.ingredients.map((ingredient, index) => (
                        <div className='ingredientdiv' id='ingredientdiv' key={index}>
                            <div className='fifthofspace'>
                                <label htmlFor="quantite">Quantité</label>
                                <input
                                    type="number"
                                    id="ingredientQtt"
                                    name="quantite"
                                    value={ingredient.quantite || ""}
                                    onChange={(e) => ingredientsValues(index, e)}
                                />
                            </div>
                            <div className='fifthofspace'>
                                <label htmlFor="ingredientUnite">Unité</label>
                                {tabUnites && tabUnites.length > 0 ? (
                                    <select name="uniteNom"
                                            id="uniteNom"
                                            onChange={(e) => ingredientsValues(index, e)}
                                            value={recette.ingredients[index]?.uniteNom || ""}
                                    >
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
                                <label htmlFor="ingredientNom">Nom de l'ingrédient*</label>
                                <input
                                    type="text"
                                    id="ingredientNom"
                                    name="ingredientNom"
                                    value={ingredient.ingredientNom || ""}
                                    required
                                    onChange={(e) => ingredientsValues(index, e)}
                                />
                            </div>
                            <div className='deletediv'>
                                <a onClick={(e) => deleteIngredient(index, e)} className='deletebutton'><FaX/></a>
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
                                <a onClick={(e) => deleteEtape(index, e)} className='deletebutton'><FaX/></a>
                            </div>
                        </div>
                    ))}
                </div>
                <a className='addbutton' onClick={addEtapeInput}>Ajouter une étape</a>
                <div>
                    <label htmlFor="tags" className="taglabel">Tags descriptif</label>
                    {tabTags && tabTags.length > 0 ? (
                        <div name="tags" id="tags" className="tagsformdisplay">
                            {tabTags.map((tag) => (
                                <div key={tag.id} className="tagcheckbox">
                                    <label htmlFor={tag.id}>
                                        <input type="checkbox"
                                               value={tag.id}
                                               checked={recette.selectedTags.some(t => String(t.id) === String(tag.id))}
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

                <button type="submit" className="mainbutton">Enregistrer</button>
            </form>
        </div>
    );
}

export default UpdateRecipePage;