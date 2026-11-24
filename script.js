// ===============================
// 한라대학교 시작 페이지 JavaScript
// ===============================

// 1. 도시 좌표 설정 (원주, 서울, 제주)
const CITIES = {
  wonju: {
    name: "원주",
    lat: 37.3422,
    lon: 127.9202,
  },
  seoul: {
    name: "서울",
    lat: 37.5665,
    lon: 126.9780,
  },
  jeju: {
    name: "제주",
    lat: 33.4996,
    lon: 126.5312,
  }
};

// 2. WMO 날씨 코드 매핑 (아이콘 및 한글 설명)
function getWeatherDetails(code, isDay = 1) {
  const icons = {
    clearSun: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#FBBC05"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"/></svg>`,
    clearMoon: `<svg viewBox="0 0 24 24" width="36" height="36" fill="#F1C40F"><path d="M12.3 2a10 10 0 0 0-1.9 19.8 10 10 0 0 0 11.6-11.6A10 10 0 0 1 12.3 2z"/></svg>`,
    partlyCloudy: `<svg viewBox="0 0 24 24" width="38" height="38"><path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/><circle cx="17" cy="8" r="3" fill="#FBBC05"/></svg>`,
    cloudy: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#78909C"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
    fog: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#90A4AE"><path d="M3 9h18v2H3zm0 4h18v2H3zm2 4h14v2H5z"/></svg>`,
    drizzle: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#4FC3F7"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM7 21l-1 2h2l1-2zm6 0l-1 2h2l1-2zm6 0l-1 2h2l1-2z"/></svg>`,
    rain: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#29B6F6"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM8 21l-1.5 3h1.8l1.5-3zm5 0l-1.5 3h1.8l1.5-3zm5 0l-1.5 3h1.8l1.5-3z"/></svg>`,
    snow: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#80DEEA"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM12 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>`,
    thunder: `<svg viewBox="0 0 24 24" width="38" height="38" fill="#FFB300"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM11 23l1-4H9.5l3.5-6v3h2.5L11 23z"/></svg>`,
  };

  switch (code) {
    case 0:
    case 1:
      return { desc: "맑음", icon: isDay ? icons.clearSun : icons.clearMoon };
    case 2:
      return { desc: "구름 조금", icon: icons.partlyCloudy };
    case 3:
      return { desc: "흐림", icon: icons.cloudy };
    case 45:
    case 48:
      return { desc: "안개", icon: icons.fog };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { desc: "이슬비", icon: icons.drizzle };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { desc: "비", icon: icons.rain };
    case 71:
    case 73:
    case 75:
    case 77:
      return { desc: "눈", icon: icons.snow };
    case 80:
    case 81:
    case 82:
      return { desc: "소나기", icon: icons.rain };
    case 85:
    case 86:
      return { desc: "눈보라", icon: icons.snow };
    case 95:
    case 96:
    case 99:
      return { desc: "뇌우", icon: icons.thunder };
    default:
      return { desc: "구름 조금", icon: icons.partlyCloudy };
  }
}

// 3. 날씨 정보 가져오기 (Open-Meteo API)
async function fetchWeatherForCity(cityKey) {
  const city = CITIES[cityKey];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=Asia%2FSeoul`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    const current = data.current;

    const weatherInfo = getWeatherDetails(current.weather_code, current.is_day);
    
    // UI 업데이트
    document.getElementById(`${cityKey}-temp`).textContent = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById(`${cityKey}-desc`).textContent = weatherInfo.desc;
    document.getElementById(`${cityKey}-icon`).innerHTML = weatherInfo.icon;
    document.getElementById(`${cityKey}-humidity`).textContent = `습도: ${current.relative_humidity_2m}%`;
    
    // km/h -> m/s 변환
    const windSpeedMs = (current.wind_speed_10m / 3.6).toFixed(1);
    document.getElementById(`${cityKey}-wind`).textContent = `풍속: ${windSpeedMs} m/s`;

    // 로컬 스토리지에 캐시
    localStorage.setItem(`weather_${cityKey}`, JSON.stringify({
      temp: current.temperature_2m,
      desc: weatherInfo.desc,
      iconSvg: weatherInfo.icon,
      humidity: current.relative_humidity_2m,
      wind: windSpeedMs,
      time: Date.now()
    }));
  } catch (error) {
    console.error(`Error fetching weather for ${city.name}:`, error);
    const cached = localStorage.getItem(`weather_${cityKey}`);
    if (cached) {
      const data = JSON.parse(cached);
      document.getElementById(`${cityKey}-temp`).textContent = `${Math.round(data.temp)}°C`;
      document.getElementById(`${cityKey}-desc`).textContent = data.desc;
      document.getElementById(`${cityKey}-icon`).innerHTML = data.iconSvg;
      document.getElementById(`${cityKey}-humidity`).textContent = `습도: ${data.humidity}%`;
      document.getElementById(`${cityKey}-wind`).textContent = `풍속: ${data.wind} m/s`;
    } else {
      document.getElementById(`${cityKey}-desc`).textContent = "정보 불러오기 실패";
      document.getElementById(`${cityKey}-icon`).innerHTML = "⚠️";
    }
  }
}

async function fetchAllWeather() {
  const refreshBtn = document.getElementById("refresh-weather");
  if (refreshBtn) refreshBtn.classList.add("spinning");
  
  await Promise.all([
    fetchWeatherForCity("wonju"),
    fetchWeatherForCity("seoul"),
    fetchWeatherForCity("jeju")
  ]);

  if (refreshBtn) {
    setTimeout(() => {
      refreshBtn.classList.remove("spinning");
    }, 400);
  }
}

// 4. 명언 모음 및 회전 로직
const QUOTES = [
  { text: "생각하는 대로 살지 않으면 사는 대로 생각하게 된다.", author: "폴 부르제" },
  { text: "시작이 반이다. 시작하라. 그 순간 당신은 이미 절반을 온 것이다.", author: "호라티우스" },
  { text: "어제와 똑같이 살면서 다른 미래를 기대하는 것은 정신병 초기증세이다.", author: "알베르트 아인슈타인" },
  { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤자민 프랭클린" },
  { text: "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 당신이 옳다.", author: "헨리 포드" },
  { text: "바람이 불지 않을 때 바람개비를 돌리는 방법은 앞으로 달려가는 것이다.", author: "데일 카네기" },
  { text: "위대한 일을 해내는 유일한 방법은 당신이 하는 일을 사랑하는 것이다.", author: "스티브 잡스" },
  { text: "가장 어두운 밤도 언젠가는 끝나고 해는 떠오를 것이다.", author: "빅토르 위고" },
  { text: "승리는 가장 끈기 있는 자에게 돌아간다.", author: "나폴레옹 보나파르트" },
  { text: "꿈을 이루고자 하는 용기만 있다면 모든 꿈을 이룰 수 있다.", author: "월트 디즈니" },
  { text: "작은 기회로부터 종종 위대한 업적이 시작된다.", author: "데모스테네스" },
  { text: "행복은 목적지가 아니라 여행하는 과정 그 자체이다.", author: "로이 굿맨" },
  { text: "배움은 끝이 없으며, 배움을 멈추는 순간 늙기 시작한다.", author: "헨리 포드" },
  { text: "산을 움직이려 하는 이는 작은 돌을 들어내는 일부터 시작한다.", author: "공자" },
  { text: "우리가 두려워해야 할 유일한 것은 두려움 그 자체다.", author: "프랭클린 D. 루스벨트" }
];

let currentQuoteIndex = Math.floor(Math.random() * QUOTES.length);

function displayQuote(index) {
  const quote = QUOTES[index];
  const textEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");

  if (!textEl || !authorEl) return;

  textEl.style.opacity = 0;
  authorEl.style.opacity = 0;

  setTimeout(() => {
    textEl.textContent = `“${quote.text}”`;
    authorEl.textContent = `— ${quote.author}`;
    textEl.style.opacity = 1;
    authorEl.style.opacity = 1;
  }, 200);
}

function nextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
  displayQuote(currentQuoteIndex);
}

// 5. 다크 모드 토글
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(theme);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
}

function applyTheme(theme) {
  const icon = document.getElementById("theme-icon");
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (icon) {
      icon.innerHTML = `<path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"/>`;
    }
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (icon) {
      icon.innerHTML = `<path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>`;
    }
  }
}

// 6. 초기화 실행
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  // 명언 초기 표시 및 이벤트
  displayQuote(currentQuoteIndex);
  const nextBtn = document.getElementById("next-quote");
  if (nextBtn) nextBtn.addEventListener("click", nextQuote);

  // 날씨 가져오기 및 새로고침 이벤트
  fetchAllWeather();
  const refreshBtn = document.getElementById("refresh-weather");
  if (refreshBtn) refreshBtn.addEventListener("click", fetchAllWeather);

  // 15분마다 날씨 자동 갱신
  setInterval(fetchAllWeather, 15 * 60 * 1000);
});
