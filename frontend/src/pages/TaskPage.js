import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import withRouter from "../components/withRouter";


class TaskPage extends React.Component {
    constructor() {
        super();
        this.state = {
            text: null,
            task: null,
            time: ''
        }
        this.textareaRef = React.createRef()
    }

    componentDidMount() {
        let taskId = this.props.params.id
        if (taskId === 'create') {
            this.textareaRef.current.placeholder = 'Please Enter your thoughts here'
            this.textareaRef.current.focus()
            return
        }
        axios.get(`/api/tasks/${taskId}`)
            .then(response => {
                this.setState({
                    task: response.data,
                    text: response.data.text,
                    time: response.data.reminder_time,
                })
            })
    }

    changeHandler = event => {
        this.setState({
            text: event.target.value
        })
    }

    arrowHandler = () => {
        let {text, task, time} = this.state
        console.log(time)
        if (!task) return
        if (!text) return this.deleteTask()
        task.text = text
        task.reminder_time = time
        axios.put(`/api/tasks/update/${task.id}/`, task)
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }

    deleteTask = () => {
        axios.delete(`/api/tasks/delete/${this.state.task.id}/`)
    }

    createHandler = () => {
        let text = this.state.text
        if (!text) return
        axios.post('/api/tasks/create/', {text: text})
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }

    render() {
        const {text, task, time} = this.state
        return (
            <div className="d-flex flex-column p-1">
                <div className="m-2 d-flex flex-row justify-content-between text-warning position-relative">
                    <Link to="/">
                        <ArrowLeft className="arrow-button " onClick={this.arrowHandler}/>
                    </Link>
                    <Link to="/" className="text-decoration-none text-warning">
                        {task ?
                            <h3 onClick={this.deleteTask}>Delete</h3> :
                            <h3 onClick={this.createHandler}>Done</h3>
                        }
                    </Link>
                </div>
                <textarea defaultValue={text} onInput={this.changeHandler} className='textarea bg-secondary border-0'
                          ref={this.textareaRef}></textarea>
                <input type="datetime-local" className="time-input form-control" value={time.replace('T', ' ').replace('Z', '')}
                       onChange={(e) => this.setState({time: e.target.value})}/>
            </div>
        )
    }
}


export default withRouter(TaskPage)