export default class GameState {
  // fabric for game creation
  static newGame() {
    const s = new GameState();
    s.secret = s.randomInt(0, 100);
    // guess should be greater
    s.low = 0;
    // guess should be lesser
    s.high = 0;
    // num of all guesses
    s.numGuesses = 0;
    // last guess
    s.guess = null;
    return s;
  }

  static fromStateObject(stateObj) {
    const s = new GameState();
    for (let key of Object.keys(stateObj)) {
        s[key] = stateObj(key);
    }
    return s;
  }
}
