import ListHeader from "./components/ListHeader";
import { useEffect } from 'react';


const App = () => {

  const getData = async () => {

    const userEmail = "\ntest@test.com" //hard coded until user signup added
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)  //url with backticks as will be passing email param.
      const json = await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getData, [])  // empty [] dependency placed here as we only need to call once.

  return (
    <div className="app">
      <ListHeader listName={"Holiday tick list"}></ListHeader>
    </div>
  );
}

export default App;
