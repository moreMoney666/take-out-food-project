import ajax from "@/utils/request";
// export const reqLatestPositionList = (job, page, pageSize) => ajax.post('/careers', { job, page, pageSize })
//根据经纬度和条数获取商铺信息
export const reqRestaurantsByLocation = (longitude, latitude, limit) =>
  ajax.get(
    `/shopping/restaurants?latitude=${longitude}&longitude=${latitude}&limit=${limit}`
  );
//根据商铺获取食品分类列表
export const reqFoodListByRestaurantId = restaurantId =>
  ajax.get(`/shopping/v2/menu?restaurant_id=${restaurantId}`);
//根据食品分类列表获取食品列表
export const reqFoodsByCategoryId = categoryId =>
  ajax.get(`/shopping/v2/menu/${categoryId}`);
//获取评价分类
// https://elm.cangdu.org/ugc/v2/restaurants/:restaurant_id/ratings/tags
export const reqAppraiseByRestaurantId = restaurantId =>
  ajax.get(`/ugc/v2/restaurants/${restaurantId}/ratings/tags`);

//获取城市列表
export const reqCityList = () =>
  ajax.get("https://elm.cangdu.org/v1/cities?type=hot");

//根据关键词获取商铺分类列表
export const reqShopListByKeyword = ({ geohash, shopKeyword }) =>
  ajax.get(
    `https://elm.cangdu.org/v4/restaurants?geohash=${geohash}&keyword=${shopKeyword}`
  );
export const getresrant = () => {
  return ajax.get(`/shopping/restaurants?latitude=31.22967&longitude=121.4762`);
};
