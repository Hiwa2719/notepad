import React from "react";
import ListItem from "../components/ListItem";
import axios from "axios";
import AddButton from '../components/AddButton'
import ReminderModal from "../components/ReminderModal";
import withRouter from "../components/withRouter";
import Tabs from "../components/Tabs";


class TasksPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        }
    }

    componentDidMount() {
        this.props.setListType("Tasks")
        this.getData('/api/tasks/', 'tasks')
    }

    tasksChanged = () => {
        this.getData('/api/tasks/', 'tasks')
    }

    getData(url, container) {
        axios.get(url)
            .then(response => {
                this.setState({[container]: response.data})
            })
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }

    render() {
        const {tasks} = this.state
        return (
            <>
                <Tabs showIndex={1}/>
                <div>
                    {
                        tasks.map(task => <ListItem key={task.id} note={task}/>)
                    }
                    <AddButton url="/api/tasks/create/"/>
                </div>
                <div>
                    {
                        tasks.map(task =>
                            <ReminderModal key={task.id} task={task} taskChanged={this.tasksChanged}/>
                        )
                    }
                </div>
            </>
        )
    }
}


export default withRouter(TasksPage)
