let isMuted = false;
let currentVolume = 1;

export function handleVolume() {
  const muteButton = document.querySelector('.volume-bar .player-tool-button') as HTMLButtonElement;
  const volume = document.querySelector('#volume-bar__range-input') as HTMLInputElement;
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  let backgroundColor = '#fff';

  if (volume) {
    volume.value = '1';
    volume.style.background = '#fff';
    volume.max = '1';
    volume.step = '0.01';
  }

  if (muteButton) {
    muteButton.addEventListener('click', () => {
      if (!isMuted) {
        audio.volume = 0;
        volume.value = '0';
        volume.style.background = '#535353';
        changeVolumeIcon(volume.value);
        isMuted = true;
      } else {
        audio.volume = currentVolume;
        volume.value = currentVolume.toString();
        volume.style.background = currentVolume ? `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${currentVolume * 100}%, #535353 ${currentVolume * 100}%, #535353 100%)` : backgroundColor;
        changeVolumeIcon(volume.value);
        isMuted = false;
      }
    })
  }

  if (volume) {
    volume.addEventListener('input', () => {
      volume.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
      audio.volume = +volume.value;
      currentVolume = audio.volume;
      changeVolumeIcon(volume.value);
    });
    
    volume.onmouseover = function () {
      backgroundColor = '#1db954';
      volume.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
    };
  
    volume.onmouseleave = function () {
      backgroundColor = '#fff';
      volume.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
    }
  }

}

function changeVolumeIcon(volume: string) {
  const muteButton = document.querySelector('.volume-bar .player-tool-button') as HTMLButtonElement;

  if (+volume === 0) {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path><path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>';
  } else if (+volume > 0 && +volume <= 0.3) {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume low" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path></svg>';
  } else if (+volume > 0.3 && +volume <= 0.6) {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume medium" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path></svg>';
  } else {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>';
  }
}
