let apiKey = 'AIzaSyD3_QDaBntX4kwX5mgxTVvTihjg-zZSeOQ';




$('.form').on('submit', function(e) {
  e.preventDefault();
 let address = $('.address').val();
 callApi(address);
});

 function callApi(address) {

  $('.officials').empty();

   fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${address}`).then(function(response) {
     return response.json();
    })
    .then(function(results) {
      //console.log(results)
      let offices = results.offices;
      let officials = results.officials;



      officials.forEach(e => {
        let officialChannels = e.channels;
        let channels = '';
        let photoRow = '';
        let party = "N/A";
        let website = '';

        if(officialChannels != null){
            officialChannels.forEach(e => {
            channels += `<li><a href="http://www.${e.type}.com/${e.id}">${e.type}</a></li>`
          });
        }

        if(e.photoUrl != null) {
          photoRow = `<li><img src="${e.photoUrl}"/></li>`
        }

        if (e.party != null) {
          party = e.party;
        }

        if (e.urls != null) {
          website = `<a href="${e.urls}">Website</a>`;
        }


        $('.officials').append(
          `<li>
            <div class="container">
              <h2>${e.name}</h2>
              <ul class="official-details">
                ${photoRow}
                <li>Party: ${party}</li>
                <li>Phone: ${e.phones}</li>
                <li>${website}</li>
                ${channels}
              </ul>
            </div>
          </li>`
        )
      });
    });
  }
