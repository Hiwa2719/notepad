import React from "react";


const Header = props => {
    return (
        <div className="bg-black p-4 fs-1">
            {props.listType} List
        </div>
    )
}


export default Header