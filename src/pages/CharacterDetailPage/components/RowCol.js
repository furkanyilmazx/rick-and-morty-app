import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class RowCol extends Component {
  render() {
      const {label, value} = this.props;
    return (
      <Row>
        <Col span={2} className="label">
          {label}
        </Col>
        <Col span={20} className="value">
          {value}
        </Col>
      </Row>
    );
  }
}
