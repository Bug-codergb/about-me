# 如何基于Vue3 + Element-Plus封装一个表格
## 表格结构

通过```tableColumns```遍历获取```el-table-column```的每一项

```tableColumns```数据结构
```js
let tableColumns=[
  {
    label:"单元A",
    prop:"unit-a",
    isShow:true,
    width: 180,
    render:()=>{
      return <div></div>
    }
  }
]
```
## 网络请求（通过封装hooks实现）
```js
import { reactive, computed, toRefs } from "vue";
export const useTable = (api, initParam = {}, isPageable = true, dataCallBack, requestError = null) => {
  const state = reactive({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {}
  });

  /**
   * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   * */
  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize
      };
    },
    set: newVal => {
      console.log("我是分页更新之后的值", newVal);
    }
  });

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async () => {
    if (!api) return;
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {});
      let { data } = await api({ ...state.searchInitParam, ...state.totalParam });
      dataCallBack && (data = dataCallBack(data));

      state.tableData = isPageable ? data.list : data;
      // 解构后台返回的分页数据 (如果有分页更新分页信息)

      if (isPageable) {
        state.pageable.total = data.total;
      }
    } catch (error) {
      console.log(error);
      requestError && requestError(error);
    }
  };

  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam = {};
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(state.totalParam, nowSearchParam);
  };

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNum = 1;
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam };
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = val => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = val => {
    state.pageable.pageNum = val;
    getTableList();
  };

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam
  };
};

```
## 组件的props
- columns
- data
- requestAuto
- pagination
- initParam
- toolButton
- dataCallback
- requestApi
