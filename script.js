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
    document.getElementById("time").innerText = "0:0:0:0";
  } else {
    document.getElementById("start-button").innerText = "Start";
    str(1)
  }

  let cur = 0;
  while (started) {
    await wait(1000);
    cur++;

    let text = "";

    text += Math.floor(cur / (24 * 60 * 60));  // Javascript, am I right?
    text += ":" + Math.floor(cur / (60 * 60));
    text += ":" + Math.floor(cur / 60);
    text += ":" + cur % 60;

    document.getElementById("time").innerText = text;
  }
}

window.addEventListener(
  "DOMContentLoaded",
  async function() {
    str(0);
  }
);
