var animove={
    yc(e){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      e.This.animation = animation

      animation.translateY(e.height).step()

      var animation_yc = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      e.This.animation = animation_yc

      animation_yc.opacity(0).step()

      e.This.animationData_yc=animation_yc.export()
      e.This.animationData=animation.export()
      e.This.$apply();
    },
    shwoIN(e){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      e.animation = animation

      animation.translateY(0).step()

      var animation_yc = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      e.animation = animation_yc

      animation_yc.opacity(0.8).step()

      e.animationData_yc=animation_yc.export()
      e.animationData=animation.export()
    }
}
module.exports =  animove;
