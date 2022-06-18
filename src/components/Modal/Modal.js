import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ src, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEscape = event => {
    if (event.code === 'Escape') onClose();
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt="#" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
