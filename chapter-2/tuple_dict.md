# 元组、字典、集合

> "Bad programmers worry about the code. Good programmers worry about data structures and their relationships." （低水平程序员总在考虑代码，高水平程序员总在考虑数据结构及其之间的关系）--Linus Torvalds

### 数据结构
我们已经学了编程的基础概念，这一节我们来学习一个新的东西，数据结构(Data Structure)

前面我们学习了 list 这种数据类型，list 属于数据结构的一种，特性是元素有序，可以增、删、改、通过下标查询，适合表示有序的数据集合，而有序是数据与数据之间的关系，学习数据结构的意义就是要学会如何用合适的数据结构去组织数据，表示数据。

数据结构的内容很多，远远不是我三言两语能说清楚的，这里通过介绍 Python 的数据类型来介绍数据结构的作用，读者在学习了这些后还应该自己去看看介绍数据结构相关的书，你了解的东西越多，视野越宽阔，你解决问题的效率就会越高。

> 你了解的东西越多，视野越宽阔，你解决问题的效率就会越高。

### 元组(tuple)
元组(tuple)和 list 的功能类似，都是用来表示有序数据的集合，区别是 tuple 不能被修改，也就是说你不能往一个定义好的 tuple 里面添加数据，修改里面的数据，删除里面的数据。

Python 的 tuple 语法
```
# 定义
fruit_tuple = ("apple", "mongo", "pear", "grape")

# 查看
print fruit_tuple[0]

# tuple 不能修改，但是两个 tuple 可以相加组成新的 tuple
foo_tuple = (1, 2, 3)
bar_tuple = (4, 5, 6)
merge_tuple = foo_tuple + bar_tuple
# merge_tuple 是 (1, 2, 3, 4, 5, 6)
```

相信读者会问有了 list 要 tuple 何用，tuple 对于 list 来说是更省计算机内存的，如果你的数据集合是有序并且不会改变的话，用 tuple 来表示数据比用 list 来表示更加的合适。

### 字典(dict)
查字典的时候我们通过笔画定位到一个字的页数，找到页数后我们就可以找到字的解释，Python 中的字典（dict）就是用来表示这种关系的数据集合。dict 可以增、删、改、查。

**问题**: 实现一个小字典，1, 2, 3, 4, 5 这些页码分别对应 a, b, c, d, e 五个字母，打印第 1 页和第 5 页的字母。

**实现**
```
little_dict = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
}
print little_dict[1]
print little_dict[5]
```
上面例子中 1, 2, 3, 4, 5 表示字典的键(key)， a, b, c, d, e 表示字典的值(value)

dict 功能演示
```
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

**dict 的注意事项**

1. dict 是没有顺序的
2. dict 的 key 必须是不可变数据类型，int, float, string, tuple 等等都可以作为 dict 的key，list 和 dict 不能作为 key

**作业**: 获取 dict {(1, 2): 'a', 1.1: 'b', 'hello': 'python', 'nest': {1: 'c'}} 的所有 key 和所有 value，并且分别用循环打印他们的值。

说了这么多的 dict 的方法，我也只是说了我经常用到的特性，dict 还有许多的其他方法，编程的世界有时候需要我们发挥联想能力和触类旁通的能力，比如 list 有各种处理数据的方法，我们就应该可以想象 dict 是不是也应该有类似的方法，我们要用 dict 实现我们没有见过的功能，是不是到 google 或者官方 API 文档搜索会找到相应的实现，而这样的想象力可以延伸到以后你学的任何技术中，很多时候你的灵机一动说不定就解决你遇到的问题了。

> 编程需要我们充分发挥联想能力，不要站在盒子里面看事物。

### 集合(set)
我们在高中已经学习过集合的相关概念，这里最重要的理解集合里面的元素是唯一的就够了，集合的交集，并集，差集等等方法 Python 都有相应的实现，下面我们来演示一下如何使用集合。

```
# 定义集合
foo_set = set([1, 2, 5])
bar_set = set([2, 4, 5])
```

**作业**: 求出 foo_set 和 bar_set 的交集，没有告诉你相应的办法，所以你需要 search the fucking google

解决问题的 3 种方法。
> STFG = search the fucking google = 去该死的 google 上找答案。

> RTFM = read the fucking manual = 去阅读该死的说明文档然后找答案。

> RTFS = read the fucking source code = 去阅读该死的源代码然后找答案。

**作业**: 给定一个 list 将里面的元素去重，如 [1, 1, 2, 2, 3, 3, 4, 4] 去重后为 [1, 2, 3, 4]

### 总结
这里我们已经将 Python 的常用数据结构学完了，Python 还有别的数据结构在 [collections](https://docs.python.org/2/library/collections.html) 这个库中，有序字典(OrderedDict)，双向列表(deque)，这些东西最终回归我们的主题，要使用合适的数据结构来组织数据

> 使用合适的数据结构组织数据

### 最后
我们用一个简单的问题来体现数据结构的威力。

**问题**: 使用栈这种数据结构解决逆波兰表示法。

栈(stack)： FILO(first in last out) 先进后出的数据结构

逆波兰表示法：我们常用的数学表达式由于把运算符合放中间所以都属于中缀表达式，例如 `3 + 4`、`1 + 2`、`(1 + 2) * 3`，逆波兰表示法是将运算符合放在后面也叫做后缀表达式，例如 `3 4 +`、`1 2 +`、`1 2 + 3 *`，可以看出来逆波兰表示法很好的帮助我们去掉了括号，体现了运算的优先级。

逆波兰算法步骤：

1. 遇见数字，将数字放到栈中。
2. 遇见运算符号，将栈顶的两个数字弹出来，得出计算结果后再压入栈中。

我们来计算 `1 2 + 5 *` 也就是中缀表达式 `(1 + 2) * 3`

![1,2,3](http://o73q6k64s.bkt.clouddn.com/img_0022.jpg)
![4,5](http://o73q6k64s.bkt.clouddn.com/img_0024.jpg)

代码实现:
```
# 定义栈
ret_stack = []

# 定义表达式
expression = '1 2 + 5 *'

# 将表达式中的空格去掉
expression = expression.replace(' ', '')

# 计算过程
for element in expression:
    # 如果不是符号，将数字放入栈中
    if element not in '+-*/':
        ret_stack.append(element)

    # 如果是符号，弹出栈中的两个元素，得出计算结果后再放入栈中
    else:
        second_num = ret_stack.pop()
        first_num = ret_stack.pop()
        expression = '{first_num}{operator}{second_num}'.format(
            first_num=first_num,
            operator=element,
            second_num=second_num
        )
        ret = eval(expression)
        ret_stack.append(ret)

# 打印最终计算结果
print ret_stack[0]
```

format 函数的作用：字符串格式化的方法，表现力更强更直观，用他来表示 `1+2` 很适合。

eval 函数的作用：eval 可以用来计算字符串表达式
```
eval('1 + 2')
eval('3 * 5')
```
这里使用 eval 函数的目的是为了让读者理解数据结构和算法流程本身，不想让读者去额外处理 `+ - * /` 运算的判断细节。

用栈实现逆波兰算法就非常合适，也许有其他的实现，但是肯定会很折腾，用合适的数据结构去描述合适的问题通常起到的是事半功倍的效果，底层数据结构的设计直接影响到上层代码的实现，如果你发现你的代码写的很复杂，想想是不是数据结构设计错了。

> 底层数据结构的设计直接影响到上层代码的实现
