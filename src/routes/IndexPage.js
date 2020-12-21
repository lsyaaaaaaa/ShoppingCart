import React from 'react';
import { connect } from 'dva';
import { Layout, Drawer, Button, Badge, Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from "./IndexPage.css"
import Goods from '../components/Goods'
import Cart from '../components/Cart';
import Screen from '../components/Screen'

@connect(({ cart }) => ({
  count: cart.count
}))
class IndexPage extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };


  render() {
    const { Content, Sider, Footer } = Layout;
    const { count } = this.props
    return (
      <div >
        <Row >
          <Layout style={{ background: 'white' }}>
            <Col xs={6} xl={4}>
              <Sider theme="light" style={{ zIndex: 1, width: '100%', marginLeft: 74, marginTop: 84 }}>
                <div className="logo" />
                <Screen />
              </Sider>
            </Col>
            <Col xs={18} xl={20}>
              <Layout style={{ background: 'white' }}>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: "white" }}>
                  <div className={styles.productlist} style={{ padding: 24, minHeight: 580, display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', width: '100%' }}>
                    <Goods />
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center', fontSize: "30px" }}></Footer>
              </Layout>
            </Col>
            <div style={{ zIndex: 2, top: 16, left: "80%" }} >
              <Badge count={count} showZero offset={[-9, 28]} size="small" style={{ backgroundColor: '#1890FF' }}>
                <Button icon={<ShoppingCartOutlined />} style={{ fontSize: "16px", backgroundColor: 'black', border: 'none' }} type="primary" size="large" shape="" onClick={this.showDrawer} >

                </Button>
              </Badge>
            </div>
            <Drawer
              title='Cart'
              width="550"
              placement="right"
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Cart />
            </Drawer>
          </Layout>
        </Row>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
