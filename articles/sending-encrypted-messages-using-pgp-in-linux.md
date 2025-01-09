---
title: sending-encrypted-messages-using-pgp-in-linux
author: Ernest Wambua
date: 2025-01-09
type: article
tags: articles, linux
---

# Sending Encrypted Messages Using PGP In Linux
_By **Ernest Wambua** on **2025-01-09**_
_Tags: [[index|articles]], [[linux]]_
___
First install the `gnupg` package using your distro package manager.

```bash
$ pacman -S gnupg
```

Generate a key pair.

```bash
$ gpg --full-gen-key
```

You will be prompted with several questions after runing the above command.

If you would like to generate a key pair using default parameters you can run the command bellow

```basg
$ gpg --gen-key
```

After generating the key pairs you can generate an ASCII version of your public key and share it using the following command

```bash
$ gpg --export --armor user_id
```

Here the `user_id` can be the email you used to generate your key pair.

In asymetric key cryptog



## Resources
- [OpenPGP - ArchWiki](https://wiki.archlinux.org/title/OpenPGP)