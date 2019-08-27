import React from 'react'
import axios from '../../Config/axios'
import {FormGroup,FormControl, Input, InputLabel, FormHelperText, Button} from '@material-ui/core'

class Register extends React.Component{
        constructor(){
            super()
            this.state={
                username:'',
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
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/users/register`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.message)
            }else {
                this.props.history.push('/users/login')
            }
        })
        .catch(err=> {
            alert(err)
        })
    }

    render(){
        return(    
            <FormGroup>
                <h2>Register</h2>
                <FormControl>
                    <InputLabel>User Name</InputLabel>
                    <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="User Name"/>
                    <FormHelperText>User Name Must Be Unique</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel>Email address</InputLabel>
                    <Input type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                </FormControl>
                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input  type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                    <FormHelperText>Must have 1 Uppercase, Lowercase, Number, Special Character</FormHelperText>
                </FormControl>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </FormGroup>     
        )
    }
}

export default Register