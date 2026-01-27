---
title: "Projects"
permalink: /projects/
---

Selected case studies. (Add more items in `_projects/`.)

{% assign sorted_projects = site.projects | sort: "date" | reverse %}

{% for project in sorted_projects %}
### [{{ project.title }}]({{ project.url }})

{% if project.status %}
<span style="display:inline-block;
margin:0.25em 0 0.75em 0;
padding:0.2em 0.6em;
font-size:0.85em;
font-weight:600;
border-radius:0.375em;
background:#fef3c7;
color:#92400e;">
🟡 {{ project.status }}
</span>
{% endif %}

{% if project.type %}
**Type:** {{ project.type }}  
{% endif %}

{% if project.tech %}
**Tech:** {{ project.tech | join: ", " }}  
{% endif %}

---

{% endfor %}
