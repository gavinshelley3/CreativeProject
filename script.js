const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
document.getElementById("subscribe").addEventListener("click",
        function(event) {
        console.log("click!");
        event.preventDefault();
        sneaks.getMostPopular(10, function(err, products){
            if(err != null){
                console.log(err);
            } else {
                console.log(products);
            }
        })
    });