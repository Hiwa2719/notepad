import {useNavigate, useParams} from "react-router-dom";
import React from "react";

const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams()
        let navigate = useNavigate()
        return (
            <Component params={params} navigate={navigate} {...props}/>
        )
    }
    return Wrapper
}

export default withRouter
