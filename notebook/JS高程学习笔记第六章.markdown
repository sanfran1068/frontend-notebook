### 面向对象的程序设计
对象就是无序属性的集合，其属性可以包含基本值、对象或者函数。
创建对象：
- 创建Object实例：
  ```javascript
  var person = new Object();
  person.name = "Nicholas";
  person.age = 29;
  person.sayName = function(){
    alert("this.name")
  }
  ```

- 对象字面量语法：
  ```javascript
  var person = {
    person.name = "Nicholas";
    person.age = 29;
    person.sayName = function(){
      alert("this.name")
    }
  }
  ```

#### 理解对象
- 属性类型：
  ECMAScript中有两种属性：数据属性和访问其属性。
  - 数据属性：包含一个数据值的位置，在此位置可读取和写入值，有以下特性：
    - [[Configurable]]默认值为true，表示能否通过delete删除属性
    - [[Enumerable]]默认值为true，表示能否通过for-in循环返回属性
    - [[Writable]]默认值为true，表示能否修改属性的值
    - [[Value]]默认值为undefined，包含这个属性的数据值
    要修改上述属性，必须通过Object.defineProperty(属性所在对象，属性名，描述符对象)方法：

    ```javascript
    var person = {};
    Object.defineProperty(person, "name", {
      writable: false,
      value: "Nicholas"
    })
    ```

  - 访问器属性：不包含数据值，只包含getter和setter函数（这两个函数并非必需），访问器属性具有如下特征：
    - [[Configurable]]默认值为true，表示能否通过delete删除属性
    - [[Enumerable]]默认值为true，表示能否通过for-in循环返回属性
    - [[Get]]默认值为undefined，读取属性时调用的函数
    - [[Set]]默认值为undefined，写入属性时调用的函数
    访问器属性也必须使用Object.defineProperty()方法来进行定义：

    ```javascript
    var book = {
      _year: 2004,
      edition: 1
    };

    Object.defineProperty(book, "year", {
      get: function(){
        return this._year;
      },
      set: function(newValue){
        if(newValue > 2004){
          this._year = newValue;
          this.edition = newValue - 2004;
        }
      }
    });

    //若想定义多个属性或对应的方法时，可以这样写：

    Object.defineProperty(book, {
      //这里定义了两个数据属性
      _year: {
        value: 2004
      },

      edition: {
        value: 1
      },

      //这里定义了一个访问器属性
      year: {
        get: function(){
          return this._year;
        },

        set: function(newValue){
          if(newValue > 2004){
            this._year = newValue;
            this.edition = newValue - 2004;
          }
        }
      }
    });
    ```

    如果想读取属性的特征，则要通过Object.getOwnPropertyDescriptor()函数来访问：
    ```javascript
    var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
    alert(descriptor.value);
    alert(typeof descriptor.get);//"function"
    ```

#### 创建对象
创建类和对象名要使用大写字母开头，构造函数也是，而非构造函数则由小写字母开头。

- 工厂模式：抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节：

  ```javascript
    function createPerson(name, age, job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function(){
        alert(this.name);
      };
      return o;
    }

    var person1 = createPerson("Nicholas", 29, "Software Engineer");
  ```
  其实就是把一个完整的由Object实例来创建对象的过程放在一个函数中；

- 构造函数模式：

  ```javascript
    function Person(name, age, job){
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = function(){
        alert(this.name);
      };
    }

    var person1 = new Person("Nicholas", 29, "Software Engineer");
  ```

  可以看到，构造函数模式中 **没有显式地创建对象**，**直接将属性和方法赋给了this对象**，**没有return语句** 。

  构造函数模式相较于工厂模式的一个优点是，它创建的构造函数可以将它的实例标识为一种特定的类型，即对象也是Object也是Person的实例。

  将构造函数当做函数： 任何函数，只要通过new操作符来调用，就可以作为构造函数。




- 原型模式

	JavaScript中并没有提供类的实现，虽然在ES2015/ES6之中引入了class关键字，但是JavaScript仍然是基于原型的。而JavaScript中创建对象的方法有：new Object()方法、字面量方法、工厂模式、构造函数方法和**原型模式**。其中，使用原型模式创建对象可以令所有实例共享方法，减少内存消耗，有利于对象继承。

	JavaScript中的**继承**则是体现在一种结构上——对象，所有的对象都是由Object衍生的对象，所有的对象都继承了Object.prototype的方法和属性（也有可能被覆盖）。每一个对象都有一个内部链接到另一个对象，这个对象成为它的原型（prototype）。而且，该原型对象也有自己的原型，直到追溯到一个以null为原型的对象，因为null是没有原型的，所以可以作为这个**原型链（prototype chain**中的最终链接。

	只要创建了一个新函数，就会为该函数创建一个prototype属性，这个属性指向函数的原型对象。所有原型对象都自动获得一个constructor属性，这个属性包含一个指向prototype属性所在函数的指针。

	##### 原型对象的创建：

	  ```javascript
	  function Person(name, age, job) {
	      this.name = name;
	      this.age = age;
	      this.job = job;
	  }

	  Person.prototype.sayName = function() {
	      alert(this.name);
	  }

	  var person1 = new Person("Nicholas", 29, "Lawyer");
	  var person2 = new Person("Katie", 30 "Account");
	  var person3 = new Person("Nicholas", 29, "Lawyer");

	  person1.sayName();     //"Nicholas"
	  person2.sayName();     //"Katie"

	  alert(person1.sayName == person3.sayName);    //true
	  ```

	  更加简单的原型对象创建语法：

	  ```javascript
	  function Person() {
	  }

	  Person.prototype = {
	    name : "Nicholas",
	    age : 29,
	    job : "Software Engineer",
	    sayName : function() {
	      alert(this.name)
	    }
	  };
	  ```

	  - 代码搜索某属性的路径：

	    上面代码中出现了Person.prototype,通过该形式可以获得原型对象，并且可以为其添加属性和方法。这段代码也展示了对象属性和方法搜索的路径：每当代码读取某个对象的某个属性时，进行目标为该属性的名字，搜索首先从实例（person1）本身开始，若有该名字的属性则返回该属性，若没有则继续搜索该实例中原型指针指向的原型对象，在原型对象中查找该名字的属性。所以说**实例是共享原型中保存的属性和方法**。

	  - 实例的属性，原型的属性？

	    一个对象的所有实例尽管可以共享该原型对象的所有属性和方法，但是却无法重写原型对象中的属性和方法，只能通过利用同名属性和方法来覆盖和屏蔽原型对象中的属性和方法；若想把实例中覆盖的属性还原，可以通过delete操作。使用hasOwnProperty()方法可以检测一个属性是存在于实例中还是存在于原型中。

	  - 怎样获得原型对象

	    下面的代码展示了Object.getPrototypeOf(obj)方法和__proto__属性的使用：

	    ```javascript
	    Object.getPrototypeOf(person1) === Person.prototype;    //true

	    person1.__proto__ === Person.prototype;    //true
	    ```

	    可以看到，Object.getPrototypeOf(obj)是获取obj对象的原型对象的方法，这个方法将在**利用原型实现继承的情况中发挥非常重要的作用**。obj.__proto__ 也是如此，是每一个对象都拥有的属性，但是__proto__并不是一个规范的属性（当使用Object.create()方法创建对象时，__proto__ 并不能指向该对象的原型对象），其对应的标准属性应当是[[Prototype]]。

	##### 原型对象和构造函数

	  对于对象Person来说，它的构造函数是Person()，它的原型对象为Person.prototype；而Person.prototype.constructor又会指回Person。而对象Person的实例person1和person2都包含有一个属性[[Prototype]]（也就是上面提到的__proto__）它们都指向Person.prototype；同时，person1和person2也可以通过isprototypeOf(）方法来确定是否与确定对象之间有这种关系：

	  ```javascript
	  alert(Person.prototype.isPrototypeOf(person1));    //true
	  ```

	##### 原型与in操作符

	- in操作符单独使用的情况

	  in操作符单独使用会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是在原型中：

	  ```javascript
	  //接上面的代码

	  var person4 = new Person();

	  alert(person4.hasOwnproperty("name"));    //由于person4实例没有覆盖原型中的name所以返回false
	  alert("name" in person4);    //true
	  ```

	- for-in循环

	  该种方式是返回所有能够通过对象访问的、可枚举的属性，包括实例和原型中的属性，并且屏蔽了原型中不可枚举（[[Enumerable]]）的属性（仅在IE8及更早版本中有不可枚举的属性）：

	  ```javascript
	  var o = {
	    toString : function() {
	      return "my Object"
	    }
	  }

	  for (var prop in o) {
	    if (prop == "toString") {
	      alert("Found toString");      //IE中无法显示
	    }
	  }
	  ```

	  若想获取对象中所有可枚举的实例属性，可以使用Object.keys(),该函数接受一个对象或实例作为参数（当然也可以是原型对象），返回一个包含所有可枚举属性的字符串数组。示例代码如下：

	  ```JavaScript
	  //接Person对象代码

	  var keys = Object.keys(person.prototype);
	  var person5 = new Person();
	  person5.name = "Rob";
	  person5.age = 31;
	  alert(keys);
	  alert(Object.keys(person5));

	  var keys2 = Object.getOwnPropertyNames(Person.prototype);    
	  alert(keys2);   
	  ```

	  上述代码中出现的Object.getOwnPropertyNames(Person.prototype)方法可以得到所有的可枚举/不可枚举的实例属性（列入constructor）。

	##### 原型的动态性

	  由于从原型中查找值的过程试一次搜索，因此对原型对象所做的任何修改都能从实例上反映出来。即，可以先创建实例，再修改原型对象中的属性或函数，实例依旧可以访问该属性和函数：

	  ```javascript
	  //接person对象代码

	  var friend = new Person();

	  Person.prototype.sayHi = function() {
	    alert("hi!");
	  };

	  friend.sayHi();  //返回”hi”

	  ```

	  尽管像以上代码中所看到的可以为原型添加属性或方法，但是如果重写整个原型对象，就会切断实例的构造函数与最初原型对象之间的联系。这是因为实例中的指针仅指向原型，而非构造函数。

	##### 原生对象的原型

	不仅是自定义的对象，JavaScript中所有原生的引用类型，都是采用这种模式创建的原生对象。通过原生对象的原型可以取得所有默认方法的引用，也可以自己添加新的方法。

	#### 原型对象的缺点

	- 由于原型中所有属性都是可以被实例共享，而对于原型中含有引用类型值的属性来说就会发生问题：

	  ```javascript
	  //接person对象代码

	  Person.prototype.friends = ["Shelby", "Court"];
	  var person6 = new Person();
	  person6.friends.push("Van");
	  alert(person6.friends);
	  alert(person1.friends);    //此时两个Person的实例拥有相同的朋友，很可能发生错误
	  ```

	  可以看到，由于原型的属性可以被共享的这一特性，原型对象中包含的引用类型值很可能被修改之后导致实例的属性也发生错误，必须要在实例属性中覆盖才可以。所以为了解决这个问题，提出了以下组合构造函数模式和原型模式的方法来创建对象：

	  ```javascript
	  //改写上面的Person对象
	  //首先使用构造函数模式创建对象Person并加入容易被修改的属性name，age，job
	  function Person(name, age, job) {
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.friends = ["Shelby", "Court"];
	  }

	  //再使用原型模式创建构造函数和不容易被修改的属性和函数，这样可以发挥原型的共享机制并减少内存消耗
	  Person.prototype = {
	    constructor : Person,
	    sayName : function() {
	      alert(this.name);
	    }
	  }
	  ```

- 寄生构造函数模式

  与工厂模式没有本质上的区别，只是在创建新的实例的时候，工厂模式不需要new，而寄生构造函数需要加new。这种模式不能够以来instanceof操作符来确定对象类型，所以建议在能够使用其他模式创建对象时尽量不要使用这种模式。

- 稳妥构造函数模式

  JavaScript中的稳妥对象是指，没有公共属性，而且其方法也不引用this的对象。稳妥对象最适合在一些禁止使用this和new的安全环境中使用，防止被Mashup等的应用程序改动。

  稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建的对象的实例方法不引用this；二是不适用new操作符调用构造函数。

  ```javascript
    function Person(name, age, job) {
      var o = new Object();

      o.sayName = function() {
        alert(name);
      };

      return o;
    }
  ```

#### 继承

- 原型链
