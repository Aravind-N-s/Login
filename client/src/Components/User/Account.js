import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../Config/axios'

class Account extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
        }
    }
    // tokens are sending to server
    componentDidMount(){
        axios.get(`/users/account`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then (response=>{
            const user=response.data
            this.setState({user}) 
            //when our current value doesn't depend on previous value, that time 
            //else use () =>{}
        })
    }
    render(){
        return(
            <div>
                <h6>User Account</h6>
                    <h4>
                        {this.state.user.username}
                    </h4>
                    
               <Link to="/users/logout">Logout</Link> 
            </div>
        )
    }
}
export default Account