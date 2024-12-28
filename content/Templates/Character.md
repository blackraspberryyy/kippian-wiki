---
aliases: 
gender: 
race: 
age: 
alignment: 
background: 
location: 
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
### Personality Traits
### Relationships
### Stat Block
## Goals
- [ ] Task 1
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