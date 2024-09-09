import { playBadEndingAnimation, playGoodEndingAnimation, repositionAllElements } from "./animation";
import GameState from "./GameState";
import { displayElement, getElementById, hideElement, playCancelablePromise, querySelector, resetCancel } from "./utils";

export const popupEl = getElementById('popup');
export const buttonEl = getElementById('button');
const titleEl = querySelector('#popup h1');
const subTitleEl = querySelector('#popup h3');

export async function checkEndGame(state: GameState): Promise<number> {
  console.log(state.currentMalediction)
  if (state.getSum() >= 13) {
    await state.activateLastChance();
    if (state.getSum() >= 13) {
      return -1;
    }
  } else if (state.pile.length === 0 && !state.currentMalediction) {
    return 1;
  }
  return 0;
}

export async function end(state: GameState, isGoodEnding: boolean) {
  try {
    // use to skip async/await function
    await playCancelablePromise(isGoodEnding ? playGoodEndingAnimation : playBadEndingAnimation, state);
  } catch {
    repositionAllElements(true);
  }
  resetCancel();
  titleEl.innerText = isGoodEnding ? 'You get to live another day!' : 'You died!';
  subTitleEl.innerText = isGoodEnding ? 'For now…' : 'For real this time';
  buttonEl.innerText = isGoodEnding ? 'Play again' : 'Try again';
  displayElement(popupEl);
}