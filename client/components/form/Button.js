import React, {PureComponent} from 'react'

class Button extends PureComponent {

    render() {

        const {_Function, title, divStyle, style} = this.props

        return (
            <div style={divStyle}>
                <button style={{...style,
                    // border: '1px solid rgba(0,0,0,0.5)', 
                    width: 120,
                    padding: 5, paddingLeft: 20, paddingRight: 20, 
                    borderRadius: 25, marginBottom: 10, marginTop: 10,
                    outline:'none'
                }} onClick={() => _Function()}>{title}</button>    
            </div> 
        )
    }
}



export default Button