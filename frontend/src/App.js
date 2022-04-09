/* eslint-disable react/react-in-jsx-scope */
import Title from './components/Title';
//import Form from './components/Form';
import './App.css';
import Button from './components/Button';
import Currentlocate from './components/Currentlocate';
//import Buttonfish from './components/Buttonfish'
//import Inputfish from './components/Inputfish';



function App() { 

  return(
    <div className="App">
      <Title />
      <Button/>
      <Currentlocate />
      {/*  <Buttonfish/> */}
      {/*  <Form /> */}
    </div>
  );
};

export default App;