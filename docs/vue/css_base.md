CSS 一些基础特性总结

#### 元素的显示模式

-  块元素(block)，代表元素 `div`
- 行内元素(inline) 代表元素`span`, 无法设置宽高，由内容撑开
- 行内块元素(inline-block) 代表元素 `img` 和inline表现一致，区别是可以设置宽高 

| 显示模式     | 场景     | 标签                       |
| ------------ | -------- | -------------------------- |
| block        | 主体结构 | html, body                 |
| block        | 排版标签 | h1~h6 hr p pre div         |
| block        | 列表标签 | ul ol li dl dt dd          |
| block        | 表格相关 | table tbody thead tfoot tr |
| block        |          | form 和 option             |
| inline       | 文本标签 | br em del strong 等        |
| inline       |          | a 和 label                 |
| inline-block | 图片     | img                        |
| inline-block | 单元格   | td th                      |
| inline-block | 表单空间 | input select button等      |
| inline-block | 框架     | iframe                     |



#### 盒子模型

- margin
- border
- padding
- content

盒子的大小 = border + padding + content

margin 不会影响盒子大小，但是会影响盒子位置



#### 关于margin塌陷

- 第一个子元素的上margin会被作用到父元素上，最后一个子元素的下margin会作用到父元素

例如：

```html
<style>
        .outer {
            width: 300px;
            height: 300px;
            background-color: gray;
        }
        .inner {
            padding: 10px;
            width: 50px;
            height: 50px;
            margin-top: 30px;
            background-color: green;
        }
</style>
<div class="outer">
        <div class="inner">inner</div>
    </div>

```

![image-20250213202503836](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250213202503836.png)



解决办法：

- 父元素设置不为0的padding
- 父元素设置不为0的margin
- 设置`overflow: hidden`

![image-20250213202551387](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250213202551387.png)



#### 布局小技巧

1. 行内元素，行内块元素。都会被父元素当做文本处理
2. 如何让子元素在父元素中水平居中：
   1. 如果是block。设置`margin 0 auto`
   2. 如果是inline或者inline-block， 父元素上设置 `text-align: center`
3. 如何让子元素在父元素中垂直居中
   1. block元素。在子元素上加 margin-top
   2. inline或者inline-block的话，让父元素`height=line-height`, 子元素上加`vertial-align: middle`



#### 浮动

浮动的关键字  float

浮动的特点：

1. 脱离文档流
2. 无论是block还是inline, 浮动后宽和高都由内容撑开
3. 不再独占一行
4. 不会有margin 合并、塌陷问题
5. 不会像inline一样当做文本处理



浮动后的影响：

- 不能撑起父元素高度，父元素高度塌陷
- 对兄弟元素会有影响，后面的元素会占据浮动元素之前的位置

如何解决：

- 最推荐的方式是, 在父元素上使用`clear: both`  （清除左右浮动的影响）

```css
.parent::after {
    content: "";
    display: block;
    clear: both;
}
```

> 原则：在布局中，兄弟元素全部浮动或者不浮动



##### 浮动布局练习demo

实现如下效果布局：

![image-20250213231716106](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250213231716106.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .leftfix {
            float: left;
        }
        .rightfix {
            float: right;
        }
        .clearfix::after {
            content: '';
            display: block;
            clear: both;
        }
        .container {
            width: 960px;
            margin: 0 auto;
            text-align: center;
        }
        .logo {
            width: 200px;
            background-color: orange;
        }
        .banner1 {
            width: 540px;
            margin: 0 10px;
            background-color: red;
        }
        .banner2 {
            width: 200px;
            background-color: green;
        }
        .logo, .banner1, .banner2 {
            height: 80px;
            background-color: green;
            line-height: 80px;
        }
        .menu {
            margin-top: 10px;
            background-color: gray;
        }
        .content{
            margin-top: 10px;
        }
        .item1, .item2 {
            width: 368px;
            height: 198px;
            border: 1px solid black;
            margin-right: 10px;
            line-height: 198px;
            background-color: skyblue;
        }
        .bottom {
            margin-top: 10px;
        }
        .item3,.item4,.item5,.item6 {
            width: 178px;
            height: 198px;
            line-height: 198px;
            border: 1px solid black;
            margin-right: 10px;
            background-color: yellow;
        }
        .item7, .item8, .item9 {
            width: 198px;
            height: 128px;
            line-height: 128px;
            border: 1px solid black;
            background-color: red;
        }
        .item8 {
            margin: 10px 0;
        }
        .footer {
            margin-top: 10px;
            background-color: aqua;
            height: 60px;
            line-height: 60px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!--头部-->
        <div class="head clearfix">
            <div class="logo leftfix">logo</div>
            <div class="banner1 leftfix">banner1</div>
            <div class="banner2 leftfix">banner2</div>
        </div>
        <!--菜单-->
        <div class="menu">菜单
        </div>

        <!--内容区-->
        <div class="content clearfix">
            <!--左边区域-->
            <div class="left leftfix">
                <!-- 上部分 -->
                <div class="top clearfix">
                    <div class="item1 leftfix">item1</div>
                    <div class="item2 leftfix">item2</div>
                </div>
                <!-- 下部分 -->
                <div class="bottom clearfix">
                    <div class="item3 leftfix">item3</div>
                    <div class="item4 leftfix">item4</div>
                    <div class="item5 leftfix">item5</div>
                    <div class="item6 leftfix">item6</div>
                </div>
            </div>
            <!-- 右边区域 -->
            <div class="right rightfix">
                <div class="item7">item7</div>
                <div class="item8">item8</div>
                <div class="item9">item9</div>
            </div>
        </div>

        <!--页脚-->
        <div class="footer">页脚</div>
    </div>
</body>
</html>
```

#### 定位
##### 相对定位
- 给元素设置`position:relative`
- 使用left, right, top, bottom 调整位置

参考点来自：相对自己原来的位置

相对定位特点：
- 不脱离文档流
- 定位元素的层级比普通元素高一点
- 相对定位也能浮动，不推荐一起使用
- 相对定位，也能margin调整位置，不推荐这样做

##### 绝对定位
设置`positive:absolute`

参考点来自它的包含块，什么是包含块
- 对于没有脱离文档流的元素，包含块是父元素
- 对于脱离文档流的元素，包含块是第一个拥有定位属性的祖先元素（如果所有祖先都
没定位，那包含块就是整个页面）。

绝对定位特点：
- 脱离文档流，会对后面兄弟元素，父亲元素有影响
- 无论什么元素（block，inline，inline-block）设置绝对定位之后，变成定位元素

##### 固定定位
设置`positive:fixed`

固定点参考来自：视口

固定元素的特点；
- 脱离文档流，会对后面的兄弟元素、父元素有影响
和绝对定位有类似的要求

##### 粘性定位
通过`positive:sticky`

参考点：离它最近的一个拥有“滚动机制”的祖先元素，即便这个祖先不是最近的真实可滚动祖先

特点：
- 不会脱离文档流，
- 最常用的是top值