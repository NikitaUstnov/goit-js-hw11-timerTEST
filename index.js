// а ты возьми и добавь нолик в начале стоки если там не два символа
function pad(value) {
  return String(value).padStart(2, "0");
}

// а ты возьми и давай считай время да
function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function momentTime(time) {
  return getTimeComponents(time);
}

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.refs = {
      $days: document.querySelector(`${selector} [data-value="days"]`),
      $hours: document.querySelector(`${selector} [data-value="hours"]`),
      $mins: document.querySelector(`${selector} [data-value="mins"]`),
      $secs: document.querySelector(`${selector} [data-value="secs"]`),
    };
    this.timerId = null;
  }
  startTimer() {
    this.timerId = setInterval(() => {
      const differenceTime = this.targetDate - Date.now();
      const time = momentTime(differenceTime);
      this.updateInterface(time);
    }, 1000);
  }
  updateInterface({ days, hours, mins, secs }) {
    const { $days, $hours, $mins, $secs } = this.refs;
    $days.textContent = days;
    $hours.textContent = hours;
    $mins.textContent = mins;
    $secs.textContent = secs;
  }
}

function initTimer(selector, targetDate) {
  const backTimer = new CountdownTimer({ selector, targetDate });
  backTimer.startTimer();
}

initTimer("#timer-1", new Date("Jul 17, 2022"));

// //отсебятина
// const inputLabel = document.querySelector(".countdown-label");
// console.log(inputLabel);
