import {Component} from 'react'
import Api from '../api/axios'

import Router from 'next/router'
import Dashboard from '../components/dashboard'


import { connect } from "react-redux"
import {handleAccountLogout_success } from "../redux/ducks/user/UserActions"



class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }
 

    async componentDidMount() {
        try {

            const result = await Api.get(`/user/me`)

        } catch (e){
            await alert('Please login again')
            Router.push('/')  
        }
    }
    
    render() {

        return(
            
            <div style={{flex: 1, display:"flex", height: '100%'}}>
            
                <Dashboard
                
                />

            </div>
            
        )
    }
} 
  
  
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps,{handleAccountLogout_success})(Index)