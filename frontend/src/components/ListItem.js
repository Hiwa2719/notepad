import React from "react";
import {Link} from 'react-router-dom'


const ListItem = ({note}) => {
    return (
        <Link to={note.get_absolute_url} className="d-block text-decoration-none text-light border-bottom border-dark border-1 fs-6 p-3 list-item">
            <h4>{note.__str__}</h4>
            <small>{note.formated_updated}</small>
        </Link>
    )
}

export default ListItem