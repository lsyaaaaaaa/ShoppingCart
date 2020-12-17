// import ShopData from '../assets/ShopData'
import Shop from '../services/ShopData'

export default {
  namespace: 'shopData',
  state: {
    productData: [],
    backupData: [],
  },
  effects: {
    *GetData({ payload }, { put,call}) {
      const res = yield call(Shop.getProducts);
      console.log(res);

      if (res) {
        yield put({
          type: 'setProductData',
          data: res.data.products
        })
        yield put({
          type: 'setStaticData',
          data: res.data.products
        })
      }else{
        alert("API调用出现问题")
        console.log("API调用出现问题");
        
      }
    },
    *screenData({ payload:{data,key,i} }, {put }) {
      let arr = [];
      if(i){
        if (key) {
          data.forEach(item => {
            for (let i = 0; i < item.availableSizes.length; i++) {
              if (item.availableSizes[i] === key) {
                arr.push(item)
              }
            }
          })
        }else{
          arr=data
        }
      }else{
        if(key==="up"){
          arr = data.sort((a, b) => (a['price'] - b['price']))
          // console.log("//////////!!!!!!!!!!!",arr);
        }else if(key==="down"){
          arr = data.sort((a, b) => (b['price'] - a['price']))
          // console.log("//////////!!!!!!!!!!!222",arr);
        }else{
          arr = data.sort((a, b) => (a['id'] - b['id'] ))
        }
      }
      // res = yield call(Shop.getCollate,data,key);
      // console.log("/////////////////",res);
      
      yield put({
        type: 'setData',
        data: [...arr]
      })
    }
  },
  reducers: {
    setProductData(state, payload) {
      return {
        ...state,
        productData: payload.data
      }
    },
    setStaticData(state, payload) {
      return {
        ...state,
        backupData: payload.data
      }
    },
    setData(state, payload) {
      return {
        ...state,
        productData: payload.data
      }
    }
  }
}