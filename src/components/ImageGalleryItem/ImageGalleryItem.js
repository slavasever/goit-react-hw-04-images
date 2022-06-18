import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, handleClick, id }) => {
  return (
    <li className={s.item}>
      <img
        src={src}
        alt="#"
        className={s.image}
        onClick={() => handleClick(id)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
