import React from "react";
import axios from "axios";


const ReminderModal = ({openModal, setOpenModal, note}) => {
    const closeHandler = () => {
        setOpenModal(false)
    }

    const deleteTask = () =>{
        axios.delete(`/api/tasks/delete/${note.id}/`)
            .then(response=>{
                setOpenModal(false)
                console.log('success')
                window.location.reload()
            })
            .catch(error=>{
                console.log('error')
                console.log(error)
                alert('Something went wrong we couldn\'t do your request')
            })
    }
    if (!openModal) return
    return (
        <div className="overlay" onClick={closeHandler}>
            <div className="reminder-modal" onClick={(e) => e.stopPropagation()}>
                <div className="close-modal" onClick={closeHandler}>X</div>
                <div className="modal-inner">
                    <h3>You sat following reminder for this time: {note.formatted_updated}</h3>
                    <p>{note.text}</p>
                    <button className="btn btn-warning" onClick={deleteTask}>Delete</button>
                </div>
            </div>
        </div>

    )
}

export default ReminderModal
