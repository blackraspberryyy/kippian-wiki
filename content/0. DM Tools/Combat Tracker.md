```dataview
TABLE WITHOUT ID
  join(split(bullets.text, " \[", 1)) as Edited,
  bullets.init as Initiative
FROM "Session Combat Logs/Combat Log 1"
FLATTEN file.lists as bullets
WHERE contains(bullets, "init")
SORT bullets.init desc
```