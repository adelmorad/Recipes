const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const apiBase = 'https://api.spoonacular.com/';
const apiKey = '1718467fa8f54ac3924977c121b97867';
const recipeDetails = document.getElementById('recipeDetails');

// Get the recipe ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// Function to fetch recipe details
async function fetchRecipeDetails(id) {
  try {
    console.log("Fetching details for recipe ID:", id);

    // Make API request
    const response = await fetch(
      `${corsProxy}${apiBase}recipes/${id}/information?apiKey=${apiKey}`
    );

    console.log("API Response Status:", response.status);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    // Parse JSON response
    const recipe = await response.json();
    console.log("Fetched Recipe Details:", recipe); 

    // Display recipe details on the page
    displayRecipeDetails(recipe);
  } catch (error) {
    alert('Failed to fetch recipe details. Please try again later.');
    console.error("Fetch Error:", error);
  }
}


function displayRecipeDetails(recipe) {
  const ingredients = recipe.extendedIngredients
    .map(ing => `<li>${ing.original}</li>`)
    .join('');

  const steps = recipe.analyzedInstructions.length
    ? recipe.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')
    : '<li>No steps available.</li>';

  recipeDetails.innerHTML = `
    <div class="row">
      <div class="col-lg-6">
        <img src="${recipe.image}" class="img-fluid rounded" alt="${recipe.title}">
      </div>
      <div class="col-lg-6">
        <h4>Ingredients</h4>
        <ul>${ingredients}</ul>
        <h4>Steps</h4>
        <ul>${steps}</ul>
        <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-primary">View Full Recipe</a>
      </div>
    </div>`;
}
if (recipeId) {
  fetchRecipeDetails(recipeId);
} else {
  recipeDetails.innerHTML = '<p class="text-center">Recipe not found.</p>';
}
