import TempImg from '../assets/hazelnut-brownies.jpg';

function TempRecipeCard() {
    return (
        <div className='recipecard'>
            <img src={TempImg} alt="Hazelnut brownies" />
            <h2>Recette</h2>
            <p>blabla</p>
            <div className='tagsdisplay'>
                <p className='recipetag'>Omnomnom</p>
                <p className='recipetag'>Omnomnom</p>
                <p className='recipetag'>Omnomnom</p>
            </div>
        </div>
    );
}

export default TempRecipeCard;