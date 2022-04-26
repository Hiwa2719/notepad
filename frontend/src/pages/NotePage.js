import React from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";


const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams()
        return (
            <Component params={params} {...props}/>
        )
    }
    return Wrapper
}


class NotePage extends React.Component {
    constructor() {
        super();
        this.state = {
            text: null,
            note: null,
            // noteId: null
        }
        this.textareaRef = React.createRef()
    }

    componentDidMount() {
        let noteId = this.props.params.id
        this.setState({
            noteId: noteId
        })
        if (noteId === 'create') {
            this.textareaRef.current.placeholder = 'Please Enter your thoughts here'
            this.textareaRef.current.focus()
            return
        }
        axios.get(`/api/notes/${noteId}`)
            .then(response => {
                this.setState({
                    note: response.data,
                    text: response.data.text
                })
            })
    }

    changeHandler = event => {
        this.setState({
            text: event.target.value
        })
    }

    arrowHandler = () => {
        console.log(this.state.text)
        let note = this.state.note
        if (!note) return
        if (!this.state.text) return axios.delete(`/api/notes/delete/${note.id}/`)
        axios.post(`/api/notes/update/${note.id}/`)
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }

    render() {
        const {text} = this.state
        return (
            <div className="d-flex flex-column p-1">
                <div className="m-2 d-flex flex-row justify-content-between text-warning">
                    <Link to="/">
                        <ArrowLeft className="arrow-button " onClick={this.arrowHandler}/>
                    </Link>
                    <h3 className="">Done</h3>
                </div>
                <textarea defaultValue={text} onInput={this.changeHandler} className='second bg-secondary border-0'
                          ref={this.textareaRef}></textarea>
            </div>
        )
    }
}


export default withRouter(NotePage)