import { IEventSubscriptionVendor, ListenerProps } from './interface';

class Subscription {
  subscriber: IEventSubscriptionVendor;
  eventType: string;
  key: number;
  listener: ListenerProps;
  constructor({
    subscriber,
    listener,
    eventType,
  }: {
    subscriber: IEventSubscriptionVendor;
    listener: ListenerProps;
    eventType: string;
  }) {
    this.subscriber = subscriber;
    this.eventType = eventType;
    this.listener = listener;
    this.key = 0;
  }
  remove(): void {
    this.subscriber.removeSubscription(this);
  }
}

export { Subscription };
