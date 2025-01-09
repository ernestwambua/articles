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

This is our friend Tux the penguin...

```text
 ________
< Hello! >
 --------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/`\
    \___)=(___/
```

Tux is really into security and he encrypts all his messages using PGP (Pretty Good Privacy). We would like to send Tux a message but for us to do this we have to set-up PGP on our computer and send him an encrypted message.

First let's install the `gnupg` package using linux machine. For this example we used `pacman` but you can use your distro's package manager.

```bash
$ pacman -S gnupg
```

After `gnupg` is successfully installed on our computer we first need to generate a key pair.

```bash
$ gpg --full-gen-key
```

After running the above command we get 

If you would like to generate a key pair using default parameters you can run the command bellow

```basg
$ gpg --gen-key
```

Now that you have generated the key pairs, we can start sending messages 



After generating the key pairs you can generate an ASCII version of your public key and share it using the following command

```bash
$ gpg --export --armor user_id
```

Here the `user_id` is the email you used to generate your key pair. This command will output the public key to your console. You may want to save the public key to a file using the following command

```bash
$ gpg --export --armor --output public_key.asc user_id
```

In asymmetric key cryptography, the public key is used for encryption and the public key is used for decryption. The private key, as the name suggests should be private and you should not share it with anyone since it can be used to impersonate you. The public key can be shared publicly using your email or you can use a key server to share it publicly.

You can also import another user's public key 



## Resources
- [OpenPGP - ArchWiki](https://wiki.archlinux.org/title/OpenPGP)