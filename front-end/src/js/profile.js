/*global React*/
/*global ReactDOM*/
class Profile extends React.Component {
  constructor(props) {
    super(props);
        
    }
    
  render() {
    return (
      <div class = "profile-box">
        <a href="#"><img src="profile-images/menu.png" class = "menu-icon"></img></a>
        <a href="#"><img src="profile-images/setting.png" class = "setting-icon"></img></a>
        <img src="profile-images/sneakProfile.png" class = "profile-pic"></img>
        <h3>Zane Taylor</h3>
        <p>Sneaker enthusiast in SLC Metroplex</p>
        <div class = "social-media">
          <a href="#"><img src="profile-images/instagram.png"></img></a>
          <a href="#"><img src="profile-images/telegram.png"></img></a>
          <a href="#"><img src="profile-images/dribble.png"></img></a>
        </div>
        <button id="" type="button">About Me</button>
        <div class = "profile-bottom">
          <p>Member Since: 2017</p>
          <p>First Pair of Sneakers: Air Jordans</p>
          <p>Likes hikes in the woods</p>  
        </div>
      </div>
            
            )
    }
}
const profRoot = ReactDOM.createRoot(document.getElementById("profile"));
    profRoot.render(<Profile />);