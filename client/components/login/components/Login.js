import React, {Component} from 'react'
import Router from 'next/router'

import Api from '../../../api/axios'

import Input from '../../form/Input'
import Button from '../../form/Button'
import StaticName from '../../form/StaticName'


import { connect } from "react-redux"
import {saveAccessTokenSuccess } from "../../../redux/ducks/user/UserActions"




class Login extends Component  {

    constructor(props) {
        super(props);
        this.state = {

            form: {
                email: '',
                password: '',
            },
            loading: false,
            error: null,
        }
    }

    _HandleChange = (e, element) => {
        let form = {...this.state.form}
        form[element] = e
        this.setState({form: form, error: null})
    }


    _handleLogin = async() => {

        this.setState({loading: true})

        try {
            const result = await Api.post(`/user/login`, this.state.form)
            
            // save into redux
            await this.props.saveAccessTokenSuccess(result.data.token)

        } catch (e){
            this.setState({error: e.response.data.message, loading: false})
        }
    }

    render() {


        const {email, password} = this.state.form

        return (
            <div style={{flex: 1}}>
                
                {!this.state.loading && 
                    <>
                        <div className="d-flex flex-column">
                            <StaticName title="HARNESS THE POWER OF BIG DATA" style={{fontSize: 10, fontWeight: '600', color:'rgba(0,0,0,0.5)'}}/>
                            <StaticName title="Login your account" style={{fontSize: 18, fontWeight: '600', color:'rgba(0,0,0,1)', marginTop: 8, marginBottom:10}}/>
                        </div>

                        <Input
                            divStyle={{width: '100%', marginRight: 30}}
                            title='E-Mail'
                            placeholder="Your E-Mail"
                            value={email}
                            element={'email'}
                            _HandleProduct={this._HandleChange}
                            textStyle={{fontSize: 12}}
                        /> 

                        <Input
                            divStyle={{width: '100%', marginRight: 30}}
                            title={'Password'}
                            placeholder="Your Password"
                            value={password}
                            element={'password'}
                            textStyle={{fontSize: 12}}
                            _HandleProduct={this._HandleChange}
                        />  

                        <div className="d-flex justify-content-between" style={{marginTop: 15}}>

                            <Button
                                _Function={this.props.handleStage}
                                title={'Register'}
                                style={{border: '1px solid rgba(38,162,192,1)', color: 'rgba(38,162,192,1)', backgroundColor:"white"}}
                            />

                            <Button
                                _Function={this._handleLogin}
                                title={'Login'}
                                style={{
                                    color:'white',border:'1px solid rgba(38,162,192,1)', backgroundColor: 'rgba(38,162,192,1)',
                                    boxShadow: '0 5px 9px 0 rgba(38,162,192,0.35), 0 8px 25px 0 rgba(38,162,192,0.35)'
                                }}
                            />
                        </div>

                        {this.state.error && 
                            <div className="d-flex flex-column" style={{marginTop: 15}}>
                                <span style={{fontSize: 12, }}>{this.state.error}</span>
                            </div>
                        }
                    </>
                }

                {this.state.loading && 
                    <>Loading ...</>
                }
            </div>
        )
    };
}


  
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps,{saveAccessTokenSuccess})(Login)