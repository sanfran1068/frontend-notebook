### Ajax学习笔记

#### 简介

AJAX（Asynchronous JavaScript and XML）是指异步的javascript和XML，是一种使用现有标准的新方法。它可以与服务器交换数据并更新部分网页而不重新加载整个页面。

#### XMLHttpRequest对象

XMLHttpRequest是Ajax的基础，几乎所有现代浏览器均支持XMLHttpRequest对象。创建一个XMLHttpRequest对象：

```javascript
  someXHR = new XMLHttpRequest();
  someXHRinIE5or6 = new ActiveXObject("Microsoft.XMLHTTP");    //IE5IE6使用ActiveX对象
```

为了兼容所有的浏览器，我们可以按照下面代码进行实现：

```javascript
  var xmlHttp;    // Create a new XMLHttpRequest object to talk to the Web server

  try{
    request = new XMLHttpRequest();
  }catch (trymicrosoft){
    try{
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(tryanothermicrosoft){
      try{
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(failed){
        request = false;
      }
    }
  }

  if(!request){
    alert("Error initializing XMLHttpRequest");
  }
```

上面的代码可以封装进一个函数中，这样方便调用，但是函数调用的时候会造成错误提示。

XMLHttpRequest对象有以下几个方法和属性：
- 方法：
  - open():建立到服务器的新请求；
  - send():向服务器发送请求；
  - abort():退出当前请求；

- 属性：
  - readyState:提供当前HTML的就绪状态；
  - responseText:服务器返回的请求响应文本；

XMLHttpRequest对象用于和服务器交换数据。可以使用XMLHttpRequest对象的open()和send()方法将请求发送到服务器：

```javascript
  //接上面代码
  someXHR.open("GET","test1.txt",true);
  someXHR.send();
```

open(method,url,async)方法的参数：method为请求类型（GET/POST），url是文件在服务器上的位置，async异步与否（true异步false同步）。
send(string)方法的参数，string仅在请求类型为POST时才传，功能是将请求发送到服务器。

- GET还是POST？

GET简单快速，大部分情况下都可以用。但是在以下情况必须使用POST请求：

  - 无法使用缓存文件时（更新服务器上的文件或数据库）
  - 向服务器发送大量数据（**POST 没有数据量限制**）
  - 发送包含未知字符的用户输入时，POST比GET更稳定也更可靠

- 一个简单的例子：

```html
  <!DOCTYPE HTML>
  <html>
    <body>
      <p><img src="breakneck-logo_4c.gif" alt="Break Neck Pizza" /></p>
        <form action="POST">
         <p>Enter your phone number:
          <input type="text" size="14" name="phone" id="phone"
                 onChange="getCustomerInfo();" />
         </p>
         <p>Your order will be delivered to:</p>
         <div id="address"></div>
         <p>Type your order in here:</p>
         <p><textarea name="order" rows="6" cols="50" id="order"></textarea></p>
         <p><input type="submit" value="Order Pizza" id="submit" /></p>
        </form>

```

#### Ajax的基本请求和响应模型

Ajax应用程序的基本流程：

- 从Web表单中获取需要的数据
- 建立要连接的URL
- 打开与服务器的连接
- 设置服务器在完成后要运行的函数
- 发送请求

```javascript
  function callServer() {
    // Get the city and state from the web form
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;

    // Only go on if there are values for both fields
    if ((city == null) || (city == "")) return;
    if ((state == null) || (state == "")) return;

    // Build the URL to connect to
    var url = "/scripts/getZipCode.php?city=" + escape(city) + "&state=" + escape(state);

    // Open a connection to the server
    xmlHttp.open("GET", url, true);

    // Setup a function for the server to run when it's done
    xmlHttp.onreadystatechange = updatePage;

    // Send the request
    xmlHttp.send(null);
  }

  function updatePage(){
    if(xmlHttp.readyState == 4) {
      var response = xmlHttp.responseText;
      document.getElementById("zipCode").value = response;
    }
  }
```

web表单页面：

```html
  <form>
    <p>City: <input type="text" name="city" id="city" size="25" onChange="callServer();" /> </p>
    <p>State: <input type="text" name="state" id="state" size="25" onChange="callServer();" /> </p>
    <p>Zip Code: <input type="text" name="zipCode" id="city" size="5" /></p>
  </form>
```
