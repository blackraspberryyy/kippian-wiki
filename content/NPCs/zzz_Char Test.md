---
aliases: 
gender: 
race: 
age: 
alignment: 
background: 
location: "[[Midkip]]"
faction: 
status: 
lore_type: character
icon: character
---
## Bio
> [!infobox]
> # `=this.file.name`
> ![[insertimage.png|cover hsmall]]
> ###### Bio
> | Type | Stat |
> | ---- | ---- |
> | Aliases | `=this.aliases`|
> | Race| `=this.race` |
> | Gender| `=this.gender`|
> | Age | `=this.age`|
> | Alignment|`=this.alignment`| 
> | Background| `=this.background`|
> | Location|  `=this.location`|
> | Faction| `=this.faction`| 
##### Known for:
### Description
##### Session Description
```dataview
LIST replace(bullets.text, "!desc", "")
FROM "Session Log"
FLATTEN file.lists as bullets
WHERE contains(bullets.text, this.file.name) AND contains(bullets.text, "!desc")
```
### Personality Traits
### Relationships
```dataview
LIST replace(bullets.text, "!relation", "")
FROM "Session Log"
FLATTEN file.lists as bullets
WHERE contains(bullets.text, this.file.name) AND contains(bullets.text, "!relation")
```
### Stat Block
## Goals
```dataview
LIST replace(bullets.text, "!goal", "")
FROM "Session Log"
FLATTEN file.lists as bullets
WHERE contains(bullets.text, this.file.name) AND contains(bullets.text, "!goal")
```
## Story log
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