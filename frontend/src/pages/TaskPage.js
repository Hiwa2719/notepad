import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import withRouter from "../components/withRouter";
import moment from "moment";


class TaskPage extends React.Component {
    constructor() {
        super();
        this.state = {
            text: null,
            task: null,
            time: moment().format("YYYY-MM-DD HH:mm:ss")
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
                let date = moment(response.data.reminder_time);
                let local = moment.utc(date).local().format("YYYY-MM-DD HH:mm:ss");

                this.setState({
                    task: response.data,
                    text: response.data.text,
                    time: local,
                })
            })
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    arrowHandler = () => {
        let {text, task, time} = this.state
        if (!task) return
        if (!text) return this.deleteTask()
        task.text = text
        let date = new Date(time)
        task.reminder_time = moment.utc(date)
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
        let {text, time} = this.state
        if (!text) return
        let date = new Date(time)
        let reminder_time = moment.utc(date)
        axios.post('/api/tasks/create/', {text: text, reminder_time: reminder_time})
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
                    <Link to="/api/tasks/">
                        <ArrowLeft className="arrow-button " onClick={this.arrowHandler}/>
                    </Link>
                    <Link to="/api/tasks/" className="text-decoration-none text-warning">
                        {task ?
                            <h3 onClick={this.deleteTask}>Delete</h3> :
                            <h3 onClick={this.createHandler}>Done</h3>
                        }
                    </Link>
                </div>
                <textarea defaultValue={text} onInput={this.changeHandler} className='textarea bg-secondary border-0'
                          ref={this.textareaRef} name="text"></textarea>
                <input type="datetime-local" className="time-input form-control" name="time"
                       value={time.replace('T', ' ').replace('Z', '')}
                       onChange={this.changeHandler}/>
            </div>
        )
    }
}


export default withRouter(TaskPage)
