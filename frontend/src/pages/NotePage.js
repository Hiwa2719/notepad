import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import withRouter from '../components/withRouter'


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
        let {text, note} = this.state
        if (!note) return
        if (!text) return this.deleteNote()
        note.text = this.state.text
        axios.put(`/api/notes/update/${note.id}/`, note)
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
        this.rerenderState()
    }

    deleteNote = () => {
        axios.delete(`/api/notes/delete/${this.state.note.id}/`)
        this.rerenderState()
    }

    createHandler = () => {
        let text = this.state.text
        if (!text) return
        axios.post('/api/notes/create/', {text: text})
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
        this.rerenderState()
    }

    rerenderState = () => {
        this.props.setListType()
    }

    render() {
        const {text, note} = this.state
        return (
            <div className="d-flex flex-column p-1">
                <div className="m-2 d-flex flex-row justify-content-between text-warning">
                    <Link to="/">
                        <ArrowLeft className="arrow-button " onClick={this.arrowHandler}/>
                    </Link>
                    <Link to="/" className="text-decoration-none text-warning">
                        {note ?
                            <h3 onClick={this.deleteNote}>Delete</h3> :
                            <h3 onClick={this.createHandler}>Done</h3>
                        }
                    </Link>
                </div>
                <textarea defaultValue={text} onInput={this.changeHandler} className='textarea bg-secondary border-0'
                          ref={this.textareaRef}></textarea>
            </div>
        )
    }
}


export default withRouter(NotePage)