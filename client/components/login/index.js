import {Component} from 'react'
import Link from 'next/link';


import Login from './components/Login'
import SignUp from './components/SignUp'
import StaticName from '../form/StaticName'

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stage : 0,
            loading: false,
            error: []
        }
    }
    

    _renderForm = () => {
        switch(this.state.stage){
            case 0:
                return (
                    
                    <Login
                        handleStage={() => this.setState({stage: 1})}
                    />
                )
            case 1 :
                return (
                    <SignUp
                        handleStage={() => this.setState({stage: 0})}
                    />
                )
            default:return
        }
    }




    render() {

        return (
            <div className="d-flex justify-content-between " style={{flexDirection:'column', padding: 50, height:'100%'}}>
            
                <div className="d-flex justify-content-between">
                    <Link href="/">
                        <img src="/static/logo.png" style={{objectFit:'contain', height:25, cursor:'pointer'}}/>
                    </Link>

                    <Link href="/dashboard">
                        <div>
                            <StaticName title="Home" style={{fontSize: 12}}/>
                        </div>
                    </Link>
                </div>
                
            
                <div style={{display:"flex", justifyContent:"center", flexDirection:'column', alignItems:"center"}}>
                    <div style={{minWidth: 310, maxWidth: 410}}>
                        {this._renderForm()}
                    </div>
                </div>
               
                
                <div className="d-flex justify-content-between">
                    <StaticName title="About Us" style={{fontSize: 12}}/>
                    <StaticName title="FR | EN" style={{fontSize: 12}}/>
                </div>
        
            </div>
        );
          
    }
} 

export default Index;