import React from "react";
import {Link} from 'react-router-dom'
import moment, {utc} from "moment";


class ListItem extends React.Component {
    constructor() {
        super();
        this.itemRef = React.createRef()
    }

    componentDidMount() {
        console.log(this.props.note)
        // if(this.props)
        // let currentTimeInMilliseconds = Date.now()
        // // console.log(this.props.note.formated_updated)
        // // console.log('now ', currentTimeInMilliseconds)
        // let date = moment(this.props.note.formated_updated, 'x X')
        // // let date = Date.parse(this.props.note.formated_updated.toString());
        // console.log('dat ', date.utc())
        // let diff = date*1000 - currentTimeInMilliseconds
        // console.log('difference: ', diff)
        // // setTimeout(() => {
        // //     alert('hello world')
        // // }, diff)
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