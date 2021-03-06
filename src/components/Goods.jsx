import React from 'react';
import { connect } from 'dva';
import { Card, Button, Popover, List, Menu, Tooltip, notification, Row, Col } from 'antd';
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
            key: 0,
            visible: [],
            sizeKey: ''
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

    addCart = async (data, size, index, type) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'cart/addCart',
            payload: {
                data: data,
                size: size
            }
        })
        let arr = this.state.visible
        arr[index] = false
        this.setState({
            visible: arr,
        });
        notification[type]({
            message: '添加成功',
            description:
                '',
        });
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

    handleVisibleChange = (e, index) => {
        let arr = this.state.visible
        arr[index] = e
        this.setState({ visible: arr });
    };

    render() {
        const { productData } = this.props;
        const { SubMenu } = Menu;
        // const { Option } = Select;

        const list = (productData || []).map((item, key) => {
            let newPrice = item.price.toFixed(2) + ''
            const newPrices = newPrice.split(".");
            const num1 = newPrices[0] //整数
            const num2 = newPrices[1] //小数
            return (
                <Card className="cart" hoverable style={{ width: 300, margin: 10, borderRadius: "2%" }} key={key}>
                    <Tooltip placement="topLeft" title="Free Shopping" arrowPointAtCenter>
                        <img src={`./img/${item.sku}_1.jpg`} alt={item.title + "_1.jpg"} style={{ width: 252 }}></img>
                    </Tooltip>

                    <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                    <hr style={{ width: "10%", backgroundColor: 'black' }} />
                    {/* <h2 style={{ textAlign: 'center' }}>{item.currencyFormat + item.price}</h2> */}

                    <div style={{ textAlign: 'center' }}>
                        {/* <h3>{item.currencyFormat + num1 + '.' + num2}</h3> */}
                        <span style={{ fontSize: '20px' }}>{item.currencyFormat}</span>
                        <span style={{ fontSize: '30px' }}>{num1}</span>
                        <span>.</span>
                        <span style={{ fontSize: '20px' }}>{num2 ? num2 : 0}</span>
                    </div>

                    <Popover
                        content={
                            <List
                                size="small"
                                dataSource={item.availableSizes}
                                renderItem={size => <List.Item><Button onClick={() => this.addCart(item, size, key, 'success')} block>{size}</Button></List.Item>}
                            />
                        }
                        title="请选择需要的尺码"
                        visible={this.state.visible[key]}
                        trigger="click"
                        onVisibleChange={(e) => this.handleVisibleChange(e, key)}
                    >
                        <Button style={{ backgroundColor: 'black', color: "#fff" }} size="large" block>Add to cart</Button>
                    </Popover>
                </Card>
            )
        });

        // function handleChange(value) {
        //   console.log(`selected ${value}`);
        // }

        return (
            <>
                <div style={{ width: "100%", justifyContent: "space-between" }}>
                    <Row>
                        <Col xs={24} xl={20} style={{width:'100%'}}>
                            <div className={GoodStyle.menu}>
                                <h3>{` ${productData.length} Product(s) found`}</h3>
                            </div>
                        </Col>
                        <Col xs={24} xl={4} style={{width:'100%'}}>
                            <div className={GoodStyle.menu} style={{ display: "flex", marginRight: '0px', alignItems: 'right' }}>
                                <h3 style={{ fontWeight: 'bold' }} onChange={this.handleSizeChange}>Order by &nbsp;</h3>
                                <span >
                                    <Menu theme="dark" style={{ color: 'white' }} mode="horizontal" defaultSelectedKeys={['1']} >
                                        <SubMenu icon={<ProjectOutlined />}  title="Ranking">
                                            <Menu.Item key="setting:1" onClick={() => this.onCollate()}>Ranking</Menu.Item>
                                            <Menu.Item key="setting:2" onClick={() => this.onCollate('up')}>Lowest to Highest</Menu.Item>
                                            <Menu.Item key="setting:3" onClick={() => this.onCollate('down')}>Highest to Lowest</Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                </span>
                            </div>
                        </Col>
                    </Row>
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