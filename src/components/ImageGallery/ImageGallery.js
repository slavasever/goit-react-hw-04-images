import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, handleModal }) => {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            handleClick={handleModal}
            id={id}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
