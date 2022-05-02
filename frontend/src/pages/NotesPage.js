import React from "react";
import ListItem from "../components/ListItem";
import axios from "axios";
import AddButton from '../components/AddButton'
import {ReactComponent as NoteSVG} from "../assets/note.svg";
import {ReactComponent as TaskSVG} from "../assets/task.svg"
import ReminderModal from "../components/ReminderModal";

export default class NotesPage extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            notes: [],
            tasks: [],
            showIndex: 0,
        }
    }

    componentDidMount() {
        this.getData('/api/notes/', 'notes')
        this.getData('/api/tasks/', 'tasks')
    }

    tasksChanged = ()=> {
        this.getData('/api/tasks/', 'tasks')
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('updating')
    //     if (prevState.showIndex !== this.state.showIndex) {
    //         this.getData()
    //         console.log('updated')
    //     }
    // }

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

    toggleTab = (index) => {
        this.setState({showIndex: index})
    }

    render() {
        const {notes, tasks, showIndex} = this.state
        return (
            <>
                <div className="block-tabs">
                    <div className={showIndex === 0 ? "tab active-tab" : "tab"} onClick={() => this.toggleTab(0)}>
                        <NoteSVG/>
                    </div>
                    <div className={showIndex === 1 ? "tab active-tab" : "tab"} onClick={() => this.toggleTab(1)}>
                        <TaskSVG/>
                    </div>
                </div>
                <div className={showIndex === 0 ? "" : "d-none"}>
                    {
                        notes.map(note => <ListItem key={note.id} note={note}/>)
                    }
                    <AddButton url="/api/notes/create/"/>
                </div>
                <div className={showIndex === 1 ? "" : "d-none"}>
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
