import { useLocation, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SugestionCard from '../components/SugestionCard';
// import RecipeFaseButton from '../components/RecipeFaseButton';
import { fetchRecipesDetailsApi, fetchRecipesSugestionsApi } from '../services/fetchAPI';
import './styles/RecipeDetails.css';

export default function RecipeDetails() {
  // URL
  const { pathname } = useLocation();
  const { id } = useParams();

  // VARIÁVEIS
  const correctId = id.replace(':', '');
  const food = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const foodKey = (pathname.includes('meals')) ? 'strMeal' : 'strDrink';
  const invertedFood = (pathname.includes('meals')) ? '/drinks' : '/meals';
  const idFoodType = (invertedFood === '/meals') ? 'idMeal' : 'idDrink';

  // ESTADO LOCAL
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredientsAndmeasure, setIngredientsAndmeasure] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  // UNIR OS INGREDIENTES E QUANTIDADES DA RECEITA EM UM ARRAY
  const ingredientsMeasureFilter = (recipe) => {
    const ingredientsKeys = Object.keys(recipe).filter((element) => (
      element.includes('strIngredient')
    ));

    const measureKeys = Object.keys(recipe).filter((element) => (
      element.includes('strMeasure')
    ));

    const ingredientsValues = ingredientsKeys.map((ingredient) => (
      recipe[ingredient]
    )).filter((element) => element !== null);

    const measureValues = measureKeys.map((measureElement) => (
      recipe[measureElement]
    )).filter((element) => element !== null);

    const obj = ingredientsValues.map((ingredient, index) => {
      if (measureValues[index] !== undefined) {
        return `${ingredient} ${measureValues[index]}`;
      }

      return `${ingredient}`;
    });

    return obj;
  };

  // FAZER O FETCH DA RECEITA E DAS SUGESTÕES DE PRATOS E SALVAR NO ESTADO LOCAL
  useEffect(() => {
    async function fetchRecipeDetails() {
      const details = await fetchRecipesDetailsApi(food, correctId);
      setRecipeDetail(details[0]);
    }

    async function fecthRecipeSugestions() {
      const sugestions = await fetchRecipesSugestionsApi(food);
      console.log(sugestions);
      setRecomendation(sugestions);
    }

    fetchRecipeDetails();
    fecthRecipeSugestions();
  }, [food, correctId]);

  useEffect(() => {
    setIngredientsAndmeasure(ingredientsMeasureFilter(recipeDetail));
  }, [recipeDetail]);

  // CAPTURAR APENAS O ID DO LINK NA API E EMBEDAR COM O LINK DO YOUTUBE
  // O LINK DO YOUTUBE QUE ESTÁ NA API NÃO PERMITE DISPONIBILIZAR O VÍDEO
  // É NECESSÁRIO CAPTURAR O ID DO LINK DA API E COLOCAR EM UMA URL PARA EMBEDAR O VÍDEO
  const getYoutubeVideoId = (url) => {
    if (url !== undefined) {
      const videoId = url.replace('https://www.youtube.com/watch?v=', '');
      const fullLink = `https://www.youtube.com/embed/${videoId}`;
      return fullLink;
    }
  };

  return (
    <>
      <div className="details-img-container">
        {/* EXIBIR A IMAGEM DO PRATO OU DRINK */}
        <img
          src={ recipeDetail[`${foodKey}Thumb`] }
          alt={ recipeDetail[foodKey] }
          data-testid="recipe-photo"
        />
      </div>
      <h1 data-testid="recipe-title">{recipeDetail[foodKey]}</h1>

      {/* EXIBIR A CATEGORIA DO INGREDIENTE */}
      {food === 'meals' ? (
        <h3 data-testid="recipe-category">{recipeDetail.strCategory}</h3>
      ) : (<h3 data-testid="recipe-category">{recipeDetail.strAlcoholic}</h3>)}

      {/* EXIBIR O ARRAY DE INGREDIENTES E QUANTIDADES */}
      {ingredientsAndmeasure.map((element, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ `${index}-ingredient-name-and-measure` }
        >
          {element}
        </p>
      ))}

      {/* INSTRUÇÕES DE PREPARO */}
      <p data-testid="instructions">{recipeDetail.strInstructions}</p>

      {/* VÍDEO DO YOUTUBE */}
      <div className="details-iframe-container">
        {food === 'meals' ? (
          <iframe
            width="560"
            height="315"
            src={ getYoutubeVideoId(recipeDetail.strYoutube) }
            title="Youtube video player"
            frameBorder="0"
            allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share"
            allowFullScreen
            data-testid="video"
          />
        ) : null}
      </div>

      {/* CARROSSEL DE SUGESTÕES DE PRATOS */}
      <div className="carousel-sugestions">
        {recomendation.length > 0 && (recomendation.map((recipe, index) => (
          <Link
            to={ `${invertedFood}/:${recipe[idFoodType]}` }
            key={ `${invertedFood}-${recipe[idFoodType]}-${index}` }
          >
            <SugestionCard
              key={ recipe[idFoodType] }
              option={ invertedFood }
              recipe={ recipe }
              index={ index }
            />
          </Link>
        )))}
      </div>
      <div className="start-recipe-btn-container">
        {/* <RecipeFaseButton data-testid="start-recipe-btn" className="details-start-btn" /> */}
      </div>
    </>
  );
}
