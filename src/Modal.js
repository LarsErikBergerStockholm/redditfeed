import React from 'react';
import ReactDOM from 'react-dom';

import Entry from './Entry';

const Modal = ({ isShowing, hide, postItem }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
      <div className="modal">
          <button type="button" className="modal-close-button" data-dismiss="modal" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className='modalText'>
            <p>{postItem.data.selftext}</p>
          </div>
         </div>
  </React.Fragment>, document.body
) : null;

export default Modal;
