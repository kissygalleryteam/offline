### KISSY 离线存储 ###

* 将localStorage和低版本的ie userData分离出来，分别加载文件
* 提供了过期时间处理
* 在用户进行添加，删除等操作的时候提供事件触发，方便用户监听
* 每个外部方法都提供了返回值，便于写单元测试
* 对每个传入的参数都进行了验证
* 提供了统计使用字节的方法，便于用户估算剩余容量

publish status: https://github.com/kissygalleryteam/kpm/issues/7


--change kpm test 3
