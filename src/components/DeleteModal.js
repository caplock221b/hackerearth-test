import React from 'react'

const DeleteModal = ({ close }) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <h3>Delete Alert</h3>
                <h2>Item has been deleted.</h2>
                <button onClick={close}>OK</button>
            </div>
        </div>
    )
}

export default DeleteModal
