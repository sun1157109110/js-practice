function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function trafficLight() {
  while (true) {
      await sleep(3000);
      red();
      await sleep(3000);
      green();
      await sleep(2000);
      yellow();
      await sleep(1000);
  }
}

trafficLight();

//------------
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
const light = function (timer, cb) {
  return new Promise(resolve => {
    cb()
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const step = function () {
  Promise.resolve().then(() => {
    return light(3000, red)
  }).then(() => {
    return light(2000, green)
  }).then(() => {
    return light(1000, yellow)
  }).then(() => {
    return step()
  })
}

step();
