```dataviewjs
const calendarAPI = Calendarium.getAPI("Kippian");
const currentDate = calendarAPI.getCurrentDate(); // this is an object { year: number, month: number, day: number }

dv.table(["Name", "Date"], dv.pages('"Events/Calendar Events"')
		 .sort(b => b['fc-date'])
		 .map(b => [b.file.link, calendarAPI.toDisplayDate(b['fc-date'] , undefined, "DD of MMMM, YYYY")])
)
```

```dataviewjs
const calendarAPI = Calendarium.getAPI("Kippian");
const currentDate = calendarAPI.getCurrentDate(); // this is an object { year: number, month: number, day: number }

dv.table(["Name", "Date"], dv.pages('"Events/Calendar Events"')
		 .sort(b => b['fc-date'])
		 .map(b => [b.file.link, b['fc-date']])
)
```

```dataviewjs
const calendarAPI = Calendarium.getAPI("Kippian");
const currentDate = calendarAPI.getCurrentDate(); // this is an object { year: number, month: number, day: number }

dv.table(["Name", "Date"], dv.pages('"Events/Calendar Events"')
		 .sort(b => b['fc-date'])
		 .map(b => {
			const month = b['fc-date'].month-1;
			// const strs = b['fc-date'].split("-");
			// const month = strs[1] - 1;
			console.log(month);
		
			// strs[1] = month;
			// const newDate = strs.join("-")
			const newDatestr = "" + b['fc-date'].year + "-0" +month + "-" + b['fc-date'].day;
			console.log(newDatestr);
			
			const newDate = dv.date(newDatestr);
			return [b.file.link, calendarAPI.toDisplayDate(newDate, undefined, "DD of MMMM, YYYY")];
		 })
)
```
