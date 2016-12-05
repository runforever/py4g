# 面向对象编程

> 没有银弹 －－ Fred Brooks
![没有银弹](http://cdn.defcoding.com/IMG_0938.JPG)
图片来自《人月神话》

### 没有银弹
如果你看过《黑夜传说》这部电影你就知道对付狼人的武器就是银弹。

然而，在软件工程中没有任何技术或管理上的进展，能够独立地许诺在生产率、可靠性或简洁性上取得数量级的提高。软件工程中经常出现各种各样的过程和技术，Scrum，TDD（测试驱动开发），XP（极限编程），OOP（面向对象编程），Design Pattern（设计模式）等等，这些东西并不能让所有软件的开发过程的效率得到提升，只有根据项目因地制宜的运用合适软件过程方法才是解决之道。

这一节我们就来说说 OOP（Object-oriented programming）面向对象编程

### OOP
前面我们学的东西属于命令式编程，代码就像发送给计算机的命令一样，计算机只要一行一行执行下去就行。

OOP 是种具有对象概念的程序编程范型，同时也是一种程序开发的方法。它可能包含数据、属性、代码与方法。对象则指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性，对象里的程序可以访问及经常修改对象相关连的数据。--来自 wiki [面向对象的设计](https://zh.wikipedia.org/wiki/面向对象程序设计)

我们不用逐字逐句的去理解 OOP 的概念，我们只要知道 OOP 和函数的性质是一样的，OOP 的出现也是为了代码复用，减少代码间的重复，使代码更容易维护就行。

#### 类（class）和对象（object）

Python 中使用 `class` 关键字来定义类，类中包含对象的属性和方法。

**使用类定义一个妹子**
``` python
class Girl(object):
    '''
    会编程的妹子
    '''

    def __init__(self, skin, character, good_at):
        self.skin = skin
        self.character = character
        self.good_at = good_at

    def say_hello(self):
        print("hello")

    def show(self):
        print("I am good at %s" % self.good_at)
```

Python 中新式类的定义都要继承 `object`，`class Gril(object)` 是定义女孩类的意思，`__init__` 方法是构造函数，这里用来初始化对象的属性，我们定义妹子的属性有肤色、个性、特长四个属性，`say_hello` 方法属于对象的行为，方法中的 `self` 关键字表示对象，类中定义的方法必须要有 `self` 关键字，self 可以拿到对象的属性和调用对象的方法。

类中的函数叫做方法，功能一样。

我们使用类定义好了对象的方法和属性之后就可以用类来生成对象了。

**来一打会写代码的妹子**
``` python
# 生成对象
cute_girl = Girl('wheat', 'cute', 'Python')
cool_girl = Girl('white', 'cool', 'Swift')
beauty_girl = Girl('white', 'beauty', 'Elixir')

# 调用对象的方法
girls = (cute_girl, cool_girl, beauty_girl)
for gril in girls:
    gril.say_hello()
    gril.show()
```

上面的代码我们可以学到如何从类中生成对象，如何调用对象的方法。

类是对象的抽象描述，通过使用类我们可以很好的对现实世界的问题建模，可以是任何东西。的前提是我们用类来描述现实世界的时候，我们要懂得抽象出事物的属性和行为。

### OOP 的特点
OOP 具有继承（Inherit）多态（Polymorphism）和封装（Encapsulation）三个特点。

#### 继承
类包括属性和方法，而类的这些基本属性是可以被子类继承并且重写的，继承的作用是为了代码的复用，减少重复。

**下面我们用 OOP 来设计《植物大战僵尸》游戏中的僵尸**
![zombie](http://cdn.defcoding.com/img_00422.jpg)
我们先来分析僵尸的共性

1. 属性有血量、移动速度。
2. 方法有攻击，使用特殊技能。

``` python
class BaseZombie(object):
    '''
    基础僵尸类
    '''
    def __init__(self, health, move_speed):
        self.health = health
        self.move_speed = move_speed

    def attack(self):
        print 'attack'

    def skill(self):
        return False


# 继承基础僵尸类，重写攻击方法
class NormalZombie(BaseZombie):
    '''
    普通僵尸
    '''

    def attack(self):
        print 'eat plant'


# 继承基础僵尸类，重写攻击方法和技能
class BossZombie(BaseZombie):
    '''
    小 Boss 僵尸
    '''

    def attack(self):
        print 'hit plant'

    def skill(self):
        print 'throw the little zombie'
        return True
```
通过继承基础僵尸类我们就可以衍生出各种有趣的僵尸，现在改变一个需求，我们要给所有僵尸加上一个模型属性，我们也只需要在基础僵尸类添加这个属性就可以达到目的，这样使我们的代码很容易适应需求变更。

#### 多态
上面我们通过继承将僵尸类已经定义好了，下面我们就要用这些僵尸来发动总进攻了。
``` python
zombies = (NormalZombie(10, 10), BossZombie(100, 10), NormalZombie(10, 10), BossZombie(100, 10))
for zombie in zombies:
    zombie.attack()
```
虽然僵尸的类不一样，我们可以通过调用 `attack` 方法来达到不同的攻击效果

**注意**：由于 Python 是动态语言，所以多态表现的不是那么明显，如果是静态语言例如 Java 就会有很直观的体现，这里我们理解到多态就是通过调用相同的方法表现出不一样的行为就可以了。

#### 封装
**通过实例访问对象的属性**
``` python
zombie = NormalZombie(10, 10)
print zombie.health
```

而封装则是将类的属性放到方法中
``` python
class NormalZombie(BaseZombie):

    def get_health(self):
        return health

zombie = NormalZombie(10, 10)
print zombie.get_health()
```
数据封装让调用者没法直接拿到对象的属性，从而避免了调用者乱修改对象的属性，Python 对封装要求不是很严格，最重要的还是看你如何设计你的代码。

#### 访问控制
类中的属性和方法是可以设置访问权限的，分为 3 中，private，public 和 protect。

Python 中变量和方法前加两个下划线 `__` 表示 private，一个下划线 `_` 表示 protect，不加表示 public

Python 对访问控制的要求不是很敏感，所以我也不打算多说这块，读者是否要使用可以根据具体项目来看。

### OOP 设计原则
1. 组合优于继承
2. 高内聚，低耦合

OOP 的设计原则还有很多，而我对这两条的印象最深刻也用的最多，新手使用 OOP 很容易犯的错误就是只用继承来达到代码复用的目的，组合也可以达到相同的目的，使用组合能低类之间的耦合度（依赖），同时能避免上帝类（一个类做了所有的事情）的出现。

**僵尸加入使用道具功能**
``` python
# 我们可以在基类上添加方法
class BaseZombie(object):

    def pick_props(self, props):
        '''
        拾取道具
        '''
        self.props = props

    def use_props(self):
        '''
        使用道具
        '''
        print 'use props'

# 组合方法
# 定义道具类
class Props(object):

     def pick_props(self, props):
        '''
        拾取道具
        '''
        self.props = props

     def use_props(self):
        '''
        使用道具
        '''
        print 'use props'

class BaseZombie(object):

    def init(self, health, move_speed):
        self.health = health
        self.move_speed = move_speed
        # 添加道具方法
        self.props = Props()
```
可以看到，使用组合的好处是将类的职责划分的更明确更灵活，如果出现修改道具的需求也不用动僵尸类。

高内聚，低耦合和我们之前说的一个函数只做一件事是一个道理，我们要做到一个类只做一件事，并且把这件事做好，减少对其他模块的依赖。

### Python 使用 OOP 的场景
1. 使用 OOP 组织代码比用函数组织代码的更清晰。
2. Python 使用 Mixin 来扩展类的功能。

关于 Mixin 我会放到后面的章节讲解，这一章主要想让读者体会 OOP 的思想。

### 总结
OOP 属于一种编程范式，也是一种编程的思考方式，每一种思想都有适合的场景，而学习编程很多时候我们要了解每一种技术和思想的本质，优缺点，只有用合适的技术和思想解决合适的问题，我们才能提高开发的效率。
