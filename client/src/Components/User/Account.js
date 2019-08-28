import React from 'react'
import Listing from '../Etc/Listing'
import {Link} from 'react-router-dom'
import axios from '../../Config/axios'
import {FormGroup,FormControl, Input, InputLabel, FormHelperText, Button} from '@material-ui/core'

class Account extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            passwordCheck:'',
            password:'',
            passwordSearch:''

        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.password == this.state.passwordSearch){
            const formData = {
                email: this.state.user.email,
                password: this.state.user.passwordCheck,
                confirm: this.state.password
            }
            console.log(formData)
            axios.put(`users/reset/${this.state.user._id}`,formData,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(response =>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
                }
                else {
                    this.props.history.push(`/`)
                }
            })
        }else{
            alert("Password are not correct")
        }
        
    }

    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
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
        console.log(this.state)
        return(
            <div>
                <Listing/>
                <h2>User Account</h2>
                <h3>{this.state.user.username}</h3>
                <FormGroup id="form">
                    <FormControl id="input">
                        <InputLabel>{this.state.user.email}</InputLabel>
                        <Input disabled type="text" />
                    </FormControl>
                    <FormControl id="input">
                        <InputLabel>Old Password</InputLabel>
                        <Input  type="password" name="passwordCheck" value={this.state.passwordCheck} onChange={this.handleChange} placeholder="Password" />
                    </FormControl>
                    <FormControl id="input">
                        <InputLabel>New Password</InputLabel>
                        <Input  type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                    </FormControl>
                    <FormControl id="input">
                        <InputLabel>Confirm New Password</InputLabel>
                        <Input  type="password" name="passwordSearch" value={this.state.passwordSearch} onChange={this.handleChange} placeholder="Password" />
                    </FormControl>
                    <Button id="button" onClick={this.handleSubmit}>Submit</Button>
                </FormGroup> 
                <Link to="/users/logout">Logout</Link> 
            </div>
        )
    }
}
export default Account