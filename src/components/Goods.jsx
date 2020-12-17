import React from 'react';
import { connect } from 'dva';
import { Card, Button, Popover, List, Menu, Tooltip } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
import {
    SyncOutlined,
} from '@ant-design/icons';
import GoodStyle from '../routes/IndexPage.css'

@connect(({ shopData, cart }) => ({
    productData: shopData.productData,
    cartData: cart.cartData,
    amount: cart.amount,
    count: cart.count
}))

class Goods extends React.Component {
    constructor() {
        super()
        this.state = {
            key: 0
        }
    }

    async UNSAFE_componentWillMount() {
        const { dispatch } = this.props
        await this.setState({
            key: 1
        })
        await dispatch({
            type: 'shopData/GetData'
        })
        if (window.localStorage.cartData) {
            dispatch({
                type: 'cart/setStorage'
            })
        }
        await this.setState({
            key: 0
        })
    }

    addCart = async (data, size) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'cart/addCart',
            payload: {
                data: data,
                size: size
            }
        })
    }

    onCollate = async (key) => {
        const { productData, dispatch } = this.props
        await dispatch({
            type: 'shopData/screenData',
            payload: {
                data: productData,
                key,
                i: 0
            }
        })
    }

    render() {
        const { productData } = this.props;
        const { SubMenu } = Menu;
        // const { Option } = Select;

        const list = (productData || []).map((item, key) => (
            <Card className="cart" style={{ width: 300, margin: 10, borderRadius: "2%" }} key={key}>
                <Tooltip placement="topLeft" title="Free Shopping" arrowPointAtCenter>
                   <img src={`./img/${item.sku}_1.jpg`} alt={item.title + "_1.jpg"} style={{ width: 252 }}></img>
                </Tooltip>
                
                <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                <hr style={{ width: "10%", backgroundColor: 'black' }} />
                <h2 style={{ textAlign: 'center' }}>{item.currencyFormat + item.price}</h2>
                <Popover
                    content={
                        <List
                            size="small"
                            dataSource={item.availableSizes}
                            renderItem={size => <List.Item><Button onClick={() => this.addCart(item, size)} block>{size}</Button></List.Item>}
                        />
                    }
                    title="请选择需要的尺码"
                    trigger="click">
                    <Button style={{ backgroundColor: 'black', color: "#fff" }} size="large" block>Add to cart</Button>
                </Popover>
            </Card>
        ));

        // function handleChange(value) {
        //   console.log(`selected ${value}`);
        // }

        return (
            <>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h3>{` ${productData.length} Product(s) found`}</h3>
                    </div>
                    <div style={{ display: "flex", marginRight: '50px', alignItems: 'center' }}>
                        <h3 style={{ fontWeight: 'bold' }} onChange={this.handleSizeChange}>Order by &nbsp;</h3>

                        {/* <Select defaultValue="Comprehensive Ranking" style={{ width: 180 }} onChange={handleChange}>
                            <Option value="Comprehensive Ranking" key="setting:1" onClick={() => this.onCollate()}>
                                Comprehensive Ranking
                            </Option>
                            <Option value="Lowest to Highest" key="setting:2" onClick={() => this.onCollate('up')}>
                                Lowest to Highest
                            </Option>
                            <Option value="Highest to Lowest" key="setting:3" onClick={() => this.onCollate('down')}>
                                Highest to Lowest
                            </Option>
                        </Select> */}

                        <span >
                            <Menu theme="dark" style={{color:'white'}} mode="horizontal" defaultSelectedKeys={['1']} >
                                <SubMenu icon={<ProjectOutlined />} className={GoodStyle.menu} title="Comprehensive Ranking">
                                    <Menu.Item key="setting:1" onClick={() => this.onCollate()}>Comprehensive Ranking</Menu.Item>
                                    <Menu.Item key="setting:2" onClick={() => this.onCollate('up')}>Lowest to Highest</Menu.Item>
                                    <Menu.Item key="setting:3" onClick={() => this.onCollate('down')}>Highest to Lowest</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </span>
                    </div>

                </div>



                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                    {this.state.key ? (<div className="icons-list" style={{ fontSize: "50px", textAlign: "center" }}>
                        <SyncOutlined spin />
                    </div>) : list}
                </div>
                


            </>
        )
    }
}
export default Goods;