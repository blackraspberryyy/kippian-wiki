---
aliases: 
characters:
  - "[[Amlaena Gustkil]]"
  - "[[Noah Skie]]"
location: 
fc-date: 
fc-category: Lore
lore_type: item
icon: lore
---
## Basic Information
> [!infobox]
> # `=this.file.name`
>   
> ![[Translucent Shortbow.png|cover hsmall]]
> ###### Information
> |   |  |
> | ---- | ---- |
> | Other names | `=this.aliases`|
> | Type|`=this.lore_type`|
> | Located in | `=this.location`|
##### Known for:
### Description
## Lore Mentions
### Most Recent
```dataview
LIST bullets.text
FROM "Session Log"
FLATTEN file.lists as bullets
WHERE contains(bullets.text, this.file.name)
SORT number(file.name) desc, reverse(bullets) desc
LIMIT 10
SORT number(file.name) asc, reverse(bullets) asc
```
### All Entries
```dataview
LIST bullets.text
FROM "Session Log"
FLATTEN file.lists as bullets
WHERE contains(bullets.text, this.file.name)
SORT number(file.name) asc
```