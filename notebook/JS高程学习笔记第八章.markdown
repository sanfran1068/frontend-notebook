### 面向对象的程序设计

如果在Web中使用JavaScript，那么BOM才是真正的核心。

#### window对象

BOM的核心对象是window，它表示浏览器的一个实例。在浏览器中，window对象不仅是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。

- 全局作用域

在JavaScript中，全局作用域中声明的变量、函数都会变成window对象的属性和方法。然而定义全局变量和在window对象上直接定义属性仍有一点区别：全局变量无法通过delete操作符删除（IE<9抛错，其他浏览器返回false），而window对象上的属性可以。

- 窗口关系及框架

如果页面中包含frame，则每一个框架都拥有自己的window对象，并保存在frames集合中。

- 窗口位置

用来确定和修改window对象位置的属性和方法：

IE、Safari、Opera和Chrome都提供screenLeft和screenTop属性；Chrome和Safari以及Firefox则支持screenX和screenY属性：

```javascript
  var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
  var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
```

上述代码对浏览器进行选择并获取窗口的位置。默认返回左上角原点（0，0）。

通过winow.moveBy(横坐标长度，纵坐标长度)，window.moveTo(横坐标，纵坐标)，可以移动窗口，但是可能会被浏览器禁用。

- 窗口大小

IE9+/Firefox/Safari/Opera/Chrome均提供4个属性：innerWidth/innerHeight/outerWidth/outerHeight。其中在IE9+/Safari/Firefox中，outerwidth和outerHeight返回浏览器窗口本身吃葱，Opera中则是表示页面视图容器的大小。而innerWidth、innerHeight是表示该容器中页面视图去的大小。Chrome中内外两对属性返回相同值-viewport大小。

另外，还可以使用window.resizeTo(width,height)/window.resizeBy(widthtoformer,lengthtoformer)

- 导航和打开窗口

window.open()方法可以导航到特定URL或打开新浏览器窗口。

```javascript
  window.open("http://www.wrox.com/",topFrame,"someString","1")
  //四个参数分别是网站的url、窗口目标（或者_self/_parent/_top/_blank），特性字符串，是否取代当前页面的bool
```

如果该方法中第二个参数不存在，就会根据在第三个参数为止传入的字符串创建一个新窗口，有“fullscreen=yes、height=100”等参数，该参数字符串中不允许出现空格。该方法可以按照下面的方式赋值给变量并进行一些操作：

```javascript
  var wroxWin = window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");
  alert(wroxWin.opener == window);    //true

  wroxWin.resizeTo(500,500);
  wroxWin.moveTo(20,20);
  wroxWin.close;
  alert(wroxWin.closed);    //true
```

鉴于有很多网站有很多弹窗广告的窗口，所以为了屏蔽这些窗口，网站的代码中可以

- 间歇调用和超时调用

JS是单线程语言，但是允许通过设置超时值和间歇时间值（毫秒）来调度代码在特定时刻执行。其中，超时值是在指定时间过后执行代码，后者是每隔指定时间就执行一次代码。

```javascript
  setTimeout(function() {
    alert("Hello world!");
  }, 1000);
  //第一个参数可以是字符串格式的代码，但是不推荐使用，会导致性能损失

  setInterval(function(){
    alert("Hello World!");
  },10000);
  //每10000毫秒执行一次代码
```

该方法也可以赋值给变量，然后通过clearTimeout(timeoutVar)/clearinterval(intervalVaar)

- 系统对话框

浏览器通过alert(),confirm(),prompt()方法可以调用系统对话框向用户显示消息。其中confirm()方法有OK和cancel两个按钮，prompt()会提示用户输入一个参数。另外还有window.print()打印对话框和window.find()查找对话框。

#### location对象

location是最有用的BOM对象之一，提供了与当前窗口中加载的文档有关的信息和导航功能，还将URL解析为独立片段来通过不同属性访问这些片段。

location既是window对象的一个属性，又是document对象的属性，即window.location=document.location。下面是location的所有属性：
