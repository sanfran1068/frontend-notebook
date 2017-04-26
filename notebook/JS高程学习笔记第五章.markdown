### 引用类型

#### Object类型
- 创建对象时首选字面量创建方法：
```javascript
  var person = {
    “name” : “Nicholas”,
    “age” : 29,
    5 : trun
  };
```

#### Array类型
- 定义：
```javascript
  var color = new Array(3);
```
- 访问：采用数组下标[]的方式进行访问，使用.length得到数组长度；
- 检测：value instanceof Array(不推荐),Array.isArray(somearrayvalue)(推荐)
- 转换：toLocaleString()/toString()/valueOf(),均生成逗号分隔的字符串其中，toLocaleString()方法转换时每一项都是使用toLocaleString()转换的，toString()也是Array.join(someJointSymbol)，默认用逗号连接;
- 插入删除：除了直接用下标添加删除，最好用栈方法LIFO-push(任意项参数)在尾部增加任意数量参数，pop()删除最后一项；同时还有队列方法FIFO,在栈方法基础上增加shift()可删除第一项，unshift()可以在前端添加任意项；
- 排序：sort()升序排列（转化为字符串进行比较，数字比较会出错，需要在参数中提供比较函数compare()）;reverse()反转数组顺序；
- 操作方法
  - 连接：somearray.concat(otherarrays)返回连接所有数组的副本；
  - 删除：somearray.splice(起始位置，删除项数，插入项)-splice(0,2)删除前两项-splice(2,0,”red”,”geen”)在当前数组位置2插入两项-splice(2,1,”red”,”green”)删除第二项并插入；
  - 位置方法：获取数组中元素的位置-indexOf()和lastIndexOf(),返回数组下表对应元素，否则返回-1;
  - 迭代方法：有5个迭代方法，参数都是两个，每一项上运行的函数和运行该函数的作用域对象every(someFunction):对每一项进行函数操作，每一项返回true则最后返回truefilter(someFunction):对每一项运行给定函数，返回每次调用该函数值为true的项的数组forEach(someFunction):对每一项运行给定函数，无返回值map(someFunction):对每一项运行给定函数，返回每次调用该函数结果的数组some(someFunction):对每一项运行给定函数，只要有一项使函数返回true，则整个返回true
  - 缩小方法：reduce(给每项调用的函数(可选)，缩小基础初始值)/reduceRight(给每项调用的函数(可选)，缩小基础初始值)，其中，参数中的函数需要传入4个参数，分别是前一项，当前项，项索引，数组对象；reduceRight是相反方向。
  - 禁忌：[， ， ， ，]不可以出现数组最后一项是，的情况

#### Date类型
- 定义：
```javascript
  var now = new Date();
```
  - 特定时间：var someDate = new Date(Date.parse(“May 25, 2004”));但是不用date.parse也会默认转换；
  - 继承的方法
    - toLocaleString()按照与浏览器设置的地区相适应的格式返回日期和时间
    - toString()返回带有时区信息的日期和时间
    - valueOf()返回日期的毫秒表示
  - 日期格式化方法
    - toDateString():以特定于实现的格式返回日年月日星期
    - toTimeString():以特定于实现的格式返回时区、时分秒
    - toLocaleDateString():以特定于地区的格式返回年月日星期
    - toLocaleTimeString():以特定于实现的格式显示时分秒
    - toUTCString():以特定于实现的格式完整的UTC日期
  - 日期时间组件方法
￼        ￼

#### RegExp类型：
- 定义：
```javascript
  var pattern = new RegExp(“pattern”, “flags”);
  var expression = /pattern/ flags;
```
其中flags有一下几种模式：
  - g:全剧模式，模式应用于所有字符串而非在发现第一个匹配项时立即停止；
  - i:不区分大小写模式；
  - m:多行模式，到达一行末尾还会查找下一行是否有匹配项

  *元字符转义：( { [ \ ^ $ | ) ? * + . ] }

  e.g.匹配第一个” [bc]at”
  ```javascript
    var patter = /\[bc\]at/i;
  ```

- 实例属性
  - .global:bool是否设置g标志
  - .ignoreCase:bool是否设置了i标志
  - .lastIndex:整数，表示开始搜索下一个匹配项的自负位置，0算起
  - .multiline:bool，表示是否设置了m标志
  - .source:该正则的字符串表示

- 实例方法：.exec()
  - 构造函数属性：
  - 模式的局限性：

#### Function类型

函数是对象，因此函数名实际上也是一个指向函数对象的指针，可以使用多个指针指向同一个函数。

- 声明：
```javascript
  function sum(num1, num2){
    return num1 + num2;
  }
```
- 特征
  - 没有重载:
  因为js中的函数名就像指针一样，所以当为一个函数名（就是一个变量）赋予新的函数时，会覆盖之前的函数；

  - 声明位置和表达式:
  js中有函数声明提升过程，所以声明和调用不强调先后顺序。**但是！如果把函数放进一个初始化语句中而非函数声明时 会出现先后问题的错误；

  - 作为值得函数:
    函数名可作为变量像值一样传入另一个函数；函数内也可以返回一个函数的计算结果等等；

  - 函数属性和方法:
    - 函数作为对象有两个属性:
      - length（表示函数希望接受的命名参数的个数）
      - prototype（保存引用类型的所有实例的方法，是不可枚举的）

    - 函数作为对象有两个方法:
      - apply()：接受两个参数，一个是其中运行函数的作用域，另一个是参数数组（可以使arguments对象或者是真实的一个数组）

      - call()：接受this参数以及来自函数的每一个参数都要写进去而非传入数组），这两个函数都是在特定的作用域中调用函数，相当于设置函数体内this对象的值

- 函数内部对象及环境的属性
    两个特殊对象
    - arguments：包含传入函数的所有参数，并且有一个callee的属性指向拥有这个arguments对象的函数，其实就是这个函数，另一个caller的属性返回引用本函数的函数

    - this：引用的是函数执行的环境对象，网页的全局就是window

#### 基本包装类型
String、Boolean、Number（Object、Null、Undefined、Array）

- String：
  - 方法：
    - 下标相关
      - 所指的单字符串charAt()
      - 所指字符的编码charCodeAte()
      - 字符串位置indexOf(substr)
      - 最后一个字符串位置lastIndexOf(substr)

    - 字符串操作
      - 连接concat(String str1, String str2)
      - 截取slice(startPos(, endPos))
      - 截取**substr**(startPos(, length))
      - 截取substring(startPos(, endPos))，当输入负数的index时，slice将负数和字符串长度相加，substr将第一个负参数加字符串长度第二个负参数转换为0，substring将所有负参数转化为0；

    - 格式化字符串方法trim(string)创建一个副本并删除前后所有空格

    - 大小写相关
      - 转小写toLowerCase()
      - 转本地语言toLocaleLowerCase()
      - toUpperCase()
      - toLocaleUpperCase()

    - 字符串模式匹配方法match()详见正则表达式，search()返回第一个匹配项索引否则返回-1

    - **replace(新字符串，需要替换的字符串)**

    - split(simbol)，由simbol分隔字符串，返回一个字符串数组

    - string1.localeCompare(string2)返回：string1在string2之前-1，相等0，之后1

    - fromCharCode()静态方法，接收一或多个字符编码，然后转换成一个字符串

#### 单体内置对象
- Global对象

  在js中，不属于任何其他对象的属性和方法，都是它的属性和方法。所有在全局作用域中定义的属性和函数都是它的属性和函数。例如isNaN()/isFinite()/parseInt()/parseFloat()/encodeURI()只编码空格/encodeURIComponet()编码所有非字母数字字符/decodeURI()/decodeURICompoment()/eval()接收一个js语句字符串，若是函数则不会被提升，需要按照声明顺序进行调用，严格模式下外部不能访问该函数中的函数或变量

- Global对象的属性
    ￼

- window对象
- Math对象
  - 属性：Math.E（常量e）/.LN10（10的自然对数）/.LN2（2的自然对数）/.LOG2E（以2为底e的对数）/.LOG10E（以10为底e的对数）/.PI（π的值）/.SQRT1_2（1/2的平方根）/.SQRT2（2的平方根）
  - 方法：min()/max()/ceil()/floor()/round()/random()/abs()/exp()/log()/pow(num,power)/sqrt()/acos()/asin()/atan()/atan2(y,x)/cos()/sin()/tan()/
