# [Interview assignment] College Search

## Introduction

### College Search - Project requirement

​For Senior Front-End Engineer role here at **Entera**.
Below is the [take home assignment](https://gist.github.com/zstarer/8fb0f7e982cca161761caa65a7e062ba) that all candidates complete as a next step.

Using the College Scorecard API provided by the department of education, please create a page that includes:

1. A **search box** for college names -
2. Use Google Maps to display the location of each college returned​

### Reference

https://collegescorecard.ed.gov/data/documentation/
https://github.com/RTICWDT/open-data-maker/blob/master/API.md
[entera_test.md · GitHub](https://gist.github.com/Sweetymeow/e37bb7107efe03f607b21c3a3e3d8e1a)

---

## Background

The UI project includes two parts:

1. List of colleges based on user input from search box, which need query colleges name from **College Scorecard API**
2. Embedding google map to display location. Initially i consider there are two ways to display multiple locations on map: 1. show all locations on map 2. show single location when user select from list.
   The final solution will be decided based on research of [embedding google map](https://developers.google.com/maps/documentation/embed/embedding-map).

### Part 1. College Scorecard API

The College Scorecard API is a `GET` API that lives at
`http://api.data.gov/ed/collegescorecard`
The endpoint for querying all data is
`http://api.data.gov/ed/collegescorecard/v1/schools`

The first step is to register to get an API key:
`DOvaudeC9MhvU2xhiiBvxdy4b2POwkANwcPcz4CI`. It can be passed in the URL when making a web request.

Here’s an example:  
`https://api.data.gov/ed/collegescorecard/v1/schools?api_key=DOvaudeC9MhvU2xhiiBvxdy4b2POwkANwcPcz4CI`

Another example with parameters :

1. `fields` is an Option Parameter to get value which includes `id`, `school.name` and others.
2. `page: 0` The page number for this result set
3. `per_page: 30` The number of records returned in a single result set.
4. Filter applied on `school.name` field:
5. `sort` to sort results by a given field `school.name`
   `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=DOvaudeC9MhvU2xhiiBvxdy4b2POwkANwcPcz4CI&fields=id,school.name,location,school.zip&per_page=30&page=1&sort=school.name&school.name=new%20york`

For guidance on querying the API and extracting results, see the [HTTP API documentation](https://collegescorecard.ed.gov/school/transition/) and [API.md#pagination-with-\_page-and-\_per_page](https://github.com/RTICWDT/open-data-maker/blob/master/API.md#pagination-with-_page-and-_per_page)

#### Response Sample

```json
{
	"metadata": {
        "page": 0,
        "total": 6681,
        "per_page": 100
    },
  "results": [{ // ....}]
}
```

### Part 2. Embedding Google Map / Google Map API

Reference from [Maps Embed API  |  Google Developers](https://developers.google.com/maps/documentation/embed/embedding-map) and [Google Cloud Services](https://console.cloud.google.com/google/maps-apis/api-list?project=data-dragon-371723)

1. Create Google Project to get API key `AIzaSyBaxHTYCXuPYhs6D1B7kQh3Id6F5AEaRB8`

2. Google Maps Embed API sample:

```html
<iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key= AIzaSyBaxHTYCXuPYhs6D1B7kQh3Id6F5AEaRB8&q=Space+Needle,Seattle+WA"
>
</iframe>
```

#### [Abandoned] Design v1: When research result return from college api, UI will show embed map with all results

Abandoned Reason:
Google map doesn’t support to display location based on list of colleges. It only with location based on google’s search result

[image:./public/images/map1.png]

```
https://www.google.com/maps/embed/v1/search
  ?key=AIzaSyBaxHTYCXuPYhs6D1B7kQh3Id6F5AEaRB8
  &q=record+stores+in+Seattle
```

### Design v2: Embedding map show single location when user click a college name

**place mode**: [ Maps Embed API  |  Google Developers](https://developers.google.com/maps/documentation/embed/embedding-map#place_mode)

[image:./public/images/map2.png]

```
https://www.google.com/maps/embed/v1/place
  ?key=AIzaSyBaxHTYCXuPYhs6D1B7kQh3Id6F5AEaRB8
  &q=Eiffel+Tower,Paris+France
```

## Design & Implement

### Sketch on Sigma

[Figma](https://www.figma.com/file/1xG5ClUUdo6MASINnWuZza/Colleges-Search-UI?node-id=52704%3A24391&t=4X6IyS7KcCISOWlI-1)
[image:./public/images/design.png]
Choose design V2 to implemented because the list of college is more clear to show with lots of options. And when user select a college, the list won’t block the center of map, where the red highlight mark will displayed.

### Key Features

1. **Lazy Loading**: The College API only support to query `per_page` with no more than 100 values each time. So, I implemented lazy loading to call next group of data when user scroll to the bottom of page.
2. **Debounce**: delays the processing of the input until the user has stopped typing for 1s. Preventing unexpected API request to search.
3. Click college name on left to update google map on right, and high light the selected college name
4. Clear colleges result when user clear input on search area.
5. Responsive Design: the map / list width & height to fit different size of window.

[image:./public/images/final-result.png]

## Final Result

Live on codesanbox: [College Search Map - CodeSandbox](https://codesandbox.io/s/college-search-map-l2m8ju?file=/src/comps/App.tsx)

#work/interview #interview
