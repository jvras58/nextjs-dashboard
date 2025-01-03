"use client";
import React, { useMemo } from "react";

import Loader from "../common/Loader";

import DateRangePicker from "@/components/Dashboard/DateRangePicker";
import { addDays } from "date-fns";
import { useSectionConfig } from "@/hooks/useSectionConfig";

interface DashboardProps {
  param?: string;
}

export default function Dashboard({ param }: DashboardProps) {
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const hasDates: boolean = date.to !== undefined || date.from !==undefined

  function changeDateStart(newDate: Date | undefined ) {
    setDate((prev) => ({ ...prev, from: newDate }));
  }

  function changeDateEnd(newDate: Date | undefined ) {
    setDate((prev) => ({
      ...prev,
      to: newDate && prev.from && newDate < prev.from ? prev.from : newDate,
    }));
  }

  function resetDatePicker() {
    setDate({from: undefined, to: undefined})
  }

  const [ sectionsConfig, loading ] = useSectionConfig(param, date.from, date.to);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-6 flex justify-end px-7.5">
        {hasDates && (
          <button
            className="mr-4 transition-colors duration-300 dark:hover:text-white"
            type="button"
            onClick={() => resetDatePicker()}
          >
            X
          </button>
        )}

        <DateRangePicker
          date={date}
          changeStartDate={changeDateStart}
          changeEndDate={changeDateEnd}
        />
      </div>
      {sectionsConfig.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.title && (
            <div className="mb-6 flex items-center justify-center">
              <h2 className="p-2 text-heading-2 font-bold dark:text-white">
                {section.title}
              </h2>
            </div>
          )}
          {section.cards.length > 0 && (
            <div className="mb-12 flex justify-center">
              <div
                className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-${section.cards.length > 3 ? 4 : 3} 2xl:gap-7.5`}
              >
                {section.cards.map((cardConfig, cardIndex) => {
                  const CardComponent = cardConfig.component;
                  return (
                    <CardComponent key={cardIndex} {...cardConfig.props} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
