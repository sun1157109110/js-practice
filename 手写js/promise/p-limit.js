(async function () {
  function pLimit(concurrency) {
    const queue = [];

    let activeCount = 0;

    const next = () => {
      activeCount--;
      console.log(activeCount, "activeCount-next");
      if (queue.length > 0) {
        queue.shift()();
      }
    };

    const run = async (fn, resolve, args) => {
      console.log("run start");
      activeCount++;

      const result = (async () => fn(...args))();
      resolve(result);

      console.log("runBefore");

      try {
        await result;
      } catch {}

      console.log("runAfter");

      next();
    };

    const enqueue = (fn, resolve, args) => {

      queue.push(() => run(fn, resolve, args));

      console.log("enqueueBefore");

      (async () => {

        await Promise.resolve();
        console.log(activeCount, "activeCount-enqueue");

        if (activeCount < concurrency && queue.length > 0) {
          queue.shift()();
        }
      })();

      console.log("enqueueAfter");
    };


    const generator = (fn, ...args) => {
      return new Promise((resolve) => {
        enqueue(fn, resolve, args);
      });
    };

    return generator;
  }

  function fetchSomething(arg, time) {
    return new Promise((res) => {
      setTimeout(() => {
        res(arg);
      }, time);
    });
  }

  const limit = pLimit(1);
  const input = [
    limit(() => fetchSomething("foo", 3000)),
    limit(() => fetchSomething("bar", 1000)),
  ];

  const result = await Promise.all(input);
  console.log(result);
})()