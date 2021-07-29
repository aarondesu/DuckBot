export declare type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

interface Time {
  hours: number[];
  daysOfWeek?: Day[];
  days?: number[];
}

interface Field {
  name: string;
  value: string;
  inline?: boolean;
}

interface Content {
  title?: string;
  thumbnail?: string;
  message?: string;
  image?: string;
  fields?: Field[];
}

export interface Schedule {
  name: string;
  time: Time;
  content: Content;
}

export declare type JSONDeclaration = Schedule[];
