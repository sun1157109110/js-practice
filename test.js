function randomColor() {
  var i = 0;
  var str = "#";
  var random = 0;
  var aryNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

  for (i = 0; i < 6; i++) {
    random = parseInt(Math.random() * 16);

    str += aryNum[random];
  }

  console.log(str);
}
randomColor()