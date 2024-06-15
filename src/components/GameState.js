export default class GameState {
  // fabric for game creation
  static newGame() {
    const s = new GameState();
    s.secret = s.randomInt(0, 100);
    // guess should be greater
    s.low = 0;
    // guess should be lesser
    s.high = 100;
    // num of all guesses
    s.numGuesses = 0;
    // last guess
    s.guess = null;
    return s;
  }

  static fromStateObject(stateObj) {
    const s = new GameState();
    for (const key of Object.keys(stateObj)) {
      s[key] = stateObj[key];
    }
    return s;
  }

  toURL() {
    const url = new URL(window.location);
    url.searchParams.set('l', this.low);
    url.searchParams.set('h', this.high);
    url.searchParams.set('n', this.numGuesses);
    url.searchParams.set('g', this.guess);
    return url.href;
  }

  static fromURL(url) {
    const s = new GameState();
    const params = new URL(url).searchParams;
    s.low = parseInt(params.get('l'), 10);
    s.high = parseInt(params.get('h'), 10);
    s.numGuesses = parseInt(params.get('n'), 10);
    s.guess = parseInt(params.get('g'), 10);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(s.low) || isNaN(s.high) || isNaN(s.numGuesses) || isNaN(s.guess)) {
      return null;
    }
    s.secret = s.randomInt(s.low, s.high);
    return s;
  }

  // eslint-disable-next-line class-methods-use-this
  randomInt(min, max) {
    return min + Math.ceil(Math.random() * (max - min - 1));
  }

  render() {
    const heading = document.querySelector('#heading');
    const range = document.querySelector('#range');

    const input = document.querySelector('#input');

    const playAgain = document.querySelector('#input');

    // Update heading and title
    // eslint-disable-next-line no-multi-assign
    heading.textContent = document.title = `I'm thinking of a number beetween ${this.low} and ${this.high}.`;

    // Update range of numbers on page
    range.style.marginLeft = `${this.low}%`;
    range.style.width = `${(this.high - this.low)}%`;

    // input of field should be empty and focused
    input.value = '';
    input.focus();

    // display answer based on last guess of user, placeholde will be showed so input is empty
    if (this.guess === null) {
      input.placeholder = 'Type your guess and hit Enter';
    } else if (this.guess < this.secret) {
      // eslint-disable-next-line no-multi-assign
      input.placeholder = document.title = `${this.guess} is too low. Guess again`;
    } else if (this.guess > this.secret) {
      // eslint-disable-next-line no-multi-assign
      input.placeholder = document.title = `${this.guess} is too high. Guess again`;
    } else {
      // eslint-disable-next-line no-multi-assign
      input.placeholder = document.title = `${this.guess} is correct!`;
      heading.textContent = `You win in ${this.numGuesses} guesses!`;
      playAgain.hidden = false;
    }
  }

  updateForGuess(guess) {
    // guess is number and befinde in right position
    if ((guess > this.low) && (guess < this.high)) {
      // update state object
      if (guess < this.secret) {
        this.low = guess;
      } else if (guess > this.secret) {
        this.high = guess;
      }
      this.guess = guess;
      // eslint-disable-next-line no-plusplus
      this.numGuesses++;
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      // guess is not correct - message for user but not update state
      // eslint-disable-next-line no-alert
      alert(`Please enter a number greater than ${this.low} and less than ${this.high}`);
      return false;
    }
  }
}
