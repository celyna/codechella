import logo from './logo.svg';
import './App.css';

import './pages/index.js';
import './pages/eventdetails.js';

function App() {
  return (
    <div>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/eventdetails" render={() => <EventDetails />} />
    </div>
  );
}

export default App;
