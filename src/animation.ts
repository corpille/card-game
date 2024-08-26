import { sleep, displayMessage, getRandomIndex, getElementById } from './utils';
import Audio, { chords, loopLength, melody } from './audio';
const deathEl = getElementById('death');

async function playDialog(el: HTMLElement, lines: { msg: string; time: number }[]) {
  el.style.opacity = '1';
  for (let i = 0; i < lines.length; i++) {
    await displayMessage(el, lines[i].msg);
    await sleep(lines[i].time);
  }
  el.style.opacity = '0';
  el.innerHTML = '';
  await sleep(300);
}

export async function playIntroAnimation() {
  const deaths = ['while swallowing a watermelon', 'opening a can of tuna', 'falling from a bench'];
  const randomDeath = deaths[getRandomIndex(deaths)];
  const floorEl = getElementById('floor');
  const ghostEl = getElementById('ghost');
  const label1El = getElementById('label1');
  const label2El = getElementById('label2');
  await playDialog(label1El, [
    { msg: 'You died', time: 1000 },
    { msg: '.', time: 300 },
    { msg: '.', time: 300 },
    { msg: '.', time: 1000 },
    { msg: ` ${randomDeath}`, time: 2000 },
  ]);
  label1El.style.bottom = label2El.style.bottom = `31.25rem`;

  label1El.style.left = `${ghostEl.offsetLeft + ghostEl.clientWidth / 2 - label1El.clientWidth / 2}px`;

  ghostEl.style.bottom = `2rem`;
  await sleep(200);
  // Show floor
  floorEl.style.bottom = '0';

  Audio.getInstance().playBgMusic(chords);
  setTimeout(() => {
    Audio.getInstance().playBgMusic(melody);
  }, loopLength * chords.notes.length);
  await sleep(500);

  await playDialog(label1El, [
    { msg: 'Oh crap!\n', time: 300 },
    { msg: 'No! ', time: 200 },
    { msg: 'No! ', time: 200 },
    { msg: 'No!\n', time: 200 },
    { msg: 'I got so much stuff to do!', time: 2000 },
  ]);

  await playDialog(label1El, [
    { msg: "I had Bob's barbecue at 1pm...\n", time: 1000 },
    { msg: "And the Laker's finals on the 13th...\n", time: 1000 },
    { msg: "I can't die now!", time: 1000 },
  ]);
  deathEl.style.right = `25%`;
  await sleep(1000);

  label2El.style.left = `${deathEl.offsetLeft + deathEl.clientWidth / 3 - label2El.clientWidth / 2}px`;
  await playDialog(label2El, [
    { msg: 'Welp! What do we have here?\n', time: 600 },
    { msg: "Another stupid death I'm guessing?\n", time: 600 },
    { msg: 'What is it this time?\n', time: 1500 },
  ]);

  await playDialog(label1El, [{ msg: `I died ${randomDeath}...`, time: 1500 }]);
  await playDialog(label2El, [
    { msg: '*chuckles*\n', time: 500 },
    { msg: 'I see...\n', time: 1500 },
    { msg: "Well, let's go! I got things to do!", time: 1500 },
  ]);
  deathEl.style.animationName = 'flippedFloat';
  deathEl.style.right = `5%`;
  await sleep(500);

  await playDialog(label1El, [{ msg: 'Ghost: Wait!\n', time: 1000 }]);
  deathEl.style.animationName = 'float';
  await sleep(200);
  deathEl.style.right = `25%`;
  await sleep(500);

  await playDialog(label1El, [
    { msg: "I got to go back! I can't die now.\n", time: 1000 },
    { msg: 'I got important things to do!', time: 1500 },
  ]);
  await playDialog(label2El, [{ msg: "That's not how it works buddy, you don't get to choose.\n", time: 1000 }]);
  await playDialog(label1El, [{ msg: "Can't you give me another chance ?\n", time: 2000 }]);
  await playDialog(label2El, [
    { msg: '.', time: 300 },
    { msg: '.', time: 300 },
    { msg: '.', time: 1500 },
  ]);
  await playDialog(label2El, [
    { msg: " Ok, let's try something !\n", time: 1000 },
    { msg: "If you can win a game of my chosing i'll give you some more time.\n", time: 1000 },
    { msg: 'Deal ?\n', time: 1000 },
  ]);
  await playDialog(label1El, [{ msg: 'Absolutely! Deal!', time: 1500 }]);
  await playDialog(label2El, [{ msg: "*smirks* Let's go then !", time: 1500 }]);
  deathEl.style.animationName = 'flippedFloat';
  deathEl.style.right = `-31.25rem`;
  ghostEl.style.transition = 'all 1.4s linear';
  ghostEl.style.left = '100%';
  await sleep(2000);
}

export async function playTutorialBegining() {
  deathEl.style.display = 'block';
  deathEl.style.animation = 'incoming ease-in-out 3s forwards';
  await sleep(3000);
  deathEl.style.right = '12.5rem';
  deathEl.style.top = '2rem';
  deathEl.style.bottom = '0';
  deathEl.style.animation = 'float 4s 0.1s infinite';
}

export async function playPilePresentation() {
  await sleep(1000);
}
