import React from "react";
import {Link} from 'react-router-dom'


const ListItem = ({note}) => {
    return (
        <Link to={note.get_absolute_url}>
            <h3>{note.__str__}</h3>
        </Link>
    )
}

export default ListItem