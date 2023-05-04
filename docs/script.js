const hourFirst = document.querySelector('#hour-first-digit');
const hourSecond = document.querySelector('#hour-second-digit');
const minuteFirst = document.querySelector('#minute-first-digit');
const minuteSecond = document.querySelector('#minute-second-digit');
const settingButtons = document.querySelectorAll('.time-setting-button');

function hourChange(change) {
  let hour = Number(
    hourSecond.textContent.trim() + hourFirst.textContent.trim()
  );
  if (change === 'sum') {
    if (hour === 23) {
      hourFirst.textContent = 0;
      hourSecond.textContent = 0;
    } else {
      hour++;
      if (hour < 10) {
        hourFirst.textContent = hour;
      } else {
        const arrayHour = Array.from(String(hour));
        hourSecond.textContent = arrayHour[0];
        hourFirst.textContent = arrayHour[1];
      }
    }
  } else if (change === 'minus') {
    if (hour === 0) {
      hourFirst.textContent = 3;
      hourSecond.textContent = 2;
    } else if (hour > 0 && hour < 10) {
      hour--;
      hourFirst.textContent = hour;
    } else if (hour === 10) {
      hourFirst.textContent = 9;
      hourSecond.textContent = 0;
    } else if (hour > 10) {
      hour--;
      const arrayHour = Array.from(String(hour));
      hourSecond.textContent = arrayHour[0];
      hourFirst.textContent = arrayHour[1];
    }
  }
}
function minuteChange(change) {
  let minute = Number(
    minuteSecond.textContent.trim() + minuteFirst.textContent.trim()
  );
  if (change === 'sum') {
    if (minute === 60) {
      minuteFirst.textContent = 0;
      minuteSecond.textContent = 0;
    } else {
      minute++;
      if (minute < 10) {
        minuteFirst.textContent = minute;
      } else {
        const arrayminute = Array.from(String(minute));
        minuteSecond.textContent = arrayminute[0];
        minuteFirst.textContent = arrayminute[1];
      }
    }
  } else if (change === 'minus') {
    if (minute === 0) {
      minuteFirst.textContent = 0;
      minuteSecond.textContent = 6;
    } else if (minute > 0 && minute < 10) {
      minute--;
      minuteFirst.textContent = minute;
    } else if (minute === 10) {
      minuteFirst.textContent = 9;
      minuteSecond.textContent = 0;
    } else if (minute > 10) {
      minute--;
      const arrayminute = Array.from(String(minute));
      minuteSecond.textContent = arrayminute[0];
      minuteFirst.textContent = arrayminute[1];
    }
  }
}
function settingChangeFunction(e) {
  const settingClicked = e.target.id;
  switch (settingClicked) {
    case 'hour-increase':
      hourChange('sum');
      break;
    case 'hour-decrease':
      hourChange('minus');
      break;
    case 'minute-increase':
      minuteChange('sum');
      break;
    case 'minute-decrease':
      minuteChange('minus');
      break;
    default:
      break;
  }
}
let MouseDownInterval; /* Defining this out of the function so i can also clear it out of the mousedown function */
settingButtons.forEach((button) => {
  button.addEventListener('mousedown', settingChangeFunction);
  button.addEventListener('mousedown', (e) => {
    MouseDownInterval = setInterval(() => {
      settingChangeFunction(e);
    }, 220);
  });
  button.addEventListener('mouseup', () => clearInterval(MouseDownInterval));
});
/* Alarm Voice */
const clockVoice = new Audio('voices/clock.mp3');
const emergencyVoice = new Audio('voices/emergency.mp3');
const policeSirenVoice = new Audio('voices/police-siren.mp3');

const voiceArray = [policeSirenVoice, clockVoice, emergencyVoice];
const voiceBackgroundArray = [
  `url(img/police-siren.jpg)`,
  `url(img/clock.jpg)`,
  `url(../img/emergency.jpg)`,
];
const voiceNamesArray = ['police siren', 'clock', 'emergency'];
const playButton = document.querySelector('#play');
const voiceDivBackground = document.querySelector('#voice-background-div');
const voiceNameTag = document.querySelector('#voice-name-tag');
const nextVoiceButton = document.querySelector('#next-btn');
const prevVoiceButton = document.querySelector('#prev-btn');

let selectedVoice = 0;
nextVoiceButton.addEventListener('click', () => {
  voice.pause();
  playButton.textContent = 'Play';
  if (selectedVoice < voiceArray.length - 1) selectedVoice++;
  else selectedVoice = 0;
  voice = voiceArray[selectedVoice];
  voiceDivBackground.style.backgroundImage =
    voiceBackgroundArray[selectedVoice];
  voiceNameTag.textContent = voiceNamesArray[selectedVoice];
  voice.loop = true;
});
prevVoiceButton.addEventListener('click', () => {
  voice.pause();
  playButton.textContent = 'Play';
  if (selectedVoice > 0) selectedVoice--;
  else selectedVoice = voiceArray.length - 1;
  voice = voiceArray[selectedVoice];
  voiceDivBackground.style.backgroundImage =
    voiceBackgroundArray[selectedVoice];
  voiceNameTag.textContent = voiceNamesArray[selectedVoice];
  voice.loop = true;
});
let voice = voiceArray[0];
voiceDivBackground.style.backgroundImage = voiceBackgroundArray[0];
voiceNameTag.textContent = voiceNamesArray[0];
voice.loop = true;
playButton.addEventListener('click', () => {
  if (voice.paused) {
    voice.play();
    playButton.textContent = 'Pause';
  } else {
    voice.pause();
    playButton.textContent = 'Play';
  }
});
/* Alarm Voices */

/* Deactive Buttons Function */
function toggleButtonActivation() {
  document
    .querySelectorAll('button')
    .forEach((button) => (button.disabled = !button.disabled));
  setAlarmButton.disabled = false;
}
/* Deactive Buttons Function */

/* Set Alarm */
const setAlarmButton = document.querySelector('#set-alarm');
let currentHour = new Date().getHours();
let currentMinute = new Date().getMinutes();
let alarmHour;
let alarmMinute;
let alarmActivated;
setAlarmButton.addEventListener('click', () => {
  if (!alarmActivated) {
    alarmActivated = window.setInterval(timeUpdate, 1000);
    setAlarmButton.textContent = 'Close Alarm';
    toggleButtonActivation();
    voice.pause();
    playButton.textContent = 'Play';
  } else if (alarmActivated) {
    window.clearInterval(alarmActivated);
    toggleButtonActivation();
    alarmActivated = null;
    setAlarmButton.textContent = 'Set Alarm';
    timer = clearInterval();
    voice.pause();
  }
  alarmHour = Number(
    hourSecond.textContent.trim() + hourFirst.textContent.trim()
  );
  alarmMinute = Number(
    minuteSecond.textContent.trim() + minuteFirst.textContent.trim()
  );
});
/* Set Alarm */

function timeUpdate() {
  currentHour = new Date().getHours();
  currentMinute = new Date().getMinutes();

  if (alarmHour === currentHour && alarmMinute === currentMinute) {
    if (voice.paused) {
      voice.play();
      voice.loop = true;
      setAlarmButton.textContent = 'Stop Alarm';
    }
  }
}
