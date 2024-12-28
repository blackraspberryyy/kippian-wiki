---
aliases:
  - Midelia
location: "[[Kingdom of United Kippian]]"
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
> | Type | `=this.icon`
> | Located in | `=this.location`|
##### Known for:
### Description
![[Midkip Distritcts.png]]
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

```dataview
TABLE WITHOUT ID
  file.link as Name,
  join(aliases) as Aliases,
  location as Location
FROM "NPCs" or "PCs"
WHERE location.location = [[]] or location = this.file.link and none(status ="dead")
SORT file.name asc
```

## Factions
```dataview
TABLE WITHOUT ID
  file.link as Name
FROM "Factions"
WHERE location = this.file.link
```
