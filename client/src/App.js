import "./App.css";
import { tokens } from "./api/index";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <div className="Spotify-App">
      {tokens["access_token"] !== null ? <Profile /> : <Login />}
    </div>
  );
}

export default App;
