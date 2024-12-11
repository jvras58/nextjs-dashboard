import { useMemo } from "react";
import { BaseRow } from "@/service/google/baseGoogleService";

export default function useDateFilter(data: BaseRow[] | null, startingDate?: Date, endingDate?: Date) {
  return useMemo(() => {
    if(data!==undefined && data!==null){
      return data.filter((user: BaseRow) => {
        if (startingDate && endingDate) {
          const userDate = new Date(user.Data);

          const isOnDate =
            userDate.getTime() > startingDate.getTime() &&
            userDate.getTime() < endingDate.getTime();

          if (isOnDate) {
            return user;
          }
        }
      });
    }
    return null
    }, [data, startingDate, endingDate]);
}