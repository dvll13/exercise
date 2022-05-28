function add(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
var num1 = '5';
var num2 = 2.4;
var printResult = true;
var resultPhrase = 'Result: ';
add(num1, num2, printResult, resultPhrase);
