import React from 'react'
import Listing from '../Etc/Listing'
import {Link} from 'react-router-dom'
import axios from '../../Config/axios'
import {Button} from '@material-ui/core'

class Account extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            passwordCheck:'',
            password:'',
            passwordSearch:''
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
            <div id="form">
                <h2>User Account</h2>
                <h3>{this.state.user.username}</h3> 
                <Button id="button"><Link to="/users/password">Password Reset</Link></Button><br/>
                <Button id="button"><Link to='/listing'>Listing</Link></Button><br/>
                <Button id="button"><Link to="/users/logout">Logout</Link></Button><br/>
            </div>
        )
    }
}
export default Account