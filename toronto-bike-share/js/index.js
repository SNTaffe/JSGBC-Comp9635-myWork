    function initGeocode() {
      const geocoder = new google.maps.Geocoder();

      document.querySelector("#myButton").addEventListener('click', () => {
        const address = document.querySelector("#userAddress").value;
        geocoder.geocode({
          address
        }, (result, status) => {
          if (status === "OK") {
            console.log(result);
            const location = result[0].geometry.location;

            const lat = location.lat();
            const lng = location.lng();
            const latitude = location.lat();
            const longitude = location.lng();
            document.querySelector('#lat').innerHTML = lat;
            document.querySelector('#lng').innerHTML = lng;
            document.querySelector('#lat').innerHTML = latitude;
            document.querySelector('#lng').innerHTML = longitude;

            const latlng = {
              lat,
              lng,
              latitude,
              longitude,
              address
            };

            const map = new google.maps.Map(document.getElementById('map'), {
              zoom: 12,
              center: latlng,
            });

            const marker = new google.maps.Marker({
              position: latlng,
              map: map
            });

            const infoWindow = new google.maps.InfoWindow({
              content: "Current location: " + latlng.address,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          }
        })
      });
    }

    //Bike share data
    const bikeShareURL = 'http://138.197.139.54:8081/data/simple';

    //Printing function
    const addListToDOM = books => {
      //Create list
      const list = document.createElement("ul");

      //Create list items
      const listItems = books.map(item => {
        const listElement = document.createElement("li");
        const text = document.createTextNode(item.stAddress1 + '\n' + item.latitude + '\n' + item.longitude + '\n' + item.status + '\n' + item.availableBikes + '\n' + item.availableDocks + '\n' + item.testStation + '\n' + item.is_renting);
        listElement.appendChild(text);
        return listElement;
      });

      //Append list items to list.
      listItems.forEach(listItem => list.appendChild(listItem));

      //Add list to body
      document.querySelector("#addListHere").appendChild(list);
    };

    //Use fetch

    const books = fetch(bikeShareURL)
      .then(response => response.json()) //Convert response to JSON
      .then(jsonData => {
        console.log(jsonData)
        const justImportantProps = jsonData.map(book => {

          const {
            stAddress1,
            latitude,
            longitude,
            status,
            availableBikes,
            availableDocks,
            testStation,
            is_renting
          } = book;

          return {
            stAddress1,
            latitude,
            longitude,
            status,
            availableBikes,
            availableDocks,
            testStation,
            is_renting,
          };
        });

        addListToDOM(justImportantProps);
      });
