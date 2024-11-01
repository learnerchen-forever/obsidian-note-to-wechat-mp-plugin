# Obsidian Wechat MP Draft Plugin

[![](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/actions/workflows/CI.yml/badge.svg)](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/actions/workflows/CI.yml)
[![Release Obsidian plugin](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/actions/workflows/release.yml/badge.svg)](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/actions/workflows/release.yml)
[![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/blob/master/LICENSE)
[![Github all releases](https://img.shields.io/github/downloads/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/total.svg)](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/releases/)
[![GitLab latest release](https://badgen.net/github/release/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/)](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/releases)

[EN 英文](./README.md) 


[Obsidian](https://obsidian.md/) Wechat MP Draft  Plugin 是一个obsidian社区插件，用于把笔记发送到微信公众号的草稿箱中，进一步编辑或发布。


## 原来的插件

这个插件是基于一个非常棒的插件做的，这个插件在这里 https://github.com/ai-chen2050/obsidian-wechat-public-platform 

对于大多的作者来说，一个插件的功能太多是难适应的。所以我将这个插件尽量的简化，只支持发布文章草稿的功能。

在此致敬原来的开发者，请去那里支持他。


## 版本历史
https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/releases

## 功能

- [ 发布微信草稿] 把笔记和其中链接的图片等素材一键发布到微信公众号的草稿箱

<br>



## 安装

在obsidian的社区插件市场上搜 `Wechat MP Draft`，然后`安装`,  `启用` [png]

第二种方法是下载[release](https://github.com/learnerchen-forever/obsidian-note-to-wechat-mp-plugin/releases) 包, 保存到`.obsidian/plugin`下新建的文件夹中，(可以命名为 "wechat-mp-draft-plugin") 刷新obsidian已安装的插件列表，选择`启用`



## 使用

为和插件正常工作，需要做以下的配置：

- 从微信公众号平台获取你账号的`appid`和 `app secret`，需要在插件的配置中填写。
- 获取当前运行obsidian的电脑的公网IP，把它加到微信公众号设置里的IP白名单中，和appid, app_secret，在同一个页面里。获取公网IP有多种方法，这是一种，[这里](https://tool.lu/ip/)

只有两边都正确配置了，插件才能正确地工作。


## 笔记属性和模板 Frontmatter and Template

微信公众号发布所需的信息都放在了 笔记的属性块（ Frontmatter） 中。 例如：

```yaml
---
title:
author: 
banner: https://source.unsplash.com/random/300x400
banner_path: 
source_url: ""
digest:
render_css:
---
```
为微信公众号的笔记制作模板是一个好主意，我们建议使用 [obsidian-templater](https://github.com/SilentVoid13/Templater) 这个插件。它的文档在这里：https://silentvoid13.github.io/Templater/ 


我们也准备了几个模板的例子。

## 文章的排版风格定制

可以从预定义的样式中选择，或者自定义。

