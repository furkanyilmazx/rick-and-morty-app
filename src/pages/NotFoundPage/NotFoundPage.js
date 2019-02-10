import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fourhundredfour from '../../assets/images/NotFoundPage/404.svg';
import meteor from '../../assets/images/NotFoundPage/meteor.svg';
import astronaut from '../../assets/images/NotFoundPage/astronaut.svg';
import spaceship from '../../assets/images/NotFoundPage/spaceship.svg';
import './index.scss';

class NotFoundPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mars" />
        <img alt="logo-404" src={fourhundredfour} className="logo-404" />
        <img alt="meteor" src={meteor} className="meteor" />
        <p className="title">Oh no!!</p>
        <p className="subtitle">
          You’re either misspelling the URL <br /> or requesting a page that's
          no longer here.
        </p>
        <div align="center">
          <Link className="btn-back" to="/">
            BACK TO MARS
          </Link>
        </div>
        <img alt="astronaut" src={astronaut} className="astronaut" />
        <img alt="spaceship" src={spaceship} className="spaceship" />
      </React.Fragment>
    );
  }
}

export default NotFoundPage;
