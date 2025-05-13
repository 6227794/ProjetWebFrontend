import React from 'react';
import {Link} from "react-router-dom";

function FAQPage() {
    return (
        <div className='maindivcontent'>
            <h1>Foire aux questions</h1>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <p>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false"
                                aria-controls="flush-collapseOne">
                            Est-ce que je peux ajouter une recette?
                        </button>
                    </p>
                    <div id="flush-collapseOne" className="accordion-collapse collapse"
                         data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Oui! Mais il faut d'abord créer un compte. <Link to={`/Inscription`}>Créer un compte</Link>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <p>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                aria-controls="flush-collapseTwo">
                            Est-ce que je peux modifier mes recettes publiées?
                        </button>
                    </p>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse"
                         data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            Oui! En cliquant sur l'onglet "Mes recettes".
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <p>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                            Est-ce que je peux télécharger des recettes en format PDF?
                        </button>
                    </p>
                    <div id="flush-collapseThree" className="accordion-collapse collapse"
                         data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Cette fonctionnalité n'est pas complète. Merci pour votre patience!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;