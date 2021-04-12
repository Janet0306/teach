import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Placeholder from '../../img/placeholder.jpg';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    location,
    bio,
    interests,
    path
  }

}) => {
  return (

    <div className='profile bg-light'>
      {path == null ? (<img src={Placeholder} alt='' />)  : (<img src={path} alt='' />)}
      <div>
        <h2>{name}</h2>
        <p>
          {bio}
        </p>
        <p className='my-1'>{location}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary1'  title="User Profile">
          View Profile
        </Link>
      </div>
      <ul>
        {interests.slice(0, 4).map((interest, index) => (
          <li key={index} className='text-primary1'>
            <i className='fas fa-check' /> {interest}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

