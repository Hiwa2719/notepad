import React from "react";


class NotesPage extends React.Component{
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