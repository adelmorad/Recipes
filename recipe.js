const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const apiBase = 'https://api.spoonacular.com/';
const apiKey = '1718467fa8f54ac3924977c121b97867';
const recipeDetails = document.getElementById('recipeDetails');
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

async function fetchRecipeDetails(id) {
  try {
    const response = await fetch(
      `${corsProxy}${apiBase}recipes/${id}/information?apiKey=${apiKey}`
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const recipe = await response.json();
    displayRecipeDetails(recipe);
  } catch (error) {
    alert('Failed to fetch recipe details');
    console.error(error);
  }
}

function displayRecipeDetails(recipe) {
  const ingredients = recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('');
  const steps = recipe.analyzedInstructions.length
    ? recipe.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')
    : '<li>No steps available.</li>';

  recipeDetails.innerHTML = `
    <div class="col-lg-6">
      <img src="${recipe.image}" class="img-fluid rounded" alt="${recipe.title}">
    </div>
    <div class="col-lg-6">
      <h2>${recipe.title}</h2>
      <h4>Ingredients</h4>
      <ul>${ingredients}</ul>
      <h4>Steps</h4>
      <ul>${steps}</ul>
      <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-primary">View Full Recipe</a>
    </div>`;
}

if (recipeId) fetchRecipeDetails(recipeId);
else recipeDetails.innerHTML = '<p class="text-center">Recipe not found.</p>';
