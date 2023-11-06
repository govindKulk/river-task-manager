import TaskPageContent from '../component/TaskPageContent';
import getCurrentUser from '../libs/getCurrentUser';


const TasksPage = async () => {


    const currentUser = await getCurrentUser();
    return (

        <TaskPageContent currentUser={currentUser}/>
    )
    
}

export default TasksPage
