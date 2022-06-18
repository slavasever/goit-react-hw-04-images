import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import s from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

const API_KEY = '26121034-8b2b223e077b6bd26f41dbdcc';
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  RESOLVED: 'resolved',
};

axios.defaults.baseURL = 'https://pixabay.com/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    getImages();
  }, [searchQuery, page]);

  async function getImages() {
    setStatus(STATUS.LOADING);

    try {
      const response = await axios.get(
        `/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const newImages = response.data.hits;
      const { length } = newImages;

      if (length === 0) {
        toast.warning(`No images by query "${searchQuery}"`);
        setStatus(STATUS.IDLE);
        return;
      }

      if (length > 11) {
        setImages(images => [...images, ...newImages]);
        setStatus(STATUS.RESOLVED);
      }

      if (length > 0 && length < 12) {
        toast.info(`That's all...`);
        setImages(images => [...images, ...newImages]);
        setStatus(STATUS.IDLE);
        return;
      }
    } catch (error) {
      toast.error(error.message);
      setStatus(STATUS.IDLE);
    }
  }

  const onSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setImages([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleModal = id => {
    const largeImage = images.find(image => image.id === id);

    setLargeImageURL(largeImage.largeImageURL);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(isModalVisible => !isModalVisible);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} handleModal={handleModal} />
      {status === STATUS.LOADING && <Loader />}
      {status === STATUS.RESOLVED && <Button onClick={loadMore} />}
      {isModalVisible && <Modal src={largeImageURL} onClose={toggleModal} />}
      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
}

export default App;
