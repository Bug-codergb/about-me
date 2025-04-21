# 大屏可视化方案
## 基于 transform 的缩放
通过UI稿的比例，计算至当前系统的宽高比，例如UI稿是1920*1080,，那么可以通过window.innerWidth,和window.innerHeight,
计算出一个比例，然后将比例设置到```transform:scale()```上面
## 媒体查询适配
## 通过rem + vh/vw的方案
如果UI稿的比例是1920*1080

那么可以通过 1920/real = 100vw/x 那么 x = 100*real / 1920 = real/19.2

x = 100vw * real / 1920 = real*(100/1920)
