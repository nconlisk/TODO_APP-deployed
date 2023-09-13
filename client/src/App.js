import { useEffect, useState } from 'react';
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";


const App = () => {

  const userEmail = "Ann@test.com" //hard coded until user signup added
  const [ tasks, setTasks] = useState(null)

  const authToken = false

  const getData = async () => {
    try {
      //const response = await fetch(`http://localhost:8000/todos/${userEmail}`) 
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)  //url with backticks as will be passing email param.
      const json = await response.json()
      console.log(json)
      setTasks(json)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()}}, 
      [])  // empty [] dependency placed here as we only need to call once.

  console.log(tasks)

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">

      {!authToken && <Auth/>}  
      {authToken &&
      <>
      <ListHeader listName={"Holiday tick list"} getData={getData}></ListHeader>
      { sortedTasks?.map((task) => <ListItem key={task.id} getData={getData} task={task}/>)}
      </>}
    </div>
  );
}

export default App;