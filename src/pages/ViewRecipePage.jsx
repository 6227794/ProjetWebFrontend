import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {data, useParams} from 'react-router-dom';


function ViewRecipePage() {

    const {id} = useParams();
    const [viewRecipe, setRecipe] = useState({});

    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipe = async () => {
        const result = await axios.get(`http://localhost:8888/recette/getRecipe/4`);
        setRecipe(result.data)
    }

    return (
        <div className="maindivcontent">
            <div className="toTheMiddle">
                <img
                    src="https://d2zp5xs5cp8zlg.cloudfront.net/image-61785-800.jpg"
                    alt="kitty"
                    className="imgRecette"
                />

                <div className="toTheRight">
                    <div className="titleSpace">
                        <h2>{viewRecipe.nomRecette}</h2>
                        <button className="printButton">Télécharger</button>
                    </div>


                    <div className="tagsdisplay">
                        {viewRecipe.tags && viewRecipe.tags.map((tagRecette, index) => (
                            <p className="recipetag" key={index}>
                                {tagRecette.tag ? tagRecette.tag.tagNom : ""}
                            </p>
                        ))}
                    </div>


                    <div className="listDisplay">
                        <h3>Ingrédients </h3>
                        <ul className="listII">
                            {viewRecipe.ingredients && viewRecipe.ingredients.length > 0 ? (
                                viewRecipe.ingredients.map((ingredientRecetteDTO, index) => (
                                    <li key={index}>
                                        {ingredientRecetteDTO.quantite || ""} + {" "}
                                        + {ingredientRecetteDTO.uniteNom || ""} + {" "}
                                        + {ingredientRecetteDTO.ingredientNom || ""}
                                    </li>
                                ))
                            ) : (
                                <p>Aucun ingrédient disponible</p>
                            )}
                        </ul>
                    </div>

                    <div className="listDisplay">
                        <h3>Instructions</h3>
                        <ul className="listII">
                            {viewRecipe.etapes && viewRecipe.etapes.map((instruction, index) => (
                                <li key={index}>{instruction.description}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default ViewRecipePage;