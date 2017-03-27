document.querySelector('#search-button').addEventListener('click', () => {
  const empty = document.getElementById('render-photo');

  //Clear and get user input  
  empty.innerHTML = ''

  const keyword = document.querySelector('#search-term').value;
  const consumerKey = 'SIwRLq0AwiEydJeCT8NLk3chVNyEMgweH52bQVx5';
  const baseURL = 'https://api.500px.com/v1/'
  const photoURL = 'photos/search'

  fetch(`${baseURL}${photoURL}?consumer_key=${consumerKey}&term=${keyword}`)
    .then(response => response.json())
    .then(data => {

      //Get photos
      const photo = data.photos
      photo.map(photoObj => {
        const renderPhoto = (photoArray, elementId) => {

          const id = photoArray.id;

          //Create image elements
          const image_url = photoArray.image_url;
          const imgElement = document.createElement('img');
          imgElement.setAttribute('src', image_url);

          const name = photoArray.name;
          const artist = photoArray.user.fullname;
          const titleElement = document.createElement('h2');
          const titleText = document.createTextNode(`${name} by ${artist}`);
          titleElement.appendChild(titleText);

          const description = photoArray.description;
          const descriptionElement = document.createElement('p');
          const descriptionText = document.createTextNode(description);
          descriptionElement.appendChild(descriptionText);

          const country = photoArray.user.country;
          const countryElement = document.createElement('h3');
          const countryText = document.createTextNode(country);
          countryElement.appendChild(countryText);

          //Create container for desc info
          const infoContainerElement = document.createElement('div');
          infoContainerElement.append(titleElement, descriptionElement, countryElement);
          infoContainerElement.setAttribute('style', 'display:none');
          infoContainerElement.setAttribute('id', `info-${id}`)

          //create images and desc container
          const mainContainerElement = document.createElement('div');
          mainContainerElement.setAttribute('id', id);
          mainContainerElement.append(imgElement, infoContainerElement);
          document.getElementById(elementId).appendChild(mainContainerElement);

          //Event listener to display img desc on click
          document.getElementById(id).addEventListener('click', () => {
            const displayInfo = document.querySelector("div[style='display:none']");
            displayInfo.style.display = 'block';
          });
        }
        renderPhoto(photoObj, 'render-photo')
      });
    });
});

function changeGridAutoFlow() {
  var grid = document.getElementById("grid");
  var direction = document.getElementById("direction");
  var dense = document.getElementById("dense");
  var gridAutoFlow = direction.value === "column" ? "row" : "column";

  if (dense.checked) {
    gridAutoFlow += " dense";
  }

  grid.style.gridAutoFlow = gridAutoFlow;
}
