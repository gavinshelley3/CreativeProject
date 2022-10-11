document.getElementById("subscribe").addEventListener("click",
        function(event) {
        console.log("click!");
        event.preventDefault();
        let url = "https://api.unsplash.com/search/photos?query=sneakers&client_id=0Chp-nN0gH-5Sd4DybMhbXde-X6oOVvHRjDO0iCzvW0";
        fetch(url)
            .then(function(response) {
                if(response.status != 200) {
                    return {
                        text: "Error calling the unsplash service: " + response.statusText
                    }
                }
                return response.json();
        })
            .then(function(json){
                console.log(json);
            })
    });
