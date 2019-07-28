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
    title: 'Тип',
    dataIndex: 'kind.name',
    key: 'kind.id',
  },
  {
    title: 'Контракт',
    dataIndex: 'contract.code',
    key: 'contract.id',
  }
];
export default class Materials extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { materials: [] };
    Connector.client().query({
      query: gql`
      {
        materials {
          id
          name
          kind {
            id
            name
          }
          contract {
            id
            code
            when
            finish
          }
        }
      }
      `
    })
      .then(result => this.setState({ materials: result.data.materials }));
  }
  render() {
    return (
      <Root>
        <Table
          dataSource={this.state.materials}
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