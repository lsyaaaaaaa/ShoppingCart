import React from 'react';
import { connect } from 'dva';
import { Layout, Drawer, Button, Badge } from 'antd';
import {ShoppingCartOutlined } from '@ant-design/icons';
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
    const { Content, Sider } = Layout;
    const {count} = this.props
    return (
      <div>
        <Layout style={{backgroundColor:"white"}}>
          <Sider theme="light" style={{  zIndex: 1, width: '100%', marginLeft:74, marginTop:84 }}>
            <div className="logo" />
            <Screen />
          </Sider>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 , background:"white" }}>
            <div className={styles.productlist} style={{ padding: 24, minHeight: 580, display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
              <Goods />
            </div>
          </Content>
          <Sider theme="light" style={{ textAlign: 'right',fontSize:"30px" }}>
            <div style={{ zIndex: 2,top: 16, left: "80%" }} >
              <Badge count={count} showZero offset={[-9, 28]}  size="small" style={{backgroundColor:'#1890FF'}}>
                <Button icon={<ShoppingCartOutlined />} style={{fontSize:"16px", backgroundColor:'black', border:'none'}} type="primary" size="large" shape="" onClick={this.showDrawer} >
        
                </Button>
              </Badge>
            </div>
          </Sider>
        </Layout>
        
        <Drawer
          title='Cart'
          width="550"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Cart />
        </Drawer>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
