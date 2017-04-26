### 函数表达式

函数的定义有两种方法：一种是函数声明，另一种是**函数表达式** 。

- 函数声明：

function functionName(arg0, arg1, arg2) {
  //函数体
}

Firefox、Safari、Chrome和Opera都给函数定义了一个非标准的name属性，可以访问到给函数指定的名字alert(functionName.name);同时我们还需要注意的是，函数有函数声明提升的重要特征，所以函数声明可以放在函数调用语句之后。

- 函数表达式：

var functionName = function(arg0, arg1, arg2) {
  //函数体
};

这种情况下创建的函数叫做匿名函数，所以函数的name属性是空字符串，而且根据赋值语句的特性，调用一定要在函数赋值语句之后。既然函数可以赋值给变量，同时函数也可以作为其他函数的返回值。

#### 递归

- 概念

递归函数是在一个函数通过名字调用自身的情况下构成的。

```javascript
  function factorial(num) {
    if (num <= 1) {
      return 1;
    }else{
      return num * factorial(num - 1);
    }
  }
```

这是一个经典递归阶乘函数，但是存在以下的问题：

var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4));   //出错

上面调用出错的原因是，当factorial的引用被替换之后，在anotherFactorial调用时还是会用到factorial，这时候就会发生错误。这种情况可以使用arguments.callee可以解决这个问题。

arguments.callee是一个指向正在执行的函数的指针。所以用这个指针对递归调用能够解决这个问题，例如：

```javascript
  function factorial(num) {
    if(num <= 1) {
      return 1;
    } else {
      return num * arguments.callee(num - 1);
    }
  }
```

如果是严格模式下，callee模式会导致错误，最好使用命名函数表达式来达到相同的目的：

```javascript
  var factorial = (function f(num) {
    if(num <= 1) {
      return 1;
    } else {
      return num * f(num - 1);
    }
  }
```

#### 闭包

- 概念

闭包是指有权访问另一个函数作用域中的变量的函数。

- 创建闭包

常见方式是在一个函数内部创建另一个函数。

- 理解闭包

要理解闭包的细节，必须理解如何创建作用域链以及作用域链的作用以及理解函数第一次被调用的时候发生了什么。

当某函数第一次被调用时，会创建一个执行环境以及相应的作用域链，并把作用域链赋值给一个特殊的内部属性（[[Scope]])，然后可以使用this、arguments和其他命名参数的值来初始化函数的活动对象。在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数活动对象处于第三位，直至作为作用域链重点的全局执行环境。

所以说，当函数执行完毕之后，据不活动对象（this、arguments）就会被销毁，内存中也仅保存全局作用域。而引入闭包之后情况就会好转：

在另一个函数内部定义的函数会将包含函数（外部函数）的活动对象添加到它的作用域链中。当调用该函数时，函数执行完毕之后，其活动对象也不会被销毁，因为其中的匿名函数的作用域链仍然在引用这个活动对象，除非使用null来销毁该函数解除对匿名函数的引用，释放内存。

- 闭包与变量

作用域链的机制有一个副作用：闭包只能取得包含函数中任何变量的最后一个值。闭包所保存的是整个变量的对象，而不是某个特殊的变量。

这是因为匿名函数始终都在内存中保存着作用域链中该函数的活动对象，所以其实所有新建的函数都使用着同一个变量。除非在该匿名函数中再写一个匿名函数才能强制让闭包的行为符合预期。

- this对象

在闭包中使用this对象也会出现问题：**匿名函数的执行环境具有全局性**，因此匿名函数的this对象通常指向window（全局变量）。这是因为内部匿名函数在搜索变量时，根据作用域链进行搜索，所以存在在对象属性的变量是无法访问到的（只有函数才有作用域，还是因为外部函数没有显示声明this对象？），内部函数只能找到全局，所以如果想要闭包的函数中访问到外部函数的this对象，必须要将this对象保存在外部函数中。

- 内存泄漏

IE9之前的版本中，如果闭包的作用域链中保存着一个HTML元素，那么该元素无法被销毁。

”循环引用“

#### 模仿块级作用域

JavaScript中没有块级作用域的概念，所有的块语句中定义的变量都存在于函数中的作用域。所以以下代码是可以正常访问的：

```javascript
  function outputNumbers(count){
    for(var i = 0;i < count;i++){
      alert(i);  
    }
    alert(i);   //返回count计数
  }
```

就算在最后一个alert(i)之前重新定义声明变量i也不会改变i的值。所以JS从来不会提醒是否多次声明了同一个变量，有可能会导致问题的产生。所以这时候需要匿名函数来模仿块级作用域来避免这个问题:

```javascript
  (function(){
    //这里就是块级作用域
  })();
```

以上代码定义并立即调用了一个匿名函数，前一个括号是函数表达式声明，后一个括号是指立即调用这个函数。需要注意的是，函数表达式后面可以跟圆括号，而函数声明后面是不可以加圆括号的。

#### 私有变量

JS中没有私有成员的概念，对象属性和函数都是共有的，但是有一个私有变量的概念。**任何在函数中定义的变量，都可以认为是私有变量**。所以利用函数的闭包就可以创建用于访问私有变量的公有方法。该方法成为”特权方法”，创建方式有以下两种：

- 基本模式

```javascript
  function MyObject(){
    var privateVariable = 10;

    function privateFunction(){
      return false;
    }

    this.publicMethod = function(){
      privateVariable++;
      return privateFunction();
    };
  }
```

##### 静态私有变量

在构造函数中定义特权方法也有一个缺点，那就是必须使用构造函数模式来达到该目的，可是构造函数模式的缺点就是每个实例都会创建同样一组新方法。而使用静态私有变量来实现特权方法就可以避免这个问题。

通过在私有作用域中定义私有变量或函数，同样也可以创建特权方法：

```javascript
  (function(){

    var privateVariable = 10;

    function privateFunction(){
      return false;
    }

    MyObject = function(){
    };    //严格模式下未经声明的变量赋值会导致错误

    MyObject.prototype.publicMethod = function(){
      privateVariable++;
      return privateFunction();
    };
  })();
```

##### 模块模式

**单例**是指只有一个实例的对象，通常JavaScript是用对象字面量的方式来创建单例对象。

而模块模式正是专门为单例创建私有变量和特权方法的方式：

```javascript
  var singleton = function(){
    var privateVariaable = 10;

    function privateFunction(){
      return false;
    }

    return {
      publicProperty: true,

      publicMethod: function(){
        privateVariable++;
        return privateFunction();
      }
    };
  }();
```

这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时时非常有用的。单例经常被用在Web应用程序中来管理应用程序级的信息。

##### 增强的模块模式
