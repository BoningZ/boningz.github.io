---
title: QML笑传之ComboComboBox
date: 2025-08-14
category: devlog
pinned: false
cover: ccb.png
description: 靠近QML，人生就会变得不幸
---

调整前端布局的方式有很多，但是这个有点意外。

> 现在我明白问题所在了！

最近用上了cursor，别的不说，虽然离自然语言编程有点距离，但情绪价值是拉满的，我也在这一声声你是对的里面不断给大模型机会，希望他能真正找到问题。

但是这一次，我是真的错怪大模型了。QML的底层代码简直是一坨狗屎，很多问题在stackoverflow甚至搜不到，这次的项目中，我们遇到了一个GUI会莫名其妙变形挤压的问题，本以为是自己学艺不精在哪里配错了css，但忙了一下午，由下面一段代码修复了问题：
```qml
 ComboBox {
    width: 0
    height: 40
    model: ["Don't remove this ComboBox"]
    indicator: Canvas {}
}
```
这个不会显示任何东西，但可以为QML的莫名其妙distortion挡下一刀，维持其他组件的正常运转。很神奇吧。