import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLogin} from '../../services/userService'
// import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hidePassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username,this.state.password)
            if(data){
                this.props.userLoginSuccess(data.user)
            }
        }catch(e){
            if(e.response){
                if(e.response.data){
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            hidePassword: !this.state.hidePassword
        })
    }

    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center header-title'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username: </label>
                            <input placeholder="Enter your username"  
                                type='text' 
                                className='form-control'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                            >
                            </input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input placeholder="Enter your password"  
                                    type={this.state.hidePassword ? 'text' : 'password'} 
                                    className='form-control'
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    >
                                </input>
                                <i 
                                    onClick={() => {this.handleShowHidePassword()}} 
                                    className={!this.state.hidePassword ? 'far fa-eye' : 'fa fa-eye-slash'}
                                >
                                </i>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 form-group login-input'>
                            <button onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12 login-input'>
                            <span className='forgot-password'>Forgot your password? </span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span >Or Login with: </span>
                        </div>
                        <div className='col-12 social-login justify-content-center mt-3'>
                            <i className="fab fa-google-plus-g google me-3"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
