import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import TvShowListItem from './TvShowListItem';
import addTvShowData from '../actions/tvShows';

const TvShowList = ({ dispatch, tvShows }) => {
  useEffect(async () => {
    const result = await axios.get('http://api.tvmaze.com/schedule?country=CN&date=2020-12-01');
    const { data } = result;
    dispatch(addTvShowData(data));
  }, []);
  return (
    <>
      <h1>Tv data items goes here!</h1>
      {tvShows.map(show => <TvShowListItem key={show.id} show={show} />)}
    </>
  );
};

const mapStateToProps = ({ tvShows }) => ({
  tvShows,
});

TvShowList.propTypes = {
  dispatch: propTypes.func.isRequired,
  tvShows: propTypes.arrayOf(propTypes.object),
};

TvShowList.defaultProps = {
  tvShows: 'no value',
};

export default connect(mapStateToProps)(TvShowList);
