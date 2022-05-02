import React from "react";
import {Link} from 'react-router-dom'
import moment from "moment";
import ReminderModal from "./ReminderModal";


class ListItem extends React.Component {
    constructor() {
        super();
        this.itemRef = React.createRef()
        this.state = {
            openModal: false
        }
    }

    componentDidMount() {
        let {note} = this.props
        if (note.reminder_time) {
            let currentTimeInMilliseconds = Date.now()
            let time = moment(note.reminder_time)
            let diff = time.unix() * 1000 - currentTimeInMilliseconds
            setTimeout(() => {
                this.setState({
                    openModal: true
                })
            }, diff)
        }
    }

    toggleOpenModal = (obj) => {
        this.setState({
            openModal: obj
        })
    }

    render() {
        const {note} = this.props
        const {openModal} = this.state
        return (
            <div>
                <Link to={note.get_absolute_url} ref={this.itemRef}
                      className="d-block text-decoration-none text-light border-bottom border-dark border-1 fs-6 p-3 list-item">
                    <h4>{note.__str__}</h4>
                    <small>{note.formated_updated}</small>
                </Link>
                {note.reminder_time &&
                    <ReminderModal openModal={openModal} setOpenModal={this.toggleOpenModal} note={note}/>
                }
            </div>
        )
    }
}

export default ListItem