import {Component} from 'react'

import Layout from '../layout/Layout'
import StaticName from '../form/StaticName'


class Index extends Component {

    constructor(props) {
        super(props);
        
    }
 
    

    render() {

        return (
            <div className="d-flex" style={{flex:1, flexDirection:'column', height: '100vh', width:'100%', backgroundColor:'rgba(239, 241, 244, 1)'}}>
            
                <Layout/>

                <div style={{flex: 1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <StaticName title="Dashboard"/>
                </div>
                


            </div>
        );
          
    }
} 

export default Index;