---
title: Sending Encrypted Messages Using PGP In Linux
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

___
> I have mentioned a key pair before, well.. what is it exactly...? One thing to note is that PGP used asymmetric key cryptography meaning it uses two keys. One key is used for encryption while the other key is used for decryption. The key used for encryption is usually referred to as the `public key`, as the name suggests it is public i.e can be shared with other people. They will use it to encrypt messages that are intended for you. The other key used for decryption is usually referred to as the `private key` and as the name suggests it should be private. We should never share the private key since malicious actors can use is to read our messages and impersonate us. The existence of asymmetric keys implies that there exists symmetric keys. Well symmetric keys use only one key for both encryption and decryption the same key. I won't delve deep into symmetric keys that's a topic for another day
___

Now that we've gotten some understanding of the whole key pair business, you might be thinking that for this to work we need Tux's public key for us to encrypt our message, and for that you are absolutely right ✅

We call Tux and ask him for his public key. Tux sends us an email with his public key file `tux.asc`. We can save the file to our current working directory. Now we need to register this Tux's public key to GnuPG so that when we encrypt a message with the recipient as `tux@linux.org` GnuPG will know exactly which key to use. We will do that using the following command.

```bash
$ gpg --import tux.asc
```

If we did everything right we should get the following output.

```text
gpg: key 318E6A9347C96EFC: public key "Tux <tux@linux.org>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```

Now we can retry encrypting the message using Tux's public key.

```bast
$ gpg --recipient tux@linux.org --encrypt message.txt
```

After running this command we get the following output.

```text
gpg: 4071ACE7388F0D09: There is no assurance this key belongs to the named user

sub  cv25519/4071ACE7388F0D09 2025-01-09 Bob <tux@linux.org>
 Primary key fingerprint: CEFD 7897 B207 9889 A420  467F 318E 6A93 47C9 6EFC
      Subkey fingerprint: 2BC4 1435 935D 37E5 8DBF  7B2A 4071 ACE7 388F 0D09

It is NOT certain that the key belongs to the person named
in the user ID.  If you *really* know what you are doing,
you may answer the next question with yes.

Use this key anyway? (y/N) y
```

This will generate a `message.txt.gpg` file on our working directory. We can now send this file to Tux. If anyone intercepts this file they will need the Tux's private key to decrypt it and read it's contents. So we can even send it as an attachment using an email client like gmail.

Tux received our message. He gives us a call saying that he can't respond to our message since we did not share our public key with him. Tux needs our public key so he can use it to encrypt his response and share it with us. Here's how we can do that...

```bash
$ gpg --export --output johndoe.asc john.doe@example.com
```

Instead of `john.doe@example.com` you should use the email that you used to generate the key pair. You can name the output file, `johndoe.asc`, whatever you want. We now send this public key file to Tux.

Tux received our public key, wrote a response encrypted it and sent it back to us. The file is called `response.txt.gpg`. If we try reading the contents of this file we will just see a bunch of gibberish. We first need to decrypt is using our private key.



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