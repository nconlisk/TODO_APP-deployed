import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";

const ListItem = ({task}) => {
    return (
      <div className="list-item">
        <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar/>
        </div>

        <div className="button-container">
            <button>Edit</button>
            <button>Delete</button>
        </div>
        
      </div>
    );
  }
  
  export default ListItem;