import React from "react";
import {ReactComponent as AddIcon} from "../assets/add.svg";
import {useNavigate} from 'react-router-dom'


const withRouter = (Component) => {
    const Wrapper = (props) => {
        let navigate = useNavigate()
        return <Component navigate={navigate} {...props}/>
    }
    return Wrapper
}

const AddButton = props => {
    const clickHandler = () => {
        props.navigate('/api/notes/create/')
    }
    return (
        <div className='position-absolute bottom-0 end-0 m-3 bg-warning p-3 rounded-circle add-button'>
            <AddIcon onClick={clickHandler}/>
        </div>
    )
}

export default withRouter(AddButton)