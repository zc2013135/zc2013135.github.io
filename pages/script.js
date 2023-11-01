var count = 0;
		function increment() {
			count++;
			document.getElementById("counter").innerHTML = count;
		}
		function decrement() {
			count--;
			document.getElementById("counter").innerHTML = count;
		}
    function multiply() {
      var randomNum = Math.floor(Math.random() * 8) + 2;
      var newNummultiply = randomNum * 3 - 2;
      count += newNummultiply; 
      document.getElementById("counter").innerHTML = count;
      const text = document.createElement("div");
      text.innerHTML = "牛牛很他妈几把舒服+" + newNummultiply;
      text.classList.add("text");
      const img = document.querySelector("img");
      img.parentElement.appendChild(text);
    }
    function division() {
      var randomNum2 = Math.floor(Math.random() * 9) + 3;
      var newNumdivision = randomNum2 * 3 - 5;
      count -= newNumdivision; 
      document.getElementById("counter").innerHTML = count;
      const text = document.createElement("div");
      text.innerHTML = "牛牛贼他妈难受-" + newNumdivision;
      text.classList.add("text");
      const img = document.querySelector("img");
      img.parentElement.appendChild(text);
    }
		function generate() {
			var num1 = Math.floor(Math.random() * 15);
			var num2 = Math.floor(Math.random() * 15);
			var operator = Math.floor(Math.random() * 2) == 1 ? '+' : '-';
    var answer = operator == '+' ? num1 + num2 : num1 - num2;
    document.getElementById("equation").innerHTML = num1 + " " + operator + " " + num2;
    document.getElementById("answer").value = answer;
		}
		function playAudio() {
            var audio = document.getElementById("myAudio");
            audio.play();
        }
		function playAudio2() {
            var audio = document.getElementById("myAudio2");
            audio.play();
        }
		function playAudio1() {
            var audio = document.getElementById("myAudio1");
            audio.play();
        }
function showText() {
  const text = document.createElement("div");
  text.innerHTML = "牛牛舒服+1";
  text.classList.add("text");
  const img = document.querySelector("img");
  img.parentElement.appendChild(text);
}
function showText1() {
  const text = document.createElement("div");
  text.innerHTML = "？？？";
  text.classList.add("text");
  const img = document.querySelector("img");
  img.parentElement.appendChild(text);
}
function showText2() {
  const text = document.createElement("div");
  text.innerHTML = "牛牛难受+1";
  text.classList.add("text");
  const img = document.querySelector("img");
  img.parentElement.appendChild(text);
}
