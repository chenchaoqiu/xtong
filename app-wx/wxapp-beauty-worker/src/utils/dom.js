import wepy from 'wepy'
var query={};
var dom={
  query(){
    return wepy.createSelectorQuery();
  },
  height(e,fn){
    this.query().select(e).boundingClientRect().exec((res) => {
      fn(res[0].height)
    });
  },
  width(e,fn){
    this.query().select(e).boundingClientRect().exec((res) => {
      fn(res[0].width)
    });
  },
  top(e,fn){
    this.query().select(e).boundingClientRect().exec((res) => {
      fn(res[0].top)
    });
  },
  left(e,fn){
    this.query().select(e).boundingClientRect().exec((res) => {
      fn(res[0].left)
    });
  },
  async right(e,fn){
   this.query().select(e).boundingClientRect().exec((res) => {
      fn(res[0].right)
      // console.log(res)
    });
  },
  bottom(e,fn){
    this.query().select(e).boundingClientRect().exec((res) => {
      fn(res[0].bottom)
    });
  }
}

module.exports =  dom;
