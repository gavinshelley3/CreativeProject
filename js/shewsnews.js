/*global React*/
/*global ReactDOM*/
class ShewsNews extends React.Component {
    constructor(props) {
      super(props);
          
      }
      
    render() {
      return (
        <div class="photo-container">
        <div class="blog-main">
          <a
            class="blog-main"
            href="https://www.nike.com/w/dunk-shoes-90aohzy7ok"
            ><img
              class="blog-main"
              src="https://images.unsplash.com/photo-1633464130613-0a9154299ac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
              alt="SHEW BOT LOGO"
          /></a>
        </div>

        <div class="blog-small-container">
          <div class="blog-small-photos">
            <a
              class="blog-small-photos"
              href="https://sneakernews.com/2022/09/19/air-jordan-1-retro-high-og-denim-dm9036-104-store-list/"
              ><img
                class="blog-small-photos"
                src="https://images.unsplash.com/photo-1552346210-57dc21545e80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="SHEW BOT LOGO"
            /></a>
          </div>
          <div class="blog-small-photos">
            <a
              class="blog-small-photos"
              href="https://www.flightclub.com/air-jordans/air-jordan-11"
              ><img
                class="blog-small-photos"
                src="https://images.unsplash.com/photo-1581068506097-9eb0677b95af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="SHEW BOT LOGO"
            /></a>
          </div>
        </div>
      </div>
              
              )
      }
  }
  const profRoot = ReactDOM.createRoot(document.getElementById("photo-container"));
      profRoot.render(<ShewsNews />);