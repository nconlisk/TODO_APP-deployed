import { useState } from "react"

const Modal = ({mode, setShowModal, getData, task}) => {

    //const mode = 'create'   //dont need this anymore as create mode is passed in from ListHeader.js.
    const editMode = mode === 'edit' ? true : false
    const [data, setData] = useState({
        user_email: editMode ? task.user_email : "Ann@test.com", //null, //hard coded user for testing
        title:editMode ? task.title : null,
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date()
    })

    
    const postData = async (e) => {
        e.preventDefault()  //to prevent modal from closing on clicking submit, so we can see response.
        try {
            const response = await fetch('http://localhost:8000/todos/', {
                method:"POST",
                headers: {'Content-Type':'applaction/json'},
                body: JSON.stringify(data)
            })
            if (response.status === 200){
                console.log("WORKED")
                setShowModal(false)
                getData()
            }
        }catch (err) {
            console.log(err)
            
        }
    }


    const editData = async (e) => {
        e.preventDefault()  //to prevent modal from closing on clicking submit, so we can see response.
        try {
            const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
                method:"PUT",
                headers: {'Content-Type':'applaction/json'},
                body: JSON.stringify(data)
            })
            if (response.status === 200){
                setShowModal(false)
                getData()
            }
        }catch (err) {
            console.log(err)            
        }
    }







    const handleChange = (e) => {
        //console.log('changing', e)
        const {name, value } = e.target
        
        setData(data => ({
            ...data,
            [name] : value
        }))

        console.log(data)   //to see the changes in data using developer tools.

    }

    return (
      <div className="overlay">
        <div className="modal">
            <div className="form-title-container">
                <h3>Let's {mode} your task</h3>
                <button onClick={()=> setShowModal(false)}>X</button>
            </div>
            <form >
                <input
                    required
                    maxLength={30}
                    placeholder=" Your task goes here"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                />
                <br/>
                <label for='range'>Drag slider to select task progress</label>
                <input 
                    required
                    type="range"
                    id="range"
                    min="0"
                    max="100"
                    name="progress"
                    value={data.progress}
                    onChange={handleChange}
                />
                <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
            </form>
            </div>
      </div>
    );
  }
  
  export default Modal;