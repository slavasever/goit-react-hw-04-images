import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { inputValue } = this.state;

    if (inputValue.trim() === '') {
      toast.warning('Please, enter something...');
      return;
    }

    onSubmit(inputValue);
  };

  handleChange = event => {
    const inputValue = event.currentTarget.value;

    this.setState({
      inputValue,
    });
  };

  render() {
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.searchFormButton}>
              <span className={s.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={s.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.inputValue}
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
