import * as React from 'react'
import styled from 'styled-components'

import moment from 'moment';
import { gql } from "apollo-boost";
import Connector from '../../apollo'
import { inject, observer } from 'mobx-react'
import { IStore, IProduct } from '../model'
import { Tree, Pagination, Table, Tabs, Row, Col, Card, List, Typography } from 'antd';


const { TabPane } = Tabs;
const { TreeNode } = Tree;
const Root = styled.div`

`
const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Количество',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Тип',
        dataIndex: 'kind.name',
        key: 'kind.name',
    },
    {
        title: 'Контракт',
        dataIndex: 'contract.code',
        key: 'contract.code',
    }
];
const states = {
    made: 'Произведено',
    sold: 'Продано',
    resold: 'Перепродано',
    used: 'Эксплуатируется',
    rejected: 'Дефектное',
    recycled: 'Утилизировано'
}

function callback(key) {
    console.log(key);
}


export default class Product extends React.Component<IProductProps, any> {
    constructor(params) {
        super(params);
        this.state = { product: undefined, ledger: [], materials: [], products: [] };
        this.fetchData(params.match.params.id)
    }

    fetchData(id) {
        Connector.client().query({
            query: gql`
        {
            readProduct(id: ${id}) {
                id
                state
                when
                batch {
                id
                name
                code
                }
            }
            getLedger(product: ${id}) {
                id
                state
                when
            }

            productMaterials(product:${id}) {
                id
                name
                quantity
                kind {
                  name
                    }
                contract {
                  id
                  code
                }
              }

              productProducts(product: ${id}) {
                id
                batch {
                  id
                  name
                }
              }
        }
                      
      `
        })
            .then(result =>
                this.setState({
                    ledger: result.data.getLedger.map(row => ({
                        ...row,
                        when: moment(Number(row.when)).format('DD-MM-YYYY HH:MM'),
                        state: states[row.state]
                    })),
                    materials: result.data.productMaterials,
                    products: result.data.productProducts,
                    product: {
                        ...result.data.readProduct,
                        when: moment(Number(result.data.readProduct.when)).format('DD-MM-YYYY HH:MM'),
                        state: states[result.data.readProduct.state]
                    }
                }
                )
            );
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('prev', prevProps, this.props)
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchData(this.props.match.params.id);
        }
    }

    selectItem(selectedKeys, e) {
        this.props.history.push(`/product/${selectedKeys[0]}`)
        this.forceUpdate()
    }
    render() {

        const loop = () =>
            this.state.products.map(item => {

                return (
                    <TreeNode key={item.id} title={`${item.batch.name} #${item.batch.id}`}>

                    </TreeNode>
                );


            });

        return (
            <Root>
                <Row>
                    <Col span={10}><Card style={{ width: '100%', minHeight: '600px' }}>
                        <Tree showLine defaultExpandAll={true}
                            onSelect={(selectedKeys, e) => this.selectItem(selectedKeys, e)}
                        >
                            <TreeNode key={this.state.product && this.state.product.id} title={this.state.product && `${this.state.product.batch.name} #${this.state.product.id}`}>
                                {loop()}
                            </TreeNode>

                        </Tree>
                    </Card>
                    </Col>
                    <Col span={14}>
                        <Card style={{ width: '100%', minHeight: '600px' }}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Использованные материалы" key="1">
                                    <Table
                                        dataSource={this.state.materials}
                                        columns={columns}
                                        pagination={{ pageSize: 10 }}

                                    />
                                </TabPane>
                                <TabPane tab="Журнал событий" key="2">

                                    <List
                                        bordered
                                        dataSource={this.state.ledger}
                                        renderItem={item => (
                                            <List.Item>
                                                <Typography.Text mark>{item.state}</Typography.Text> {item.when}
                                            </List.Item>
                                        )}
                                    />

                                </TabPane>
                            </Tabs>
                        </Card></Col>
                </Row>
            </Root >
        )
    }
}