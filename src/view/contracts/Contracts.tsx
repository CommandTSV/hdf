import * as React from 'react'
import styled from 'styled-components'
import { Pagination, Table } from 'antd';
import { gql } from "apollo-boost";
import moment from 'moment';
import Connector from '../../apollo'
const Root = styled.div`

`
const columns = [
  {
    title: 'Номер',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Дата подписания',
    dataIndex: 'when',
    key: 'when',
  },
  {
    title: 'Действителен до',
    dataIndex: 'finish',
    key: 'finish',
  },
  {
    title: 'Контрагент',
    dataIndex: 'second.name',
    key: 'second.id',
  },
];
export default class Contracts extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { contracts: [] };
    Connector.client().query({
      query: gql`
      {
        contracts {
          code
          when
          finish
          first {
            id
            vat
            country
            name
          }
          second {
            id
            vat
            country
            name
          }
        }
      }
      `
    })
      .then(result => this.setState({
        contracts:
          result.data.contracts.map(row => ({
            ...row,
            when: moment(Number(row.when)).format('DD-MM-YYYY'),
            finish: moment(Number(row.finish)).format('DD-MM-YYYY')
          }))
      }));
  }
  render() {
    return (
      <Root>
        <Table
          dataSource={this.state.contracts}
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