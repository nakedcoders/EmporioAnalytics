import React, {PureComponent, Component} from 'react'

class Input extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.value != nextProps.value){
            return true
        }
        return false
    }

    render() {

        const {title, placeholder, value, _HandleProduct, element, divStyle, textStyle} = this.props


        let divStyles = {...divStyle}
        divStyles.flexDirection = 'column'
        
        
        return (
            <div className="d-flex" style={divStyles}>
                <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)', ...textStyle}}>{title}</span>
                <input 
                    type={element} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => _HandleProduct(e.target.value, element)}
                    style={{
                        paddingLeft: 10, paddingRight: 10, paddingTop: 8, 
                        paddingBottom: 8, borderRadius: 20, fontSize: 12, 
                        border: '1.15px solid rgba(0,0,0,0.15)', outline:'none'
                    }}
                />
            </div>
        )
        
        
    }
}


export default Input