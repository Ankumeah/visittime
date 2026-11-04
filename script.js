let started = false

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function str(add) {
  var streak = Number(window.localStorage.getItem("vtStr"));
  if (streak) {
    streak += add;
  } else {
    var streak = 1;
  }
  document.getElementById("str").innerText = streak;
  window.localStorage.setItem("vtStr", streak);
}

async function toggle() {
  started = !started;

  if (started) {
    document.getElementById("start-button").innerText = "Stop";
    document.getElementById("time").innerText = "0:00:00:00:00";
  } else {
    document.getElementById("start-button").innerText = "Start";
    str(1)
  }

  let cur = 0;
  while (started) {
    await wait(10);
    if (!started) { break; } // In case user stopped timer while we were awaiting
    cur++;

    let text = "";

    text += Math.floor(cur / (24 * 60 * 60 * 100));                         // Days // Javascript, am I right?
    text += ":" + String(Math.floor(cur / (60 * 60 * 100))).padStart(2, 0); // Hours
    text += ":" + String(Math.floor(cur / (60 * 100))).padStart(2, 0);      // Minutes
    text += ":" + String(Math.floor(cur / 100)).padStart(2, 0);             // Seconds
    text += ":" + String(cur % 100).padStart(2, 0);                         // Miliseconds

    document.getElementById("time").innerText = text;
  }
}

window.addEventListener(
  "DOMContentLoaded",
  async function() {
    str(0);
  }
);
