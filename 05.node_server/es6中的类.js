class Animal {
  _value = "killian";
  // 类的 clssFiled语法
  constructor() {
    this.callbacks = [];
  }
  showName = () => {
    console.log(this._value);
  };
  showName1() {
    console.log(this._value);
  }
  static eat() {
    console.log(this);
  }
}
const ani = new Animal();
ani.showName();
ani.showName1();

Animal.eat();

class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的constructor
  }
  //
  catchMouse() {
    console.log("朱老鼠");
  } 
  // 子类的方法重写了父类的方法
  showName() {
    console.log("子类的方法");
  }
}
// extends的静态属性也是可以集成的
let cat = new Cat("tom");
Cat.eat();
