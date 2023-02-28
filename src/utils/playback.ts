import { getTrack } from "../api/getTrack";
import { searchedTracks } from "../api/searchItems";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";
import { currentAlbumTracks } from "../pages/AlbumPage";
import { currentArtistTracks } from "../pages/ArtistPage";
import { currentPlaylist } from "../pages/PlaylistPage";
import { currentTopTracks } from "../pages/TrackPage";
import { convertTrackTime, getRandomNumber } from "./utils";
import { handleVolume } from "./volume";

const token = window.localStorage.getItem('token');
const playIcon = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>';
const pauseIcon = '<svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw UIBT7E6ZYMcSDl1KL62g" viewBox="0 0 24 24" data-encore-id="icon"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>';
let isPlaying = false;
let isShuffled = false;
let trackIndex: number;
let playlist: IResponseTrack[] | undefined;

setTimeout(handleVolume, 100);

export async function selectAndGetTrack(id: string) {
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  const data: IResponseTrack = await getTrack(token, id);
  const selectedTrack = document.getElementById(id) as HTMLElement;

  document.querySelectorAll('.track').forEach((track) => track.classList.remove('track_selected'));
  document.querySelectorAll('.tracklist-row').forEach((track) => track.classList.remove('track_selected'));
  if (selectedTrack) {
    selectedTrack.classList.add('track_selected');
  }

  if (audio.dataset.track_id === id) return;
  audio.src = data.preview_url;
  audio.dataset.track_id = id;

  showTrackInfo(data);
  showTrackDuration(audio);
  showCoverArts(data);
}

export function playPauseTrack(id: string) {
  if (id === '') return;
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  const playingBarIcon = document.querySelector('.playing-bar .play-pause-button') as HTMLButtonElement;
  // const bigGreenButton = document.querySelector('.control-panel .play-btn') as HTMLDivElement;

  showTrackCurrentTimeAndTimeline(audio);

  setTimeout(() => {
    if (!isPlaying) {
      audio.play();
      isPlaying = true;
      togglePlayPauseIcon(id);
      playingBarIcon.innerHTML = pauseIcon;
    } else {
      audio.pause();
      isPlaying = false;
      togglePlayPauseIcon(id);
      playingBarIcon.innerHTML = playIcon;
    }
  }, 400)

  playlist = definePlaylistOrSearchResults();

  const currentTrackId = playlist!.filter((track) => {
    return track.id === id;
  })[0];
  
  trackIndex = playlist!.indexOf(currentTrackId);
}

function togglePlayPauseIcon(id: string) {
  const trackButton = document.getElementById(id)?.querySelector('.player-tool-button') as HTMLButtonElement;
  if (trackButton) {
    if (trackButton.innerHTML === playIcon && isPlaying) {
      switchAllTracksIconsToPlay();
      trackButton.innerHTML = pauseIcon;
    } else if (trackButton.innerHTML !== playIcon && !isPlaying) {
      trackButton.innerHTML = playIcon;
    }
  } else {
    document.querySelectorAll('.search-result-song__image .player-tool-button').forEach(button => {
      button.innerHTML = playIcon;
    });
  }
}

function switchAllTracksIconsToPlay() {
  const tracks = Array.from(document.querySelectorAll('.tracklist-song'));
  tracks.forEach((track) => {
    const trackButton = track.querySelector('.player-tool-button') as HTMLElement;
    trackButton.innerHTML = playIcon;
  });
}

function showCoverArts(data: IResponseTrack) {
  const coverArt = (document.querySelector('.cover-art') as HTMLElement).querySelector('img') as HTMLImageElement;
  const coverArtExpanded = (document.querySelector('.cover-art_expanded') as HTMLElement).querySelector('img') as HTMLImageElement;
  coverArt.src = data.album!.images[0].url;
  coverArtExpanded.src = data.album!.images[0].url;
}

function showTrackInfo(data: IResponseTrack) {
  const trackName = document.querySelector('.playing-bar .track-name') as HTMLElement;
  const trackAuthor = document.querySelector('.playing-bar .track-author') as HTMLElement;
  trackName.innerText = data.name;
  trackAuthor.innerText = data.artists[0].name;
}

function showTrackDuration(audio: HTMLAudioElement) {
  const duration = document.querySelector('.playing-bar .playback-duration') as HTMLElement;
  const startTime = document.querySelector('.playing-bar .playback-position') as HTMLElement;
  audio.onloadeddata = function () {
    startTime.innerText = '0:00';
    duration.innerText = convertTrackTime(audio.duration * 1000);
  }
}

function showTrackCurrentTimeAndTimeline(audio: HTMLAudioElement) {
  const currentTime = document.querySelector('.playing-bar .playback-position') as HTMLElement;
  const timelineDiv = document.querySelector('.timeline') as HTMLInputElement;
  const timelineInput = document.querySelector('#timeline__range') as HTMLInputElement;
  let backgroundColor = '#fff';
  audio.onloadedmetadata = function () {
    timelineInput.max = audio.duration.toString();
    timelineInput.step = '0.001';
  };
  audio.ontimeupdate = function () {
    currentTime.innerHTML = convertTrackTime(audio.currentTime * 1000);
    timelineInput.value = audio.currentTime.toString();
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${audio.currentTime * 100 / audio.duration}%, #535353 ${audio.currentTime * 100 / audio.duration}%, #535353 100%)`;
    if (audio.currentTime === audio.duration) nextTrack();
  };
  timelineInput.addEventListener('input', () => {
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+timelineInput.value * 100 / audio.duration}%, #535353 ${+timelineInput.value * 100 / audio.duration}%, #535353 100%)`;
    audio.currentTime = +timelineInput.value;
  });
  timelineDiv.onmouseover = function () {
    backgroundColor = '#1db954';
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+timelineInput.value * 100 / audio.duration}%, #535353 ${+timelineInput.value * 100 / audio.duration}%, #535353 100%)`;
  };
  timelineDiv.onmouseleave = function () {
    backgroundColor = '#fff';
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+timelineInput.value * 100 / audio.duration}%, #535353 ${+timelineInput.value * 100 / audio.duration}%, #535353 100%)`;
  }
}

function definePlaylistOrSearchResults() {
  if (window.location.href.includes('/playlist')) {
    return currentPlaylist?.tracks.items.map(item => item.track);
  };
  if (window.location.href.includes('/search')) {
    return searchedTracks;
  };
  if (window.location.href.includes('/track')) {
    return currentTopTracks.tracks;
  };
  if (window.location.href.includes('/artist')) {
    return currentArtistTracks.tracks;
  };
  if (window.location.href.includes('/album')) {
    return currentAlbumTracks.tracks.items;
  }
}

export function nextTrack() {
  if (!isShuffled) {
    ++trackIndex;
  } else {
    const currentIndex = trackIndex;
    while (currentIndex === trackIndex) {
      trackIndex = getRandomNumber(0, playlist!.length);
    }
  }
  trackIndex = trackIndex > playlist!.length - 1 ? 0 : trackIndex;
  selectAndGetTrack(playlist![trackIndex].id);
  isPlaying = !isPlaying;
  playPauseTrack(playlist![trackIndex].id);
}

export function prevTrack() {
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    --trackIndex;
    trackIndex = trackIndex < 0 ? playlist!.length - 1 : trackIndex;
    selectAndGetTrack(playlist![trackIndex].id);
    isPlaying = !isPlaying;
    playPauseTrack(playlist![trackIndex].id);
  }
}

export function repeatTrack() {
  const repeatButton = document.querySelector('.repeat') as HTMLButtonElement;
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  repeatButton.classList.toggle('repeat_active');
  audio.loop = !audio.loop;
}

export function shuffleTracks() {
  const shuffleButton = document.querySelector('.shuffle') as HTMLButtonElement;
  shuffleButton.classList.toggle('shuffle_active');
  isShuffled = !isShuffled;
}

// export function handleBigGreenButton(id: string | undefined) {
//   const playlist = definePlaylistOrSearchResults();

//   if (id) {
//     selectAndGetTrack(id);
//     playPauseTrack(id);
//   } else if (playlist) {
//     selectAndGetTrack(playlist[0].id);
//     playPauseTrack(playlist[0].id);
//   };
// }
