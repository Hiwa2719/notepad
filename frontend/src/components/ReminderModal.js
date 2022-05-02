import React from "react";


const ReminderModal = ({openModal, setOpenModal}) => {

    const closeHandler = () => {
        setOpenModal(false)
    }

    if (!openModal) return
    return (
        <div className="overlay" onClick={closeHandler}>
            <div className="reminder-modal" onClick={(e) => e.stopPropagation()}>
                <div className="close-modal" onClick={closeHandler}>X</div>
                <div className="modal-inner">
                    <h3>You sat following reminder for this time: {note.formatted_updated}</h3>
                    <p>{note.text}</p>
                    <button className="btn btn-warning">Delete</button>
                </div>
            </div>
        </div>

    )
}

export default ReminderModal
