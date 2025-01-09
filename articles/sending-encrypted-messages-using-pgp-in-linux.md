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

Tux is really into security and always encrypts all his messages using PGP (Pretty Good Privacy). We want to send Tux a message but for us to do that we need to encrypt all our messages using PGP as well otherwise Tux won't respond.

First let's install the `gnupg` package on our linux machine. For this example we will `pacman`, with is a package manager for Arch Linux, but you can use your distro's package manager.

```bash
$ pacman -S gnupg
```

After `gnupg` is successfully installed on our computer, we first need to generate a key pair.

```bash
$ gpg --full-gen-key
```

After running the above command we are prompted with the following questions. You can enter your own details like your real name and email.

```text
gpg (GnuPG) 2.4.7; Copyright (C) 2024 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

gpg: directory '/home/johndoe/.gnupg' created
Please select what kind of key you want:
   (1) RSA and RSA
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
   (9) ECC (sign and encrypt) *default*
  (10) ECC (sign only)
  (14) Existing key from card
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: John Doe
Email address: john.doe@example.com
Comment: 
You selected this USER-ID:
    "John Doe <john.doe@example.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
```

Afterwards we get prompted to enter a passphrase. Make sure you use a strong passphrase for maximum security. After entering your passphrase the keys will be generated.

We can list the keys that we generates using the command below.

```bash
$ gpg --list-keys
```

If the key generation was successful we should see something like this

```text
pub   ed25519 2025-01-09 [SC] [expires: 2028-01-09]
      5BFA075DC56DFF14F2E10CA018341DD2DDFB13B8
uid           [ultimate] John Doe <john.doe@example.com>
sub   cv25519 2025-01-09 [E] [expires: 2028-01-09]
```

Now that we have successfully generated our key pair we can start sending messages to Tux.

First let's write our message in a text file.

```bash
$ echo "Hello Tux" >> message.txt
```

This will create a `message.txt` file in our working directory with the contents `Hello Tux`.

Now we should encrypt this file and send it to our friend bob.

```bash
$ gpg --recipient tux@linux.org --encrypt message.txt
```

Huhh...? We got an error...?

```bash
gpg: error retrieving 'tux@linux.org' via WKD: General error
gpg: tux@linux.org: skipped: General error
gpg: alice_message.txt: encryption failed: General error
```

Don't panic, it's not your fault. You did everything right it's just that I intentionally left out a crucial step in our process.

I have mentioned a key pair before, well.. what is it exactly...? One thing to note is that PGP used asymmetric key cryptography meaning it uses two keys. One key is used for encryption 

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