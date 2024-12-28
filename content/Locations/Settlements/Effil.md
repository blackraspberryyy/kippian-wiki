---
aliases: 
location: "[[Elven Kingdom of Ephelus]]"
status: 
lore_type: location
icon: settlement
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
##### Known for: A large elven settlement
### Description
## Notable Locations
```dataview
TABLE WITHOUT ID
  file.link as Name
FROM "Locations"
WHERE location = this.file.link
```
## Notable NPCs
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