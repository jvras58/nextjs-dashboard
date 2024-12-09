"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { pt } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DateRangePicker() {
  const [date, setDate] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd 'de' MMM, yyyy", { locale: pt })} -{" "}
                {format(date.to, "dd 'de' MMM, yyyy", { locale: pt })}
              </>
            ) : (
              format(date.from, "dd 'de' MMM, yyyy", { locale: pt })
            )
          ) : (
            <span>Selecione datas de início e fim</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <Calendar
            mode="single"
            selected={date?.from}
            onSelect={(newDate) =>
              setDate((prev) => ({ ...prev, from: newDate }))
            }
            initialFocus
            locale={pt}
            lang="pt-BR"
          />
          <Calendar
            mode="single"
            selected={date?.to}
            onSelect={(newDate) =>
              setDate((prev) => ({
                ...prev,
                to: newDate && prev.from && newDate < prev.from ? prev.from : newDate
              }))
            }
            initialFocus
            locale={pt}
            fromDate={date.from || new Date()}
            lang="pt-BR"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
