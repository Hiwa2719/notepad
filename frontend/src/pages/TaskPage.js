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
        }
        this.textareaRef = React.createRef()
    }

    componentDidMount() {
        let taskId = this.props.params.id
        this.setState({
            taskId: taskId
        })
        if (taskId === 'create') {
            this.textareaRef.current.placeholder = 'Please Enter your thoughts here'
            this.textareaRef.current.focus()
            return
        }
        axios.get(`/api/tasks/${taskId}`)
            .then(response => {
                this.setState({
                    task: response.data,
                    text: response.data.text
                })
            })
    }

    changeHandler = event => {
        this.setState({
            text: event.target.value
        })
    }

    arrowHandler = () => {
        console.log(this.state.text)
        let {text, task} = this.state
        if (!task) return
        if (!text) return this.deleteTask()
        task.text = this.state.text
        axios.put(`/api/tasks/update/${task.id}/`, task)
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }

    deleteTask= () => {
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
        const {text, task} = this.state
        return (
            <div className="d-flex flex-column p-1">
                <div className="m-2 d-flex flex-row justify-content-between text-warning">
                    <Link to="/">
                        <ArrowLeft className="arrow-button " onClick={this.arrowHandler}/>
                    </Link>
                    <Link to="/" className="text-decoration-none text-warning">
                        {task ?
                            <h3 onClick={this.deleteTask}>Delete</h3>:
                            <h3 onClick={this.createHandler}>Done</h3>
                        }
                    </Link>

                </div>
                <textarea defaultValue={text} onInput={this.changeHandler} className='textarea bg-secondary border-0'
                          ref={this.textareaRef}></textarea>
            </div>
        )
    }
}


export default withRouter(TaskPage)