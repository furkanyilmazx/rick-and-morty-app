import React, { Component } from 'react';
import { Skeleton, Row, Col, Card, Icon, Button, Badge, Table } from 'antd';
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
          /*json.characters = await json.characters.map(async (character) => {
            const response = await fetch(character);
            const json = await response.json();
            return json;
          });

          json.characters = await Promise.all(json.characters);*/
          return json;
        });
        model.episode = await Promise.all(model.episode);
        console.log(model.episode);

        this.setState({
          character: model,
          loading: false,
        });
      }
    );
  }

  render() {
    const columns = [
      {
        title: 'Episode',
        dataIndex: 'episode',
        key: 'episode',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Air Date',
        dataIndex: 'air_date',
        key: 'air_date',
      },
    ];

    return (
      <React.Fragment>
        <Row className="fyx-episodes">
          <Skeleton loading={this.state.loading} avatar active>
            {this.state.character && (
              <React.Fragment>
                <Col span={3} className="profile-img">
                <img
                    alt={this.state.character.image}
                    src={this.state.character.image}
                  />
                  <Button  block>
                    <Link to="/">
                      <Icon type="left" />
                      Go Back
                    </Link>
                  </Button>
                 
                </Col>
                <Col span={21}>
                  <Row>
                    <Col span={2} className="label">
                      Name
                    </Col>
                    <Col span={20} className="value">
                      {this.state.character.name}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2} className="label">
                      Location
                    </Col>
                    <Col span={20} className="value">
                      {this.state.character.location.name}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2} className="label">
                      Species
                    </Col>
                    <Col span={20} className="value">
                      {this.state.character.species}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2} className="label">
                      Gender
                    </Col>
                    <Col span={20} className="value">
                      <span>
                        <i
                          className={`fa fa-${this.state.character.gender.toLowerCase()}`}
                        />
                        {this.state.character.gender}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2} className="label">
                      Status
                    </Col>
                    <Col span={20} className="value">
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
                    </Col>
                  </Row>
                  <Row>
                    <Table
                      pagination={false}
                      dataSource={this.state.character.episode}
                      columns={columns}
                    />
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
