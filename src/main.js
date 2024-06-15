// eslint-disable-next-line import/extensions
import GameState from './components/GameState.js';

try {
  let gameState = GameState.fromURL(window.location) || GameState.newGame();
  // eslint-disable-next-line no-restricted-globals
  history.replaceState(gameState, '', gameState.toURL());
  // display this starting state
  gameState.render();
  document.querySelector('#input').onchange = (event) => {
    if (gameState.updateForGuess(parseInt(event.target.value, 10))) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(gameState, '', gameState.toURL());
    }
    gameState.render();
  };

  window.onpopstate = (event) => {
    gameState = GameState.fromStateObject(event.state);

    gameState.render();
  };
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('Error for game is ', e);
}
