import React from 'react'
import axios from '../../Config/axios';

class Logout extends React.Component{
    
    componentDidMount(){
        axios.delete(`/users/logout`,{
        headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
        })
        .then(response=>{
            localStorage.removeItem('userAuthToken')
            this.props.handleAuth(false)
            this.props.history.push('/')
        })
    }
    render(){
        return(
            <p>logging out..</p>
        )
    }
}

export default Logout