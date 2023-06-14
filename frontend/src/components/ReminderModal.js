import React from "react";
import axios from "axios";
import moment from "moment";


class ReminderModal extends React.Component {
    constructor() {
        super();
        this.state = {
            openModal: false
        }
    }

    closeHandler = () => {
        this.setState({
            openModal: false
        })
    }

    deleteTask = () => {
        const {task, taskChanged} = this.props
        axios.delete(`/api/tasks/${task.id}/`)
            .then(response => {
                console.log('success')
                this.setState({
                    openModal: false
                })
                taskChanged()
            })
            .catch(error => {
                console.log('error')
                console.log(error)
                alert('Something went wrong we couldn\'t do your request')
            })
    }

    componentDidMount() {
        let {task} = this.props
        let currentTimeInMilliseconds = Date.now()
        let time = moment(task.reminder_time)
        let diff = time.unix() * 1000 - currentTimeInMilliseconds
        setTimeout(() => {
            this.setState({
                openModal: true
            })
        }, diff)
    }

    render() {
        const {openModal} = this.state
        if (!openModal) return

        const {task} = this.props
        return (
            <div className="overlay" onClick={this.closeHandler}>
                <div className="reminder-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="close-modal" onClick={this.closeHandler}>X</div>
                    <div className="modal-inner">
                        <h3>You sat following reminder for this time: {task.formatted_updated}</h3>
                        <h2 className="my-5">{task.text}</h2>
                        <button className="btn btn-warning" onClick={this.deleteTask}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ReminderModal
