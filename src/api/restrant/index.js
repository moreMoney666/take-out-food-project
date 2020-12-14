import request from '@/utils/request'
export default {

  //获取餐馆列表
  getresrant(){
    return request.get('/shopping/restaurants?latitude=31.22967&longitude=121.4762')
  },

  // 添加餐厅
  addresrant(restrant){
    if(restrant.id){
      // 更新餐厅
      return request.put('/shopping/updateshop',restrant)
      // 添加餐厅
    }else{
      return request.post('/shopping/addshop',restrant)
    }

  }
}
