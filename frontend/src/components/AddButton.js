import React from "react";
import {ReactComponent as AddIcon} from "../assets/add.svg";
import withRouter from "./withRouter";


const AddButton = props => {
    const clickHandler = () => {
        props.navigate(props.url)
    }
    return (
        <div className='position-absolute bottom-0 end-0 m-3 bg-warning p-3 rounded-circle add-button'>
            <AddIcon onClick={clickHandler}/>
        </div>
    )
}

export default withRouter(AddButton)
