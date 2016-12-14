# MRO 和 super

> 你对技术的细节了解得越多，你的工作效率就会越高 -- 来源未知

学习技术最好是“知其然知其所以然”，很多时候为了快速完成任务我们经常只是在“知其然”（知道技术能做什么，适合解决什么样的问题）的状态，而当我们去了解技术细节达到“知其所以然”（知道技术的实现原理）的程度后我们对技术会有不一样的感悟，或许这和王国维提出的读书境界是一个道理，大家可以体会一下。

> 昨夜西风凋碧树，独上高楼，望尽天涯路（晏殊《蝶恋花》）

> 衣带渐宽终不悔，为伊消得人憔悴（柳永《蝶恋花》）

> 众里寻他千百度，蓦然回首，那人却在灯火阑珊处（辛弃疾《青玉案》）

### MRO 方法解析顺序
Python 是支持多继承的语言，在多继承的场景中不同的父类可能拥有同名的方法，当子类调用该方法时我们要清楚子类调用的是哪个父类的方法，例如下面的设计：

你知道调用 D 的 `foo` 方法会返回什么吗?

![multi inheirtance](http://cdn.defcoding.com/Class Diagram-7.png)

代码实现：
``` python
class A(object):

    def foo(self):
        print 'I am A'


class B(A):
    pass


class C(A):

    def foo(self):
        print 'I am C'


class D(B, C):
    pass

d = D()
d.foo()
# 结果 I am C
```

想要知道 `d.foo()` 返回什么就必须知道 Python 的 MRO（Method Resolution Order）方法解析顺序，我们用的 Python 2.7 版本的新式类（new style）使用的是 `C3` 算法，这里我想让读者更关注多继承中方法解析顺序的结果而不是 `C3` 算法的过程，所以就不详细讨论 `C3` 算法的细节了，Python 中可以通过 `__mro__` 方法得到到类的方法解析顺序，也就是 `C3` 算法的结果。

``` python
print D.__mro__
# 结果 (<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <type 'object'>)
```
方法解析顺序为 `(D, B, C, A, O)`，回到问题上， `d.foo()` 方法返回的是父类 `C` 的 `foo()` 方法，因为 `D`、`C` 都没有 `foo` 方法。

**作业**：查阅资料学习 `C3` 算法的实现细节。

### super 函数
子类继承父类后，可以完全重写父类的方法从而实现我们想要的功能，然而有些时候我们需要在父类方法的基础上加一些功能，我们不能直接修改父类的方法，完全重写又会出现重复的代码， 而 `super` 函数正是为了解决这样的问题。

**问题**：使用 OOP 来描述程序员，运维工程师和架构师。

#### 需求分析
1. 他们都是员工。
2. 他们有不同的技能。
3. 架构师有程序员和运维工程师的技能。

#### 设计如下
![design](http://cdn.defcoding.com/py4g_super.png)

#### 代码实现
``` python
class Employee(object):
    '''
    普通员工
    '''

    def __init__(self):
        print 'I am a employee'


class Programer(Employee):
    '''
    程序员
    '''

    def __init__(self):
        print 'I am a programer'
        super(Programer, self).__init__()
        print 'I use Python'


class OPS(Employee):
    '''
    运维工程师
    '''

    def __init__(self):
        print 'I am a dev ops'
        super(OPS, self).__init__()
        print 'I can monitor all serivice'


class CTO(Programer, OPS):
    '''
    首席技术官
    '''

    def __init__(self):
        print 'I am a cto'
        super(CTO, self).__init__()
        print 'Welcome to my world'


cto = CTO()
# 结果
# I am a cto
# I am a programer
# I am a dev ops
# I am a employee
# I can monitor all serivice
# I use Python
# Welcome to my world
```

`super` 函数实现了我们的需求，在父类的基础上扩展功能，如果我们在父类的 `__init__` 方法新增功能，子类也会添加上，但是从结果来看会觉得很奇怪，下面我们就来分析 `super` 函数的原理。

#### super 原理

**super 函数源码**
``` python
def super(cls, inst):
    mro = inst.__class__.mro()
    return mro[mro.index(cls) + 1]
```
> 源代码里可以看到任何秘密 -- 来源未知

super 函数做了两件事

1. 通过 `mro()` 方法获取到实例的方法解析顺序。
2. 在 `mro` 顺序中返回当前类的下一个类。

结合我们的实例分析

调用 `__mro__` 查看方法解析顺序
``` python
print CTO.__mro__
# (<class '__main__.CTO'>, <class '__main__.Programer'>, <class '__main__.OPS'>, <class '__main__.Employee'>, <type 'object'>)
```
顺序是 `['CTO', 'Programer', 'OPS', 'Employee', 'object']`

结合 `CTO` 的 `__init__` 方法和 `super` 原理看结果
``` python
class CTO(Programer, OPS):
    '''
    首席技术官
    '''

    def __init__(self):
        print 'I am a cto'
        super(CTO, self).__init__()
        print 'Welcome to my world'
```
1. 首先打印 `I am a cto`
2. 调用 `super` 函数执行 `__init__` 方法，`super` 函数返回 `mro` 顺序中的下一个类，也就是 `Programer`
3. 调用 `Programer` 的 `__init__` 方法，打印 `I am Programer`，再调用里面 `super` 函数，原理同上直到返回结果

从源代码来看，`super` 的机制与 `mro` 顺序关系密切，如果更换了继承顺序，会表现出不一样的行为。

`super` 的讲解参考了这篇文章 [Python: 你不知道的 super](http://python.jobbole.com/86787/)，感谢作者。

### 总结
这一节主要讲了 Python 多继承中 `mro`，`super` 的使用和原理，编程虽然强调实践，但是技术的本质也是不可忽略的，只会使用不知道本质导致的结果就是靠运气编程。

> 不要靠运气编程 -- 程序员修炼之道
