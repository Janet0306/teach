import React from 'react';
import { Link } from 'react-router-dom';


const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light' title="Edit Profile">
        <i className='fas fa-user-circle text-primary1' /> Edit Profile
      </Link>
      <Link to='/topic' className='btn btn-light' title="Add a topic">
      <i className="fas fa-pencil-alt text-primary1" /> Add a Topic
      </Link>
    </div>
  );
};

export default DashboardActions;