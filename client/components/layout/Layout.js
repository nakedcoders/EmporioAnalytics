import {Component} from 'react'
import Link from 'next/link';

import Button from '../form/Button'
import StaticName from '../form/StaticName'


import { connect } from "react-redux"
import {handleAccountLogout } from "../../redux/ducks/user/UserActions"



class Index extends Component {

    constructor(props) {
        super(props);
        
    }
 
    _handleLogin = async() => {
        await this.props.handleAccountLogout()
    }

    render() {

        return (
            <div className="d-flex align-items-center justify-content-between" style={{width:'100%', backgroundColor: "white", height: 70, paddingLeft: 25, paddingRight:25}}>
            
                <Link href="/dashboard">
                    <img src="/static/logo.png" style={{objectFit:'contain', height:25, cursor:'pointer', marginRight: 25}}/>
                </Link>

                <div className="d-flex justify-content-around" style={{flex:1}}>
                    <Link href="/dashboard">
                        <div>
                            <StaticName title="Dashboard"/>
                        </div>
                    </Link>
                    <Link href="/analytics">
                        <div>
                            <StaticName title="Analytics"/>
                        </div>
                    </Link>
                </div>
                <Button
                    _Function={this._handleLogin}
                    title={'Logout'}
                    style={{color:'white',border:'1px solid rgba(38,162,192,1)', backgroundColor: 'rgba(38,162,192,1)'}}
                />
            </div>
        );
          
    }
} 

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps,{handleAccountLogout})(Index)