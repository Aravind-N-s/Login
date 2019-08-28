import React from 'react'
import axios from '../../Config/axios'
import {Link} from 'react-router-dom'
import {FormGroup,FormControl, Input, InputLabel, FormHelperText, Button} from '@material-ui/core'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
        
    handleSubmit(e){
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/users/login`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.errors)
            }else{
                const token=response.data.token
                if(token){
                    localStorage.setItem('userAuthToken',token)
                    this.props.handleAuth(true)
                    this.props.history.push('/users/account')
                }
            }
        })
        .catch(err =>{
            alert(err)
        })
    }
    
    render(){
        return(
            <FormGroup id="form">
                <h2>LOGIN</h2>
                <FormControl id="input">
                    <InputLabel>Email address</InputLabel>
                    <Input type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                    <FormHelperText>Must Haved Registered</FormHelperText>
                </FormControl>
                <FormControl id="input">
                    <InputLabel>Password</InputLabel>
                    <Input  type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                </FormControl>
                <Button id="button" onClick={this.handleSubmit}>Submit</Button> 
                <Button id="button"><Link to="/users/register">Register</Link></Button>
            </FormGroup>
        )
    }
}

export default Login