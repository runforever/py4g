# 函数

> Don't repeat yourself -- DRY 原则

### 红色还是蓝色
在开始之前，大家请先思考一下自己学到的东西和对编程的理解，思考了之后没有任何想法的话就可以换一本书看了，如果觉得自己有所收获，可以选择红色药丸，学会编程并且用它创造一些有价值的东西。

![red or blue](http://cdn.defcoding.com/6BFEECFA-0F60-401A-815D-E719ED7D36DD.png)

### 函数（function）

#### 来源
编程要解决的问题通常是一类问题，例如：给定任意长方形的长和宽求长方形的面积，在理解问题的时候我们要学会将问题归纳总结为一类问题，然后写解决一类问题的代码，编程中使用函数（function）来解决一类问题。

python 中使用 `def` 关键字定义函数，`return` 关键字返回函数的结果。

**问题**: 给定任意长方形的长宽，求面积。
``` python
# coding: utf-8


def rectangle_area(length, width):
    """
    长方形的面积为 长 x 宽
    """
    area = length * width
    return area

print rectangle_area(8, 4)
print rectangle_area(7, 3)
```
注：代码位于 `chapter-2/function/code/rectangle_area.py`

`length` 和 `width` 是函数 `rectangle_area` 的参数，调用 `rectangle_area` 的时候必须要传这两个参数。

前面说过命名的重要性，函数的命名同样重要，一个好的命名可以使人更容易的理解代码的意图，写代码的时候要时刻记得代码是写给人看的。

不好的命名习惯：

* 使用错误的英语单词
* 使用拼音命名，例如 changfangxingmianji（中文：长方形面积）
* 使用拼音简写，例如 cfxmj（使用首字母）
* 使用没有任何含义的单词，例如 a, b, a1, a2

可以把函数比作数学公示，给定输入参数，然后带入公式计算，最后得出结果。

代码开头的 `# coding: utf-8` 这一行注释在含有中文的脚本文件中都要加上，表示用 utf-8 编码处理脚本文件，读者可以试试去掉这行注释后运行代码看看发生什么，然后把报错信息放到 Google 中，看看会有什么答案。

函数注释：函数注释方便阅读代码的人了解函数的作用，函数注释紧跟在函数的定义后，使用 `''''''` 3 对单引号或者 `""""""` 3 对双引号来表示。

`if __name__ == '__main__':` 这个作为脚本文件运行的入口，告诉 Python 解释器需要从这里开始运行代码，脚本运行的时候会从 `if __name__ == '__main__':` 开始执行代码，这个主要入口在编程中称为 main，其他的编程语言也有类似的机制。

**作业**：给定任意半径，求圆形的面积。

注：代码位于：`chapter-2/function/exercise/circle_area.py`

#### 函数参数默认值
函数的参数可以指定一个默认值，看下面的问题。

**问题**：给定一个数的值和倍数，求结果，如果没有传倍数参数，倍数默认为 2 倍。
``` python
# coding: utf-8


def get_multiple(value, multiple=2):
    return value * multiple

# 3 的 5 倍
print get_multiple(3, multiple=5)

# 6 的 3 倍，根据参数顺序，可以这样调用
print get_multiple(6, 3)

# 不传倍数，默认是 2 倍
print get_multiple(3)
```
注：代码位于 `chapter-2/function/code/multiple.py`

参数默认值必须定义在函数参数后，下面的定义 Python 解释器会报错。
``` python
def get_multiple(multiple=2, value):
    return value * multiple
```

如果一个函数有多个默认参数值，调用的时候显示的加上默认参数名可以让人更好的理解代码。
``` python
# 实际情况一定不要用这样的命名，这里只是演示用
def foo(a, b=1, c=2, d=3):
    return a * b * c * d

# 显示的加上参数可以让代码显得更清晰
print foo(1, b=3, c=5, d=6)
```

#### function 可变长参数
有时候 `function` 的参数个数可能不是固定的，定义函数的时候就需要使用可变长的参数。

**问题**：写一个程序输入一只小狗的名字和一连串客人的名字，让小狗分别向这些客人 say hello。

例如：小狗的名字是 Ennly（金毛），客人的名字是 Lilei, hanmei。

输出：
```
Ennly say hello to Lilei
Ennly say hello to hanmei
```

实现：
``` python
# coding: utf-8


def say_hello(dog, *args):
    for client in args:
        print '{dog} say hello to {client}'.format(dog=dog, client=client)


say_hello('Ennly', 'lilei', 'hanmei')
say_hello('beira', 'friday', 'thursday', 'wednesday')
```
注：代码位于 `chapter-2/function/code/say_hello.py`

`args` 其实是前面我们学过的 tuple，函数传入的参数 `'lilei', 'hanmei'` 都存在这个 `tuple` 中, 函数中用 for 循环遍历 `args` 然后打印输出。

**问题**：写一个程序输入一只小狗的名字和来自不同国家的客人，客人分别用不同国家的语言跟小狗问好。

输入：小狗的名字是 Dachshund（腊肠狗），jack 的问好是`你好`，rose 是`hi`，mike 是`こんにちは`

输出：
```
jack say 你好 to Dachshund
rose say hi to Dachshund
mike say こんにちは to Dachshund
```

实现：
``` python
# coding: utf-8


def say_hi(dog, **kwargs):
    for name, greeting in kwargs.items():
        print '{name} say {greeting} to {dog}'.format(name=name, greeting=greeting, dog=dog)


say_hi('Dachshund', jack='你好', rose='hi', mike='こんにちは')
```
注：代码位于 `chapter-2/function/code/say_hi.py`

`kwargs` 是我们之前学过的 `dict` 数据类型，函数中用了 `dict` 的 `items` 方法来获取所有的客人。

`args` 和 `kwargs` 可以同时使用。
``` python
def foo(bar, *args, **kwargs):
    pass
```
`pass` 关键字表示这个函数什么都不做

**注意**：定义可变参数的顺序，可变参数放在函数参数后，`kwargs` 要放在 `args` 后面。

例如：
``` python
def foo(bar, a=1, *args, **kwargs):
    print bar
    print a
    print args
    print kwargs

# 调用
foo('hi', 3, 1, 2, 5, c=7, d=8)

# 这样调用会报错
foo('hi', b=3, 1, 2, 5, c=7, d=8)
```

### 定义 function 的原则
1. 一个 `function` 只做一件事，并且把这件事做好，如果一个 `function` 做了很多件事，考虑将这些事拆分到不同的 `function` 中。
2. `function` 要使用符合问题描述的命名。
3. 一个 `funtion` 不应该有很多行代码，如果定义的 `function` 超过了一个显示屏，应该考虑拆分代码到不同的 `function` 中。

### 总结
这一节学习了一个新概念：函数（function），函数可以通过解决一类问题来减少代码的重复，这是函数最重要的作用。

这一节还学了一个思考问题的方式：将问题抽象为一类问题。

有一种程序员叫 Ctrl-c 和 Ctrl-v 程序员，这些程序员喜欢 copy 代码，不仅是从网上去 copy，甚至同一个文件中相同的功能代码都要 copy 成两份，他们懒得将代码抽象成函数，再调用函数，copy 代码的做法非常糟糕，重复的代码会让你的维护工作变得困难，试想这么一个场景，你 copy 了两份代码，某天你需要改动这份代码的功能，你就需要改两次，而如果你一开始将功能抽象成一个函数的话，你只需要改动一次，程序员要学会真正的偷懒，copy 代码不是正确的偷懒方式，会让自己以后的工作更加困难。

> 编程观点：不会偷懒的程序员不是好程序员
