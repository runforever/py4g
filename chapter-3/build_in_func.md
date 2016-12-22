# 常用内建函数

> 如果你交给某人一个程序，你将折磨他一整天；如果你教某人如何编写程序，你将折磨他一辈子。——David Leinweber

在进入这一章节的学习之前，我想先介绍几个有用的 Python 内建函数给大家。

### `type` 函数
你是否想知道一个变量是什么类型的需求，如果有的话，就用 `type` 函数吧。

**举个栗子**
``` python
# 整型
foo = 1
print type(foo)
# <type 'int'>

# 浮点型
foo = 1.1
print type(foo)
# <type 'float'>

# 字符串类型
foo = 'hello world'
print type(foo)
# <type 'str'>

# 自定义类
class Foo(object):
    pass

bar = Foo()
print type(bar)
# <class '__main__.Foo'>
```

### `dir` 函数
如果你想知道一个对象有什么方法，就用 `dir` 函数来查看吧。

**举个🌰**
``` python
# 查看一个 list 对象有什么方法
foo = [1, 2, 3, 4]
print dir(foo)
# 返回的 list 中包含所有可以用的属性和方法
# ['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__delslice__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getslice__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__setslice__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

# 自定义类
class Foo(object):

    def say_hello(self):
        print 'hello'

bar = Foo()
print dir(bar)
# ['__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'say_hello']
```

**作业**：读者在 Python Shell 里使用 `dir` 查看一个 `dict` 对象的方法。

我经常在 Python Shell 和 pdb 中使用 `dir` 函数查看一个对象的可用属性和方法，但是我并不鼓励大家挨个尝试方法是不是自己想要的，如果想找自己想要的方法我建议大家还是通过 google 或者官方 API 文档先了解。

### `isinstance` 函数
如何判断一个对象是否是一个类的实例呢？用 `isinstance` 函数就知道了。

**请看🌰**
``` python
# 整型
foo = 1
print isinstance(foo, int)
# True
print isinstance(foo, float)
# False

# 自定义类
class Foo(object):
    pass

bar = Foo()
print isinstance(bar, Foo)
# True
print isinstance(bar, int)
# False
```

### 总结
常用的内建函数当然不只我说的这几个，还有 `hasattr`，`getattr`，`abs`，`sorted` 等等，这里只是抛砖引玉，读者可以自行查阅更多的 Python 内建函数的作用和使用方法，通过搜索引擎查找资料学习会让大家收获比书中更多的东西，因为搜索引擎上有大家的智慧。
