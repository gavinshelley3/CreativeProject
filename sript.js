const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
document.getElementById("subscribe").addEventListener("click",
    async function(event) {
        event.preventDefault();
        sneaks.getMostPopular(10, function(err, products){
            console.log(products);
        })
    });