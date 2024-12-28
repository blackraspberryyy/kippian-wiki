---
aliases:
  - Yvernus
location: "[[Midkip]]"
status: floating
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
##### Known for: being the 'mystical' and 'magical' center of [[Midkip|Midkip]]
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