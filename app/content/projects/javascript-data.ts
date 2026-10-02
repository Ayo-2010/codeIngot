import type { Project } from '~/types/content'

/**
 * Two data-heavy projects: one that reads from a remote JSON API and one
 * that keeps its whole state in an array and re-renders from it.
 */
export const javascriptDataProjects: Project[] = [
  {
    id: 'project-weather-dashboard',
    slug: 'weather-dashboard',
    title: 'Weather Dashboard with fetch',
    tagline: 'Search any city, read the forecast from a public JSON API, and keep your recent searches one click away.',
    summary:
      'Build a dashboard that fetches real weather data over the network and turns it into a readable panel plus a five day forecast. Open-Meteo is a good target because it needs no API key, which means every failure you see is one you wrote yourself. The work is in the states around the request: loading, error and empty.',
    difficulty: 'advanced',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 165,
    xp: 520,
    brief: [
      'Choose Open-Meteo as the source: it answers a plain GET request with JSON and asks for no key, so you can start with one URL in the address bar.',
      'Build the request URL with the URL constructor and URLSearchParams rather than by pasting strings together, so latitude, longitude and units stay readable.',
      'Wrap the request in an async function: check response.ok before reading the body, then read it with response.json().',
      'Put the whole request in a try, catch and finally so a slow network, a 404 and a thrown parse error all end up in the same three visible states.',
      'Keep one render function that writes the current conditions, the forecast strip and the last updated time from the response object.',
      'Format every date and time with Intl.DateTimeFormat or toLocaleString so the output matches the reader locale instead of raw ISO text.',
      'Save each successful city to localStorage inside a try and catch, and render the stored list as buttons that re-run the search.',
    ],
    requirements: [
      'A labelled search form with a text input and a submit button that does not reload the page.',
      'The request URL is built with URL and URLSearchParams, not by concatenating strings.',
      'The request runs inside an async function that awaits fetch and checks response.ok before reading the body.',
      'A response that is not ok produces a readable error message instead of a blank panel.',
      'Three explicit states are visible at different times: loading, error and no results yet.',
      'A current conditions panel shows the temperature, a short description and at least two extra readings.',
      'A forecast strip shows at least five upcoming days, each with a date, a condition and a temperature.',
      'Dates and times are formatted with Intl.DateTimeFormat or toLocaleString.',
      'The last five successful cities are stored under one localStorage key and rendered as one-click buttons.',
      'localStorage access is wrapped in a try and catch so a full or blocked storage does not break the dashboard.',
    ],
    checklist: [
      {
        id: 'jd-1',
        label: 'Recent cities are rendered as one-click buttons',
        verify: { kind: 'selector', selector: '.recent-city', label: 'a .recent-city button' },
      },
      {
        id: 'jd-2',
        label: 'The request URL is built with URLSearchParams',
        verify: { kind: 'js-call', needle: 'urlsearchparams', label: 'a URLSearchParams call' },
      },
      {
        id: 'jd-3',
        label: 'The response status is checked before the body is read',
        verify: { kind: 'js-call', needle: '.ok', label: 'a response.ok check' },
      },
      {
        id: 'jd-4',
        label: 'The body is read with response.json()',
        verify: { kind: 'js-call', needle: 'json()', label: 'a response.json() call' },
      },
      {
        id: 'jd-5',
        label: 'The request is wrapped in try and catch, with a finally block',
        verify: { kind: 'js-call', needle: 'catch', label: 'a catch block' },
      },
      {
        id: 'jd-6',
        label: 'Recent cities are written to and read from localStorage',
        verify: { kind: 'js-call', needle: 'localstorage', label: 'a localStorage access' },
      },
      {
        id: 'jd-7',
        label: 'The forecast strip is laid out with a grid',
        verify: { kind: 'css-rule', needle: 'grid-template-columns', label: 'a grid-template-columns rule' },
      },
      {
        id: 'jd-8',
        label: 'Loading, error and empty states are all visible and readable',
        verify: { kind: 'manual', label: 'loading, error and no-results states are all shown and read well' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="weather">
      <h1>Weather</h1>

      <form class="weather-form" id="search-form">
        <label for="city-input">City</label>
        <input id="city-input" name="city" type="text" autocomplete="off" />
        <button type="submit">Search</button>
      </form>

      <ul class="weather-recent" id="recent-list"></ul>
      <p class="weather-status" id="status" role="status"></p>

      <section class="weather-current" id="current" hidden></section>
      <section class="weather-forecast" id="forecast" hidden></section>
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.weather {
  max-width: 46rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.weather-form {
  display: flex;
  gap: 0.5rem;
}

/* Write the current conditions, forecast strip and recent city rules here. */
`,
      javascript: `// Query the form, the input, the status line and the two result areas.
// Add an async function that asks the API for one city, a render function
// that writes the current conditions and the forecast, and two helpers
// that remember the cities the reader searched for.
`,
    },
    assets: [
      {
        id: 'jd-asset-weather',
        label: 'Sky photograph for the conditions panel',
        url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200',
      },
    ],
    designPreviewHtml: `<section class="wx">
  <form class="wx-search">
    <input class="wx-input" type="text" value="Lisbon" aria-label="City" />
    <button class="wx-go" type="button">Search</button>
  </form>

  <ul class="wx-recent">
    <li><button class="wx-chip" type="button">Lisbon</button></li>
    <li><button class="wx-chip" type="button">Porto</button></li>
    <li><button class="wx-chip" type="button">Berlin</button></li>
  </ul>

  <p class="wx-note" role="status" hidden></p>
  <p class="wx-updated">Updated 14:20, Tuesday 2 June</p>

  <section class="wx-now">
    <img class="wx-now-bg" src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200" alt="" width="1200" height="800" loading="lazy" decoding="async" />
    <div class="wx-now-main">
      <p class="wx-place">Lisbon, Portugal</p>
      <p class="wx-temp">21&deg;C</p>
      <p class="wx-desc">Partly cloudy, wind 14 km/h from the north west</p>
    </div>
<dl class="wx-stats">
    <div><dt>Humidity</dt><dd data-field="humidity">62%</dd></div>
    <div><dt>Feels like</dt><dd data-field="feels">20&deg;</dd></div>
    <div><dt>Sunrise</dt><dd data-field="sunrise">06:12</dd></div>
    <div><dt>Wind</dt><dd data-field="wind">14 km/h NW</dd></div>
  </dl>
  </section>

  <h2 class="wx-heading">Next five days</h2>
  <ul class="wx-days">
    <li class="wx-day">
      <span class="wx-day-name">Wed</span>
      <span class="wx-day-cond">Sunny</span>
      <span class="wx-day-temp">24&deg;</span>
    </li>
    <li class="wx-day">
      <span class="wx-day-name">Thu</span>
      <span class="wx-day-cond">Sunny</span>
      <span class="wx-day-temp">26&deg;</span>
    </li>
    <li class="wx-day">
      <span class="wx-day-name">Fri</span>
      <span class="wx-day-cond">Cloudy</span>
      <span class="wx-day-temp">22&deg;</span>
    </li>
    <li class="wx-day">
      <span class="wx-day-name">Sat</span>
      <span class="wx-day-cond">Rain</span>
      <span class="wx-day-temp">19&deg;</span>
    </li>
    <li class="wx-day">
      <span class="wx-day-name">Sun</span>
      <span class="wx-day-cond">Rain</span>
      <span class="wx-day-temp">18&deg;</span>
    </li>
  </ul>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #eef6fc;
  color: #152430;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}

.wx {
  max-width: 46rem;
  margin: 0 auto;
}

.wx-search {
  display: flex;
  gap: 0.5rem;
}

.wx-input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid #cfe0ee;
  border-radius: 8px;
  background: #ffffff;
  color: #152430;
  font: inherit;
}

.wx-go {
  padding: 0.6rem 1.2rem;
  border: 0;
  border-radius: 8px;
  background: #0369a1;
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.wx-recent {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

.wx-chip {
  padding: 0.25rem 0.7rem;
  border: 1px solid #cfe0ee;
  border-radius: 999px;
  background: transparent;
  color: #4a6274;
  font: inherit;
  font-size: 0.82rem;
  cursor: pointer;
}

.wx-updated {
  margin: 0.75rem 0 1.25rem;
  color: #4a6274;
  font-size: 0.8rem;
}

.wx-now {
  display: grid;
  gap: 1.25rem;
  padding: 1.4rem;
  background: #ffffff;
  border: 1px solid #cfe0ee;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.wx-now-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  opacity: 0.34;
  z-index: 0;
}

.wx-now > .wx-now-main,
.wx-now > .wx-stats {
  position: relative;
  z-index: 1;
}

.wx-place {
  margin: 0;
  color: #4a6274;
  font-size: 0.85rem;
}

.wx-temp {
  margin: 0.2rem 0 0.3rem;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
}

.wx-desc {
  margin: 0;
  color: #4a6274;
  font-size: 0.9rem;
}

.wx-stats {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  align-content: start;
}

.wx-stats div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #cfe0ee;
}

.wx-stats dt {
  color: #4a6274;
  font-size: 0.85rem;
}

.wx-stats dd {
  margin: 0;
  font-size: 0.85rem;
}

.wx-heading {
  margin: 1.75rem 0 0.75rem;
  font-size: 0.95rem;
  color: #075985;
}

.wx-days {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wx-day {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  background: #ffffff;
  border: 1px solid #cfe0ee;
  border-radius: 8px;
  font-size: 0.9rem;
}

.wx-day-name {
  width: 3rem;
  font-weight: 600;
}

.wx-day-cond {
  flex: 1;
  color: #4a6274;
}

.wx-day-temp {
  color: #075985;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 640px) {
  .wx-now { grid-template-columns: 1.4fr 1fr; }
  .wx-days { grid-template-columns: repeat(5, 1fr); }
  .wx-day { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
}

.wx-note {
  margin: 0.85rem 0 0;
  padding: 0.55rem 0.8rem;
  border: 1px solid #cfe0ee;
  border-radius: 8px;
  background: #ffffff;
  color: #33546b;
  font-size: 0.86rem;
}

.wx-note.is-error {
  border-color: #e0b4b4;
  background: #fdf3f3;
  color: #8c2f2f;
}

.wx-now,
.wx-days,
.wx-updated {
  transition: opacity 160ms ease;
}

.wx.is-loading .wx-now,
.wx.is-loading .wx-days,
.wx.is-loading .wx-updated {
  opacity: 0.45;
}

.wx-go[disabled] {
  background: #356e91;
  cursor: progress;
}

.wx-chip:hover {
  border-color: #0369a1;
  color: #075985;
}

.wx-chip[aria-current='true'] {
  border-color: #0369a1;
  background: #0369a1;
  color: #ffffff;
}

.wx-input:focus-visible,
.wx-chip:focus-visible,
.wx-go:focus-visible {
  outline: 2px solid #0369a1;
  outline-offset: 2px;
}
`,
    designPreviewJs: `var WX = document.querySelector('.wx');

if (WX) {
  var form = WX.querySelector('.wx-search');
  var cityInput = WX.querySelector('.wx-input');
  var goBtn = WX.querySelector('.wx-go');
  var recentList = WX.querySelector('.wx-recent');
  var note = WX.querySelector('.wx-note');
  var stamp = WX.querySelector('.wx-updated');
  var placeEl = WX.querySelector('.wx-place');
  var tempEl = WX.querySelector('.wx-temp');
  var descEl = WX.querySelector('.wx-desc');
  var statsEl = WX.querySelector('.wx-stats');
  var daysEl = WX.querySelector('.wx-days');

  // WMO weather codes, written the way a person would describe them.
  var CODES = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Snow',
    80: 'Rain showers',
    81: 'Rain showers',
    95: 'Thunderstorm'
  };

  // The places the reference can answer for. A real project sends latitude and
  // longitude to the API; a name is enough to show the request and response.
  var PLACES = {
    Lisbon: {
      country: 'Portugal', temp: 21, humidity: 62, feels: 20, sunrise: '06:12', wind: 14, bearing: 'NW', code: 2,
      days: [{ name: 'Wed', code: 0, high: 24 }, { name: 'Thu', code: 1, high: 26 }, { name: 'Fri', code: 3, high: 22 }, { name: 'Sat', code: 61, high: 19 }, { name: 'Sun', code: 63, high: 18 }]
    },
    Porto: {
      country: 'Portugal', temp: 19, humidity: 68, feels: 18, sunrise: '06:20', wind: 17, bearing: 'NW', code: 61,
      days: [{ name: 'Wed', code: 2, high: 21 }, { name: 'Thu', code: 3, high: 22 }, { name: 'Fri', code: 61, high: 20 }, { name: 'Sat', code: 61, high: 18 }, { name: 'Sun', code: 80, high: 17 }]
    },
    Berlin: {
      country: 'Germany', temp: 16, humidity: 55, feels: 15, sunrise: '05:47', wind: 11, bearing: 'WSW', code: 1,
      days: [{ name: 'Wed', code: 1, high: 18 }, { name: 'Thu', code: 2, high: 20 }, { name: 'Fri', code: 3, high: 17 }, { name: 'Sat', code: 2, high: 15 }, { name: 'Sun', code: 61, high: 14 }]
    },
    London: {
      country: 'United Kingdom', temp: 15, humidity: 72, feels: 14, sunrise: '04:43', wind: 13, bearing: 'W', code: 3,
      days: [{ name: 'Wed', code: 3, high: 17 }, { name: 'Thu', code: 61, high: 18 }, { name: 'Fri', code: 61, high: 16 }, { name: 'Sat', code: 80, high: 15 }, { name: 'Sun', code: 3, high: 15 }]
    },
    Tokyo: {
      country: 'Japan', temp: 27, humidity: 74, feels: 30, sunrise: '04:26', wind: 9, bearing: 'SSE', code: 80,
      days: [{ name: 'Wed', code: 80, high: 29 }, { name: 'Thu', code: 2, high: 30 }, { name: 'Fri', code: 61, high: 28 }, { name: 'Sat', code: 3, high: 27 }, { name: 'Sun', code: 0, high: 26 }]
    },
    Sydney: {
      country: 'Australia', temp: 18, humidity: 58, feels: 17, sunrise: '06:52', wind: 19, bearing: 'SSW', code: 0,
      days: [{ name: 'Wed', code: 0, high: 20 }, { name: 'Thu', code: 1, high: 21 }, { name: 'Fri', code: 2, high: 19 }, { name: 'Sat', code: 61, high: 17 }, { name: 'Sun', code: 1, high: 16 }]
    }
  };

  var recent = ['Lisbon', 'Porto', 'Berlin'];
  var shown = 'Lisbon';
  var busy = false;

  // A sandboxed reference cannot make a live request, so this stands in for
  // fetch and resolves the same payload shape the API would return.
  function fetchForecast(city) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var record = PLACES[city];
        if (!record) {
          reject(new Error('No forecast for \\u201c' + city + '\\u201d.'));
          return;
        }
        resolve({
          city: city,
          country: record.country,
          current: {
            temperature_2m: record.temp,
            relative_humidity_2m: record.humidity,
            apparent_temperature: record.feels,
            sunrise: record.sunrise,
            weather_code: record.code,
            wind_speed_10m: record.wind,
            wind_bearing: record.bearing
          },
          daily: record.days.map(function (day) {
            return { name: day.name, weather_code: day.code, temperature_2m_max: day.high };
          })
        });
      }, 400);
    });
  }

  // The API is matched on coordinates, so the name is resolved here instead.
  function resolveName(typed) {
    var wanted = typed.trim().toLowerCase();
    var keys = Object.keys(PLACES);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === wanted) return keys[i];
    }
    return null;
  }

  function say(message, isError) {
    note.textContent = message || '';
    note.hidden = !message;
    note.classList.toggle('is-error', !!isError);
  }

  function stat(name, value) {
    var cell = statsEl.querySelector('[data-field="' + name + '"]');
    if (cell) cell.textContent = value;
  }

  function paintRecent() {
    recentList.textContent = '';
    recent.forEach(function (city) {
      var item = document.createElement('li');
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'wx-chip';
      chip.textContent = city;
      if (city === shown) chip.setAttribute('aria-current', 'true');
      chip.addEventListener('click', function () {
        cityInput.value = city;
        run(city);
      });
      item.appendChild(chip);
      recentList.appendChild(item);
    });
  }

  function paint(data) {
    var current = data.current;
    placeEl.textContent = data.city + ', ' + data.country;
    tempEl.textContent = current.temperature_2m + '\\u00b0C';
    descEl.textContent =
      CODES[current.weather_code] + ', wind ' + current.wind_speed_10m + ' km/h from the ' + current.wind_bearing;
    stat('humidity', current.relative_humidity_2m + '%');
    stat('feels', current.apparent_temperature + '\\u00b0');
    stat('sunrise', current.sunrise);
    stat('wind', current.wind_speed_10m + ' km/h ' + current.wind_bearing);

    daysEl.textContent = '';
    data.daily.forEach(function (day) {
      var item = document.createElement('li');
      item.className = 'wx-day';
      var name = document.createElement('span');
      name.className = 'wx-day-name';
      name.textContent = day.name;
      var cond = document.createElement('span');
      cond.className = 'wx-day-cond';
      cond.textContent = CODES[day.weather_code];
      var high = document.createElement('span');
      high.className = 'wx-day-temp';
      high.textContent = day.temperature_2m_max + '\\u00b0';
      item.appendChild(name);
      item.appendChild(cond);
      item.appendChild(high);
      daysEl.appendChild(item);
    });

    stamp.textContent = 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function run(city) {
    if (busy) return;
    busy = true;
    WX.classList.add('is-loading');
    goBtn.disabled = true;
    say('Loading the forecast for ' + city + '\\u2026');

    fetchForecast(city)
      .then(function (data) {
        shown = city;
        paint(data);
        recent = [city]
          .concat(recent.filter(function (c) { return c !== city; }))
          .slice(0, 4);
        paintRecent();
        say('');
      })
      .catch(function (error) {
        say(error.message + ' Try one of the chips above.', true);
      })
      .then(function () {
        busy = false;
        WX.classList.remove('is-loading');
        goBtn.disabled = false;
      });
  }

  // The reference runs in a frame with no allow-forms permission, so a native
  // form submit would be blocked. The button and the Enter key are wired up
  // directly instead, which is the behaviour a real page needs anyway.
  function submitSearch() {
    var typed = cityInput.value || '';
    if (!typed.trim()) {
      say('Type a city name first.', true);
      return;
    }
    var city = resolveName(typed);
    if (!city) {
      say('No forecast for \\u201c' + typed.trim() + '\\u201d. Try one of the chips above.', true);
      return;
    }
    run(city);
  }

  goBtn.addEventListener('click', submitSearch);
  cityInput.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    submitSearch();
  });

  paintRecent();
}
`,
    solutionNote:
      'A strong solution builds the URL with URL and URLSearchParams, awaits fetch inside a try, checks response.ok before reading the body, and lets finally clear the loading state so the interface is never stuck. It renders through one function that takes the parsed data, formats every date with Intl.DateTimeFormat, and keeps the recent city list in one localStorage key that it re-reads on load, so a reload still offers the last few searches.',
  },
  {
    id: 'project-kanban-board',
    slug: 'kanban-board',
    title: 'Kanban Board with Drag and Drop',
    tagline: 'Three columns, cards you can pick up and move, and a board that comes back exactly as you left it.',
    summary:
      'Build a board where cards move between to do, doing and done, and reorder inside a column, using nothing but the HTML5 drag events. Because the board re-renders from state on every change, the interesting problem is delegation: a card is replaced by new markup, so the handlers have to survive that. Persistence is the last step, and it is the step that proves your state model is sound.',
    difficulty: 'advanced',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 210,
    xp: 600,
    brief: [
      'Model a card as a plain object with a stable id, a title and a column name, and keep one array as the only source of truth.',
      'Write a single render function that rebuilds all three columns from that array, and call it after every change rather than moving nodes by hand.',
      'Mark each card element as draggable and write the five drag events: dragstart, dragover, dragleave, drop and dragend.',
      'Call event.preventDefault() on dragover, otherwise the browser refuses the drop and nothing happens.',
      'Attach the listeners once to the board container instead of to each card, so a card rebuilt by render() still works.',
      'Use dataTransfer.setData and getData to carry the dragged id, and work out the insert position from the pointer position so a card lands above or below its neighbour.',
      'Give every column a visible drop target state so it is clear where a card will go before it is released.',
      'Write the array back to localStorage after every change, and read it back on load so the board survives a reload.',
    ],
    requirements: [
      'Three columns named to do, doing and done, each with a heading, a count and a list area.',
      'A form that adds a card with a generated id, a title and a column of to do.',
      'Every card element is draggable and carries its id in a data attribute.',
      'Cards can be dropped into a different column and can be reordered inside a column.',
      'dragover calls event.preventDefault() so the browser allows the drop.',
      'The dragged card id travels through dataTransfer.setData and getData.',
      'The drag and drop listeners are attached to the board container by delegation, not one set per card.',
      'Each column shows a visible state while a card is over it.',
      'The whole array is saved to localStorage as JSON and restored on load, with a corrupt value falling back to an empty board.',
    ],
    checklist: [
      {
        id: 'jd-1',
        label: 'The board has three lists that cards are rendered into',
        verify: { kind: 'selector', selector: '[data-id]', label: 'cards carrying a data-id attribute' },
      },
      {
        id: 'jd-2',
        label: 'The three columns are laid out with grid',
        verify: { kind: 'css-rule', needle: 'grid-template-columns', label: 'a grid-template-columns rule' },
      },
      {
        id: 'jd-3',
        label: 'Every card is marked draggable',
        verify: { kind: 'js-call', needle: 'draggable', label: 'a draggable attribute' },
      },
      {
        id: 'jd-4',
        label: 'Dragging starts with a dragstart handler',
        verify: { kind: 'js-call', needle: 'dragstart', label: 'a dragstart listener' },
      },
      {
        id: 'jd-5',
        label: 'dragover is handled so a card can be dropped',
        verify: { kind: 'js-call', needle: 'dragover', label: 'a dragover listener' },
      },
      {
        id: 'jd-6',
        label: 'The default browser action is prevented during a drag',
        verify: { kind: 'js-call', needle: 'preventdefault', label: 'a preventDefault call' },
      },
      {
        id: 'jd-7',
        label: 'The board state is saved to and restored from localStorage',
        verify: { kind: 'js-call', needle: 'localstorage', label: 'a localStorage access' },
      },
      {
        id: 'jd-8',
        label: 'A card can be dropped between two cards, not only at the end of a column',
        verify: { kind: 'manual', label: 'dropping onto the upper half of a card inserts above it, the lower half below it' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Board</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="board">
      <header class="board-head">
        <h1>Board</h1>

        <form class="card-form" id="card-form">
          <label for="card-input">New card</label>
          <input id="card-input" name="title" type="text" autocomplete="off" />
          <button type="submit">Add card</button>
        </form>
      </header>

      <div class="board-columns" id="board">
        <section class="column" data-column="todo">
          <h2>To do</h2>
          <p class="column-count">0</p>
          <ul class="column-list" id="todo"></ul>
        </section>

        <section class="column" data-column="doing">
          <h2>Doing</h2>
          <p class="column-count">0</p>
          <ul class="column-list" id="doing"></ul>
        </section>

        <section class="column" data-column="done">
          <h2>Done</h2>
          <p class="column-count">0</p>
          <ul class="column-list" id="done"></ul>
        </section>
      </div>
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.board {
  max-width: 64rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.board-columns {
  display: flex;
  gap: 1rem;
}

/* Write the column, card and dragging-state rules here. */
`,
      javascript: `const boardEl = document.querySelector('#board');
const formEl = document.querySelector('#card-form');
const inputEl = document.querySelector('#card-input');

const columns = ['todo', 'doing', 'done'];

// One array of { id, title, column } objects, plus a render function that
// rebuilds all three lists from it. Attach the five drag listeners once
// to boardEl so they keep working after a rebuild, and save the array.
`,
    },
    designPreviewHtml: `<section class="board">
  <header class="board-head">
    <h1>Board</h1>
    <form class="card-form">
      <input class="card-input" type="text" placeholder="New card" aria-label="New card" />
      <button class="card-add" type="button">Add card</button>
    </form>
  </header>

  <p class="board-note" role="status" hidden></p>

  <div class="board-columns">
    <section class="column" data-column="todo">
      <header class="column-head">
        <h2>To do</h2>
        <span class="column-count">3</span>
      </header>
      <ul class="column-list" data-column="todo">
        <li class="card" data-id="c1" draggable="true">
          <p class="card-title">Write the state model</p>
          <p class="card-meta">Design</p>
          <button class="card-remove" type="button" aria-label="Remove &ldquo;Write the state model&rdquo;">Remove</button>
        </li>
        <li class="card" data-id="c2" draggable="true">
          <p class="card-title">Wire the drop handlers</p>
          <p class="card-meta">Build</p>
          <button class="card-remove" type="button" aria-label="Remove &ldquo;Wire the drop handlers&rdquo;">Remove</button>
        </li>
        <li class="card" data-id="c3" draggable="true">
          <p class="card-title">Style the drop targets</p>
          <p class="card-meta">Design</p>
          <button class="card-remove" type="button" aria-label="Remove &ldquo;Style the drop targets&rdquo;">Remove</button>
        </li>
      </ul>
    </section>

    <section class="column" data-column="doing">
      <header class="column-head">
        <h2>Doing</h2>
        <span class="column-count">2</span>
      </header>
      <ul class="column-list" data-column="doing">
        <li class="card" data-id="c4" draggable="true">
          <p class="card-title">Attach one delegated listener</p>
          <p class="card-meta">Build</p>
          <button class="card-remove" type="button" aria-label="Remove &ldquo;Attach one delegated listener&rdquo;">Remove</button>
        </li>
        <li class="card" data-id="c5" draggable="true">
          <p class="card-title">Save to localStorage</p>
          <p class="card-meta">Build</p>
          <button class="card-remove" type="button" aria-label="Remove &ldquo;Save to localStorage&rdquo;">Remove</button>
        </li>
      </ul>
    </section>

    <section class="column" data-column="done">
      <header class="column-head">
        <h2>Done</h2>
        <span class="column-count">1</span>
      </header>
      <ul class="column-list" data-column="done">
        <li class="card" data-id="c6" draggable="true">
          <p class="card-title">Read the drag events reference</p>
          <p class="card-meta">Research</p>
          <button class="card-remove" type="button" aria-label="Remove &ldquo;Read the drag events reference&rdquo;">Remove</button>
        </li>
      </ul>
    </section>
  </div>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #f5f6f8;
  color: #1b1f26;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}

.board {
  max-width: 64rem;
  margin: 0 auto;
}

.board-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

h1 {
  margin: 0;
  font-size: 1.35rem;
}

.card-form {
  display: flex;
  gap: 0.5rem;
}

.card-input {
  padding: 0.55rem 0.8rem;
  border: 1px solid #dde1e6;
  border-radius: 8px;
  background: #ffffff;
  color: #1b1f26;
  font: inherit;
}

.card-add {
  padding: 0.55rem 1.1rem;
  border: 0;
  border-radius: 8px;
  background: #b45309;
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.board-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
}

.column {
  padding: 0.9rem;
  background: #ffffff;
  border: 1px solid #dde1e6;
  border-radius: 12px;
  min-height: 14rem;
}

.column.is-over {
  border-color: #92400e;
  background: #eceef1;
}

.column-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.column-head h2 {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666f7b;
}

.column-count {
  padding: 0.05rem 0.5rem;
  border: 1px solid #dde1e6;
  border-radius: 999px;
  color: #92400e;
  font-size: 0.75rem;
}

.column-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
  min-height: 9rem;
}

.card {
  padding: 0.7rem 0.8rem;
  background: #eceef1;
  border: 1px solid #dde1e6;
  border-radius: 8px;
  cursor: grab;
}

.card.is-dragging {
  border-color: #92400e;
  opacity: 0.55;
  transform: rotate(-2deg);
}

.card-title {
  margin: 0;
  font-size: 0.9rem;
}

.card-meta {
  margin: 0.35rem 0 0;
  color: #666f7b;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (min-width: 900px) {
  .column-list { min-height: 16rem; }
}

.board-note {
  margin: 0.85rem 0 0;
  padding: 0.55rem 0.8rem;
  border: 1px solid #dde1e6;
  border-radius: 8px;
  background: #ffffff;
  color: #4a5560;
  font-size: 0.86rem;
}

.card {
  position: relative;
}

.card-remove {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  padding: 0.15rem 0.45rem;
  border: 1px solid #dde1e6;
  border-radius: 6px;
  background: #ffffff;
  color: #5a636f;
  font: inherit;
  font-size: 0.7rem;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 120ms ease;
}

.card:hover .card-remove,
.card:focus-within .card-remove {
  opacity: 1;
}
.card-remove:hover {
  border-color: #92400e;
  color: #7c2d12;
}

.card-remove:focus-visible {
  opacity: 1;
  outline: 2px solid #92400e;
  outline-offset: 2px;
}

.card.is-picked {
  border-color: #92400e;
  box-shadow: 0 0 0 2px #f5e3c8;
}

.column.is-target {
  border-color: #92400e;
  background: #f7f2e8;
}

.column-list.is-target {
  background: #f2e9d8;
  border-radius: 8px;
}

.column-empty {
  padding: 0.9rem 0.5rem;
  border: 1px dashed #ccd2d9;
  border-radius: 8px;
  color: #545d69;
  font-size: 0.82rem;
  text-align: center;
}

.card-input:focus-visible,
.card-add:focus-visible,
.card:focus-visible {
  outline: 2px solid #92400e;
  outline-offset: 2px;
}
`,
    designPreviewJs: `var BOARD = document.querySelector('.board');

if (BOARD) {
  var form = BOARD.querySelector('.card-form');
  var titleInput = BOARD.querySelector('.card-input');
  var columns = BOARD.querySelectorAll('.column');
  var note = BOARD.querySelector('.board-note');

  var LABEL = { todo: 'To do', doing: 'Doing', done: 'Done' };
  var CARDS = [
    { id: 'c1', title: 'Write the state model', column: 'todo' },
    { id: 'c2', title: 'Wire the drop handlers', column: 'todo' },
    { id: 'c3', title: 'Style the drop targets', column: 'todo' },
    { id: 'c4', title: 'Attach one delegated listener', column: 'doing' },
    { id: 'c5', title: 'Save to localStorage', column: 'doing' },
    { id: 'c6', title: 'Read the drag events reference', column: 'done' }
  ];

  var picked = null;
  var dragging = null;
  var nextId = 7;

  function say(message) {
    note.textContent = message || '';
    note.hidden = !message;
  }

  function buildCard(card) {
    var item = document.createElement('li');
    item.className = 'card';
    item.setAttribute('data-id', card.id);
    item.setAttribute('draggable', 'true');

    var title = document.createElement('p');
    title.className = 'card-title';
    title.textContent = card.title;

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'card-remove';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', 'Remove ' + card.title);

    item.appendChild(title);
    item.appendChild(remove);
    return item;
  }

  function render() {
    Array.prototype.forEach.call(columns, function (column) {
      var name = column.getAttribute('data-column');
      var list = column.querySelector('.column-list');
      var count = column.querySelector('.column-count');
      var mine = CARDS.filter(function (card) { return card.column === name; });

      list.textContent = '';

      if (!mine.length) {
        var empty = document.createElement('li');
        empty.className = 'column-empty';
        empty.textContent = 'Nothing in ' + LABEL[name] + ' yet';
        list.appendChild(empty);
      } else {
        mine.forEach(function (card) {
          var item = buildCard(card);
          if (picked === card.id) item.classList.add('is-picked');
          list.appendChild(item);
        });
      }

      count.textContent = String(mine.length);
    });
  }

  function move(id, column, beforeId) {
    var index = CARDS.findIndex(function (card) { return card.id === id; });
    if (index < 0) return;
    var card = CARDS.splice(index, 1)[0];
    card.column = column;
    var at = CARDS.length;
    if (beforeId) {
      for (var i = 0; i < CARDS.length; i++) {
        if (CARDS[i].id === beforeId) { at = i; break; }
      }
    }
    CARDS.splice(at, 0, card);
  }

  // The frame has no allow-forms permission, so a native submit is blocked and
  // the button and the Enter key are wired up directly.
  function addCard() {
    var title = (titleInput.value || '').trim();
    if (!title) {
      say('Give the card a title first.');
      return;
    }
    CARDS.push({ id: 'c' + nextId++, title: title, column: 'todo' });
    titleInput.value = '';
    say('');
    render();
  }

  form.querySelector('.card-add').addEventListener('click', addCard);
  titleInput.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addCard();
  });

  BOARD.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.card-remove');
    if (button) {
      var card = button.closest('.card');
      var id = card && card.getAttribute('data-id');
      CARDS = CARDS.filter(function (item) { return item.id !== id; });
      if (picked === id) picked = null;
      say('');
      render();
      return;
    }

    // Without a pointer a card is still movable: Enter picks it up, then a
    // click on a column drops it.
    if (!picked) return;
    var column = event.target.closest && event.target.closest('.column');
    if (!column) return;
    move(picked, column.getAttribute('data-column'), null);
    picked = null;
    say('');
    render();
  });

  BOARD.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    var card = event.target.closest && event.target.closest('.card');
    if (!card) return;
    event.preventDefault();
    var id = card.getAttribute('data-id');
    picked = picked === id ? null : id;
    say(picked ? 'Holding ' + card.querySelector('.card-title').textContent + '. Click a column to drop it.' : '');
    render();
  });

  // One set of drag listeners on the board, delegated so that cards rebuilt by
  // render() keep working without re-binding anything.
  BOARD.addEventListener('dragstart', function (event) {
    var card = event.target.closest && event.target.closest('.card');
    if (!card) return;
    dragging = card.getAttribute('data-id');
    card.classList.add('is-dragging');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', dragging);
    }
  });

  BOARD.addEventListener('dragover', function (event) {
    var column = event.target.closest && event.target.closest('.column');
    if (!column || !dragging) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    column.classList.add('is-target');
    var list = column.querySelector('.column-list');
    if (list) list.classList.add('is-target');
  });

  BOARD.addEventListener('dragleave', function (event) {
    var column = event.target.closest && event.target.closest('.column');
    if (!column) return;
    if (column.contains && event.relatedTarget && column.contains(event.relatedTarget)) return;
    column.classList.remove('is-target');
    var list = column.querySelector('.column-list');
    if (list) list.classList.remove('is-target');
  });

  BOARD.addEventListener('drop', function (event) {
    var column = event.target.closest && event.target.closest('.column');
    if (!column || !dragging) return;
    event.preventDefault();

    var id = dragging;
    if (event.dataTransfer) {
      var carried = event.dataTransfer.getData('text/plain');
      if (carried) id = carried;
    }

    // The pointer decides the insert position: the upper half of a card means
    // above it, the lower half means below.
    var before = null;
    var over = event.target.closest && event.target.closest('.card');
    if (over && over.getAttribute('data-id') !== id) {
      var box = over.getBoundingClientRect ? over.getBoundingClientRect() : null;
      if (box && event.clientY > box.top + box.height / 2) {
        before = over.nextElementSibling ? over.nextElementSibling.getAttribute('data-id') : null;
      } else {
        before = over.getAttribute('data-id');
      }
    }

    move(id, column.getAttribute('data-column'), before);
    dragging = null;
    say('');
    render();
  });

  BOARD.addEventListener('dragend', function () {
    dragging = null;
    Array.prototype.forEach.call(columns, function (column) {
      column.classList.remove('is-target');
      var list = column.querySelector('.column-list');
      if (list) list.classList.remove('is-target');
    });
    render();
  });

  render();
}
`,
    solutionNote:
      'A strong solution keeps one array as the only source of truth, rebuilds all three columns from it after every change, and attaches the five drag listeners to the board container once so re-rendered cards keep working. It carries the dragged id through dataTransfer, calls event.preventDefault() on dragover, works out the insert position from the pointer so a card can land between two others, and writes the array back to localStorage after every mutation, so ordering survives a reload.',
  },
]
