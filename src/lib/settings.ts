// localStorage.setItem('volume', '50');

export const music = new Audio(
  new URL('../assets/sounds/background.wav', import.meta.url).toString(),
);
music.loop = true;
music.volume = 0.5;

// const volume = document.getElementById('volume-slider');
// volume.addEventListener('change', (e: any) => {
//   music.volume = parseInt(e.target.value) / 100;
//   localStorage.setItem('volume', e.target.value);
//   console.log(localStorage.getItem('volume'));
// });
