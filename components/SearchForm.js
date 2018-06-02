import React from 'react';

import { AuthAlert } from './Alerts';
import SearchQuery from './SearchQuery';
import { AUTH_TOKEN, SEARCH_TERM } from '../client/constants';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    const searchTerm = localStorage.getItem(SEARCH_TERM) || '';
    this.state = { inputTerm: searchTerm, bookTitle: searchTerm };
    this.handleChange = ({ target }) =>
      this.setState({ inputTerm: target.value });
    this.handleSubmit = event => {
      event.preventDefault();
      this.setState(({ inputTerm }) => ({ bookTitle: inputTerm }));
      localStorage.setItem(SEARCH_TERM, this.state.inputTerm);
    };
  }
  render() {
    const { inputTerm, bookTitle } = this.state;
    return (
      <React.Fragment>
        {!localStorage.getItem(AUTH_TOKEN) && <AuthAlert text="add" />}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row d-flex align-items-center">
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label htmlFor="bookSearch" className="col-sm-2 col-form-label">
              Book Title:
            </label>
            <div className="col-sm-10 input-group">
              <input
                type="text"
                className="form-control"
                id="bookSearch"
                placeholder="Harry Potter"
                aria-label="Search for..."
                value={inputTerm}
                onChange={this.handleChange}
              />
              <span className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-warning"
                  aria-label="Submit search term"
                  disabled={!inputTerm}
                >
                  Search <i className="fas fa-search" />
                </button>
              </span>
            </div>
          </div>
        </form>
        {bookTitle && <SearchQuery {...{ bookTitle }} />}
      </React.Fragment>
    );
  }
}

export default SearchForm;
