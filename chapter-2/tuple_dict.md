# 元组、字典、集合

> "Bad programmers worry about the code. Good programmers worry about data structures and their relationships." （低水平程序员总在考虑代码，高水平程序员总在考虑数据结构及其之间的关系）--Linus Torvalds

这一节我们学习 3 种新的数据类型：

1. 元组（tuple）。
2. 字典（dict）。
3. 集合（set）。

### 元组（tuple）
元组（tuple）和列表（list）的功能类似，都可以用来表示有序数据的集合，区别 `list` 有新增元素、修改元素、删除元素等功能，`tuple` 不能进行任何修改。

Python 的 tuple 语法
``` python
# coding: utf-8

# 定义 tuple
fruit_tuple = ("apple", "mongo", "pear", "grape")

# 查看 tuple
print fruit_tuple[0]

# tuple 不能修改，但是可以用 tuple 组成新的 tuple
foo_tuple = (1, 2, 3)
bar_tuple = (4, 5, 6)
merge_tuple = foo_tuple + bar_tuple
# merge_tuple 是 (1, 2, 3, 4, 5, 6)
```
注：代码位于 `chapter-2/tuple/code/tuple_demo.py`

读者可能会问 `tuple` 存在的意义是什么，`tuple` 相较于 `list` 更省计算机内存，如果数据集合是有序并且确定不会改变的话，用 `tuple` 表示数据比用 `list` 表示更加合适。

**作业**：在 ipython 中定义 `tuple` 为 `foo = (1, 2)`，尝试将 `foo` 的第一个元素改成 `3` 看看会发生什么。

### 字典（dict）
查字典的时候我们通过笔画定位到一个字的页数，找到页数后我们就可以找到字的解释，Python 中的字典（dict）数据类型是用来表示 “键-值”（key-value）关系的数据集合，`dict` 的操作有增加元素、删除元素、修改元素、查找等功能。

**问题**: 实现一个小字典，1, 2, 3, 4, 5 这些页码分别对应 a, b, c, d, e 五个字母，打印第 1 页和第 5 页的字母。

**实现**
``` python
# coding: utf-8


little_dict = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
}

# 打印字典
print little_dict

# 打印第一页和第五页
print little_dict[1]
print little_dict[5]
```
注：代码位于 `chapter-2/tuple/code/little_dict.py`

上面例子中 1, 2, 3, 4, 5 表示字典的键（key）， a, b, c, d, e 表示字典的值（value）。

**字典功能演示**
``` python
# coding: utf-8


# 定义空 dict
foo_dict = {}

# 新增元素到 dict 中, key 1 value 'a' 和 key 2 value 'b'
foo_dict[1] = 'a'
foo_dict[2] = 'b'

# 修改 dict 中的元素, 修改 key 1 的 value 为 'e'
foo_dict[1] = 'e'

# 删除 dict 中的 key 为 1 的元素
del foo_dict[1]

# 使用 get 方法获取 dict 中的元素，若 key 不存在，则默认返回 value 0
# 获取 key 为 2 的元素的 value
bar = foo_dict.get(2, 0)
# 获取 key 为 3 的元素的 value
bar = foo_dict.get(3, 0)

# 使用 pop 方法获取 dict 中的元素，若 key 不存在，则默认返回 value False
bar = foo_dict.pop(2, False)
bar = foo_dict.pop(5, False)

# 使用 update 方法扩展一个 dict
foo_dict = {1: 1, 2: 2}
bar_dict = {3: 3, 4: 4}
foo_dict.update(bar_dict)
# foo_dict 的值 {1: 1, 2: 2, 3: 3, 4: 4}

# 使用 items 方法获取 dict 的所有元素
foo_dict = {1: 'a', 2: 'b'}
all_items = foo_dict.items()
# all_items 的值 [(1, 'a'), (2, 'b')]

# 使用 keys 方法获取 dict 的所有 key
foo_dict = {1: 'a', 2: 'b'}
all_items = foo_dict.keys()
# all_items 的值 [1, 2]

# 使用 values 方法获取 dict 的所有 value
foo_dict = {1: 'a', 2: 'b'}
all_items = foo_dict.keys()
# all_items 的值 ['a', 'b']

# 遍历 dict，打印输出所有 key 和 value
foo_dict = {1: 'a', 2: 'b'}
for key, value in foo_dict.items():
    print key, value
```
注：代码位于 `chapter-2/tuple/code/dict_demo.py`

注意事项：

1. `dict` 是无序的。
2. `dict` 的 key 必须是不可变数据类型，如：`int`、`float`、`string`、`tuple`，而 `list` 和 `dict` 不能作为 key

**作业**：定义 `dict` {(1, 2): 'a', 1.1: 'b', 'hello': 'python', 'nest': {1: 'c'}} 的所有 key 和所有 value，并且分别用循环打印他们的值。

上面仅仅是介绍了 `dict` 常用的方法，除了上面介绍的 `dict` 还有许多的方法，编程的世界有时候需要我们发挥联想或者是触类旁通的能力，比如我们要用 `dict` 数据类型实现我们没有见过的功能，除了自己实现，还可以联想一下是不是 `dict` 本身就有这样的功能，接着去 Google、去查看官方 API，很多时候这样的想象力就能让你高效的解决问题，这种想象力其实是一种对技术的直觉，培养良好的技术直觉除了多想还需要多了解各种技术和技术的本质。

> 编程观点：编程需要我们充分发挥联想能力，不要只在盒子里面思考问题。

### 集合（set）
在高中时期我们就学习过集合的相关概念，集合最重要的特性就是里面的元素是唯一，集合的交集，并集，差集等等方法 Python 都有相应的实现，下面我们来演示一下如何使用集合。

``` python
# 定义集合
foo_set = set([1, 2, 5])
bar_set = set([2, 4, 5])
```

**作业**：求出上面定义集合 foo_set 和 bar_set 的交集。

代码位于：`chapter-2/tuple/exercise/intersection.py`

**作业**：给定一个 `list` 将里面的元素去重，如 `[1, 1, 2, 2, 3, 3, 4, 4]` 去重后为 `[1, 2, 3, 4]`。

代码位于：`chapter-2/tuple/exercise/distinct.py`

解决问题的 3 种方法：
> STFG = search the fucking google = 去该死的 google 上找答案。

> RTFM = read the fucking manual = 去阅读该死的说明文档然后找答案。

> RTFS = read the fucking source code = 去阅读该死的源代码然后找答案。

### 数据结构（Data Structure）
`list`、`tuple`、`dict`、`set` 这四种数据类型的元素都是有特定的关系的：

1. `list` 元素有顺序通过下标获取。
2. `tuple` 元素有顺序通过下标获取。
3. `dict` 元素是键-值关系。
4. `set` 元素是唯一的。

数据结构指的是存在特定关系的数据元素的集合，上面四种数据类型就是四种数据结构，一旦确定的表示数据的数据结构代码的设计就确定了，我们在思考问题的解决方案的时候可以从数据结构方面入手，对比用几种不同数据结构表示问题的数据会是怎么样的，然后选最合适的数据结构来表示问题。

### 总结
这一节学习了 3 中数据类型：

1. `tuple` 元组。
2. `dict` 字典。
3. `set` 集合。

学习了解决问题的三大方法：

1. STFG
2. RTFM
3. RTFS

这节引出了数据结构的概念，随着学习的深入大家会逐渐理解数据结构的重要性。

学到这里 Python 的常用的数据类型就学完了，这几个章节学习的是数据的表示，接下面的章节要学的是基于数据表示做代码的设计，最后大家发挥一下联想能力，想想 Python 是不是还有其他的数据结构然后 Google it。
