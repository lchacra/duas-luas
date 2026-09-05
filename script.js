const eclipses = [
  {
    date: "2026-09-12T09:00:00",
    location: "Florianópolis"
  },
  {
    date: "2026-10-10T09:00:00",
    location: "São Paulo"
  },
  {
    date: "2026-10-17T09:00:00",
    location: "Florianópolis"
  },
  {
    date: "2026-10-31T17:00:00",
    location: "Florianópolis"
  },
  {
    date: "2026-11-06T18:00:00",
    location: "São Paulo"
  }
];

eclipses.sort((a, b) => {
  return new Date(a.date) - new Date(b.date);
});


function getNextEclipse() {

  const now = new Date();

  return eclipses.find((eclipse) => {
    return new Date(eclipse.date) > now;
  });

}

const nextEclipse = getNextEclipse();

const nextMeeting = new Date(nextEclipse.date);

const formattedDate = nextMeeting.toLocaleDateString("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

document.getElementById("meeting-date").textContent =
  formattedDate;

function updateCountdown() {

  const now = new Date();

  const difference = nextMeeting - now;

  if (difference <= 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);

const eclipseList =
  document.getElementById("eclipse-list");


eclipses.forEach((eclipse) => {

  const eclipseDate = new Date(eclipse.date);


  const formattedEclipseDate =
    eclipseDate.toLocaleDateString(
      "pt-BR",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );


  const card = document.createElement("article");

  card.classList.add("eclipse-card");


  card.innerHTML = `
    <div class="eclipse-date">
      📅 ${formattedEclipseDate}
    </div>

    <div class="eclipse-location">
      📍 ${eclipse.location}
    </div>
  `;


  eclipseList.appendChild(card);

});