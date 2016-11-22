# videoJS的使用
[VideoJS API](http://docs.videojs.com/docs/api/index.html)
## 1 自定义控制器按钮
> 背景:公司的直播和回放格式有竖屏、横屏、还有各个方向的，很不确定，必须实现可旋转的功能
> 
步骤：
### step1 在控制器内创建一个按钮；
`var rotateBtn = player.controlBar.addChild('button')`
### step2 设置按钮的属性、位置,class名称可自定义，样式我是直接在videojs的css样式里修改的；
`rotateBtn.addClass('vjs-icon-rotate')`
### step3 添加旋转功能
`rotateBtn.on('click',function(){})`