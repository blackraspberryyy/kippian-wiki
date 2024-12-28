---
creation_date: <% tp.date.now("yyyy-MM-DD HH:mm") %>
location: 
fc-date: 1083-MM-DD
fc-category: Session
icon: calendar
---
```dataview
TABLE
WHERE contains(file.folder, this.file.folder)
SORT file.name
```
