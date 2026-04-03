---
title: "Projects"
permalink: /projects/
---

Selected case studies.

{% assign sorted_projects = site.projects | sort: "date" | reverse %}

{% for project in sorted_projects %}
### [{{ project.title }}]({{ project.url }})

{% if project.status %}
{% assign status_text = project.status | downcase %}

{% if status_text contains "active development" %}
  {% assign status_icon = "🟢" %}
  {% assign status_bg = "#dcfce7" %}
  {% assign status_fg = "#166534" %}
{% elsif status_text contains "in progress" %}
  {% assign status_icon = "🟡" %}
  {% assign status_bg = "#fef3c7" %}
  {% assign status_fg = "#92400e" %}
{% else %}
  {% assign status_icon = "⚪" %}
  {% assign status_bg = "#e5e7eb" %}
  {% assign status_fg = "#374151" %}
{% endif %}

<span style="display:inline-block;
margin:0.25em 0 0.75em 0;
padding:0.2em 0.6em;
font-size:0.85em;
font-weight:600;
border-radius:0.375em;
background:{{ status_bg }};
color:{{ status_fg }};">
{{ status_icon }} {{ project.status }}
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
