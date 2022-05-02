import React from "react";
import {Link} from 'react-router-dom'


class ListItem extends React.Component {
    constructor() {
        super();
        this.itemRef = React.createRef()
        this.state = {
            openModal: false
        }
    }

    render() {
        const {note} = this.props
        return (
            <div>
                <Link to={note.get_absolute_url} ref={this.itemRef}
                      className="d-block text-decoration-none text-light border-bottom border-dark border-1 fs-6 p-3 list-item">
                    <h4>{note.__str__}</h4>
                    <small>{note.formated_updated}</small>
                </Link>
            </div>
        )
    }
}

export default ListItem