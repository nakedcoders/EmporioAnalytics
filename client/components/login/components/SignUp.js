import {Component} from 'react'

import Api from '../../../api/axios'

import Input from '../../form/Input'
import Button from '../../form/Button'
import StaticName from '../../form/StaticName'

import { connect } from "react-redux"
import {saveAccessTokenSuccess } from "../../../redux/ducks/user/UserActions"

class SignUp extends Component  {

    constructor(props) {
        super(props);
        this.state = {

            form: {
                username: '',
                email: '',
                password: '',
            },
            errors: null
        }
    }

    _HandleChange = (e, element) => {
        let form = {...this.state.form}
        form[element] = e
        this.setState({form: form})
    }

    _handleSignUp= async() => {

        try {

            const result = await Api.post(`/user/signup`, this.state.form)
            await this.props.saveAccessTokenSuccess(result.data.token)

        } catch (e){
            this.setState({errors: e.response.data.errors})
        }
    }

    render() {


        const {username, email, password} = this.state.form

        return (
            <div style={{flex: 1}}>

                <div className="d-flex flex-column">
                    <StaticName title="DISCOVERING THE NEW TREND IN YOUR SHOPPERS" style={{fontSize: 10, fontWeight: '600', color:'rgba(0,0,0,0.5)'}}/>
                    <StaticName title="Sign up for account" style={{fontSize: 18, fontWeight: '600', color:'rgba(0,0,0,1)', marginTop: 8, marginBottom:10}}/>
                </div>

                <Input
                    divStyle={{width: '100%', marginRight: 30}}
                    title='Username'
                    placeholder="Your username"
                    value={username}
                    element={'username'}
                    _HandleProduct={this._HandleChange}
                    textStyle={{fontSize: 12}}

                /> 

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
                    _HandleProduct={this._HandleChange}
                    textStyle={{fontSize: 12}}

                />  

                <div className="d-flex justify-content-between" style={{marginTop: 15}}>

                    <Button
                        _Function={this.props.handleStage}
                        title={'Login'}
                        style={{border: '1.5px solid rgba(38,162,192,1)', color: 'rgba(38,162,192,1)', backgroundColor:"white"}}
                    />

                    <Button
                        _Function={this._handleSignUp}
                        title={'Sign Up'}
                        style={{
                            color:'white',border:'1px solid rgba(38,162,192,1)', backgroundColor: 'rgba(38,162,192,1)',
                            boxShadow: '0 5px 9px 0 rgba(38,162,192,0.35), 0 8px 25px 0 rgba(38,162,192,0.35)'
                        }}
                    />
                </div>

                {this.state.errors && 
                    <div className="d-flex flex-column" style={{marginTop: 15}}>
                        {Object.keys(this.state.errors).map((e, index)=>{
                            return (
                                <span key={index} style={{fontSize: 12, }}>{this.state.errors[e].message.replace('Path', '')}</span>
                            )
                        })}
                    </div>
                }
            </div>
        )
    };
}


const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps,{saveAccessTokenSuccess})(SignUp)