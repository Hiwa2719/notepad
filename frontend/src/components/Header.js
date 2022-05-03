import React from "react";


const Header = () => {
    return (
        <div className="bg-black p-4 fs-1">
            {window.location.href.includes('tasks') ? "Tasks": "Notes"} List
        </div>
    )
}


export default Header