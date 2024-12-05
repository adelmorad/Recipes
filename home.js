const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const apiBase = 'https://api.spoonacular.com/';
const apiKey = '1718467fa8f54ac3924977c121b97867';

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeResults = document.getElementById('recipeResults');
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return alert('Enter a search term!');

  try {
    const response = await fetch(
      `${corsProxy}${apiBase}recipes/complexSearch?query=${query}&number=12&apiKey=${apiKey}`
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    alert('Failed to fetch recipes');
    console.error(error);
  }
});

function displayRecipes(recipes) {
  recipeResults.innerHTML = '';
  if (!recipes.length) {
    recipeResults.innerHTML = '<p class="text-center">No recipes found.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <a href="recipe.html?id=${recipe.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>`;
    recipeResults.innerHTML += recipeCard;
  });
}
