import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader , ModalFooter ,Button} from 'reactstrap';
class ModelUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
     
        }
    }

    componentDidMount() {

    }

    toggleUserModel = () => {
        this.props.toggleUserModel();
    }


    render() {
        let {isOpen} = this.props
        return (
            <>
                <Modal 
                    isOpen={isOpen} 
                    toggle={() => {this.toggle()}}
                    size="lg"
                >
                    <ModalHeader toggle={() => {this.toggleUserModel()}}>
                        Modal title
                    </ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {this.toggle()}}
                    >
                        Do Something
                    </Button>
                    {' '}
                    <Button onClick={() => {this.toggleUserModel()}}>
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
