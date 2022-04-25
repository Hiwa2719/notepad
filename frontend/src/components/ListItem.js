import React from "react";
import {Link} from 'react-router-dom'


const ListItem = note => {
    return (
        <Link to={note.get_absolute_url}>{note.__str__}</Link>
    )
}

export default ListItem