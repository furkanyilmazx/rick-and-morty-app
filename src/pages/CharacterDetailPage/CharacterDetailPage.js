import React, { Component } from 'react';
import { Skeleton, Row, Col, Card, Icon, Button, Badge } from 'antd';
import { Character, Episode } from '../../models';
import { withRouter, Link } from 'react-router-dom';

const { Meta } = Card;

class CharacterDetailPage extends Component {
  state = {
    character: undefined,
    episode: undefined,
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    Character.get({ id: this.props.match.params.id }).then(
      async ({ model }) => {
        model.episode = await model.episode.map(async (episode) => {
          const response = await fetch(episode);
          const json = await response.json();
          return json;
        });
        model.episode = await Promise.all(model.episode);
        this.setState({
          character: model,
          loading: false,
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button.Group>
          <Button type="primary">
            <Icon type="left" />
            Go Back
          </Button>
        </Button.Group>
        <Row>
          <Skeleton
            loading={this.state.loading}
            avatar
            paragraph={{ rows: 4 }}
            active>
            {this.state.character && (
              <React.Fragment>
                <Col span={2}>
                  <img
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '50%',
                      margin: 'auto',
                      display: 'block',
                    }}
                    alt="example"
                    src={this.state.character.image}
                  />
                </Col>
                <Col span={20}>
                  <Row>{this.state.character.name}</Row>
                  <Row>{this.state.character.location.name}</Row>
                  <Row>
                    {' '}
                    <span>
                      <i
                        className={`fa fa-${this.state.character.gender.toLowerCase()}`}
                      />
                      {this.state.character.gender}
                    </span>
                  </Row>
                  <Row>
                    {' '}
                    <Badge
                      status={
                        this.state.character.status === 'Alive'
                          ? 'success'
                          : this.state.character.status === 'Dead'
                          ? 'error'
                          : 'default'
                      }
                      text={this.state.character.status}
                    />
                  </Row>
                  <Row>
                    <Col>
                      {JSON.stringify(this.state.character.episode)} fdsf
                    </Col>
                  </Row>
                </Col>
              </React.Fragment>
            )}
          </Skeleton>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(CharacterDetailPage);
