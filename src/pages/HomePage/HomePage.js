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
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <div
      className="scrollbar-content"
        style={{ height: '100%', overflow: 'auto', overflowX: "hidden" }}
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
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 5,
            }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card
                  style={{ width: 300 }}
                  cover={<Link to={`/${item.id}`}><img alt="example" src={item.image} /></Link>}>
                  <Meta
                    avatar={<Avatar src={item.image} />}
                    title={<Link to={`/${item.id}`}>{item.name}</Link>}
                  />
                </Card>
              </List.Item>
            )}>
            {this.state.loading && this.state.hasMore && <Spin style={{marginTop: "100px"}} indicator={antIcon}/>}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default withRouter(HomePage);
