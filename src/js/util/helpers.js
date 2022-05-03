export function checkName(name ,str) {
    const pattern = str
      .split("")
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join("");
    const regex = new RegExp(`${pattern}`, "g");
    return name.match(regex);
  }
  
 export function removeDuplicates(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  