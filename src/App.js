// import logo from './logo.svg';
// import { Router, Route, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
// import YamlConverter from './YamlConverter';
// import { Switch } from 'react-router-dom';

import Header from './Header';
import SideBar from './SideNav';
import Footer from './Footer';
// import Home from './components/Home';
import TechnicalSpecifications from './components/TechnicalSpecifications';

// import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <SideBar />

      <Router>
            <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                <Route path="/technical-specifications" component={TechnicalSpecifications} />
            </Switch>
        </Router>

        <Footer />
    </div>
  );
}

export default App;
