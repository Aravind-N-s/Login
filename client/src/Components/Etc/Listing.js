import React from 'react'
import axios from '../../Config/axios'
import {Link} from 'react-router-dom'
import {List, ListItem, ListItemSecondaryAction, ListItemText, Button} from '@material-ui/core/'

export default class Listing extends React.Component {
    constructor(){
        super()
        this.state = {
            user: {},
            users: []
        }
        this.handleRemove = this.handleRemove.bind(this)
    }
    componentDidMount(){
        axios.get(`/users/account`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then (response=>{
            const user=response.data
            this.setState({user}) 
        })
        axios.get(`/users/info`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then(response=>{
            const users=response.data
            this.setState({users}) 
        })
    }
    handleRemove(e){
        const id = e
        console.log(id)
        const confirmRemove = window.confirm("Are You Sure?")
        if(confirmRemove){
            axios.delete(`/users/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            }) 
            .then(response=>{
                // this.props.history.push('/')
            })
        }
    }
    render(){
        return (
            <div id="form">
                {this.state.user &&(
                    this.state.user.Admin ? (
                    <>
                        <List>
                            {this.state.users && 
                                (this.state.users.map(us =>{
                                    if(us){
                                        return (<ListItem key={us._id}>{us.email}<Button onClick={() => this.handleRemove(us._id)}>X</Button></ListItem>)
                                    }
                            }))}
                            <Link to="/users/account">Back</Link>
                        </List>
                    </>
                ):(
                    <>
                        <p>Not Admin</p>
                        <Link to="/users/account">Back</Link>
                    </>
                ))}  
                
            </div>
        )
    }
}
