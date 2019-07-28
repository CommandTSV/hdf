import * as React from 'react'
import styled from 'styled-components'
import { Pagination, Table } from 'antd';
import { gql } from "apollo-boost";
import Connector from '../../apollo'
const Root = styled.div`

`
const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Код',
    dataIndex: 'code',
    key: 'code',
  }
];
export default class Batches extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { batches: [] };
    Connector.client().query({
      query: gql`
      {
        batches {
          id
          name
          code
        }
      }
      `
    })
      .then(result => this.setState({ batches: result.data.batches }));
  }
  render() {
    return (
      <Root>
        <Table
          dataSource={this.state.batches}
          columns={columns}
          pagination={{ pageSize: 10 }}
        /*  onRow={(record, rowIndex) => {
           return {
             onClick: event => { this.onRowClick(record) },
           };
         }} */
        />
      </Root>
    )
  }
}