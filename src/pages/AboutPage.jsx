import React from 'react';
import photoSarah from '../assets/sarahsong.jpg';
import photoLeia from '../assets/leiasong.jpg';

function AboutPage() {
    return (
        <div className='maindivcontent'>
            <h1>À propos</h1>
            <p>
                Flexifood est une plateforme de partage de recette créée par Sarah Charef et Leïa Plourde dans le cadre du cours  Projet - Développement d'une application Web
                (420-412-MV).
            </p>
            <div className="chansondiv">
                <img src={photoSarah} alt="" className="chansonimg"/>
                <div>
                    <h2>Chanson Sarah</h2>
                    <p className="fancy">It's a man's man's world - James Brown</p>
                    <q style={{fontStyle: "italic"}}>This is a man's, man's, man's world<br/>
                        But it wouldn't be nothing<br/>
                        Nothing without a woman or a girl</q>
                </div>
            </div>
            <div className="chansondiv toright">
                <div>
                    <h2>Chanson Leïa</h2>
                    <p className="fancy">Error - The Warning</p>
                    <q style={{fontStyle:"italic"}}>01100110 01110010 01100101 01100101</q>
                </div>
                <img src={photoLeia} alt="" className="chansonimg"/>
            </div>
        </div>
    );
}

export default AboutPage;