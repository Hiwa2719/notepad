import React from "react";
import ListItem from "../components/ListItem";
import axios from "axios";
import AddButton from '../components/AddButton'
import ReminderModal from "../components/ReminderModal";
import withRouter from "../components/withRouter";
import Tabs from "../components/Tabs";


class NotesPage extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            tasks: [],
        }
    }

    componentDidMount() {
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
        this.props.setListType("Tasks")
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


export default withRouter(NotesPage)
