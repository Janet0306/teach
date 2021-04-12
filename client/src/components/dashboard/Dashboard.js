import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import TopicDetail from './TopicDetail';



const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);


  console.log({profile})

  return (
    <Fragment>
      <h1 className="large text-primary1">Dashboard</h1>
          
      <p className="lead my-4">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className="my-4 py-4">
          <h2 className="large text-primary1 my-4">Current Topics</h2>
          {profile.topics.map((topic) => (
			        <TopicDetail key={topic._id} topic={topic} />
		      ))}
          </div>
          <div className="my-4">
            <button className="btn btn-danger" title="Delete my Account" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary1 my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};



Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

