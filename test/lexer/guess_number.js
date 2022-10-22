// usage:
//   guess_number();

valid = (digits) =>
    (new Set(digits.split(""))).size === 4

generate = () => {
    while(!valid(digits = String(Math.floor(1000 + Math.random() * 9000))));
    digits
}

gnjdg = (guess, callback) => {
  if(valid(guess)) then {
    d = theNumber.split("")
    g = guess.split("")
    c = g.map((v)=>d.includes(v)).reduce((a, b)=>a+b)
    a = g.map((v, idx)=>d[idx] === g[idx]).reduce((a, b)=>a+b)
    b  = c - a
    callback(
      if(a === 4) then
        "Your Number is Correct"
      else
        guess + ":" + String(a) + "A" + String(b) + "B"
    )
  } else callback("guess number must be 4 non-repeat digits" + guess);
}

theNumber = "1234"

guess_number = () => {
  theNumber = generate()
  event msg (user, cont: "^\\d\\d\\d\\d$") => gnjdg(cont, drrr.print)
  event msg (user, cont: "^/start$") =>
  { theNumber = generate(); drrr.print("number set"); }
  event msg (user, cont: "^ans$") => drrr.print(theNumber)
}
