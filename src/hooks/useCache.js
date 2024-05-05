const { useState, useEffect } = require("react");

export const useCache = () => {
  const [cache, setCache] = useState({});

  /*   const memoizePromiseFn = (fn) => {
    return async (...args) => {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      try {
        const result = await fn(...args);
        cache.set(key, result);
        return result;
      } catch (error) {
        cache.delete(key);
        throw error;
      }
    };
  };

  const getDataCache = memoizePromiseFn(async (params, fetchDataFn) => {
    const data = await fetchDataFn(params);
    return data;
  });

  const clearCache = () => {
    setCache({});
  }; */

  /*   const getDataCache = async (params, fetchDataFn) => {
    const currentTime = new Date().getTime();
    const cacheKey = JSON.stringify(params);
    if (cache[cacheKey] !== undefined) {
      const { timestamp, data } = cache[cacheKey];
      if (currentTime - timestamp < 10000) {
        return data;
      } else {
        delete cache[cacheKey];
      }
    }

    const data = await fetchDataFn(params);
    setCache((prevCache) => ({
      ...prevCache,
      [cacheKey]: { timestamp: currentTime, data },
    }));
    return data;
  }; */

  useEffect(() => {
    const cacheCleanupInterval = setInterval(() => {
      const currentTime = new Date();
      Object.keys(cache).forEach((cacheKey) => {
        const cacheTimestamp = new Date(cache[cacheKey].timestamp);
        const seconds = (currentTime - cacheTimestamp) / 1000;

        if (seconds > 10) {
          delete cache[cacheKey];
        }
      });
    }, 3000);

    return () => clearInterval(cacheCleanupInterval);
  }, [cache]);

  const getDataCache = async (params, fetchDataFn) => {
    const cacheKey = JSON.stringify(params);
    if (cache[cacheKey] !== undefined) return cache[cacheKey].data;

    const data = await fetchDataFn(params);
    setCache((prevCache) => ({
      ...prevCache,
      [cacheKey]: { timestamp: new Date(), data },
    }));
    return data;
  };

  return { getDataCache };
};
