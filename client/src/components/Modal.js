import { useState } from "react"

const Modal = () => {

    const mode = 'create'
    const editMode = mode === 'edit' ? true : false
    const [data, setData] = useState({
        userEmail: "",
        title:"",
        progress: "",
        date: editMode ? "" : new Date()
    })

    
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
                <button>X</button>
            </div>
            <form >
                <input
                    required
                    maxLength={30}
                    placeholder=" Your task goes here"
                    name="title"
                    value={""}
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
                    value={""}
                    onChange={handleChange}
                />
                <input className={mode} type="submit"/>
            </form>
            </div>
      </div>
    );
  }
  
  export default Modal;