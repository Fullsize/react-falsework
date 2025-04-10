class MyPromise<T> {
  state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  value?: T;
  reason?: any;
  onFulfilledCallbacks: Array<(value: T) => void> = [];
  onRejectedCallbacks: Array<(reason: any) => void> = [];
  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (reason: any) => void,
    ) => void,
  ) {
    const resolve = (value: T) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    const reject = (reason: any) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then<U>(
    onFulfilled?: (value: T) => U | MyPromise<U>,
    onRejected?: (reason: any) => U | MyPromise<U>,
  ): MyPromise<U> {
    return new MyPromise<U>((resolve, reject) => {
      const handleCallback = (
        callback: ((value: any) => U | MyPromise<U>) | undefined,
        value: any,
      ) => {
        queueMicrotask(() => {
          try {
            if (!callback) {
              resolve(value as U);
            } else {
              const result = callback(value);
              if (result instanceof MyPromise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === 'fulfilled') {
        handleCallback(onFulfilled, this.value);
      } else if (this.state === 'rejected') {
        handleCallback(onRejected, this.reason);
      } else {
        this.onFulfilledCallbacks.push(() =>
          handleCallback(onFulfilled, this.value),
        );
        this.onRejectedCallbacks.push(() =>
          handleCallback(onRejected, this.reason),
        );
      }
    });
  }
  static resolve<T>(value: T | MyPromise<T>): MyPromise<T> {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise<T>((resolve) => resolve(value));
  }
  static reject<T>(reason: any): MyPromise<T> {
    return new MyPromise<T>((_, reject) => reject(reason));
  }
  static All<T>(promises: Array<MyPromise<T> | T>): MyPromise<T[]> {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
      }
      const results: T[] = [];
      let completed = 0;
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          },
        );
      });
    });
  }
  static allSettled<T>(promises: Array<MyPromise<T> | T>) {
    return new MyPromise((resolve) => {
      if (promises.length === 0) {
        resolve([]);
      }
      const results: any[] = [];
      let completed = 0;
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = { status: 'fulfilled', value };
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            results[index] = { status: 'rejected', reason };
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
        );
      });
    });
  }
  static any<T>(promises: Array<MyPromise<T> | T>) {
    return new MyPromise((resolve, reject) => {
      const errors: any[] = [];
      let completed = 0;
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(resolve, (reason) => {
          errors.push(reason);
          completed++;
          if (completed === promises.length) {
            reject(errors);
          }
        });
      });
    });
  }
  static race<T>(promises: Array<MyPromise<T> | T>) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) =>
        MyPromise.resolve(promise).then(resolve, reject),
      );
    });
  }
}
