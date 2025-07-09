import EventEmitter from '../src/event-emitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter;
  const eventPayload = { click: true };

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  describe('addListener & emit', () => {
    it('should call listener when event is emitted', () => {
      const onClick = jest.fn((evt) => {
        expect(evt).toEqual(eventPayload);
      });

      emitter.addListener('click', onClick);
      emitter.emit('click', eventPayload);
      expect(onClick).toHaveBeenCalledTimes(1);

      emitter.emit('click', eventPayload);
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('removeAllListeners', () => {
    it('should remove all listeners for an event', () => {
      const onClick = jest.fn();

      emitter.addListener('click', onClick);
      emitter.emit('click', eventPayload);
      expect(onClick).toHaveBeenCalledTimes(1);

      emitter.removeAllListeners('click');
      emitter.emit('click', eventPayload);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('addListener & removeListener', () => {
    it('should remove a specific listener', () => {
      const onDBClick = jest.fn((evt) => {
        expect(evt).toEqual(eventPayload);
      });

      const subscription = emitter.addListener('dbclick', onDBClick);
      emitter.emit('dbclick', eventPayload);
      expect(onDBClick).toHaveBeenCalledTimes(1);

      emitter.emit('dbclick', eventPayload);
      expect(onDBClick).toHaveBeenCalledTimes(2);

      emitter.removeListener(subscription.eventType, onDBClick);
      emitter.emit('dbclick', eventPayload);
      expect(onDBClick).toHaveBeenCalledTimes(2);
    });
  });
});
