/*global React*/
/*global ReactDOM*/
class Bot extends React.Component {
    constructor(props) {
      super(props);
          
      }
      
    render() {
      return (
        <div class="task-container">
        <div class="tasks">
          <div class="header">
            <h2>Tasks</h2>
          </div>
          <div class="task">
            <h3>Jordan 1</h3>
            <p>Demin; Size 10.5</p>
            <div class="stretchy-boi"></div>
            <div class="task-buttons">
              <button class="btn-start">Start</button>
              <button class="btn-stop">Stop</button>
            </div>
          </div>
          <div class="task">
            <h3>Nike Dunk</h3>
            <p>Panda; Size 9</p>
            <div class="stretchy-boi"></div>
            <div class="task-buttons">
              <button class="btn-start">Start</button>
              <button class="btn-stop">Stop</button>
            </div>
          </div>
          <div class="task">
            <h3>Jordan 1</h3>
            <p>Bordeaux; Size 9</p>
            <div class="stretchy-boi"></div>
            <div class="task-buttons">
              <button class="btn-start">Start</button>
              <button class="btn-stop">Stop</button>
            </div>
          </div>
          <div class="task">
            <h3>Jordan 3</h3>
            <p>Cool Grey; Size 9</p>
            <div class="stretchy-boi"></div>
            <div class="task-buttons">
              <button class="btn-start">Start</button>
              <button class="btn-stop">Stop</button>
            </div>
          </div>
          <div class="task">
            <h3>Jordan 11</h3>
            <p>Concord; Size 9</p>
            <div class="stretchy-boi"></div>
            <div class="task-buttons">
              <button class="btn-start">Start</button>
              <button class="btn-stop">Stop</button>
            </div>
          </div>
          <div class="task">
            <h3>Jordan 4</h3>
            <p>White Cement; Size 9</p>
            <div class="stretchy-boi"></div>
            <div class="task-buttons">
              <button class="btn-start">Start</button>
              <button class="btn-stop">Stop</button>
            </div>
          </div>
        </div>
        <div class="releases">
          <div class="header">
            <h2>Releases</h2>
          </div>
          <div class="release">
            <a
              class="release"
              href="https://sneakernews.com/2022/09/19/air-jordan-1-retro-high-og-denim-dm9036-104-store-list/"
              ><img
                class="release"
                src="https://images.unsplash.com/photo-1623684225794-a8f1f5037f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="SHEW BOT LOGO"
            /></a>
          </div>
          <div class="release">
            <a
              class="release"
              href="https://sneakernews.com/2022/09/19/air-jordan-1-retro-high-og-denim-dm9036-104-store-list/"
              ><img
                class="release"
                src="https://images.unsplash.com/photo-1506544777-64cfbe1142df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="SHEW BOT LOGO"
            /></a>
          </div>
          <div class="release">
            <a
              class="release"
              href="https://sneakernews.com/2022/09/19/air-jordan-1-retro-high-og-denim-dm9036-104-store-list/"
              ><img
                class="release"
                src="https://images.unsplash.com/photo-1577655199646-736691c95b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="SHEW BOT LOGO"
            /></a>
          </div>
        </div>
      </div>
              
              )
      }
  }
  const profRoot = ReactDOM.createRoot(document.getElementById("task"));
      profRoot.render(<Bot />);