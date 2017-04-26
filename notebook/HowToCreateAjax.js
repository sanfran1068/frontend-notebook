//定义全局变量将来作为XMLHttpRequest对象；
var xmlhttp = createXHR();

//第一步兼容各个浏览器创建XMLHttpRequest
function createXHR() {
    var xhr;
    try {//IE7+、Chrome、Firefox、Opera8.0+和Safari
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {//IE7+
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {//IE5、6
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
              alert(e);
            }
        }
    }
    return xhr;
}

//第二步给XMLHttpRequest对象注册回调方法
xmlhttp.onreadystatechange = callback;

//第三部设置和服务器交互的相应参数
var userName = document.getElementById("UserName").value;
xmlhttp.open("GET","someurl?name=" + userName, true);

//第四步向服务器发送数据，参数有responseText、responseXML、status、statusText，如果都不是，必须传入null
xmlhttp.send(null)

//第五步判断和服务器交互是否成功，判断服务器是否正确返回数据
function callback() {
  if(xmlhttp.readyState == 4) {
    if(xmlhttp.status == 200) {
      var message = xmlhttp.responseText;
    } else {
      alert("Request was unsuccessful: " + xmlhttp.status);
    }
  }
}

//如果使用POST方法，则第三、四步需要进行下面的修改：
xmlhttp.open("POST", "someurl", true);
xmlhttp.setRequestHeader("Content-Type", "application/x-www-fora-urlencoded");
xmlhttp.sent("name=" + userName);
