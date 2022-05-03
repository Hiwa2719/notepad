import {ReactComponent as NoteSVG} from "../assets/note.svg";
import {ReactComponent as TaskSVG} from "../assets/task.svg";
import React from "react";
import {useNavigate} from "react-router-dom";


const Tabs = props => {
    const {showIndex} = props
    const navigate = useNavigate()

    const goNotes = () => {
        navigate('/')
    }

    const goTasks = () => {
        navigate('/api/tasks/')
    }

    return (
        <div className="block-tabs">
            <div className={showIndex === 0 ? "tab active-tab" : "tab"} onClick={() => goNotes()}>
                <NoteSVG/>
            </div>
            <div className={showIndex === 1 ? "tab active-tab" : "tab"} onClick={() => goTasks()}>
                <TaskSVG/>
            </div>
        </div>)
}

export default Tabs
