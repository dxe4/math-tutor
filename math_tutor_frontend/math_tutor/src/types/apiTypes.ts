export interface TopicData {
  id: number;
  title: string;
  topic: string;
  topic_url: URL;
  link: URL;
}

export interface Curve {
  id: number;
  title: string;
  link: string;
}

export interface Biography {
  id: number;
  title: string;
  link: string;
  year_start: number;
  year_end: number;
  year_start_bc: boolean;
  year_end_bc: boolean;
  year_order: number;
}

export type TaskEvent = {
  event_type: "status" | "progress" | "complete" | "error";
  result?: {
    number: string;
    is_prime: boolean;
  };
};

export type TaskEventLog = {
  id: string;
  event: TaskEvent;
  timestamp: Date;
};

export type TaskStatusProps = {
  sessionId: string;
  wsUrl: string;
};

export type PrimeNumberResponse = {
  session_id: string;
};

export type PowerOfTwoConvergenceResponse = {
  powers: string[];
};

export type CollatzResponse = {
  start_number: number;
  sequence: string[];
  two_adic_distance_sequence: string[];
  total_distance: number;
  two_adic_total_distance: string;
};
