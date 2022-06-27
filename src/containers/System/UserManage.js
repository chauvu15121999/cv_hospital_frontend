import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllUsers} from '../../services/userService'
import ModelUser from './ModelUser';

import './UserManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false
        }
    }

    async componentDidMount() {
        let res = await getAllUsers()

        if(res && res.errCode === 0 ){
            // Hàm setState là bất đồng bộ
            this.setState({
                arrUsers: res.data
            },)  
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModelUser: true
        })
    }

    toggleUserModel = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser
        })
    }

    /** Life cycle 
     * Run component 
     * 1. Run construct ->  
     * 2. Did mout (set state)
     * 3. Render
     * 
     */
    render() {
        let {arrUsers , isOpenModelUser} = this.state;
        return (
            <div className="users-container">
                <ModelUser 
                    isOpen={isOpenModelUser} // Prop variable
                    toggleUserModel={this.toggleUserModel} //Prop func
                />
                <div className='title text-center'> manage users with Vũ</div>
                <div className='ms-4 mt-3'>
                    <button 
                        className='btn btn-primary px-3 '
                        onClick={() => this.handleAddNewUser()}
                        ><i className='fas fa-plus me-1'></i>Add new users
                    </button>
                </div>
                <div className='user-table mt-1 p-4'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { arrUsers && 
                                arrUsers.map((user , index) => {
                                    return(
                                        <tr key={'user'+index}>
                                            <td>{user.email}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className='btn btn-primary btn-table'><i className='fas fa-pencil-alt' /></button>
                                                <button className='btn btn-danger ms-2 btn-table'><i className='fas fa-trash' /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
