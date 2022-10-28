/*global React*/
/*global ReactDOM*/
class Home extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div id="home-content">
        <div>
          <h1>Get the Sneakiest Deals</h1>
        </div>

        <p>
          Subscribe to be the first to know about the biggest, sneakiest deals
        </p>

        <div id = "subscribe"><button class="button" >Subscribe</button></div>
      </div>
            
            )
    }
}
const root = ReactDOM.createRoot(document.getElementById("home-inside"));
    root.render(<Home />);