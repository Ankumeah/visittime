let started = false;
let last_time = "0:00:00:00:00";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function add_session(time) {
  let sessions = JSON.parse(window.localStorage.getItem("vtSessions") || "[]");

  sessions.push(time);
  document.getElementById("str").innerText = sessions.length + 1;

  let sessions_dropdown = document.getElementById("sessions-dropdown")
  sessions_dropdown.innerHTML = sessions_dropdown.innerHTML + `<p class="session">${time}</p>`

  window.localStorage.setItem("vtSessions", JSON.stringify(sessions));
}

async function toggle() {
  started = !started;

  if (started) {
    document.getElementById("start-button").innerText = "Stop";
    document.getElementById("time").innerText = "0:00:00:00:00";
  } else {
    document.getElementById("start-button").innerText = "Start";
    add_session(last_time);
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

    last_time = text;
    document.getElementById("time").innerText = text;
  }
}

function toggle_sessions_dropdown() {
  let menu = document.getElementById("sessions-dropdown");
  menu.hidden = !menu.hidden;
}

function clear_sessions() {
  window.localStorage.setItem("vtSessions", "[]");
  document.getElementById("str").innerText = "1";

  document.getElementById("sessions-dropdown").innerHTML = '<button class="sessions-button" onclick="clear_sessions()">Clear</button>'
}

window.addEventListener(
  "DOMContentLoaded",
  async function() {
    let sessions = JSON.parse(window.localStorage.getItem("vtSessions") || "[]");
    document.getElementById("str").innerText = sessions.length + 1;

    sessions.forEach((session) => {
      let sessions_dropdown = document.getElementById("sessions-dropdown")
      sessions_dropdown.innerHTML = sessions_dropdown.innerHTML + `<p class="session">${session}</p>`
    })
  }
);
