import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllUsers , createNewUserService , deleteUserService, editUserService} from '../../services/userService'
import ModelUser from './ModelUser';
import ModelEditUser from './ModelEditUser';
import { emitter } from '../../utils/emitter';

import './UserManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false,
            isOpenModelEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await  this.getAllUsersFormReact()
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModelUser: true
        })
    }

    getAllUsersFormReact = async () => {
        let res = await getAllUsers()

        if(res && res.errCode === 0 ){
            // Hàm setState là bất đồng bộ
            this.setState({
                arrUsers: res.data
            },)  
        }
    }

    toggleUserModel = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser
        })
    }

    createNewUser = async (data) => {
        try{
            let res = await createNewUserService(data)
            if(res.errCode){
                alert(res.message)
            }else{
                console.log(res)
                await this.getAllUsersFormReact()
                this.toggleUserModel()
                emitter.emit('EVENT_CLEAR_MODAL_CREATE_USER_DATA', {'id': 'your id'})
            }   
        }catch(e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }

    toggleUserEditModel = () => {
        this.setState({
            isOpenModelEditUser: false
        })
    }

    hanldeDeleteUser = async (user) => {
       try {
            let res = await deleteUserService(user.id)
            if(res && res.errCode == 0){
                this.getAllUsersFormReact()
            }else {
                alert(res.message)
            }
       }catch(e){
            console.log(e)
       }
    }

    doEditUser = async (user) => {
        try{
             let res = await editUserService(user);
            if(res && !res.errCode){
                this.setState({
                    isOpenModelEditUser: false
                })

                await this.getAllUsersFormReact();
            }else{
                alert(res.message)
            }
        }catch(e){
            console.log(e)
        }
    }

    /** Life cycle 
     * Run component 
     * 1. Run construct ->  
     * 2. Did mout (set state)
     * 3. Render
     * 
     */
    render() {
        let {arrUsers , isOpenModelUser , isOpenModelEditUser , userEdit} = this.state;
        return (
            <div className="users-container">
                <ModelUser 
                    isOpen={isOpenModelUser} // Prop variable
                    toggleUserModel={this.toggleUserModel} //Prop func
                    createNewUser = {this.createNewUser}
                />
                {
                    this.state.isOpenModelEditUser && 
                        <ModelEditUser 
                            isOpen={isOpenModelEditUser} // Prop variable
                            toggleUserModel={this.toggleUserEditModel} //Prop func
                            currentUser = {userEdit}
                            doEditUser={this.doEditUser}
                        />
                }
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
                                                <button onClick={() => this.handleEditUser(user)} className='btn btn-primary btn-table'><i className='fas fa-pencil-alt' /></button>
                                                <button onClick={() => this.hanldeDeleteUser(user)} className='btn btn-danger ms-2 btn-table'><i className='fas fa-trash' /></button>
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
