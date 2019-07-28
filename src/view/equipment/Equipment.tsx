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
    title: 'Описание',
    dataIndex: 'details',
    key: 'details',
  }
];
export default class Equipment extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { equipment: [] };
    Connector.client().query({
      query: gql`
      {
        equipment {
          id
          name
          details
        }
      }
      `
    })
      .then(result => this.setState({ equipment: result.data.equipment }));
  }
  render() {
    return (
      <Root>
        <Table
          dataSource={this.state.equipment}
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