import './App.css';
import { useEffect } from 'react';
import db from './firebase'
import Button from '@material-ui/core/Button';

function App() {

  useEffect(() => {
    console.log("HERE")
    // db.collection("testCollection").onSnapshot((snapshot) => {
    //   snapshot.docs.map(doc => {
    //     console.log(doc.data());
    //   })
    // })
  }, [])

  return (
    <div className="App">
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
</Button>
      <Button variant="contained" color="secondary">
        Secondary
</Button>
      <Button variant="contained" disabled>
        Disabled
</Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
</Button>
    </div>
  );
}

export default App;
