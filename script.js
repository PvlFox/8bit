const audioFiles = [
'music/TEAM R2R - 2021 - Triritik.mp3',
'music/TEAM R2R - 2020 - IK Multimedia.mp3', 
'music/TEAM R2R - 2021 - WXAudio.mp3',  
'music/R2R - Prinz Eugen.mp3',
'music/Mega Man 2 - Dr. Wilys Castle.mp3',
"music/Castlevania-II-Bloody-Tears.mp3",
'music/Starchaser-_Chiptune-original_.mp3',
'music/Disease-Beautiful-insanity.mp3',
'music/Lost-Companion-_-TomboFry.mp3',
'music/Rymdkraft - Rymdsylt.mp3',
'music/Scramuel-Continue-Y-N.mp3',
'music/Team R2R REAPER Keygen Song.mp3',
'music/Streets Of Rage - The Last Soul.mp3',
'music/fearofdark-dontgooutside.mp3',
'music/Pachelbels Pirate Ship.mp3']
let currentAudioIndex = -1;
let isPaused = false;
const audio = new Audio();

audio.addEventListener('ended', function() {
  toggleMusic();
}); 

function togglePause() {
  const pauseButton = document.getElementById('pauseButton');

  if (!audio.paused) {
    audio.pause();
    isPaused = true;
    pauseButton.innerHTML = 'Resume'; // Изменяем текст кнопки на 'Resume'
  } else {
    audio.play();
    isPaused = false;
    pauseButton.innerHTML = 'Pause'; // Изменяем текст кнопки на 'Pause'
  }
}

function updateTrackInfo() {
  const currentTrackNameElement = document.getElementById('currentTrackName');
  currentTrackNameElement.textContent = audioFiles[currentAudioIndex].replace(/^.*[\\/]/, ''); // Отображаем только имя файла, без пути
}

function getRandomIndex() {
  let newIndex = currentAudioIndex;
  while (newIndex === currentAudioIndex) {
    newIndex = Math.floor(Math.random() * audioFiles.length);
  }
  return newIndex;
}

let currentVolume = 1;

function toggleMusic() {
  const newIndex = getRandomIndex();
  const pauseButton = document.getElementById('pauseButton');
  const volumeSlider = document.getElementById('volumeSlider');

  if (!audio.paused || audio.currentTime > 0) {
    // Сохраняем текущее значение громкости перед остановкой воспроизведения
    currentVolume = audio.volume;
    audio.pause();
    audio.currentTime = 0;
  }

  audio.src = audioFiles[newIndex];
  currentAudioIndex = newIndex;
  isPaused = false;

  // Устанавливаем громкость из сохраненного значения
  audio.volume = currentVolume;

  audio.play().then(() => {
    volumeSlider.value = currentVolume;
    updateTrackInfo(); // Обновляем информацию о треке
    // Изменяем текст кнопки на 'Pause'
    pauseButton.innerHTML = 'Pause';
  }).catch(error => {
    console.error('Error playing audio:', error);
  });
}

let id = 0;
let currentAnimation = null;

function changeVolume() {
  const volumeSlider = document.getElementById('volumeSlider');
  const targetVolume = volumeSlider.value;
  const initialVolume = audio.volume;
  id++;
  const current = id;
  const duration = 100; // Длительность анимации в миллисекундах
  const startTime = Date.now();

  // Сохраняем текущее значение громкости перед началом анимации
  currentVolume = initialVolume;

  if (currentAnimation) {
    cancelAnimationFrame(currentAnimation);
  }

  function animate() {
    if (current !== id) return;
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Интерполяция между начальной и конечной громкостью
    audio.volume = currentVolume + progress * (targetVolume - currentVolume);

    if (progress < 1) {
      // Продолжаем анимацию, если не достигли конечного состояния
      currentAnimation = requestAnimationFrame(animate);
    }
  }

  animate();
}