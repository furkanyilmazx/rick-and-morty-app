import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Skeleton, Row, Col, Icon, Button, Badge, Table } from 'antd';
import RowCol from './components/RowCol';
import { loadCharacter } from './actions';
import { COLUMNS } from './constants';
import { CHARACTER_STATUS } from '../../constants';

import './index.scss'

class CharacterDetailPage extends Component {
  componentDidMount() {
    this.props.loadCharacter(this.props.match.params.id);
  }

  render() {
    const { character, characterLoading } = this.props;
    const dataSet = character
      ? [
          {
            label: 'Name',
            value: character.name,
          },
          {
            label: 'Location',
            value: character.location.name,
          },
          {
            label: 'Species',
            value: character.name,
          },
          {
            label: 'Gender',
            value: (
              <span>
                <i className={`fa fa-${character.gender.toLowerCase()}`} />
                {character.gender}
              </span>
            ),
          },
          {
            label: 'Status',
            value: (
              <Badge
                status={
                  character.status === CHARACTER_STATUS.ALIVE
                    ? 'success'
                    : character.status === CHARACTER_STATUS.DEAD
                    ? 'error'
                    : 'default'
                }
                text={character.status}
              />
            ),
          },
        ]
      : [];

    return (
      <Row className="episodes scrollbar-content">
        <Skeleton loading={characterLoading} avatar active>
          {character && (
            <React.Fragment>
              <Col span={3} className="profile-img">
                <img alt={character.image} src={character.image} />
                <Button block>
                  <Link to="/">
                    <Icon type="left" />
                    Go Back
                  </Link>
                </Button>
              </Col>
              <Col span={21}>
                {dataSet.map((item, index) => (
                  <RowCol key={index} label={item.label} value={item.value} />
                ))}
                <Row>
                  <Table
                    rowKey={`${character.id}`}
                    pagination={false}
                    dataSource={character.episode}
                    columns={COLUMNS}
                  />
                </Row>
              </Col>
            </React.Fragment>
          )}
        </Skeleton>
      </Row>
    );
  }
}

CharacterDetailPage.propTypes = {
  character: PropTypes.object,
  characterLoading: PropTypes.bool,
  loadCharacter: PropTypes.func,
};

const mapStateToProps = (state) => ({
  characterLoading: state.characterDetailPageReducer.characterLoading,
  character: state.characterDetailPageReducer.character,
});

const mapDispatchToProps = (dispatch) => ({
  loadCharacter: (characterId) => dispatch(loadCharacter(characterId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CharacterDetailPage));
