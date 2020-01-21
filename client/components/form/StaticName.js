
import React, {Component} from 'react'

const StaticName = ({title, style}) => {

    return (
        <span style={{color:'rgba(150,150,150,1)', ...style}}>
            {title}
        </span>
    )
    

}


export default StaticName