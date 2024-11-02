# Obsidian WeChat MP Draft Plugin

[![](https://github.com/learnerchen-forever/wechat-mp-draft/actions/workflows/CI.yml/badge.svg)](https://github.com/learnerchen-forever/wechat-mp-draft/actions/workflows/CI.yml)
[![Release Obsidian plugin](https://github.com/learnerchen-forever/wechat-mp-draft/actions/workflows/release.yml/badge.svg)](https://github.com/learnerchen-forever/wechat-mp-draft/actions/workflows/release.yml)
[![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/learnerchen-forever/wechat-mp-draft/blob/master/LICENSE)
[![Github all releases](https://img.shields.io/github/downloads/learnerchen-forever/wechat-mp-draft/total.svg)](https://github.com/learnerchen-forever/wechat-mp-draft/releases/)
[![GitLab latest release](https://badgen.net/github/release/learnerchen-forever/wechat-mp-draft/)](https://github.com/learnerchen-forever/wechat-mp-draft/releases)

[ZH 中文](./README-zh.md) 


The [Obsidian](https://obsidian.md/) WeChat MP Draft  Plugin is an obsidian community plug-in for sending note to WeChat MP platform as draft for future editing or publishing.


## Original Plugin

The plugin is based on https://github.com/ai-chen2050/obsidian-wechat-public-platform, It is a very creative product. 

For most of authors, integrating too many functionalities in one plugin is confusing. Thus I tried to make it as simple as possible. 

Respect to the original developer,  and please go there for more information.


## Release history
https://github.com/learnerchen-forever/wechat-mp-draft/releases

## Functions & Command

- [ send to WeChat MP as draft] Add images and text content to the draft box of WeChat Official Accounts Platform

<br>



## Install

Directly search for `WeChat MP Draft` in the plug-in market,  to install it. After the installation is complete, click `Enable` to enable the plug-in. [png]

The other way is to download the [release](https://github.com/learnerchen-forever/wechat-mp-draft/releases) package, and save it to newly created folder (could be named as "wechat-mp-draft-plugin", e.g.) under .obsidian/plugin. refresh the installed plugin list, and enable it. 


## Uasage

To make it work properly, you need to have the following:

- get appid and app_secret from WeChat official account platform, to fill in the setting of the plugin.
- get the public internet IP address of the PC where you are running Obsidian. Add the IP address to the whitelist of the WeChat official account platform.

### Configurtion on WeChat Platform

- [Login](https://mp.weixin.qq.com/) WeChat Official Accounts Platform, go into Setting and Develop page.

#### find API Key And Secret

- And find the basic setting subpage of Setting and Develop page. copy appid and secret to plugin setting.

#### modify IP whiteList

- The wechat platform request user put the client Ip to server whitelist. It's same page with API Key and Secret.
- You could find your outneter ip in [here](https://tool.lu/ip/). 

## Frontmatter and Template

We put all the information required by the WeChat MP in Frontmatter of the note. 

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

Create the template for the note for WeChat MP is a good idea. We recommend to use another plugin of [obsidian-templater](https://github.com/SilentVoid13/Templater) to make life easier. Detailed documents can be found here:https://silentvoid13.github.io/Templater/ 


you can find some template examples here. 

## Themes customization

You may choose predefined themes for render the note to HTML conent as draft sending out. 
