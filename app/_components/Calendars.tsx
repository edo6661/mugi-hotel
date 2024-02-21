import { Calendar } from "lucide-react";
import { FC } from "react";

interface CalendarComponentProps {
  date: string;
  day: string;
}

export const CalendarComponent: FC<CalendarComponentProps> = ({
  date,
  day,
}) => (
  <div className="fl-itc gap-2">
    <Calendar size={32} className=" text-secondaryGray" />
    <div className="inner-calendar">
      <p className=" font-semibold">{date}</p>
      <p>{day}</p>
    </div>
  </div>
);

interface ContainerCalendarProps {
  date1: string;
  day1: string;
  date2: string;
  day2: string;
}

export const ContainerCalendar: FC<ContainerCalendarProps> = ({
  date1,
  day1,
  date2,
  day2,
}) => (
  <div className="container-calendar primary-shadow ">
    <CalendarComponent date={date1} day={day1} />
    <div className="fl-itc ">
      <div className=" w-[2px] bg-secondaryGray h-8 mr-2 " />
      <CalendarComponent date={date2} day={day2} />
    </div>
  </div>
);

interface SecondContainerCalendarProps {
  date: string;
  day: string;
}

export const SecondContainerCalendar: FC<SecondContainerCalendarProps> = ({
  date,
  day,
}) => (
  <div className="second-container-calender primary-shadow">
    <CalendarComponent date={date} day={day} />
  </div>
);
