import React, { Component } from 'react';
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
const IDLE = 'idle';
const LOADING = 'loading';
const RESOLVED = 'resolved';

axios.defaults.baseURL = 'https://pixabay.com/api';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    status: IDLE,
    isModalVisible: false,
    largeImageURL: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const previousQuery = prevState.searchQuery;
    const currentQuery = this.state.searchQuery;
    const previousPage = prevState.page;
    const currentPage = this.state.page;

    if (currentQuery !== previousQuery || currentPage !== previousPage) {
      await this.getImages();
    }
  }

  async getImages() {
    const { searchQuery, page } = this.state;

    this.setState({
      status: LOADING,
    });

    try {
      const response = await axios.get(
        `/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (response.data.hits.length === 0) {
        toast.warning(`No images by query "${searchQuery}"`);
        this.setState({
          status: IDLE,
        });
        return;
      }

      if (response.data.hits.length > 0 && response.data.hits.length < 12) {
        toast.info(`That's all...`);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          status: IDLE,
        }));
        return;
      }

      if (response.data.hits.length > 11) {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          status: RESOLVED,
        }));
      }
    } catch (error) {
      toast.error(error.message);
      this.setState({
        status: IDLE,
      });
    }
  }

  onSubmit = searchQuery => {
    this.setState(prevState => {
      const previousQuery = prevState.searchQuery;

      if (previousQuery !== searchQuery) {
        return {
          searchQuery,
          images: [],
          page: 1,
        };
      }
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModal = id => {
    const largeImage = this.state.images.find(image => image.id === id);

    this.setState({
      largeImageURL: largeImage.largeImageURL,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  render() {
    const { images, status, isModalVisible, largeImageURL } = this.state;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} handleModal={this.handleModal} />
        {status === LOADING && <Loader />}
        {status === RESOLVED && <Button onClick={this.loadMore} />}
        {isModalVisible && (
          <Modal src={largeImageURL} onClose={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}

export default App;
