import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {apiUrl} from "../../config.js";
import errorbg from '../assets/empty-plate.jpg'


function ViewRecipePage() {

    const {id} = useParams();
    const [viewRecipe, setRecipe] = useState({});
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipe = async () => {
        const result = await axios.get(`${apiUrl}/recette/getRecipe/${id}`);

        setRecipe(result.data);
        try {
            setImageUrl(`${apiUrl}/images/${id}`);
            console.log(`${apiUrl}/images/${id}`)
        } catch (error) {
            console.error("Error ", error);
        }
    }

    const handleGeneratePdf = () => {
        axios.get(`${apiUrl}/recette/getRecipePdf/${id}`, {
            responseType: "blob",
        }).then((response) => {

            const file = new Blob([response.data], {type: "application/pdf"});

            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }).catch((error) => {
            console.error("Erreur lors de la génération du PDF", error);
        });
    };

    return (
        <div className="maindivcontent">
            <div className="recipeimage">
                <img src={imageUrl}
                    onError={(e) => {e.target.src = errorbg}}
                    alt="Aperçu de la recette"
                    className="imgRecette"
                />

                <div className="recipedescription">
                    <div className="titleSpace">
                        <h2>{viewRecipe.nomRecette}</h2>
                        <a className="printButton" onClick={handleGeneratePdf}>Télécharger</a>
                    </div>


                    <div className="tagsrecipedisplay">
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
                                        {ingredientRecetteDTO.quantite || ""} {" "}
                                        {ingredientRecetteDTO.uniteNom || ""} {" "}
                                        {ingredientRecetteDTO.ingredientNom || ""}
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