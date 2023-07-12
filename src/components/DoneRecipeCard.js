import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard(recipe, index) {
  const { image, name, category, doneDate, tags, id, type } = recipe;

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    global.alert('Link copied!');
  };

  const redirectToDetails = () => {
    if (type === 'comida') {
      return <Redirect to={ `/comidas/${id}` } />;
    }
    return <Redirect to={ `/bebidas/${id}` } />;
  };

  return (
    <>
      <button onClick={ redirectToDetails }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </button>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ copyUrl }
      >
        share
      </button>
      <button onClick={ redirectToDetails }>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </button>
      <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      {tags.map((tagName, ind) => (
        <p key={ ind } data-testid={ `${ind}-${tagName}-horizontal-tag` }>{ tags }</p>
      ))}
    </>
  );
}

export default DoneRecipeCard;
