import { Controls, PlayerControls, defaultSettings } from './utils';

defaultSettings();

export const music = new Audio(
  new URL('../assets/sounds/background.wav', import.meta.url).toString(),
);
music.loop = true;
music.volume = parseInt(localStorage.getItem('volume')) / 100;

const volume = document.body.getElementsByTagName('input')[0];

volume?.addEventListener('change', (e: any) => {
  console.log('Setting el.');
  music.volume = parseInt(e.target.value) / 100;
  localStorage.setItem('volume', JSON.stringify(e.target.value));
  console.log(parseInt(localStorage.getItem('volume')) / 100);
});

const controls: PlayerControls = {
  p1: JSON.parse(localStorage.getItem('player1')),
  p2: JSON.parse(localStorage.getItem('player2')),
};

const p1f = document.querySelectorAll<HTMLInputElement>('#p1controls input');
const p2f = document.querySelectorAll<HTMLInputElement>('#p2controls input');

const p1save = document.getElementById('p1save');
const p2save = document.getElementById('p2save');

p1f.forEach((f) => {
  if (controls.p1[f.name as keyof Controls] === ' ') f.value = 'space';
  else f.value = controls.p1[f.name as keyof Controls];
});

p2f.forEach((f) => {
  if (controls.p2[f.name as keyof Controls] === ' ') f.value = 'space';
  else f.value = controls.p2[f.name as keyof Controls];
});

p1save?.addEventListener('click', () => {
  console.log('settings');
  p1f.forEach((field) => {
    controls.p1[field.name as keyof Controls] = field.value;
  });

  localStorage.setItem('player1', JSON.stringify(controls.p1));
});

p2save?.addEventListener('click', () => {
  p2f.forEach((field) => {
    controls.p2[field.name as keyof Controls] = field.value;
  });

  localStorage.setItem('player2', JSON.stringify(controls.p2));
});
