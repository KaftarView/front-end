import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Mypage from './component/myPage';


function App() {
  return (
    <Router>
      <div className="App">   
      <div className="content">
      <Switch>
          <Route exact path="/">
    <div className="App_test">
      <header className="App-header">
      <h1 className="text-3xl font-bold underline" >boilerplate</h1>
      </header>
    </div>
          </Route>
          <Route path="/myPage">
            <Mypage/>
          </Route>
        </Switch>


      </div>


    </div>
    </Router>

  );
}

export default App;
