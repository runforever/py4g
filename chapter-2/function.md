# 函数，脚本文件

> Don't repeat yourself -- DRY 原则

前面我们解决的问题都有一个特点，就是问题中的变量只有一个值，例如一个长方形的长宽是 8 和 4 求长方形的面积，而如果问题变成给任意长方形的长和宽求长方形的面积的话，前面的学的东西就不够了，这一节我们就来学习如何使用函数来解决这类问题。

### 函数(function)

#### 介绍
我们用编程解决的问题通常不是一个指定的问题，而是一类问题，例如给任意长方形的长宽求面积，给任意圆形的半径求面积，在理解问题的需求的时候我们就要学会如何将问题归纳总结为一类问题，而这个过程你将决定你的程序设计成什么样子。

python 中使用 `def` 来作为定义函数的关键字，`return` 关键词返回函数的求值结果。

**问题**: 给定任意长方形的长宽，求面积。
```
def rectangle_area(length, width):
    area = length * width
    return area

print rectangle_area(8, 4)
print rectangle_area(7, 3)
```

`length` 和 `width` 是 function 的参数，调用 function 的时候必须要传这两个参数。

function 很好的帮助我们描述了一类问题的解决方案。

function 的命名是很重要的，一个好的命名可以让人很容易的理解你的意图，我们在写代码的时候要时刻记得代码是写给人看的。

不好的命名习惯:

* 使用错误的英语单词
* 使用拼音命名，例如 changfangxingmianji
* 使用拼音简写，例如 cfxmj
* 使用没有任何含义的单词，例如 a, b, a1, a2

function 就像我们数学中学过的公示一样，给定输入，带入公式计算后得出结果。

#### 脚本文件
现在我们将这个代码保存到脚本文件 `rectangle_area.py` 中。
```
# coding: utf-8

def rectangle_area(length, width):
    area = length * width
    return area

if __name__ == '__main__':
    print rectangle_area(8, 4)
    print rectangle_area(7, 3)
```

运行 `python rectangle_area.py`

结果
```
32
21
```

开头的 `# coding: utf-8` 这一行代码在我们的脚本文件中都需要加上，因为 Python 解释器默认是用 [ASCII](https://zh.wikipedia.org/wiki/ASCII) 编码去处理我们的脚本文件的，ASCII 编码中是没有中文编码的，而如果脚本文件中包含中文注释或者中文字符串的话运行脚本的时候就会报错，而开头的这一行代码就是告诉 Python 解释器用 utf-8 编码去处理我们的脚本文件。

`if __name__ == '__main__':` 这个作为脚本文件运行的入口，告诉 Python 解释器需要从这里开始运行代码，脚本运行的时候会依次执行 `if __name__ == '__main__':` 下面的代码，这个主要入口在编程中称为 mian，其他编程语言也有类似的机制。

到这里我们已经学习了编程的一个完整的过程，分析问题，归纳问题，写代码用代码来描述问题，运行代码得到结果，你掌握了这个过程你也可以通过写代码去解决问题了。

**作业**：给定任意半径，求圆形的面积，要求使用合适的文件名和函数名。

#### function 注释
function 的注释用来告诉阅读代码的人函数的作用
```
def rectangle_area(length, width):
    '''
    计算长方形的面积
    '''
    area = length * width
    return area
```
注释要紧跟函数的定义，不能放在函数的中间，注释使用 `''''''` 3 个单引号或者 `""""""` 3 个双引号来表示。

#### function 参数默认值
function 中的参数可以指定一个默认值。

**问题**：给定一个数的值和倍数，求结果，如果没有给定倍数默认是 2 倍，例如给定 3 和 倍数 5。

```
def get_multiple(value, multiple=2):
    return value * multiple

# 3 的 5 倍
print get_multiple(3, multiple=5)

# 6 的 3 倍，根据参数顺序，可以这样调用
print get_multiple(6, 3)

# 不传倍数，默认是 2 倍
print get_multiple(3)
```

注意:

参数默认值必须定义在函数参数的最后，这样定义默认参数值 Python 解释器会报错。
```
def get_multiple(multiple=2, value):
    return value * multiple
```

如果有多个默认参数值，调用的时候最好显示的加上默认参数名。
```
# 实际情况一定不要用这样的命名，这里只是演示用
def foo(a, b=1, c=2, d=3):
    return a * b * c * d

# 显示的加上参数可以让代码显得更清晰
print foo(1, b=3, c=5, d=6)
```

#### function 可变长参数
有时候 function 的参数个数可能不是固定的，这个时候我们的函数参数就需要定义可变长的参数。

**问题**：写一个程序输入一只小狗的名字和一连串客人的名字，让小狗分别向这些客人 say hello。

例如：小狗的名字是 Ennly (金毛)，客人的名字是 Lilei, hanmei。

输出：
```
Ennly say hello to Lilei
Ennly say hello to hanmei
```

实现：
```
def say_hello(dog, *args):
    for client in args:
        print '{dog} say hello to {client}'.format(dog=dog, client=client)


say_hello('Ennly', 'lilei', 'hanmei')
say_hello('beira', 'friday', 'thursday', 'wednesday')
```

`args` 的数据类型其实是前面我们学过的 tuple，有顺序的数据集合，不可修改，比 list 省内存，这里我们可以使用 for 循环将客人的名字依次遍历输出。

Python 中还有一种定义可变长参数的方法。

**问题**：写一个程序输入一只小狗的名字和来自不同国家的客人，客人分别用不同国家的语言跟小狗问好。

例如：小狗的名字是 Dachshund (腊肠狗)，jack 的问好是`你好`，rose 是`hi`，mike 是`こんにちは`

输出：
```
jack say 你好 to Dachshund
rose say hi to Dachshund
mike say こんにちは to Dachshund
```

实现：
```
def say_hello(dog, **kwargs):
    for name, greeting in kwargs.items():
        print '{name} say {greeting} to {dog}'.format(name=name, greeting=greeting, dog=dog)


say_hello('Dachshund', jack='你好', rose='hi', mike='こんにちは')
```

`kwargs` 其实是我们之前学过的 dict 数据类型，这里我们用了 items 方法来获取所有的客人。

`args` 和 `kwargs` 可以同时使用。
```
def foo(bar, *args, **kwargs):
    pass

# pass 关键字表示这个函数什么都不做
```

注意定义可变参数的顺序，可变参数放在函数参数的最后面。`kwargs` 要放在 `args` 的后面。

例如：
```
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

#### 定义 function 的原则
1. 一个 function 只做一件事，并且把这件事做好，如果一个 function 做了很多件事，考虑将这些事拆分成不同的函数。
2. function 的命名很重要，好的命名可以让我们的代码更清晰。
3. funtion 不应该有很多行代码，如果你定义的 function 超过了你写代码的屏幕，你应该考虑拆分代码到不同的 function。

#### 总结
有一种程序员叫 Ctrl-c 和 Ctrl-v 程序员，这些程序员喜欢 copy 代码，不仅仅是从网上去 copy，甚至同一个文件中相同的功能代码都要 copy 成两份，因为他们懒得讲代码抽象成一个 function，然后再去调用 function，这种做法是非常糟糕的，代码的重复会让你的维护工作变得异常困难，试想这么一个场景，你 copy 了两份代码，某天你需要改动这份代码的功能，你就需要改两次，而如果你一开始将功能抽象成一个函数的话，你只需要改动一次，程序员要学会真正的偷懒，而 copy 显然不是真正的偷懒，反而会让自己以后的工作更加困难。

> 不会偷懒的程序员不是好程序员

> 一个函数只做一件事并且把这件事做好
