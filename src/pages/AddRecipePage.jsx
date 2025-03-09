import React from 'react';

function AddRecipePage() {

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
            <form>
                <div>
                    <label for="nomRecette">Nom de la recette</label>
                    <input type="text" id="nomRecette" name="nomRecette" />
                </div>
                <div>
                    <label for="tempsPrep">Temps de préparation</label>
                    <input type="text" id="tempsPrep" name="tempsPrep" />
                </div>
                <div>
                    <label for="tempsCuisson">Temps de cuisson</label>
                    <input type="text" id="tempsCuisson" name="tempsCuisson" />
                </div>
                <div>
                    <label for="nbrPortion">Nombre de portion</label>
                    <input type="text" id="nbrPortion" name="nbrPortion" />
                </div>
                <div className='ingredientdiv' id='ingredientdiv'>
                    <div>
                        <label for="ingredient">Qtt</label>
                        <input type="text" id="ingredient" name="ingredient" />
                    </div>
                    <div>
                        <label for="ingredient">Unite</label>
                        <select name="unite" id="unite">
                            {/* MAP UNITE HERE */}
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                        </select>
                    </div>
                    <div>
                        <label for="ingredientNom">Nom de l'ingrédient</label>
                        <input type="text" id="ingredientNom" name="ingredientNom" />
                    </div>
                </div>
                <button type="button" className='addbutton' onClick={addIngredientInput}>Ajouter un ingrédient</button>
                <div id='etapediv'>
                    <label for="description">Instructions</label>
                    <input type="text" id="description" name="description" />
                </div>
                <button type="button" className='addbutton' onClick={addEtapeInput}>Ajouter une étape</button>
                <button type="submit" className="mainbutton">Sauvegarder</button>
            </form>
        </div>
    );
}

export default AddRecipePage;