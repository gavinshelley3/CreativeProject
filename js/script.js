document
  //   .getElementById("subscribe")
  .getElementById("deals")
  .addEventListener("click", function (event) {
    console.log("click!");
    event.preventDefault();
    let url =
      "https://api.unsplash.com/search/photos?query=sneakers&client_id=0Chp-nN0gH-5Sd4DybMhbXde-X6oOVvHRjDO0iCzvW0";
    fetch(url)
      .then(function (response) {
        if (response.status != 200) {
          return {
            text: "Error calling the unsplash service: " + response.statusText,
          };
        }
        return response.json();
      })
      .then(function (json) {
        var wrapperDiv = document.createElement("div");
        for (let i = 0; i < json.results.length; i++) {
          let img = document.createElement("img");
          let shoeTitle = document.createElement("h3");
          img.src = json.results[i].urls.small;
          shoeTitle.innerHTML = json.results[i].alt_description;
          if (json.results[i].alt_description == null || json.results[i].alt_description == "") {
            shoeTitle.innerHTML = "No description available";
          }
          img.classList.add("shoeIMG");
          shoeTitle.classList.add("header");
          var shoeContainer = document.createElement("div");
          shoeContainer.appendChild(shoeTitle);
          shoeContainer.appendChild(img);
          wrapperDiv.appendChild(shoeContainer);
        }
        document.getElementById("apiInsert").appendChild(wrapperDiv);
        console.log(json);
      });
  });
