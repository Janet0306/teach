import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { listUsers } from '../../actions/auth'

const UserList = ({ deleteUser, listUsers, auth, history } ) => {

    useEffect(() => {
        if (auth.user.isAdmin === true) {
            listUsers()
        } else {
            history.push('/login')
        }
    }, [])


    return (
        <>
        <h1 className="my-4 p-2">Users</h1>
        {auth.loading ? (
            <Spinner />
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {auth.users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <i className="fas fa-check" style={{ color: "green"}}></i>
                                ) : (
                                    <i className="fas fa-times" style={{ color: "red"}}></i>
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </>

    )
}


UserList.propTypes = {
  listUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth, 
});




export default connect(mapStateToProps, { listUsers })(UserList)






