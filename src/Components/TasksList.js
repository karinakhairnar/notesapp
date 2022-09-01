import { getTasks, useGlobalState, getStorageToken, removeTask } from '../App';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

import toast from 'react-hot-toast';

const TasksList = ({ data }) => {
  const [jsonData, setData] = useGlobalState('data');

  

  return (
    <div className='tasks-list'>
      <h1>
        <BsFillCalendarWeekFill></BsFillCalendarWeekFill> Notes:
      </h1>
      <div className='task-container'>
        {data &&
          data.map((task) => {
            if (task.token === getStorageToken())
              return (
                <div className='task' key={task.id}>
                  <p className='small-text'>Notes:</p>
                  {<h2 id={task.id}>{task.name}</h2>}
                  <p className='small-text'>Description:</p>
                  {
                    <h3 className='task-content' id={task.id}>
                      {task.body}
                    </h3>
                  }
                  {
                    <h3 className='task-content' id={task.id}>
                      {task.date}
                    </h3>
                  }

                  <button
                    className='delete-btn'
                    onClick={() => {
                      removeTask(task.id);
                      setData(getTasks());
                      toast.success('Successfully deleted');
                    }}>
                    {' '}
                    <AiFillDelete></AiFillDelete> Delete Notes
                  </button>
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default TasksList;
