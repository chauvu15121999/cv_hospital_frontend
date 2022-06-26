import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllUsers} from '../../services/userService'
import './UserManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let res = await getAllUsers();
        if(res && res.errCode === 0 ){
            // Hàm setState là bất đồng bộ
            this.setState({
                arrUsers: res.data
            },)  
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
        let {arrUsers} = this.state;
        return (
            <div className="users-container">
                <div className='title text-center'> manage users with Vũ</div>
                <div className='user-table mt-3 p-4'>
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
                                                <button className='btn btn-primary'><i className='fas fa-pencil-alt' /></button>
                                                <button className='btn btn-danger ms-2'><i className='fas fa-trash' /></button>
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
