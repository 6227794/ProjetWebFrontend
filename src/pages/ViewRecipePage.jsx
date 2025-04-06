import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';


function ViewRecipePage() {

    const {id} = useParams();
    const [viewRecipe, setRecipe] = useState({});

    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipe = async () => {
        const result = await axios.get(`http://localhost:8888/recette/getRecipe/{id}`);
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
              {/*<h2>{viewRecipe.nomRecette}</h2>*/}
              <h2>Bao au poulet katsu </h2>
              <button className="printButton">Télécharger</button>
            </div>

            <div className="tagsdisplay">
              {/* {data.tags.map((viewRecipe, index) => (
            <p className="recipetag" key={index}>
              {tagRecette.tag ? tagRecette.tag.tagNom : ""}
            </p>
          ))} */}
              <p className="recipetag">simple</p>
              <p className="recipetag">rapide</p>
              <p className="recipetag">asiatique</p>
              <p className="recipetag">friture</p>
            </div>

            <div className="listDisplay">
              {/* {data.ingredients.map((viewRecipe, index) => (
            <div>
              <h3>Ingrédients<h3>
              <ul className="listII">
                {viewRecipe.ingredients.map((ingredients, index) => (
                  <li key={index}>{ingredients}</li>
                ))}
              </ul>
            </div>
          ))} */}

              <h3>Ingrédients </h3>
              <ul>
                <li>2 blancs de poulet</li>
                <li>2 œufs battus</li>
                <li>100 g de farine</li>
                <li>100 g de chapelure panko</li>
                <li>Huile pour la friture</li>
                <li>Chou râpé (pour ajouter du croquant)</li>
                <li>Coriandre fraîche</li>
                <li>
                  Sauce mayo épicée (ou sriracha mélangée avec de la mayonnaise)
                </li>
              </ul>
            </div>

            <div className="listDisplay">
              {/* {data.instructions.map((viewRecipe, index) => (
            <div>
              <h3>Instructions<h3>
              <ul className="listII">
                {viewRecipe.instructions.map((instructions, index) => (
                  <li key={index}>{instructions}</li>
                ))}
              </ul>
            </div>
          ))} */}

              <h3>Instructions </h3>
              <ul>
                <li>
                  Coupez les blancs de poulet en fines tranches ou en escalopes.
                </li>
                <li>
                  Passez chaque morceau de poulet dans la farine, puis dans les
                  œufs battus, et enfin dans la chapelure panko.
                </li>
                <li>
                  Faites chauffer de l'huile dans une poêle à feu moyen. Faites
                  frire les morceaux de poulet pendant environ 4 à 5 minutes de
                  chaque côté, jusqu'à ce qu'ils soient bien dorés et
                  croustillants.
                </li>
                <li>Égouttez le poulet sur du papier absorbant.</li>
                <li>
                  Ouvrez chaque bao (une fois cuit à la vapeur) et ajoutez un
                  morceau de poulet katsu à l'intérieur.
                </li>
                <li>
                  Arrosez de sauce katsu, puis ajoutez des garnitures comme du
                  chou râpé, de la coriandre ou un peu de sauce mayo épicée si
                  vous le souhaitez.
                </li>
                <li>Fermez les baos et servez immédiatement.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ViewRecipePage;