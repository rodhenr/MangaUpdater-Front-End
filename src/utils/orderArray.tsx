import { checkDate } from "./dateCheck";

interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
}

export interface Data {
  image: string;
  name: string;
  mangaID: string;
  sources: Sources[];
}

export const orderArray = (arr: Data[]) => {
  
  const dates: string[] = [];


  const dateArray = arr.map((i) => {
    const cDate = checkDate(i.sources[0].date);
    if (!dates.includes(cDate)) {
      dates.push(cDate);
    }

    return { ...i, date: cDate };
  });

  const result = dates.map((i) => {
    const dateFilter = dateArray.filter((j) => j.date === i);
    return { data: dateFilter, date: i };
  });

  return result;
};
