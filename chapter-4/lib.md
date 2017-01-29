# Python 常用库

> 程序员最重要的两种能力：沟通能力，学习和思考能力 --《程序员思维修炼》

### 不要重复造轮子
大多数的编程问题都被解决过了，我们要解决问题的时候先不要着急去想解决方案，先 Google 一下有没有类似问题的解决方案，找不到合适的再自己解决。

为了解决各种问题的开源库就想一个个的轮子，可以用的就直接用，不要自己重复造，因为你造出来的轮子不一定比现成的好。

GitHub 上的 [awesome-python](https://github.com/vinta/awesome-python) 上面有各种问题领域 Python 相关的库，遇到问题可以优先从这里找答案，顺带一提，基本上主流的编程语言都在 GitHub 上有相应的 awesome 系列，使用其他编程语言解决问题的时候同样可以先参考 awesome。

下面说一些 Python 中常用库，只附上一些简单的介绍，读者根据需要自行学习，希望读者能培养出这样的能力，首先，尽可能多的了解库的作用，其次，遇到新问题，先思考是否能用现成的库解决问题，进而调研学习，最后解决问题。

### Python 常用标准库
1. [os](https://docs.python.org/2/library/os.html) 访问操作系统功能模块
2. [sys](https://docs.python.org/2/library/sys.html) 访问一些环境变量和与 Python 解释器交互
3. [datetime](https://docs.python.org/2/library/datetime.html) 日期时间处理
4. [collections](https://docs.python.org/2/library/collections.html) 高级数据结构，有序字典，队列等等
5. [uuid](https://docs.python.org/2/library/uuid.html) 生成 UUID 模块
6. [random](https://docs.python.org/2/library/random.html) 随机数生成模块
7. [re](https://docs.python.org/2/library/re.html) 正则表达式模块
8. [json](https://docs.python.org/2/library/json.html) JSON 处理模块
9. [pdb](https://docs.python.org/2/library/pdb.html) 单步调试模块

### Python 常用第三方库
1. [requests](http://docs.python-requests.org/en/master/) HTTP 库
2. [Django](https://www.djangoproject.com) 全栈式 Web 开发框架
3. [Flask](http://flask.pocoo.org) 轻量级 Web 开发框架
4. [bs4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) HTML 解析模块
5. [virtualenv](https://virtualenv.pypa.io/en/stable/) 隔离 Python 开发环境
6. [ipython](https://ipython.org) 功能更强大、更好用的 Python Shell
7. [ipdb](//virtualenv.pypa.io/en/stable/) 更好用的单步调试工具

### 总结
用现有的库解决问题能极大的节省我们的时间，让我们的工作和生活都更轻松，而另一方面，读者也应该想想自己解决问题的方案能否开源，让别人的工作和生活更轻松。
