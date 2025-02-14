import { BehaviorSubject, Subject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

type EventType =
  | "MARKET_UPDATE"
  | "WAVE_DETECTED"
  | "SIGNAL_GENERATED"
  | "TRADE_EXECUTED"
  | "PATTERN_DETECTED"
  | "AI_INSIGHT"
  | "ERROR";

interface Event {
  type: EventType;
  payload: any;
  timestamp: number;
  source: string;
}

class EventBus {
  private static instance: EventBus;
  private eventSubject: Subject<Event>;
  private stateSubject: BehaviorSubject<Record<string, any>>;

  private constructor() {
    this.eventSubject = new Subject<Event>();
    this.stateSubject = new BehaviorSubject<Record<string, any>>({});
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  emit(type: EventType, payload: any, source: string) {
    this.eventSubject.next({
      type,
      payload,
      timestamp: Date.now(),
      source,
    });
  }

  on(type: EventType): Observable<Event> {
    return this.eventSubject.pipe(filter((event) => event.type === type));
  }

  updateState(key: string, value: any) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      [key]: value,
    });
  }

  getState(key: string): any {
    return this.stateSubject.value[key];
  }

  onStateChange(): Observable<Record<string, any>> {
    return this.stateSubject.asObservable();
  }

  cleanup() {
    this.eventSubject.complete();
    this.stateSubject.complete();
  }
}

export const eventBus = EventBus.getInstance();
