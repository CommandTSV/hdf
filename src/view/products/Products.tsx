import * as React from 'react'
import styled from 'styled-components'
import { Input, Card, Select, Modal, Button, Pagination, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import { gql } from "apollo-boost";
import Connector from '../../apollo'
import moment from 'moment';
const Root = styled.div`

`
const states = {
    made: 'Произведено',
    sold: 'Продано',
    resold: 'Перепродано',
    used: 'Эксплуатируется',
    rejected: 'Дефектное',
    recycled: 'Утилизировано'
}
const columns = [
    {
        title: 'Название',
        dataIndex: 'batch.name',
        key: 'batch.id',
    },
    {
        title: 'Произведено',
        dataIndex: 'when',
        key: 'when',
    },
    {
        title: 'Состояние',
        dataIndex: 'state',
        key: 'state',
    }
];
class Products extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { products: [], visible: false, loading: false };
        Connector.client().query({
            query: gql`
            {
                products {
                  id
                  state
                  when
                  batch {
                    id
                    name
                    code
                  }
                }
              }
      `
        })
            .then(result => this.setState({
                products:
                    result.data.products.map(row => ({
                        ...row,
                        when: moment(Number(row.when)).format('DD-MM-YYYY'),
                        state: states[row.state]
                    }))
            }));
    }
    onRowClick(id) {
        this.props.history.push(`/product/${id}`)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <Root>
                <Modal
                    visible={visible}
                    title="Добавление изделия"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Отменить
            </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Сохранить
            </Button>,
                    ]}
                >
                    <Card size="small" title="Выбрать исходные материалы">
                        <Select style={{ width: '100%' }}>
                            <Option value="1">Пружина</Option>
                            <Option value="2">ПЭТ</Option>
                            <Option value="3">Стержень химический</Option>
                            <Option value="4">Упаковка индивидуальная</Option>
                            <Option value="5">Тара картонная</Option>
                        </Select>
                        <Input placeholder="Количество" />
                    </Card>

                </Modal>
                <Table
                    dataSource={this.state.products}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => { this.onRowClick(record.id) },
                        };
                    }}
                    footer={() => <Button type="primary" onClick={this.showModal}>Добавить</Button>}
                />
            </Root>
        )
    }
}

export default withRouter(Products)