import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import imgApi from "./services/img-api";

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { Button } from './components/ImageGallery/ImageGallery.style';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

const perPage = 12;
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(12);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    console.log(searchQuery);
  };

  // const onClickBtn = () => {
  //   setLoading(true);
  // };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImg = async () => {
      setLoading(true);

      return await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=24424361-80a045fa2441dce42755517a4&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          setImages(images => [...images, ...data.hits]);
          if (data.hits.length === 0) {
            return toast.error('Sorry! Nothing was found for your query.');
          }
          // if (searchQuery) {
          // }
          // setPage(page => page + 1);
          // console.log(data.hits);
          // console.log(images);

          // console.log(images.length);
          // console.log(images.length / perPage);

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchImg();
  }, [searchQuery, page]);

  const toggleModal = (largeImage, tags) => {
    setShowModal(showModal => !showModal);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onLoadMoreBtn = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {loading && <Loader />}

      {images.length !== 0 && Number.isInteger(images.length / perPage) && (
        <Button type="button" onClick={onLoadMoreBtn}>
          Load more
        </Button>
      )}
      {showModal && (
        <Modal onClick={toggleModal}>
          <img src={largeImage} alt={tags} />
        </Modal>
      )}
      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          "Failed to download, please try again"
        </p>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};
export default App;
