import React from "react";
import ListItem from "../components/ListItem";
import axios from "axios";
import AddButton from '../components/AddButton'
import ReminderModal from "../components/ReminderModal";
import withRouter from "../components/withRouter";
import Tabs from '../components/Tabs'


class NotesPage extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            notes: [],
            tasks: [],
        }
    }

    componentDidMount() {
        this.getData('/api/notes/', 'notes')
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

    tasksChanged = () => {
        this.getData('/api/tasks/', 'tasks')
    }

    render() {
        const {notes, tasks} = this.state
        this.props.setListType("Notes")
        return (
            <>
                <Tabs showIndex={0}/>
                <div>
                    {
                        notes.map(note => <ListItem key={note.id} note={note}/>)
                    }
                    <AddButton url="/api/notes/create/"/>
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
