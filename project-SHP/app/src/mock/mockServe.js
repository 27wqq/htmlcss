//先引入mockjs模块
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
import useraddressInfo from './useraddressInfo.json'
//把JSON数据格式引入进来【JSON数据格式根本没有对外暴露，但是可以引入】
//因为webpack默认对外暴露的：图片、JSON数据格式

//mock数据:第一个参数请求地址  第二个参数是请求的数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});
Mock.mock("/mock/useraddressInfo",{code:200,data:useraddressInfo});
