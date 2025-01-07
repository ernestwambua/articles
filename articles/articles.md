---
title: Wambua's Articles
---

Why hello Stranger! 👋😀

Here are my amazing articles. This is my tiny slice of heaven where I share my thoughts and what I have learned.

<%*
	let dv = this.app.plugins.plugins["dataview"].api;
	let query = 'list from "Articles"';
	let result = await dv.queryMarkdown(query);
	
	if (result.successful) {
		tR += result.value;
	} else {
		tR += result.error;
	}
%>



```dataview
list from "Articles"
```




