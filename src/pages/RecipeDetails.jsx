import { useLocation, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import SugestionCard from '../components/SugestionCard';
import RecipeFaseButton from '../components/RecipeFaseButton';
import { fetchRecipesDetailsApi, fetchRecipesSugestionsApi } from '../services/fetchAPI';
import {
  removeFavoriteRecipe,
  addFavoriteRecipe,
  isFavoriRecipe,
} from '../services/localStorageFuncions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
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
  const [shareMessage, setShareMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    )).filter((element) => (element !== null && element !== ''));

    const measureValues = measureKeys.map((measureElement) => (
      recipe[measureElement]
    )).filter((element) => (element !== null && element !== ''));

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
      setRecomendation(sugestions);
    }

    fetchRecipeDetails();
    fecthRecipeSugestions();
  }, [food, correctId]);

  useEffect(() => {
    setIngredientsAndmeasure(ingredientsMeasureFilter(recipeDetail));
    // verifica se a receita está salva nos favoritos
    setIsFavorite(isFavoriRecipe(correctId));
  }, [recipeDetail, correctId]);

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

  function share() {
    copy(`http://localhost:3000/${food}/${id}`);
    setShareMessage(true);
  }

  function handleFavorite() {
    if (isFavorite) {
      removeFavoriteRecipe(id);
      setIsFavorite(false);
    } else {
      addFavoriteRecipe(recipeDetail);
      setIsFavorite(true);
    }
  }

  return (
    <>
      {/* EXIBIR A IMAGEM DO PRATO OU DRINK */}
      <div className="photo-title-container">
        <img
          src={ recipeDetail[`${foodKey}Thumb`] }
          alt={ recipeDetail[foodKey] }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <h1
          data-testid="recipe-title"
          className="recipe-title"
        >
          {recipeDetail[foodKey]}
        </h1>
      </div>
      {/* BOTÕES FAVORITAR E COMPARTILHAR */}
      <button
        onClick={ share }
      >
        <img
          data-testid="share-btn"
          className="share-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="share"
        />
      </button>
      <button
        onClick={ handleFavorite }
      >
        <img
          className="favorite-btn"
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
      { shareMessage && <p>Link copied!</p> }

      {/* EXIBIR A CATEGORIA DO INGREDIENTE */}
      {food === 'meals' ? (
        <div>
          <h3
            data-testid="recipe-category"
            className="category"
          >
            {recipeDetail.strCategory}
          </h3>
        </div>
      ) : (
        <div>
          <h3
            data-testid="recipe-category"
            className="category"
          >
            {recipeDetail.strAlcoholic}
          </h3>
        </div>
      )}

      {/* EXIBIR O ARRAY DE INGREDIENTES E QUANTIDADES */}
      <div className="main-detail-container">
        <h1 className="ingredients-title"> Ingredients </h1>
        <div className="ingredients-container">
          {ingredientsAndmeasure.map((element, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ `${index}-ingredient-name-and-measure` }
            >
              {element}
            </li>
          ))}
        </div>

        {/* INSTRUÇÕES DE PREPARO */}
        <h1 className="Instructions-title"> Instructions </h1>
        <div className="instructions-container">
          <p data-testid="instructions">{recipeDetail.strInstructions}</p>
        </div>
        {/* VÍDEO DO YOUTUBE */}
        <h1 className="video-title"> Video </h1>
        <div className="video-card">
          {food === 'meals' ? (
            <iframe
              width="320"
              height="240"
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
      </div>

      {/* CARROSSEL DE SUGESTÕES DE PRATOS */}
      <div className="carousel-sugestions">
        <h1 className="sugestions-title"> Recommended </h1>
        <div className="sugestions-cards">
          {recomendation.length > 0 && (recomendation.map((recipe, index) => (
            <Link
              to={ `${invertedFood}/${recipe[idFoodType]}` }
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
      </div>
      <div className="start-recipe-btn-container">
        <RecipeFaseButton
          type={ food }
          id={ correctId }
          ingredients={ ingredientsAndmeasure }
        />
      </div>
    </>
  );
}
