import { EventSubscriptionVendor } from './event-subscription';
import { Subscription } from './subscription';
import { ISubscription, ListenerProps } from './interface';
class EventEmitter {
  _subscriber;
  constructor(subscriber = new EventSubscriptionVendor()) {
    this._subscriber = subscriber;
  }

  addListener(eventType: string, listener: ListenerProps): Subscription {
    return this._subscriber.addSubscription(
      eventType,
      new Subscription({
        eventType: eventType,
        listener: listener,
        subscriber: this._subscriber,
      })
    );
  }
  removeAllListeners(eventType: string): void {
    this._subscriber.removeAllSubscriptions(eventType);
  }
  removeSubscription(subscription: ISubscription): void {
    this._subscriber.removeSubscription(subscription);
  }
  emit(eventType: string, ...args: unknown[]): void {
    const subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    if (subscriptions) {
      for (let i = 0, l = subscriptions.length; i < l; i++) {
        const subscription = subscriptions[i];
        if (subscription && subscription.listener) {
          subscription.listener.apply(this, args);
        }
      }
    }
  }
  removeListener(eventType: string, listener: ListenerProps): void {
    const subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    if (subscriptions) {
      for (let i = 0, l = subscriptions.length; i < l; i++) {
        const subscription = subscriptions[i];
        if (subscription && subscription.listener === listener) {
          this._subscriber.removeSubscription(subscription);
        }
      }
    }
  }
}

export default EventEmitter;
