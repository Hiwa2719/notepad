import React from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams()
        return (
            <Component params={params} {...props}/>
        )
    }
    return Wrapper
}


class NotePage extends React.Component{
    constructor() {
        super();
        this.state = {
            text:null,
            // note: null,
            // noteId: null
        }
    }

    componentDidMount() {
        let noteId = this.props.params.id
        // this.setState({
        //     noteId: noteId
        // })
        axios.get(`/api/notes/${noteId}`)
            .then(response => {
                this.setState({
                    text:response.data.text
                })
            })
    }

    changeHandler = event => {
        this.setState({
            text: event.target.value
        })
    }

    render(){
        const {text} = this.state
        return(
            <div>
                <textarea defaultValue={text} onChange={this.changeHandler} cols="50" rows='50'></textarea>
            </div>
        )
    }
}


export default withRouter(NotePage)