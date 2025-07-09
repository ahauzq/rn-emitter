export type ListenerProps<T = unknown> = (...args: T[]) => void;

export interface ISubscription {
  eventType: string;
  key: number;
  listener: ListenerProps;
  remove: () => void;
  subscriber: IEventSubscriptionVendor;
}

export interface SubscriptionsForType {
  [key: string]: ISubscription[];
}

export interface IEventSubscriptionVendor {
  _subscriptionsForType: SubscriptionsForType;
  addSubscription: (eventType: string, subscription: ISubscription) => ISubscription;
  removeSubscription: (subscription: ISubscription) => void;
  removeAllSubscriptions: (eventType?: string) => void;
  getSubscriptionsForType: (eventType: string) => ISubscription[];
}
