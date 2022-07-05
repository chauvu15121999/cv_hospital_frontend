import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader , ModalFooter ,Button , Form , FormGroup , Label , Input , Row , Col} from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModelUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on(`EVENT_CLEAR_MODAL_CREATE_USER_DATA` , () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {

    }

    toggleUserModel = () => {
        this.props.toggleUserModel();
    }

    hanldeOnChangeInput = (e, id) => {
        /** 
         *  
         */
        this.setState({
            [id]: e.target.value
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email' , 'password' , 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false
                break;
            }
        }
        return isValid;
    }

    addNewUser = () => {
        this.checkValidateInput()
        this.props.createNewUser(this.state)
    }


    render() {
        let {isOpen} = this.props
        let {email , password , lastName, firstName , address} = this.state
        return (
            <>
                <Modal 
                    isOpen={isOpen} 
                    toggle={() => {this.toggleUserModel()}}
                    size="lg"
                >
                    <ModalHeader toggle={() => {this.toggleUserModel()}}>
                        Create a new user
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail">
                                        Email
                                        </Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="Type your email"
                                            type="email"
                                            onChange={(e) => this.hanldeOnChangeInput(e, 'email')}
                                            value={email}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword">
                                        Password
                                        </Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            placeholder="Type your password"
                                            type="password"
                                            onChange={(e) => this.hanldeOnChangeInput(e, 'password')}
                                            value={password}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName">
                                        first name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="Type your first name"
                                            type="text"
                                            onChange={(e) => this.hanldeOnChangeInput(e, 'firstName')}
                                            value={firstName}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName">
                                        last name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Type your last name"
                                            type="text"
                                            onChange={(e) => this.hanldeOnChangeInput(e, 'lastName')}
                                            value={lastName}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="address">
                                        Address
                                        </Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            placeholder="Type your address"
                                            type="text"
                                            onChange={(e) => this.hanldeOnChangeInput(e, 'address')}
                                            value={address}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {this.addNewUser()}}
                        className="px-3"
                    >
                        Add new user
                    </Button>
                    <Button className='px-3' onClick={() => {this.toggleUserModel()}}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
