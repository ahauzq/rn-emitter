import { ISubscription, SubscriptionsForType } from './interface';

class EventSubscriptionVendor {
  _subscriptionsForType: SubscriptionsForType;
  constructor() {
    this._subscriptionsForType = {};
  }
  addSubscription(eventType: string, subscription: ISubscription): ISubscription {
    if (!this._subscriptionsForType[eventType]) {
      this._subscriptionsForType[eventType] = [];
    }
    const key = this._subscriptionsForType[eventType].length;
    this._subscriptionsForType[eventType].push(subscription);
    subscription.key = key;
    return subscription;
  }
  removeSubscription(subscription: ISubscription): void {
    const eventType = subscription.eventType;
    const key = subscription.key;
    const subscriptionsForType = this._subscriptionsForType[eventType];
    if (subscriptionsForType) {
      delete subscriptionsForType[key];
    }
  }
  removeAllSubscriptions(eventType?: string): void {
    if (eventType == null) {
      this._subscriptionsForType = {};
    } else {
      delete this._subscriptionsForType[eventType];
    }
  }
  getSubscriptionsForType(eventType: string): ISubscription[] {
    return this._subscriptionsForType[eventType];
  }
}

export { EventSubscriptionVendor };
