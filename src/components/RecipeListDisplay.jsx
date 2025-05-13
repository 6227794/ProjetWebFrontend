import {Link} from "react-router-dom";
import errorbg from '../assets/empty-plate.jpg'

function RecipeListDisplay({recipeList}) {

    return (
        <div className='recipedisplay'>
            {
                recipeList.map((data) => (
                    <Link to={`/ViewRecipe/${data.id}`} key={data.id}
                          className='linkrecipecard'>
                        <div className='recipecard'>
                            <div>
                                <img src={data.imageUrl}
                                     onError={(e) => {
                                         e.target.src = errorbg
                                     }}
                                     alt="Aperçu de la recette"
                                />
                                <h2>{data.nomRecette}</h2>
                                <p>Nombre de portion : {data.nbrPortion}</p>
                                <p>Temps de préparation : {data.tempsPrep}</p>
                                <p>Temps de cuisson : {data.tempsCuisson}</p>
                            </div>
                            <div className='tagsdisplay'>
                                {data.tags.map((tagRecette, index) => (
                                    <p className='recipetag' key={index}>
                                        {tagRecette.tag ? tagRecette.tag.tagNom : ""}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default RecipeListDisplay;