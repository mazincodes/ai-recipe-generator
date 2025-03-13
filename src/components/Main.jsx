import { useState } from "react";
import ChefSeekRecipe from "./ChefSeekRecipe";
import Ingredients from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
function Main(mode){
    const [myIngredients, setMyIngredients] = useState([]);
    
    function submit(e){
        e.preventDefault();
        const formEl = e.currentTarget;
        const formData= new FormData(formEl);
        const newIngredient = formData.get('ingredient');
        setMyIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    const [recipe, setRecipe] = useState("");


    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(myIngredients)
        console.log(recipeMarkdown);
        setRecipe(recipeMarkdown)
    }

    const inputIngredients = document.querySelector('.input-ingredients');
    if(inputIngredients){
        inputIngredients.value = ''
        inputIngredients.blur();
    }

    return (
     <main className="h-full w-full flex justify-center items-center flex-col">
        <form onSubmit={submit} className="flex justify-center items-center md:flex-row flex-col gap-2 my-6">
            <input className="input-ingredients md:w-[400px] w-[350px] border-1 outline-0 border-gray-300 bg-white text-center rounded-md px-8 mt-2 placeholder:text-[#999] text-[#333] py-1.5"
            type="text" name="ingredient" placeholder="e.g. oregano" aria-label="Add ingredient" required/>
            <button className={`btn-add-ingredient md:w-[200px] w-[350px] inline-block border-0 cursor-pointer rounded-md bg-[#fada7a] ${mode ? 'text-[#333]' : 'text-[#333]'}
            px-6 py-2 mt-2 before:content-['+'] before:m-1 shadow-[0_0_3px_0_rgba(0,0,0,0.8)] hover:bg-[#fada7a] hover:text-white hover:scale-[1.03] hover:shadow-[inset_100px_100px_50px_#738c69] duration-500`}>Add ingredient</button>
        </form>
        {myIngredients.length > 0 && <Ingredients myIngredients={myIngredients} setMyIngredients={setMyIngredients} getRecipe={getRecipe}/>}
        {recipe && <ChefSeekRecipe recipe={recipe}/>}
     </main>
    )
}
export default Main;