import React from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import moment from "moment";


class ListItem extends React.Component {
    constructor() {
        super();
        this.itemRef = React.createRef()
    }

    componentDidMount() {
        let {note} = this.props
        if (note.reminder_time) {
            let currentTimeInMilliseconds = Date.now()
            let time = moment(note.reminder_time)
            let diff = time.unix() * 1000 - currentTimeInMilliseconds
            setTimeout(() => {
                alert('hello world')
            }, diff)
        }
    }

    render() {
        const {note} = this.props
        return (
            <Link to={note.get_absolute_url} ref={this.itemRef}
                  className="d-block text-decoration-none text-light border-bottom border-dark border-1 fs-6 p-3 list-item">
                <h4>{note.__str__}</h4>
                <small>{note.formated_updated}</small>
            </Link>
        )
    }
}

export default ListItem