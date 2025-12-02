function Ingredients(props, colorLight, colorDark, mode){
    const ingredientsList = props.myIngredients.map((ingredient, index) => {
        return (
            <ul key={String(index)}>
                <li className="marker:text-[#77906d] list-disc">{ingredient.toLowerCase()}</li>
            </ul>
        )})
    function remove(e){
        e.preventDefault();
        props.setMyIngredients(props.myIngredients.slice(0,-1))
    }

    return (
        <section className="ingredients-section flex flex-col items-center">
            <div className="md:w-[500px]">
                <h2 className={`text-3xl font-semibold py-6 mr-16 ${mode ? colorLight : colorDark}`}>Ingredients on hand:</h2>
                <form onSubmit={remove}>
                    <button className="btn-remove-ingredient md:w-[200px] w-[200px] inline-block border-0 cursor-pointer rounded-md bg-linear-to-tl from-[#ff617e] to-[#ffaa76] text-white 
                    px-6 py-2 before:content-['-'] before:m-1 shadow-[0_0_3px_0_rgba(0,0,0,0.8)] hover:scale-[1.03] hover:shadow-[inset_100px_100px_50px_#e4526d] duration-500">Remove ingredient</button>
                </form>
            </div>
            <ul className={`text-center p-4 ${mode ? colorLight : colorDark}`} aria-live="polite">
                <li className="listOnHand">{ingredientsList}</li>
            </ul>
            {props.myIngredients.length >= 4 && <div className="recipe-container flex justify-center items-center gap-4 rounded-md bg-linear-to-tl from-[#AAB99A] to-[#86A788] p-8">
                <div className="recipe-generate-container">
                    <h3 className="text-2xl font-semibold text-[#272727]">Ready for a recipe?</h3>
                    <p className="text-[#333]">Generate a recipe from the list of ingredients.</p>
                </div>
                <a onClick={props.getRecipe} className={`btn-get-recipe text-center w-[200px] md:w-[150px] ${mode ? 'text-[#333]' : 'text-[#333]'} bg-[#fada7a] px-6 py-3 rounded-md shadow cursor-pointer hover:bg-[#ffe69d] duration-500`} href="#suggested-recipe">Get a recipe</a>
            </div>}
        </section>
    )
}
export default Ingredients;