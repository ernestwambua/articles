---
title: How To Install Java JDK on linux
author: Ernest Wambua
date: 2025-01-07
type: article
tags: articles, java, jdk, linux
---

# How To Install Java JDK on Linux
_By Ernest Wambua on 2025-01-07_
_Tags: [[index|articles]], [[java]], [[jdk]], [[linux]]_
___

Why hello there Stranger! 👋😀
Welcome to my little corner of the internet. 

If you are a java developer and you've started dipping your toes into the java world then you've probably tried installing the java JDK on your computer.

While you might be tempted to just install OpenJDK for your distro and call it a day, I would argue that this is not the best solution. What if you needed to install say, Java 17 alongside Java 8 and switch between them at your convenience. What if you needed to try out a JDK from a different vendor say, Amazon, Google or Alibaba. This might be difficult installing doing it the traditional way.

What if I told you there was a better way. This is where I introduce you to SDKman! This is a JDK version manager that you can use to install your JDKs and SDKs. Here's how...

First run this command to install SDK man on your system:

```bash
curl -s "https://get.sdkman.io" | bash
```

That's it. Now you can start installing your JDKs and SDKs. Here's how to do that.

```bash
sdk install java
```

This will install the latest version of the java JDK to your system
## Resources

- [Home \| SDKMAN! the Software Development Kit Manager](https://sdkman.io)
- [Usage \| SDKMAN! the Software Development Kit Manager](https://sdkman.io/usage/)

Thank You! :)