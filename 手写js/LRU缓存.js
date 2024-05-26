// 第一步代码
class LRUCache {
  constructor(n){
      this.size = n; // 初始化最大缓存数据条数n
      this.data = new Map(); // 初始化缓存空间map
  }
  
  // 第二步代码
  put(domain, info){
      if(this.data.size >= this.size) {
      // 删除最不常用数据
      const firstKey= [...this.data.keys()][0];// 次数不必当心data为空，因为this.size 一般不会取0，满足this.data.size >= this.size时，this.data自然也不为空。
      this.data.delete(firstKey);
      }
      this.data.set(domain, info) // 写入数据
  }

  // 第三步代码
  get(domain) {
      if(!this.data.has(domain)){
          return false;
      }
      const info = this.data.get(domain); //获取结果
      this.data.delete(domain); // 移除数据
      this.data.set(domain, info); // 重新添加该数据
      return info;
  }
}