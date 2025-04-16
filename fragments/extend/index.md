> es6通过extends实现继承，其本质也是es5构造函数的封装写法，那么如何通过es5实现继承呢
1. <strong>原型链继承</strong><br/>
    原型链继承本质是将父类构造函数的实例复制给子类的原型对象
    ```js
    function Person(name='default'){
      this.name = name;//基本数据类型
      this.address={//引用数据类型
        name:"北京"
      }
    }
    Student.prototype = new Person();
    function Student(age){
      this.age = age;
    }
    //e1
    let stu1 = new Student(18);
    stu1.name = "lina"
    stu1.address.name="上海"
    console.log(stu1);
    //e2
    let stu2 = new Student(20);
    console.log(stu2)
    ```
   - 原型链继承无法为父类传递参数
   - 多个实例共享一个原型
2. <strong>构造函数继承</strong><br/>
    构造函数继承本质是在子类构造函数执行的时候，将父类构造函数执行一遍，并且绑定this
    ```js
    Person.prototype.getName=function(){
      console.log("getName");
    }
    function Person(name='default'){
      this.name = name;//基本数据类型
      this.address={//引用数据类型
        name:"北京"
      }
    }
    
    function Student(name,age){
      Person.call(this,name);
      this.age = age;
    }
    //e1
    let stu1 = new Student("gb",18);
    stu1.address.name="上海"
    console.log(stu1);
    //e2
    let stu2 = new Student("ln",20);
    console.log(stu2)
    ```
   - 构造函数继承无法继承父类原型上的属性和方法
3. <strong>组合继承</strong><br/>
    组合继承本质是将**原型继承**和**构造函数继承**结合起来
    ```js
    Person.prototype.getName=function(){
      console.log("getName");
    }
    function Person(name='default'){
      this.name = name;//基本数据类型
      this.address={//引用数据类型
        name:"北京"
      }
    }
    
    Student.prototype = new Person();
    Student.prototype.constructor = Student;
    
    function Student(name,age){
      Person.call(this,name);
      this.age = age;
    }
    //e1
    let stu1 = new Student("gb",18);
    stu1.address.name="上海"
    console.log(stu1);
    //e2
    let stu2 = new Student("ln",20);
    console.log(stu2)
    ```
   - 组合继承基本完美，但是父类调用了2次
4. <strong>寄生组合继承</strong><br/>
    寄生组合继承是想方案较为完美
    ```js
   Person.prototype.getName=function(){
      console.log("getName");
    }
    function Person(name='default'){
      this.name = name;//基本数据类型
      this.address={//引用数据类型
        name:"北京"
      }
    }
    
    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;
    
    function Student(name,age){
      Person.call(this,name);
      this.age = age;
    }
    //e1
    let stu1 = new Student("gb",18);
    stu1.address.name="上海"
    console.log(stu1);
    //e2
    let stu2 = new Student("ln",20);
    console.log(stu2)
   ```