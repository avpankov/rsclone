export function convertTrackTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
}

export function convertTotalTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes} min ${seconds} sec`;
}

export function getRandomNumber(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getSeparateByCommas(number: string) {
  const reverse = number.split("").reverse().join("");
  let str = "";
  for (let i = 0; i < number.length; i++) {
    if (i % 3 === 0) {
      str += `,${reverse[i]}`;
    } else {
      str += reverse[i];
    }
  }

  if (str[0] === ",") {
    return str.slice(1).split("").reverse().join("");
  } else {
    return str.split("").reverse().join("");
  }
}

interface Imounths {
  [key: number]: string;
}

export function getTracklistRowData(date: string) {
  let dateAdded = new Date(date);
  const mounths: Imounths = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  return `${
    mounths[dateAdded.getMonth()]
  } ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`;
}

export function getCopyrightsDate(date: string) {
  let dateAdded = new Date(date);
  const mounths: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${
    mounths[dateAdded.getMonth()]
  } ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`;
}
