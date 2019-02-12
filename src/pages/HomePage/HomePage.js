import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Spin, message, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { loadCharacters, charactersAlreadyListed } from './actions';
import CharacterCard from '../../components/CharacterCard';
import { LIST_GRID } from './constants';

import '../Pages.scss';
import './index.scss';

class HomePage extends Component {
  state = {
    hasMore: true,
  };

  componentDidMount() {
    const {
      charactersApiInfo,
      loadCharacters,
      charactersAlreadyListed,
    } = this.props;
    // InfiniteScroll bug
    charactersApiInfo
      ? charactersAlreadyListed()
      : loadCharacters();
  }

  handleInfiniteOnLoad = (index) => {
    const { characters, charactersApiInfo, loadCharacters } = this.props;
    if (index === 1) return;
    if (charactersApiInfo && charactersApiInfo.count === characters.length) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
      });
      return;
    }
    loadCharacters(charactersApiInfo);
  };

  render() {
    const { scrollParentRef, handleInfiniteOnLoad } = this;
    const { characters, charactersLoading } = this.props;
    const { hasMore } = this.state;
    return (
      <div
        className="scrollbar-content"
        ref={(ref) => (this.scrollParentRef = ref)}>
        <InfiniteScroll
          initialLoad={true}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!charactersLoading && hasMore}
          getScrollParent={() => scrollParentRef}
          useWindow={false}>
          <List
            dataSource={characters}
            grid={LIST_GRID}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <CharacterCard character={item} />
              </List.Item>
            )}>
            {charactersLoading && hasMore && (
              <Spin
                indicator={
                  <Icon type="loading" style={{ fontSize: 24 }} spin />
                }
              />
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

HomePage.propTypes = {
  characters: PropTypes.array,
  charactersApiInfo: PropTypes.object,
  charactersLoading: PropTypes.bool,
  loadCharacters: PropTypes.func,
  charactersLoaded: PropTypes.func,
};

const mapStateToProps = (state) => ({
  charactersLoading: state.homePageReducer.charactersLoading,
  characters: state.homePageReducer.characters,
  charactersApiInfo: state.homePageReducer.charactersApiInfo,
});

const mapDispatchToProps = (dispatch) => ({
  loadCharacters: (index) => dispatch(loadCharacters(index)),
  charactersAlreadyListed: () => dispatch(charactersAlreadyListed()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomePage));
