import React, { Component } from 'react';
import { List, Avatar, Spin, Card, message, Badge, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import Character from '../../models/character';
import InfiniteScroll from 'react-infinite-scroller';

import '../Pages.scss';
const { Meta } = Card;
class HomePage extends Component {
  state = {
    data: [],
    apiInfo: undefined,
    loading: false,
    hasMore: true,
    page: false,
  };

  handleInfiniteOnLoad = (index) => {
    console.log(index, this.props.location.pathname);
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (this.state.apiInfo && index > this.state.apiInfo.pages) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    Character.all({ queryParams: { page: index } }).then(
      ({ resultList, response }) => {
        data = data.concat(resultList);
        this.setState({
          data,
          loading: false,
          apiInfo: response.info,
        });
      }
    );
  };

  render() {
    return (
      <div
        style={{ height: '100%', overflow: 'auto' }}
        ref={(ref) => (this.scrollParentRef = ref)}>
        <InfiniteScroll
          initialLoad={true}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          getScrollParent={() => this.scrollParentRef}
          useWindow={false}>
          <List
            dataSource={this.state.data}
            grid={{
              gutter: 8,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 8,
              xxl: 5,
            }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card
                  style={{ width: 300 }}
                  actions={[
                    <span>
                      <i className={`fa fa-${item.gender.toLowerCase()}`} />
                      {item.gender}
                    </span>,
                    <Badge
                      status={
                        item.status === 'Alive'
                          ? 'success'
                          : item.status === 'Dead'
                          ? 'error'
                          : 'default'
                      }
                      text={item.status}
                    />,
                    <Link className="btn-back" to={`/${item.id}`}>
                      <Icon
                        onClick={() => this.setState({ page: true })}
                        type="ellipsis"
                      />
                    </Link>,
                  ]}
                  cover={<img alt="example" src={item.image} />}>
                  <Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    description={<div>{item.species}</div>}
                  />
                </Card>
              </List.Item>
            )}>
            {this.state.loading && this.state.hasMore && <Spin />}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default withRouter(HomePage);
