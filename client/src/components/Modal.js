const Modal = () => {

    const mode = 'create'
    const handleChange = () => {
        console.log('changing')
    }

    return (
      <div className="overlay">
        <div className="modal">
            <h3>Let's {mode} your task</h3>
            <button>X</button>
        </div>
        <form className="form-title-container">
            <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={""}
            onChange={handleChange}
            />
            <br/>
            <input 
            required
            type="range"
            min="0"
            max="100"
            name="progress"
            value={""}
            onChange={handleChange}
            />
            <input className={mode} type="submit"/>

        </form>
      </div>
    );
  }
  
  export default Modal;