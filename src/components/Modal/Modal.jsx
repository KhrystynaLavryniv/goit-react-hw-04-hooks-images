import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.style';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClick, children }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClick();
      }
      console.log(evt.code);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClick();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};
export default Modal;
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
