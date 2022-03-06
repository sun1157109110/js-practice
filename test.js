async function test(){
   const a = await Promise.reject('@');
   console.log(a);
};
test()