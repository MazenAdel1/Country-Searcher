let cardContainer = document.querySelector(`.cards-container`),
  cards = document.querySelectorAll(`.card`),
  flags = document.querySelectorAll(`.flag`),
  countryNames = document.querySelectorAll(`.country-name`),
  populations = document.querySelectorAll(`.population`),
  regions = document.querySelectorAll(`.region`),
  capitals = document.querySelectorAll(`.capital`);

if (localStorage.darkMode == "true") {
  document.children[0].classList.add(`dark`);
  document.querySelector(`.fa-moon`).classList.toggle(`fa-regular`);
  document.querySelector(`.fa-moon`).classList.toggle(`fa-solid`);
}

fetch(`./data.json`)
  .then((x) => {
    return x.json();
  })
  .then((data) => {
    makeTheHomePageCards(data);
  });

document.querySelector(`.dark-mode-button`).onclick = () => {
  document.children[0].classList.toggle(`dark`);
  document.querySelector(`.fa-moon`).classList.toggle(`fa-regular`);
  document.querySelector(`.fa-moon`).classList.toggle(`fa-solid`);
  if (document.children[0].classList.contains(`dark`)) {
    localStorage.darkMode = true;
  } else {
    localStorage.darkMode = false;
  }
};

let filterByRegion = document.querySelector(`.filter-by-region`),
  regionList = document.querySelector(`.regions-list`),
  regionListElement = document.querySelectorAll(`.regions-list-element`);

filterByRegion.onclick = function () {
  regionList.classList.toggle(`hidden`);
  regionList.classList.toggle(`flex`);
};

regionListElement.forEach((el) => {
  el.addEventListener(`click`, (e) => {
    for (let i = 0; i < 5; i++) {
      if (regionListElement[i].classList.contains(`active`)) {
        regionListElement[i].classList.remove(`active`);
      }
    }
    e.currentTarget.classList.add(`active`);
    filterByRegion.children[0].innerHTML = `${e.currentTarget.innerText}`;

    filterTheCountriesByRegion();
  });
});

let searchButton = document.querySelector(`.search-button`),
  input = document.querySelector(`input`);

searchButton.onclick = function () {
  if (input.value != ``) {
    fetch(`./data.json`)
      .then((x) => {
        return x.json();
      })
      .then((data) => {
        for (let i = 0; i < 249; i++) {
          if (input.value == data[i].name) {
            cardContainer.innerHTML = ``;
            // make the card
            let card = document.createElement(`div`),
              flag = document.createElement(`div`),
              flagImg = document.createElement(`img`),
              infoContainer = document.createElement(`div`),
              countryName = document.createElement(`h3`),
              countryPopulation = document.createElement(`span`),
              countryRegion = document.createElement(`span`),
              countryCapital = document.createElement(`span`);

            card.className = `card flex cursor-pointer flex-col bg-white drop-shadow-md dark:bg-dark-blue dark:text-very-light`;

            flag.className = `flag h-1/2`;
            flagImg.src = `${data[i].flag}`;
            flagImg.alt = `${data[i].name}`;
            flagImg.title = `${data[i].name}`;
            flagImg.className = `h-full w-full object-cover`;

            infoContainer.className = `mt-auto flex flex-col h-1/2 justify-center p-5`;

            countryName.innerHTML = `${data[i].name}`;
            countryName.className = `pb-2 text-lg font-bold`;

            countryPopulation.innerHTML = `Population: <span class='population dark:text-gray-300'>${data[
              i
            ].population.toLocaleString()}</span>`;
            countryRegion.innerHTML = `Region: <span class='region dark:text-gray-300'>${data[i].region}</span>`;
            countryCapital.innerHTML = `Capital: <span class='capital dark:text-gray-300'>${data[i].capital}</span>`;

            flag.appendChild(flagImg);
            infoContainer.appendChild(countryName);
            infoContainer.appendChild(countryPopulation);
            infoContainer.appendChild(countryRegion);
            infoContainer.appendChild(countryCapital);
            card.appendChild(flag);
            card.appendChild(infoContainer);
            //

            cardContainer.appendChild(card);
          }
        }
        cards = document.querySelectorAll(`.card`);
        makeChosenCardPage();
      });
  }
};

input.addEventListener(`keypress`, (e) => {
  if (e.key == "Enter") {
    searchButton.click();
  }
});

let chosenCardContainer = document.querySelector(`.chosen-card-container`),
  chosenCountryFlag = document.querySelector(`.chosen-country-flag`),
  chosenCountryName = document.querySelector(`.chosen-country-name`),
  chosenCountryNativeName = document.querySelector(
    `.chosen-country-native-name`,
  ),
  chosenCountryPopulation = document.querySelector(
    `.chosen-country-population`,
  ),
  chosenCountryRegion = document.querySelector(`.chosen-country-region`),
  chosenCountrySubRegion = document.querySelector(`.chosen-country-sub-region`),
  chosenCountryCapital = document.querySelector(`.chosen-country-capital`),
  chosenCountryDomain = document.querySelector(`.chosen-country-domain`),
  chosenCountryCurrencies = document.querySelector(
    `.chosen-country-currencies`,
  ),
  chosenCountryLanguages = document.querySelector(`.chosen-country-languages`),
  borderCountries = document.querySelector(`.border-countries`);
backButton = document.querySelector(`.back-button`);

makeChosenCardPage();

backButton.onclick = () => {
  backButton.classList.add(`hidden`);
  chosenCardContainer.classList.add(`hidden`);

  chosenCardContainer.children[0].children[0].remove();

  document.querySelector(`.navigation`).classList.remove(`hidden`);
  cardContainer.classList.remove(`hidden`);

  const langs = chosenCountryLanguages.children.length;
  for (let i = 0; i < langs; i++) {
    chosenCountryLanguages.children[0].remove();
  }

  const borders = borderCountries.children.length;
  for (let i = 0; i < borders; i++) {
    borderCountries.children[0].remove();
  }
};

// make the home page cards
function makeTheHomePageCards(data) {
  for (let i = 0; i < 249; i++) {
    for (let j = 0; j < 8; j++) {
      if (data[i].name == "Germany") {
        flags[0].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[0].innerHTML = data[i].name;
        populations[0].innerHTML = data[i].population.toLocaleString();
        regions[0].innerHTML = data[i].region;
        capitals[0].innerHTML = data[i].capital;
      }
      if (data[i].name == "United States of America") {
        flags[1].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[1].innerHTML = data[i].name;
        populations[1].innerHTML = data[i].population.toLocaleString();
        regions[1].innerHTML = data[i].region;
        capitals[1].innerHTML = data[i].capital;
      }
      if (data[i].name == "Brazil") {
        flags[2].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[2].innerHTML = data[i].name;
        populations[2].innerHTML = data[i].population.toLocaleString();
        regions[2].innerHTML = data[i].region;
        capitals[2].innerHTML = data[i].capital;
      }
      if (data[i].name == "Iceland") {
        flags[3].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[3].innerHTML = data[i].name;
        populations[3].innerHTML = data[i].population.toLocaleString();
        regions[3].innerHTML = data[i].region;
        capitals[3].innerHTML = data[i].capital;
      }
      if (data[i].name == "Afghanistan") {
        flags[4].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[4].innerHTML = data[i].name;
        populations[4].innerHTML = data[i].population.toLocaleString();
        regions[4].innerHTML = data[i].region;
        capitals[4].innerHTML = data[i].capital;
      }
      if (data[i].name == "Åland Islands") {
        flags[5].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[5].innerHTML = data[i].name;
        populations[5].innerHTML = data[i].population.toLocaleString();
        regions[5].innerHTML = data[i].region;
        capitals[5].innerHTML = data[i].capital;
      }
      if (data[i].name == "Albania") {
        flags[6].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[6].innerHTML = data[i].name;
        populations[6].innerHTML = data[i].population.toLocaleString();
        regions[6].innerHTML = data[i].region;
        capitals[6].innerHTML = data[i].capital;
      }
      if (data[i].name == "Algeria") {
        flags[7].innerHTML = `<img src='${data[i].flag}' alt='${data[i].name}' title='${data[i].name}' class='h-full object-cover w-full'>`;
        countryNames[7].innerHTML = data[i].name;
        populations[7].innerHTML = data[i].population.toLocaleString();
        regions[7].innerHTML = data[i].region;
        capitals[7].innerHTML = data[i].capital;
      }
    }
  }
}
//

// filter by region
function filterTheCountriesByRegion() {
  cardContainer.innerHTML = ``;

  for (let i = 0; i < 5; i++) {
    if (regionListElement[i].classList.contains(`active`)) {
      fetch(`./data.json`)
        .then((x) => {
          return x.json();
        })
        .then((data) => {
          for (let j = 0; j < 249; j++) {
            if (data[j].region == `${regionListElement[i].innerText}`) {
              // make the card
              let card = document.createElement(`div`),
                flag = document.createElement(`div`),
                flagImg = document.createElement(`img`),
                infoContainer = document.createElement(`div`),
                countryName = document.createElement(`h3`),
                countryPopulation = document.createElement(`span`),
                countryRegion = document.createElement(`span`),
                countryCapital = document.createElement(`span`);

              card.className = `card flex cursor-pointer flex-col bg-white drop-shadow-md dark:bg-dark-blue dark:text-very-light`;

              flag.className = `flag h-1/2`;
              flagImg.src = `${data[j].flag}`;
              flagImg.alt = `${data[j].name}`;
              flagImg.title = `${data[j].name}`;
              flagImg.className = `h-full object-cover w-full`;

              infoContainer.className = `mt-auto flex flex-col h-1/2 justify-center p-5`;

              countryName.innerHTML = `${data[j].name}`;
              countryName.className = `pb-2 text-lg font-bold`;

              countryPopulation.innerHTML = `Population: <span class='population dark:text-gray-300'>${data[
                j
              ].population.toLocaleString()}</span>`;
              countryRegion.innerHTML = `Region: <span class='region dark:text-gray-300'>${data[j].region}</span>`;
              countryCapital.innerHTML = `Capital: <span class='capital dark:text-gray-300'>${data[j].capital}</span>`;
              flag.appendChild(flagImg);
              infoContainer.appendChild(countryName);
              infoContainer.appendChild(countryPopulation);
              infoContainer.appendChild(countryRegion);
              infoContainer.appendChild(countryCapital);
              card.appendChild(flag);
              card.appendChild(infoContainer);
              //

              cardContainer.appendChild(card);
            }
          }
          cards = document.querySelectorAll(`.card`);
          makeChosenCardPage();

          regionList.classList.add(`hidden`);
          regionList.classList.remove(`flex`);
        });
    }
  }
}
//

function makeChosenCardPage() {
  cards.forEach((el) => {
    el.addEventListener(`click`, () => {
      cardContainer.classList.add(`hidden`);
      document.querySelector(`.navigation`).classList.add(`hidden`);
      chosenCardContainer.classList.remove(`hidden`);
      backButton.classList.remove(`hidden`);

      cards = document.querySelectorAll(`.card`);

      fetch(`./data.json`)
        .then((x) => x.json())
        .then((data) => {
          for (let i = 0; i < 249; i++) {
            if (data[i].name == el.children[1].children[0].innerText) {
              chosenCountryFlag.innerHTML = `<img src='${data[i].flag}' alt=${data[i].name} title='${data[i].name}'>`;
              chosenCountryName.innerHTML = `${data[i].name}`;
              chosenCountryNativeName.innerHTML = `${data[i].nativeName}`;
              chosenCountryPopulation.innerHTML = `${data[
                i
              ].population.toLocaleString()}`;
              chosenCountryRegion.innerHTML = `${data[i].region}`;
              chosenCountrySubRegion.innerHTML = `${data[i].subregion}`;
              chosenCountryCapital.innerHTML = `${data[i].capital}`;
              chosenCountryDomain.innerHTML = `${data[i].topLevelDomain[0]}`;
              chosenCountryCurrencies.innerHTML = `${data[i].currencies[0].name}`;
              for (let j = 0; j < data[i].languages.length; j++) {
                let span = document.createElement(`span`),
                  spanText;
                span.className = `font-normal dark:text-gray-300`;

                if (data[i].languages.length > 1) {
                  if (j == data[i].languages.length - 1) {
                    spanText = document.createTextNode(
                      `${data[i].languages[j].name}`,
                    );
                  } else {
                    spanText = document.createTextNode(
                      `${data[i].languages[j].name}, `,
                    );
                  }
                } else {
                  spanText = document.createTextNode(
                    `${data[i].languages[j].name}`,
                  );
                }
                span.appendChild(spanText);
                chosenCountryLanguages.appendChild(span);
              }
              if (data[i].borders) {
                for (let j = 0; j < data[i].borders.length; j++) {
                  for (let k = 0; k < 249; k++) {
                    if (data[k].alpha3Code == data[i].borders[j]) {
                      let span = document.createElement(`span`),
                        spanText = document.createTextNode(`${data[k].name}`);

                      span.className = `px-4 py-1 drop-shadow-md bg-white font-normal dark:bg-dark-blue dark:text-gray-300`;
                      span.appendChild(spanText);

                      borderCountries.appendChild(span);
                    }
                  }
                }
              }
            }
          }
        });
    });
  });
}
