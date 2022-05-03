import React from "react";
import {Link} from 'react-router-dom'
import moment from "moment";


class ListItem extends React.Component {
    constructor() {
        super();
        this.itemRef = React.createRef()
        this.state = {
            time: null
        }
    }

    componentDidMount() {
        let {note} = this.props
        this.setState({
            time: moment(note.reminder_time).format('MM/DD/YYYY HH:mm:SS')
        })
    }

    render() {
        const {note} = this.props
        const {time} = this.state
        return (
            <div>
                <Link to={note.get_absolute_url} ref={this.itemRef}
                      className="d-block text-decoration-none text-light border-bottom border-dark border-1 fs-6 p-3 list-item">
                    <h4>{note.__str__}</h4>
                    <small>{time}</small>
                </Link>
            </div>
        )
    }
}

export default ListItem