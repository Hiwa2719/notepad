import {useParams} from "react-router-dom";
import React from "react";

const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams()
        return (
            <Component params={params} {...props}/>
        )
    }
    return Wrapper
}

export default withRouter
