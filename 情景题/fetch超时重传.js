//递归版本
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();  // 返回解析后的 JSON
  } catch (error) {
    if (retries > 0) {
      console.error(`Fetch failed: ${error.message}. Retrying in ${backoff} ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);  // 递归调用，指数退避
    } else {
      throw error;
    }
  }
}
//循环版本
//错误重传
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (i < retries - 1) {
        console.error(`Fetch failed: ${error.message}. Retrying in ${backoff} ms...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
}