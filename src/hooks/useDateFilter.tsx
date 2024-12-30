import { useMemo } from "react";
import { BaseRow } from "@/service/google/baseGoogleService";

function filterByStartAndEnd(data: BaseRow[], startingDate: Date, endingDate: Date) {
  return data.filter((user: BaseRow) => {
      const userDate = new Date(user.Data);

      const isOnDate =
        userDate.getTime() > startingDate.getTime() &&
        userDate.getTime() < endingDate.getTime();

      if (isOnDate) {
        return user;
      }
  });
}

function filterByStart(data: BaseRow[], startingDate: Date) {
  return data.filter((user: BaseRow) => {
      const userDate = new Date(user.Data);

      const isOnDate = userDate.getTime() > startingDate.getTime()

      if (isOnDate) {
        return user;
      }
  });
}

function filterByEnd(data: BaseRow[], endingDate: Date){
  return data.filter((user: BaseRow) => {
    const userDate = new Date(user.Data);

    const isOnDate = userDate.getTime() < endingDate.getTime()

    if (isOnDate) {
      return user;
    }
  });
}

export default function useDateFilter(data: BaseRow[] | null, startingDate?: Date, endingDate?: Date) {
  return useMemo(() => {
    if(data!==undefined && data!==null){
      return startingDate && endingDate ?
        filterByStartAndEnd(data, startingDate, endingDate) : startingDate ?
          filterByStart(data, startingDate) : endingDate ?
            filterByEnd(data, endingDate) : data
    }
    return null
    }, [data, startingDate, endingDate]);
}