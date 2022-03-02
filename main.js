const formElement = document.querySelector('#iTunes-form');
//inputElement
const formQueryElement = document.querySelector('#iTunes-form-query');
const iTunesErrorElement = document.querySelector('#iTunes-error');
const iTunesresultElement = document.querySelector('#iTunes-result');

function showError(message) {
  iTunesErrorElement.innerHTML = message;
}
  
function showiTunes(itunes) {
  iTunesresultElement.innerHTML = "";

  if (itunes == null) {
    return;
  }

  const artistName = itunes.artistName;
  const trackName = itunes.trackName;
  const genreName = itunes.primaryGenreName;

  const elements = itunes["results"];

  for (let i = 0; i < elements.length; i++) {

    const artistName = elements[i].artistName;
    const trackName = elements[i].trackName;
    const genreName = elements[i].primaryGenreName;

    const iTunesElement = document.createElement("div");
    iTunesElement.classList.add('itunes');

    const artistNameElement = document.createElement("div");
    artistNameElement.classList.add("artist__name");
    artistNameElement.innerHTML = artistName;

    const trackNameElement = document.createElement("div");
    trackNameElement.classList.add("track__name");
    trackNameElement.innerHTML = trackName;

    const genreNameElement = document.createElement("div");
    genreNameElement.classList.add("genre__name");
    genreNameElement.innerHTML = genreName;

    iTunesElement.append(artistNameElement);
    iTunesElement.append(trackNameElement);
    iTunesElement.append(genreNameElement);
    iTunesresultElement.append(iTunesElement);
  }
}

formElement.addEventListener('submit', (event) => {
  //sprečavanje defaultnog ponašanja
  event.preventDefault();
  const value = (formQueryElement.value || "").trim().toLocaleLowerCase();

  if (value === "") {
    showError("Please enter Song name or Artist");
    showiTunes(null);

    return;
  }

  // Za vrijednost upisanu u inputu se radi fetch -dohvaćanje pokemona. Traži se endpoint - ima url i na kraj tog urla(endpointa) ne nalijepi: / vrijednost upisana u inputu
  fetch(`https://itunes.apple.com/search?term=${value}&entity=song`)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        //Vrati se json
        return response.json();
      } else {
        throw new Error("Could not find iTunes");
      }
    })
    .then((json) => {
      showError("");
      //Prikaže se pokemon
      showiTunes(json);
    })
    //U slučaje greške Pokemona se obriše i ispiše se greška
    .catch((error) => {
      showError(error.message);
      showiTunes(null);
    });
});