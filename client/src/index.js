import React from 'react'
import ReactDOM from 'react-dom'
import './Config/index.css'
import {Button} from '@material-ui/core'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom'

import Login from './Components/User/Login'
import Register from './Components/User/Register'
import Password from './Components/User/Password'
import Account from './Components/User/Account'
import Logout from './Components/User/Logout'

import Listing from './Components/Etc/Listing'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isAuthenticated: false
        }
        this.handleAuth=this.handleAuth.bind(this)
    }

    handleAuth = (bool) => {
        this.setState({isAuthenticated:bool})
    }

    componentDidMount(){
        if(localStorage.getItem('userAuthToken')){
            this.setState({isAuthenticated: true})
        }
    }

    render() {
        return (
            <BrowserRouter >
                <div>
                    {!this.state.isAuthenticated &&(
                        <div>
                            <Button id="login" size="large" variant="outlined" color="secondary"><Link style={{color:'red'}} to='/users/login'>Login</Link></Button>
                            <Switch>
                                <>
                                    <Route exact strict path="/users/login" render={(props)=>{
                                        return <Login {...props } handleAuth={this.handleAuth}/>}}/>
                                    <Route exact strict path="/users/register" component={Register} />
                                    <Route exact strict path="/users/pass" component={Password} />
                                </>
                            </Switch>
                        </div>
                    )}
                    {this.state.isAuthenticated && (
                        <div>
                            <Link to='/users/account'>Account</Link>
                            <Switch>
                                <>
                                    <Route exact strict path="/users/account" component={Account}/>
                                    <Route exact strict path="/users/logout" render={(props)=>{
                                        return <Logout {...props} handleAuth={this.handleAuth}/> }}/>
                                </>
                            </Switch>
                        </div>
                    )}                                           
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))
