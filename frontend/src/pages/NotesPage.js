import React from "react";
import ListItem from "../components/ListItem";
import axios from "axios";


export default class NotesPage extends React.Component{
    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/notes/')
            .then(response => {
                this.setState({
                    notes: response.data
                })
            })
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }

    render(){
        const {notes} = this.state
        return(
            <div>
                {
                    notes.map(note => <ListItem key={note.id} note={note}/>)
                }
            </div>
        )
    }
}