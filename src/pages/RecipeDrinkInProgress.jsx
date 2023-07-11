import React from 'react';

function RecipeDrinkInProgress() {
  return (
    <div>
      <h1> Receitas em progresso </h1>
      <img alt="" data-testid="recipe-photo" />
      <h3 data-testid="recipe-title"> Titulo Receita </h3>
      <div>
        <button data-testid="share-btn"> compartilhar</button>
        <button data-testid="favorite-btn"> favoritar </button>
      </div>
      <p data-testid="recipe-category"> Categoria</p>
      <p data-testid="instructions"> Instruções </p>
      <button data-testid="finish-recipe-btn"> Finalizar receita </button>
    </div>
  );
}

export default RecipeDrinkInProgress;
