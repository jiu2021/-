# ts面试

### 类型

- boolean（布尔类型）
- number（数字类型）
- string（字符串类型）
- array（数组类型）
- **tuple（元组类型）**
- **enum（枚举类型）**： 枚举是一个被命名的整型常数的集合，用于声明一组命名的常数,当一个变量有几种可能的取值时,可以将它定义为枚举类型
- **any（任意类型）**
- null 和 undefined 类型
- **void 类型**
- **never 类型**：任何类型的子类型
- object 对象类型

### interface

**接口**是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的**类**去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法

简单来讲，一个接口所描述的是一个对象相关的属性和方法，但并不提供具体创建此对象实例的方法

`typescript`的核心功能之一就是对类型做检测，虽然这种检测方式是“鸭式辨型法”，而接口的作用就是为为这些类型命名和为你的代码或第三方代码定义一个约定

#### 比较type

type 叫类型别名，藏在高级类型

type (类型别名)，顾名思义，类型别名只是给类型起一个新名字。**它并不是一个类型，只是一个别名而已**

- 都可以继承

- type行，interface不行
  
  声明基本类型、联合类型、交叉类型、元组

- type不行，interface行
  
  合并重复声明

### class

可以看到，上述的形式跟`ES6`十分的相似，`typescript`在此基础上添加了三种修饰符：

- 公共 public：可以自由的访问类程序里定义的成员
- 私有 private：只能够在该类的内部进行访问
- 受保护 protect：除了在该类的内部可以访问，还可以在子类中仍然可以访问

**静态属性：**

这些属性存在于类本身上面而不是类的实例上

**抽象类：**

不能背实例化，只能继承

### function

- 从定义的方式而言，typescript 声明函数需要定义参数类型或者声明返回值类型
- typescript 在参数中，添加可选参数供使用者选择
- typescript 增添函数重载功能，使用者只需要通过查看函数声明的方式，即可知道函数传递的参数个数以及类型

### 常用语法

- Omit
  
  去除单个类型
  
  ```ts
  export type OmitEmailContact = Omit<Contact, 'email' >;
  ```

- Pick
  
  选定类型
  
  ```ts
  export interface ContactPick extends Pick<Contact, 'name' | 'phone'> {}
  ```

- Partial
  
  所有可选
  
  ```ts
  export interface PartialContact= Partial<Contact>
  ```

- Required
  
  所有必选
  
  ```ts
  export interface RequiredContact= Required<Contact>
  ```
