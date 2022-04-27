import React from "react";
import ListItem from "../components/ListItem";
import axios from "axios";
import AddButton from '../components/AddButton'
import {ReactComponent as NoteSVG } from "../assets/note.svg";
import {ReactComponent as TaskSVG } from "../assets/task.svg"

export default class NotesPage extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: [],
            showIndex: 0,
        }
    }

    componentDidMount() {
        let url = [
            '/api/notes/',
            '/api/tasks/',
        ]
        console.log(this.state.showIndex)
        console.log(url[this.state.showIndex])
        axios.get(url[this.state.showIndex])
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

    toggleTab = (index) =>{
        this.setState({showIndex: index})
    }

    render() {
        const {notes, showIndex} = this.state
        return (
            <><div className="block-tabs">
                <div className={showIndex === 0 ? "tab active-tab" : "tab"} onClick={() => this.toggleTab(1)}>
                    <NoteSVG/>
                </div>
                <div className={showIndex === 1 ? "tab active-tab" : "tab"} onClick={() => this.toggleTab(2)}>
                    <TaskSVG/>
                </div>
            </div>
                {
                    notes.map(note => <ListItem key={note.id} note={note}/>)
                }
                <AddButton/>
            </>
        )
    }
}