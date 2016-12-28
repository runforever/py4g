# 如何开始

> 好代码本身就是最好的文档。当你需要添加一个注释时，你应该考虑如何修改代码才能不需要注释。——Steve McConnell，Code Complete 作者

### 应该把代码存在哪？
如果只是简单的学习和实践，你爱把代码放哪就放哪，如果是做一个项目，特别是需要多人协作的时候，你应该使用版本控制系统（Version Control）将代码管理起来。

#### 为什么要用版本控制？
想象一下多人协作的场景，你和别人协作一起开发一个项目，如果代码存在你的磁盘上，别人应该怎么同步你的代码，或者怎么把写好的代码提交给你，用 U盘吗？如果是 5 到 6 个人用 U盘来互相同步代码想想都觉得是一个灾难。

再想象一下如下场景，别人修改了你的代码，引入了一个 bug，如果你想找回原来没有 bug 的代码该怎么找回？

使用版本控制系统可以轻而易举的解决上面的问题。

#### 什么是版本控制？
每当我们手机上的 App 更新了新版本，就会多一些新功能，如果我们喜欢原来的 App 版本大可以找回原来的版本来安装时候，代码版本控制系统也是类似这样的机制，你每次新增的代码都可以放到一个新的版本里，如果新增的代码出 bug 了你可以通过版本控制看到哪些是新增的代码，旧代码是怎样的，是谁修改的，可以很快的定位代码的问题。

版本控制系统有很多种，集中式管理的代表是 [Subversion](https://zh.wikipedia.org/wiki/Subversion)（SVN），分布式管理的代表是 [Git](https://zh.wikipedia.org/wiki/Git)，如今的新项目基本都首选 Git 作为版本控制系统，这里只讲 Git 的使用，SVN 等其他的版本控制系统大家需要的时候可以自学。

### 使用 Git 管理源代码
Git 基本使用不难，但是想做到信手拈来就需要专研了，要了解更多的 Git 的使用方法的读者可以看 [Pro Git](https://git-scm.com/book/zh/v2) 这本书。

#### 安装 Git
由于大家使用的操作系统不一样，安装方法我没法一一列举，如果是 Mac 可以通过 `brew install git` 来安装，其他的安装方法就靠 Google 了。

安装完成，查看 Git 版本

![git-version](http://cdn.defcoding.com/3E8C45C1-8A97-4C21-8B67-AF5723BBC662.png)

#### 初始化版本控制仓库
使用 `git init` 命令初始化版本控制仓库

![git-init](http://cdn.defcoding.com/ED8234DA-1927-4D54-BCFB-D0E5B0BEEBFF.png)

``` bash
mkdir my_project
cd my_project
git init
```

#### 将代码加入到仓库中
使用 Atom 新建文件名为 test.py 的源文件

![atom](http://cdn.defcoding.com/15EB9065-3F44-4DF8-AC17-23B3D2A8F794.png)

加入如下代码

![source code](http://cdn.defcoding.com/1896FE55-1ABE-4631-AB37-AF0629A69770.png)

使用 `git status` 查看仓库中代码的改动

![git-status](http://cdn.defcoding.com/A8162A3F-AB1E-4ED3-AD9D-353D1B0BBBDF.png)

Git 显示有一个名为 test.py 还未加入到仓库中的文件

使用 `git add` 命令将 test.py 加入到 Git 的暂存区中

![git-add](http://cdn.defcoding.com/7A4709CB-6763-4555-B751-B54EC0BC99C0.png)

使用 `git commit` 命令将 Git 暂存区的改动提交到版本仓库中

![git-commit](http://cdn.defcoding.com/CEC69CBD-B3AA-4668-9A30-2ABDABD2EC41.png)

`init project` 是告诉版本控制系统这个提交我们做了一些什么事，这个信息对于回溯历史来说很重要，需要简单清楚说明自己做了什么。

使用 `git commit` 后弹出的界面是 Vim 编辑器的界面，这里一定要记住 Vim 的几个操作命令，`i` 进入编辑模式，`Esc` 进入命令模式，要输入文字使用 `i` 进入编辑模式输入，输入完成后使用 `Esc` 退出编辑模式进入命令模式，在命令模式下使用 `:wq` 保存退出，使用 `:q!` 不保存退出，Vim 有很多东西要学，我只讲了最基本的使用，读者可以通过 Google 多学习 Vim 相关的知识。

使用 `git log` 查看版本控制的历史

![git-log](http://cdn.defcoding.com/5C3D6306-3576-4930-A283-796D7AF6B427.png)

历史信息中我们可以看到一个提交（commit），作者是 `runforeve`，提交时间是 `Tue Jan 3 15:28:15 2017 +0800`，提交的信息是 `init project`。

#### 新增功能，加入新版本
打开 atom，加入如下代码
``` python
def foo():
    print 'new feature'


if __name__ == '__main__':
    foo()
```

![new feature](http://cdn.defcoding.com/D26A1DC7-5575-457A-B29E-0B3CC9467387.png)

使用 `git status` 查看改动的文件

![git-status](http://cdn.defcoding.com/5EA17EA8-0AAA-4A29-974E-4F366C855321.png)

使用 `git diff` 查看具体改动了哪些代码

![git-diff](http://cdn.defcoding.com/61256611-A388-4119-A69F-1711349702B9.png)

`+` 号表示增加了哪些代码，`-` 号表示删除了哪些代码，这里我们只有增加的代码

使用 `git add test.py` 将改动的代码存入 Git 的暂存区

![git-add](http://cdn.defcoding.com/EEC1B7DD-E678-48BC-AE59-6EDD89CC74C3.png)

使用 `git commit` 将暂存区的文件提交到版本控制仓库

![git-commit](http://cdn.defcoding.com/9815B89C-EDF8-417F-B888-27FDFF139962.png)

使用 `git log` 查看历史

![git-log](http://cdn.defcoding.com/50413DEA-2CC6-4270-BABA-2ABEF24A68CE.png)

可以看到版本控制系统的仓库中已经有我们的两个提交。

以上就是 Git 的基本使用，不过代码还是保存在我们本地，如果和别人协作应该怎么办，如果换电脑了代码该怎么办，如果有个云端存放我们的代码就可以解决问题了，[GitHub](https://github.com) 可以解决这个问题。

### push 代码到 GitHub

#### 注册 Github 账号
这个过程我不多说，相信读者应该可以做到。

#### 创建一个远端的仓库
创建入口

![github create](http://cdn.defcoding.com/5651911C-E30E-4377-BD0A-618DEF37EF9D.png)

填写仓库信息后，点击创建

![fill form](http://cdn.defcoding.com/D2B9AEB9-F191-4ED1-8CA1-077880AF1622.png)

根据提示，使用相应的方法将代码 push 到 Github

![Instruction](http://cdn.defcoding.com/7CDB2165-1044-4D80-B237-BC1A43474F3D.png)

``` bash
# 换成你仓库的地址
git remote add origin https://github.com/runforever/learnpython.git
git push -u origin master
```

使用结果
![git-push](http://cdn.defcoding.com/435631C3-E66F-4BD9-A4F7-3F2E2F2E239A.png)

`git remote add origin https://github.com/runforever/learnpython.git` 命令是在本地仓库建立名为 `origin` 的远端仓库。
`git push` 命令是将本地代码推送到远端。

查看 GitHub 上的代码

![github](http://cdn.defcoding.com/2DBC9F24-B123-4769-B800-0330297059E1.png)

把 GitHub 的作为远端的用法就是这些，GitHub 还有很多功能值得我们去探索，接下来做项目就需要使用 GitHub 的 Fork + Pull Request 和 code review 功能。

### 开始做项目
浏览器打开 [https://github.com/runforever/learnpython](https://github.com/runforever/learnpython)，点击右上角的 Fork 按钮。

![Fork](http://cdn.defcoding.com/A90E6C8B-350B-48A5-9DFF-53B60AD5095B.png)

使用 `git clone` 命令将 Fork 的项目克隆到本地

![clone](http://cdn.defcoding.com/41EAF5FC-F3FC-401F-8677-93BD0A11C2AE.png)

```
# 将 your_repo 换成你的 GitHub 的用户名
git clone https://github.com/your_repo/learnpython.git
```

进入项目的目录开始写代码
```
cd learnpython/chapter-5/words
atom words.py
```

将写好的代码 push 到 GitHub
```
git add .
git commit
git push
```

提 Pull Request

![PR](http://cdn.defcoding.com/98E0E7B5-8E2F-468B-9B5D-4E77A04AF3F8.png)

填写 Pull Request 相关信息

![PR-Form](http://cdn.defcoding.com/0C38E57C-912C-491F-8E3A-4A4167873A1A.png)

创建 Pull Request

![create-PR](http://cdn.defcoding.com/8CA0A5CF-1616-4EE0-B6CC-DC239B4A8D51.png)

Code Review

![code-review](http://cdn.defcoding.com/A9048576-879B-4FA1-BBC1-8027B6A6E640.png)

review 代码的过程中我会给出相应的建议

chapter-5 中的项目会持续更新，我会把一些适合练手的项目都放在这里。

### 总结
这一节教大家如何使用版本控制系统 Git 和 Github，实际项目开发中会使用到这两个工具，我讲的 Git 只是最基础的东西，Git 最大优势在于它强大的分支管理功能，这些是我没有说的，希望读者可以自己去探索 Git 更多的功能。很多开源项目都放在 GitHub 上，所以 GitHub 也是一个学习编程的好地方，通过阅读源码可以学到别人的思想和技巧，读者一定要利用好 GitHub。
