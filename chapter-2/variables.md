# 列表、变量、流程控制

> 先解决问题，然后再写代码

### 稍微复杂的问题
**问题**：打印 "hello", "hi", "bye" "good"。

**要求**：每个字符串前面需要加上字符串 "say"，并且需要换行。

**示例结果**：
``` python
say hello
say hi
say bye
say good
```

小知识：`\n` 在 Python 的字符串中表示换行。

下面我们来看看这个问题的几种解决方案。

**解决方案一**
``` python
>>> print 'say hello\nsay hi\nsay bye\nsay good'
say hello
say hi
say bye
say good
```
这个方案用字符串 `say hello\nsay hi\nsay bye\nsay good` 来描述问题，代码读起来需要花一些时间，但是可以工作。

> 编程观点：写计算机能看懂的代码谁都会，写出人可以看懂的代码很难

这个方案存在的问题：我们改一下问题的需求，将 "say" 改成 "lilei say"，示例结果如下：
``` python
lilei say hello
lilei say hi
lilei say bye
lilei say good
```
现在大家思考一下修改的方案，将原来代码中的 "say" 修改成 "lilei say" 重复 4 次后可以达到目的，不过这样维护代码似乎有点麻烦，这种感觉是对的，带着这种不好的感觉我们来看看方案二。

**解决方案二**

使用 Python 中列表（list）数据类型和 `for` 循环控制结构解决重复和代码可读性问题。

代码实现：
``` python
# coding: utf-8

# 定义一个列表
str_list = ["hello", "hi", "bye", "good"]

# 使用 for 循环来打印每个字符串
for each in str_list:
    print 'say %s' % each

# 结果
say hello
say hi
say bye
say good
```
注：代码位于 `chapter-2/list/code/say_print.py` 中

解释 1：`["hello", "hi", "bye", "good"]` 是列表，表示问题中字符串的集合，列表有新增元素，删除元素，改变元素等功能。

解释 2：`str_list` 是变量，用来表示列表 `["hello", "hi", "bye", "good"]`，方便后面的代码使用列表。

解释 3：`for ... in ...:` 是循环控制流程，表示从列表从左往右依次遍历列表中的每个元素，每次遍历元素的值用变量 `each` 表示。

解释 4：`'say %s' % each` 是前面学过字符串，这样的语法叫做字符串格式化，`%s` 表示用字符串的方式来打印变量 `each`

这样写代码的人比较容易看懂，而且出现需求变更，代码修改起来比之前的方案轻松多了。

**注意 1**：Python 语言缩进层级很严格，for 循环后面的 `print` 语句前面空了 4 个空格表示 `print` 属于 for 层级。

**注意 2**：`#` 号开头的描述是代码的注释，可以向看代码的人解释你的代码是干什么的。

这个问题中的编程相关的概念有点多，下面一一学习。

### 列表（list）数据类型
列表是有顺序的元素集合，可以根据下标获取列表中的元素，列表的下标从 0 开始，0 表示列表的第一个元素。

可以对列表进行添加元素、删除元素、更新元素、排序等操作。

**代码演示**
``` python
# coding: utf-8

# 定义一个 list，里面包含 "hello", 1, 1.1
foo_list = ["hello", 1, 1.1]

# 根据下标打印列表中第一个和第二个元素的值
print foo_list[0], foo_list[1]
# 结果 hello，1

# 添加元素 2 到上面的列表末尾
foo_list.append(2)
print foo_list
# 结果 ['hello', 1, 1.1, 2]

# 修改第一元素为hi
foo_list[0] = "hi"
print foo_list[0]
# 结果 hi

# 查看 list 的长度
print len(foo_list)
# 结果 4
```
注：代码位于 `chapter-2/list/code/list_tutorial.py`

代码中 `foo_list.append(2)` 是往 `list` 末尾添加元素的方法，除了 `append` 方法，列表还提供了其他操作列表的方法，例如往 `list` 中间添加元素，删除 `list` 的某个元素等等。

代码中 `len(foo_list)` 是调用 Python 中的 `len` 函数查看 `foo_list` 长度，除此之外 `len` 函数还可以用来查看字符串的长度。

---

**作业1**：在 ipython 中查看字符串 "Hello" 的长度。

**作业2**：在 ipython 中定义一个 `list` ['hello', 1, 1.1] 并且使用 `list` 的删除方法删除 `list` 中的第2个元素。

**作业提示**：使用 Google 或其他搜索引擎查找 `list` 删除制定元素的方法，搜索引擎首选 Google，如果没有条件访问不了（最好查找如何使用 Google 的方法），使用 bing， 百度少用或者不用。

对于搜索中的结果，博客的文章质量一般会高些，这里面包含了博客作者的个人思考，当然，如果可以看英文，[stackoverflow](http://stackoverflow.com) 的答案质量更高。

---

### 变量（variable）
上面的题目已经可以看出来了，在用代码描述问题的过程中变量必不可少。

变量定义的规则：变量名包括字母、数字、下划线，不能以数字开头。

变量命名需要使用符合问题描述的单词，不要使用 a, b, c 这种没有意义的取名，编程的过程中随时查汉英词典使用有意义的命名，这么做的目的是为了写出人能看懂的代码。

变量命名的两种方式：

1. 驼峰法，使用大写字母做单词的区分。
2. 下划线法，使用 `_` 下划线做单词的区分。

**问题**：ipython 中使用驼峰法和下划线法分别定义一个教室。
``` python
>>> classRoom = 1 # 驼峰法命名方式
>>> class_room = 1 # 下划线法命名方式
```

**注意**：代码中的变量命名为了统一只能使用驼峰法和下划线法中的一种，不能两种混用，本书的代码变量命名使用的是下划线法，读者根据自己的爱好选择一种。

Python 中对于变量命名和代码的风格有一套规约 PEP8，详情可以查阅 [中文链接](http://damnever.github.io/2015/04/24/PEP8-style-guide-for-python-code/#naming-conventions) 或 [英文链接](https://www.python.org/dev/peps/pep-0008/#naming-conventions)，读者的代码风格尽量参考 PEP8，目的是为了让阅读自己代码的人有更好的阅读体验。

**作业**：学习和查看 PEP8 规约。

---

### 流程控制
编程非常注重逻辑，任何编程语言的流程控制是下面的 3 大流程。

1. 顺序执行。
2. 分支。
3. 循环。

#### 顺序执行
顾名思义，代码是按照顺序一行一行的执行下去，直到最后一行代码执行完毕。

**问题**: 用 `list` 定义一个家庭, 家庭成员里面包含 "dad", "mom", "you"，一天你带了一只小狗回家，于是家庭成员添加了 "Husky"，打印出家庭成员的第一位和和第三位。
``` python
family_merber = ["dad", "mom", "you"]
family_merber.append("Husky")
print family_merber[0]
print family_merber[2]
```
注：代码位于 `chapter-2/list/code/family_member.py`

如果更换后两行代码的执行顺序，结果就会不同。

#### 分支
代码默认是按照顺序一行一行执行的，某些情况下我们需要根据条件判断让代码执行哪个分支。

Python 中的分支结构有 3 种。
``` python
# 注：condition_is_true 是条件为真的意思

# 第一种
if condition_is_true:
   # do something 做某些事

# 第二种
if condition_is_true:
   # do something
else:
   # do other thing

# 第三种
if condition1_is_true:
   # do something
elif condition1_is_true:
   # do something
elif condition1_is_true:
   # do something
else:
   # do default thing
```
下面结合循环来讲解分支控制结构的使用。

#### 循环
没有人想一直做重复的工作，计算机却很擅长做重复的事情，遇到重复乏味的事情交给计算机来做是个不做的主意。

Python 中的循环结构：
``` python
# condition_is_true 是条件为真的意思

# 第一种
for ... in ...:
    # do something

# 第二种
while condition_is_true:
    # do something
```

**问题**：用 `list` 定义一个家庭，成员为 "dad", "mom", "you", "Husky"，`list` 中哈士奇说 "wooo"，其他家庭成员说 "hello"。

**结果**：
``` python
dad say hello
mom say hello
you say hello
Husky say wooo
```

**代码实现**：
``` python
family_list = ["dad", "mom", "you", "Husky"]

for member in family_list:
    # 分支判断
    # 如果家庭成员是 Husky 执行代码 print "Husky say wooo"
    # 否则执行代码 print "%s say hello" % member
    if member == "Husky":
        print "Husky say wooo"
    else:
        print "%s say hello" % member
```
注：代码位于 `chapter-2/list/code/family_say.py`

解释：使用 `for` 循环避免 `print` 语句的重复，使用 `if...else...` 分支判断执行哪个分支的代码。

**极端问题**: 打印 100 次 "hello world"

**实现方案一**
``` python
# coding: utf-8

# count 用作计数器，当小于 100 的时候打印，大于 100 的时候跳出 while 循环
count = 0

while count < 100:
    print "hello world"
    count += 1
```
注：代码位于 `chapter-2/list/code/while_loop_100.py`

解释：`count += 1` 与 `count = count + 1` 效果一样，Python 的简写。

这种循环方式属于经典的循环方式，count 表示计数器，每做完一次计数加 1 直到等于 100 结束循环。

**实现方案二**
``` python
for i in xrange(100):
    print "hello world"
```
注：代码位于 `chapter-2/list/code/for_loop_100.py`

解释：`xrange(100)` 的作用是生成一个 `[0, 1, 2, 3, ..., 99]` 的 `list`，这里用做替代计数器。

方案二要比方案一看起来更简洁，不需要处理计数器的逻辑，可读性也高一些，我们写代码尽量用可读性高的表达方法。

#### 死循环（endless loop）
看过《恐怖邮轮》这部电影的人知道，主角由于欺骗死神被死神惩罚困在重复循环的场景中永远无法逃脱，这是一件非常恐怖的事情，即使计算机擅长做重复的事情，我们写的代码也不要出现死循环，否则程序就无法结束了，除非你确定你的代码就是需要死循环。

死循环打印 "hello world" 的代码
``` python
while 1:
    print "hello world"
```
注：代码位于 `chapter-2/list/code/endless_loop.py`

程序不会结束，除非你用进程管理器结束这个程序或者使用快捷键 Ctrl + c 结束程序。

#### break（关键字）
`break` 关键字可以让提前结束循环。

**问题**：定义一个 `list` 为 [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff']，遍历其中的每个元素直到找到 `gold` 后打印 "find it" 并且结束循环，否则直接打印找到的东西。

**结果**：
``` python
1
2
3
8
7
find it
```

**代码实现**
``` python
# coding: utf-8

gold_list = [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff']
for i in gold_list:
    # 使用 if 条件判断是否找到 gold
    # 如果找到打印 'find it' 并且结束循环
    # 如果没有找到直接打印当前遍历的元素
    if i == 'gold':
        print 'find it'
        break
    print i
```
注：代码位于 `chapter-2/list/code/break_loop.py`

当代码执行到了 `break` 语句后就会结束循环，不继续遍历剩下的元素。

#### continue 关键字
`continue` 关键字可以让代码结束当前循环。

**问题**：定义一个 list 为 [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff'], 遍历其中的每个元素直到找到 gold 后打印 "It's mine" 并且当前循环，否则直接打印找到的东西。

**结果**：
``` python
1
2
3
8
7
find it
22
45
ff
```

**代码实现**
``` python
# coding: utf-8


gold_list = [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff']
for i in gold_list:
    if i == 'gold':
        print 'find it'
        continue
    print i
```
程序执行到 `continue` 语句后会结束当前循环，不会继续执行代码 `print i`。

### 总结
随着我们学的东西越多，可以用编程解决的问题也越多，这一节我们又学习了几个新的编程概念，分别是：

1. 变量（variable），变量用来临时记录值。
2. 变量命名方法，驼峰法和下划线法。
3. 变量命名原则，使用有意义的单词。
4. Python 代码风格规约 PEP8。
5. 程序的 3 种流程控制，顺序、分支和循环。

另外，好代码其中的一个特点就是容易阅读，我们写代码的同时要有意识的去提高代码的可读性。
