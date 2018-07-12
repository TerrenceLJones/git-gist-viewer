import React from 'react';

const UserProfile = ({ user, onClickBackToResults }) => {
    if (!user) return '';
    const imgStyles = {
        borderRadius: '5px',
        height: '100px',
        width: '100px'
    };

    return (
        <div style={{margin: 'auto', width: '500px'}}>
            <button onClick={onClickBackToResults}>&lt;</button>
            <h1>{user.name}</h1>
            <img src={`${user.avatar_url}`} style={imgStyles} alt="" />
            <div>{user.userName}</div>
            <div>{user.company}</div>
            <div>{user.email}</div>
            <div>{user.bio}</div>
        </div>
    );
};

export default UserProfile;
