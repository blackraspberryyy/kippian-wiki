---
aliases:
  - Asteri
location: "[[Midkip]]"
status: 
lore_type: location
icon: map
---
## Basic Information
> [!infobox]
> # `=this.file.name`
> ![[insertimage.png|cover hsmall]]
> ###### Information
> |   |  |
> | ---- | ---- |
> | Other names | `=this.aliases`|
> | Located in | `=this.location`|
##### Known for: being the noble district of [[Midkip|Midkip]]
### Description
## Notable Locations
```dataview
TABLE WITHOUT ID
  file.link as Name
FROM "Locations"
WHERE location = this.file.link
```
## Notable NPCs
##### [[The High Council of Midkip|High Council]] Representative: [[Riordan Kyp|King Riordan]]
```dataview
TABLE WITHOUT ID
  file.link as Name
FROM "NPCs" or "PCs"
WHERE location = this.file.link
```
## Factions
```dataview
TABLE WITHOUT ID
  file.link as Name
FROM "Factions"
WHERE location = this.file.link
```