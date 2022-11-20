/*global React*/
/*global ReactDOM*/
class Bot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="bot">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link" href="home.html">
                Home
              </a>
              <a class="nav-item nav-link" href="shewsnews.html">
                Shews News
              </a>
              <a class="nav-item nav-link active" href="bot.html">
                SNKR Bot<span class="sr-only">(current)</span>
              </a>
              <a class="nav-item nav-link" href="profile.html">
                Profile
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const profRoot = ReactDOM.createRoot(document.getElementById("apiInsert"));
profRoot.render(<Bot />);
