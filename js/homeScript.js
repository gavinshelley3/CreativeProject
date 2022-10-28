/*global React*/
/*global ReactDOM*/
class Home extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
<div class="home">
    <div>
                  <div id="home-content">
        <div>
          <h1>Get the Sneakiest Deals</h1>
        </div>

        <p>
          Subscribe to be the first to know about the biggest, sneakiest deals
        </p>

        <div id = "subscribe"><button class="button" >Subscribe</button></div>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <div id="deals"><button><img src="images/money.jpeg"></img></button></div>
        <div>Latest Deals</div>
      </div>
      <div class="column">
        <div><img src="images/home1.jpeg"></img></div>
        <div>New Arrivals</div>
      </div>
      <div class="column">
        <div><img src="images/homeBot.webp"></img></div>
        <div>Sneaker Bot</div>
      </div>

    </div>
    
  </div>
            
            )
    }
}
const root = ReactDOM.createRoot(document.getElementById("home-inside"));
    root.render(<Home />);
    
