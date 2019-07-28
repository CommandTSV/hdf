import * as React from 'react'
import styled from 'styled-components'
import { Pagination, Table } from 'antd';
import { gql } from "apollo-boost";
import Connector from '../../apollo'
const Root = styled.div`

`
const columns = [
  {
    title: 'Логин',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
  }
];
export default class Users extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { users: [] };
    Connector.client().query({
      query: gql`
      {
        users {
          id
          username
          firstName
          lastName
          role
        }
      }
      `
    })
      .then(result => this.setState({ users: result.data.users }));
  }
  render() {
    return (
      <Root>
        <Table
          dataSource={this.state.users}
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