import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
