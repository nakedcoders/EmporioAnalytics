import {Component} from 'react'
import Router from 'next/router'


import Login from '../components/login'
import Screen from '../components/screen'

import { connect } from "react-redux"


class Index extends Component{

 
    componentDidMount() {
        if(this.props.accessToken){
            Router.push('/dashboard')                
        }
    }
    
    render() {

        return(
            
            <div style={{flex: 1, display:"flex", height:'100vh'}}>
            
                <div style={{flex:1}}>
                    <Login/>
                </div>

                <div className="Screen" style={{flex:1}}>
                    <Screen/>
                </div>

                <style jsx>{`
                                    
                    @media (min-width: 511px) {
                        .Screen {
                            display:flex;
                        }
                    }
            
                    @media (max-width: 510px) {
                        .Screen {
                            display:none;
                        }
                    }
                
                    `}</style>
            </div>
            
        )
    }
} 
  
const mapStateToProps = state => {
    const { UserState } = state
    const {accessToken} = UserState
    return { accessToken }
}
  
export default connect(mapStateToProps)(Index)