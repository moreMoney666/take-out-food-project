//引入
import Food from '@views/AAA/Food'
import addFood from '@/views/AAA/Food/addFood'
import addFood from '@/views/AAA/Food/footList'
export default[
    {
        path:'/food',
        component:Food,
        children:[
           {
            path: "/food/addFood",
            component:addFood
           },
           {
            path: "/food/foodList",
            component: foodList
    
           }
        ]
    }
]