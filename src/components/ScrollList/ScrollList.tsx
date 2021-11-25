/**
 * @author liu yunxiang
 * @description 对上拉加载和下拉刷新列表组件进行业务封装，抽离出下拉刷新和上拉加载方法来对接业务
 */
import React, { useState, useRef, useEffect } from 'react';
import BaseScrollList from '../BaseScrollList';
import { BaseScrollProps, _Mixin } from '../BaseScrollList/BaseScrollList';

type ScrollListProps = _Mixin<
  BaseScrollProps,
  {
    onInstance?: (s: any) => void; // 实例化scroll
    asyncFunction?: (params: any) => Promise<any>; // 刷新或加载的异步函数，约定是一个promise，返回一个带list属性的对象
    params?: Record<string, string | number>; // 函数入参，一般入参给定之后，之后请求接口都是修改pageNum这个参数，这个组件主要也是对这个进行封装,
    refresh?: string | null | undefined; // 是否重新请求数据(string每次传的值应该不一致，提供给组件跟踪状态, 可以使用new Date().toString())
    onInitSuccess?: (data: any) => void; // 初始请求数据成功的回调函数, 参数为最新请求获得的数据
    beforePullDown?: () => void; // 下拉前触发的方法
    onPullDownSuccess?: (data: any) => void; // 下拉刷新成功的回调函数, 参数为最新请求获得的数据
    /*
    上拉加载成功的回调函数, 参数为当前总的渲染数据(主要用于保存在model中，页面回退时不用重新请求数据)和pageNum值;
    pageNum的作用就是记录当前的加载到第几页了，我跳去别的页面又返回当前页面的时候，我能够初始化_this.pageNum。
    */
    onPullUpSuccess?: (data: any, pageNum: number) => void;
  }
>;

const ScrollList = (props: ScrollListProps) => {
  const {
    asyncFunction,
    params,
    data = [],
    refresh = null,
    onInitSuccess,
    beforePullDown,
    onPullDownSuccess,
    onPullUpSuccess,
    ...rest
  } = props;
  const [renderData, setRender] = useState<Array<any>>();
  const [isEnd, setEnd] = useState<boolean>(false);

  const _this = useRef<Record<string, any>>({
    pageSize: 4, // 默认4页
    pageNum: 1,
    ...params,
    renderList: [],
  }).current;

  const initData = () => {
    if (asyncFunction) {
      const promise = asyncFunction({
        pageSize: 4, // 默认4页
        pageNum: 1,
        ...params,
      });
      promise.then((res) => {
        if (!res) return;
        const { list = [] } = res;
        if (list.length > 0) {
          _this.renderList = list;
          setRender(_this.renderList);
          if (onInitSuccess) onInitSuccess(_this.renderList);
        }
      });
    }
  };

  const refreshData = () => {
    if (asyncFunction) {
      const promise = asyncFunction({
        ...params,
        pageNum: 1,
        pageSize: _this.renderList.length + 1,
      });
      promise.then((res) => {
        if (!res) return;
        const { list = [] } = res;
        if (list.length > 0) {
          _this.renderList = list;
          setRender(_this.renderList);
        }
      });
      setEnd(false); // 刷新数据了，上拉加载到底部的状态清空
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      initData();
    }
  }, []);

  useEffect(() => {
    if (refresh) {
      // 异步的再次调用接口,接口处理需要时间
      setTimeout(() => {
        refreshData();
      }, 1000);
    }
  }, [refresh]);

  useEffect(() => {
    if (data.length > 0) {
      _this.renderList = data;
      setRender(data);
    }
  }, [data]);

  useEffect(() => {
    _this.pageNum = params?.pageNum ?? 1;
  }, [params]);

  const onPullUp = () => {
    if (asyncFunction) {
      const promise = asyncFunction({
        ...params,
        pageNum: _this.pageNum + 1,
      });
      promise.then((res) => {
        if (!res) return;
        const { list = [] } = res;
        if (list.length > 0) {
          _this.pageNum += 1;
          _this.renderList = _this.renderList.concat(list);
          setRender(_this.renderList);
          if (onPullUpSuccess) onPullUpSuccess(_this.renderList, _this.pageNum);
        } else if (_this.renderList.length > 0) {
          setEnd(true);
        }
      });
    }
  };

  const onPullDown = () => {
    if (beforePullDown) beforePullDown()
    if (asyncFunction) {
      const promise = asyncFunction({
        pageSize: 4,
        pageNum: 1,
        ...params,
      });
      promise.then((res) => {
        if (!res) return;
        setEnd(false);
        const { list = [] } = res;
        if (list.length > 0) {
          _this.renderList = list;
          _this.pageNum = params?.pageNum ?? 1;
          setRender(_this.renderList);
          if (onPullDownSuccess) onPullDownSuccess(_this.renderList);
        }
      });
    }
  };

  return (
    <BaseScrollList
      {...rest}
      onPullUp={onPullUp}
      onPullDown={onPullDown}
      data={renderData}
      end={isEnd}
    />
  );
};

export default ScrollList;
