import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from '../../img/placeholder.jpg';

const ProfileTop = ({
  profile: {
    location,
    social,
    path,
    user: { name },
  }
}) => {
  return (
    <div className="profile-top bg-primary1 p-2">
      {path == null ? (<img className="round-img my-2" src={Placeholder} alt='' />)  : (<img className="round-img my-2" src={path} alt='' />)}
      <h1 className="large">{name}</h1>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;

