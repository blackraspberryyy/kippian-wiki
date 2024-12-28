---
aliases:
  - King
  - King Riordan
gender: male
race: human
age: old
alignment: 
background: 
location: "[[Asteri District]]"
faction: "[[The High Council of Midkip]]"
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
##### Known for: being the king of [[Kingdom of United Kippian]]
### Description
old human

Wife died after giving birth to [[Rickard Kyp]].
Gave the [[Arcanus Labyrinthus]] to the [[Seven Up...|party]].

##### Session Description
```dataview
LIST replace(bullets.text, "!desc", "")
FROM "Session Log"
FLATTEN file.lists as bullets
WHERE contains(bullets.text, this.file.name) AND contains(bullets.text, "!desc")
```
### Personality Traits
seemingly aloof
Trains [[Remus Kyp]] to lead by being hands-off.
### Relationships
[[Remus Kyp]] and [[Rickard Kyp]]'s father
[[Leneia Yarumcy]]'s father
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
