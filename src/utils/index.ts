export const collegeAPIBaseUrl =
  "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=DOvaudeC9MhvU2xhiiBvxdy4b2POwkANwcPcz4CI&fields=id,school.name,location,school.zip&per_page=30&school.name=";
const collegeApiSort = "&sort=school.name";
export const mapSrcBaseURL =
  "https://www.google.com/maps/embed/v1/place?key=AIzaSyBaxHTYCXuPYhs6D1B7kQh3Id6F5AEaRB8&q=";
const DEFAULT_MAP_Q = "Space+Needle,Seattle+WA";

export const queryCollegesURL = (name: string, page: number = 0) => {
  return (
    collegeAPIBaseUrl +
    encodeURIComponent(name) +
    `&page=${page}` +
    collegeApiSort
  );
};
const getQueryText = (name: string) => {
  return name
    ? (name + "").split(/[$&+,:;=?@#|'<>.^*()%!-\s]/).join("+")
    : DEFAULT_MAP_Q;
};

export const queryMapURL = (name: string = ""): string => {
  return mapSrcBaseURL + getQueryText(name);
};
