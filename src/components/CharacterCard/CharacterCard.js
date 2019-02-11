import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { COLORS, CHARACTER_STATUS } from '../../constants';

const { Meta } = Card;

export default class CharacterCard extends Component {
  render() {
    const { character } = this.props;
    return (
      <Card
        style={{ width: 300 }}
        cover={
          <Link to={`/character/${character.id}`}>
            <figure className="character-card-container">
              <img src={character.image} alt="Thumb" />
            </figure>
          </Link>
        }>
        <Meta
          avatar={
            <Avatar
              style={{
                border: `2px solid ${
                  character.status === CHARACTER_STATUS.ALIVE
                    ? COLORS.CHARACTER_ALIVE
                    : character.status === CHARACTER_STATUS.DEAD
                    ? COLORS.CHARACTER_DEAD
                    : COLORS.CHARACTER_UNKNOWN
                }`,
              }}
              src={character.image}
            />
          }
          title={
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          }
        />
      </Card>
    );
  }
}
