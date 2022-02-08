import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';

import {
  Searchbox,
  ButtonSearch,
  SearchInput,
  SearchForm,
} from './Searchbar.style';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return toast('Please, fill in the field of search');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Searchbox>
      <SearchForm onSubmit={handleSubmit}>
        <ButtonSearch type="submit" aria-label="search">
          <ImSearch />
        </ButtonSearch>
        <SearchInput
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbox>
  );
};
export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
