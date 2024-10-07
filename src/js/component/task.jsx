import React, { useState } from "react";


const Task = ({task, onRemove}) => {

    const [isHovered, setIsHovered] = useState(false)
    return (
        <div className="d-flex justify-content-between align-items-center border p-2 mb-2 bg-secondary-subtle"
            onMouseEnter={()=> {
                setIsHovered(true);
            }}
            onMouseLeave={()=> {
                setIsHovered(false);
            }} >
 
            <p>{task.label}</p>
            {(isHovered) && <span onClick={()=>{
                onRemove()
            }}><i className="fa-regular fa-trash-can"></i></span>}
            
        </div>
    )
}

export default Task;