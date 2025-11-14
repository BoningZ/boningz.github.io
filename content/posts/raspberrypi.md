---
title: 树莓派之慢速电影
date: 2025-11-13
category: devlog
pinned: false
cover: Titanic.jpg
description: 我心永恒
---

树莓派这个东西，初见是初中看我的世界维基，作为一个并行的版本被单列出来。没想到真正上手实践是用在这里，也是记录一下我第一次上手嵌入式的过程。

这是一个有多次完整实践、文档详细而全面的项目：以极慢速，即以分钟级的时间播放一帧，在墨水屏上播放整个电影。既是赠予异地心上人，泰坦尼克号是个好主题，希望这段感情不为占有，而是可以让彼此依靠成长。

本文主要参考[这篇文章](https://shumeipai.nxez.com/2020/10/13/how-to-build-a-very-slow-movie-player-in-2020.html)，文章内容有些过时，本文尝试给出一些更优的实践并指出常见的坑。

---

# 硬件需求
原文用了120英镑，本文在尽量使用高配的情况下也只用了600多人民币，这就是工业克苏鲁带给我的自信。
1. 树莓派4B(4GB) + 5V3A适配器 （2GB内存及以上即可，实际使用较低端的单片机都可以）
2. Waveshare树莓派4 7.5寸墨水屏模块 + HAT驱动板
3. Micro SD 64GB（实际用不了那么大，墨水屏分辨率也没那么大）
4. 7寸相框（照片12.7*17.8cm）+ 卡纸（用于遮盖墨水屏边缘）+ 棉线胶布

以下为非消耗品，或需要准备的环境：

5. 无线热点或键鼠显示器（用于连接树莓派）
6. Micro SD读卡器

---

# 外设准备

其实就是把墨水屏通过驱动板连接到树莓派上，直接参考链接中文章的图片即可。当然自己连也不会连出第二个样子，这种嵌入式的防呆设计都不错。

有一点可能需要注意的是驱动板链接柔性PCB导线的时候需要拨动一下黑色塑料，本人在这里浪费了几分钟。

SD卡的位置在树莓派的背面，充电器就连接在仅有的USB-C上即可。

---

# 系统准备

这个东西就相当于树莓派的外存/硬盘，至少得往里面写一个系统（黑话叫做“烧入”）才能开机。

注意，如果想要使用最新系统，此处**强烈推荐**[Imager](https://www.raspberrypi.com/software/)，而非文章中的Etcher，因为在某个较新的版本的安全策略升级，导致烧入后配置Wi-Fi非常繁琐。使用Etcher可以使用2021年及以前的系统，就可以按文中的方式配置网络。

Imager十分好用，在电脑上插入SD卡，启动Imager即可烧入。本文选择了最新的64位桌面版（实际可以不用桌面）。如果使用无线方式配置树莓派（没有键鼠显示器），烧入前请**务必**修改无线名和密码以连接到与PC同一网络。

另外请**务必**记住烧入的用户名和密码（新系统不再是默认的pi和raspberrypi）。

烧入完成后，如果想用无线方式链接树莓派，需要在SD卡根目录下新建一个名为ssh的空文件。否则尝试使用ssh连接时会显示阻止连接。

如果不小心烧错了，需要用[这个](https://www.sdcard.org/downloads/formatter/)格式化一下（快速格式化即可）再重新烧入新的系统。

一切就绪后，将SD卡插入树莓派，连接电源，树莓派会自动开机。

---

# 软件准备

开机大约半分钟左右，树莓派会连接到配置好的Wi-Fi上，这时就可以用SSH连接树莓派了。可以使用文中推荐的PuTTY连接，实际上用命令提示符也能连。

连接时需要进入路由器后台找到树莓派的IP地址，名字很好辨认，一般就是raspberrypi，会给分配一个192.168.x.x这样的地址。然后使用同一网络下的设备就可以通过SSH，输入用户名和密码连接了。

时隔多年早已有好事者把这个项目整理为傻瓜级别，本文直接用之。具体为这个[Github项目](https://github.com/TomWhitwell/SlowMovie)，有一条傻瓜一样的安装指令：
```bash
bash <(curl https://raw.githubusercontent.com/TomWhitwell/SlowMovie/main/Install/install.sh)
```
直接在用户目录下运行这个指令，会自动安装该项目及其所有依赖。注意如果是墙内可能会超时几次，但一般重试几次都可以成功安装。运行结束后，用户目录下会多一个SlowMovie目录，进去后运行：
```bash
python slowmovie.py
```
就可以看见墨水屏闪烁几下，出现一个人开车的画面，过一段时间会切换。实际上这是播放了SlowMovie/Videos中的test.mp4的内容，使用默认参数。至此所有需要的软件已经安装并跑通。

---

# 自定义播放

既然是送礼，不能指望对方打开SSH连进来再一通操作，本文最终实现的是**插上电自动继续播放，断电保留在断电时的画面**，不需要联网。

首先准备一个有意义的视频片段，放到SlowMovie/Videos中，我的泰坦尼克号是.mkv格式的也可以直接播放。传输文件可以用FileZilla通过SFTP，当然用XFTP软件等等都可以。

然后确定一下自己想要的参数，指令运行时该项目会自动计算播放完所需时间。同时该项目本身就支持直接续播，不需要额外配置。例如以下指令：
```bash
python slowmovie.py -f Videos/Titanic.mkv -d 150 -i 1 -l
```
代表播放泰坦尼克号，每150秒播放1帧，播完后从头播放。更具体的选项可以在Github原仓库页面查看。

需要注意的是，如果想实现连电播放，需要配置systemd**而非/etc/profile中的内容**，后者起的作用是用SSH登录后执行指令。具体操作如下：

1. 建立服务文件

```bash
sudo nano /etc/systemd/system/slowmovie.service
```
在里面写入以下内容（注意视频路径和参数修改为自己的）：
```ini
[Unit]
Description=SlowMovie Startup Script
After=network-online.target
Wants=network-online.target
StartLimitIntervalSec=0

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/SlowMovie
Environment=PYTHONUNBUFFERED=1
ExecStart=/home/pi/SlowMovie/.SlowMovie/bin/python /home/pi/SlowMovie/slowmovie.py \
          -f /home/pi/SlowMovie/Videos/Titanic.mkv -d 60 -i 1 -l
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```
然后按Ctrl+O后回车保存，Ctrl+X退出。虽然不是Vim这种乌干达恶意软件，但还是值得说一下。

2. 开启服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable slowmovie.service
sudo systemctl start slowmovie.service
```
这样应该就可以了，断电重插一次，看看是否符合预期。

---


>Once more, you open the door
>
>And you're here in my heart
>
>And my heart will go on and on