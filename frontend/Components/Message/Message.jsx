import React from 'react';

const Message = ({ sender, text }) => {
    return (
        <div className="message">
            <p className="sender">{sender}</p>
            <p className="content">{text}</p>
        </div>
    );
};

export default Message;
