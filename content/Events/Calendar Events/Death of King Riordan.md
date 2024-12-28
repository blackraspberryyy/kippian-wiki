---
aliases: 
characters:
  - "[[Riordan Kyp]]"
location: 
fc-date: 1083-06-04
fc-category: Lore
lore_type: event
icon: lore
---
## Basic Information
> [!infobox]
> # `=this.file.name`
> ![[insertimage.png|cover hsmall]]
> ###### Information
> |   |  |
> | ---- | ---- |
> | Other names | `=this.aliases`|
> | Type|`=this.lore_type`|
> | Located in | `=this.location`|
##### Known for:
### Description
`=this.fc-date`
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