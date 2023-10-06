function User() {
  const obj = {};
  
  obj.pi = 3.1416;
  obj.sumar = (a, b) => a + b;

  return obj;
}


User.prototype.sumar = (a, b) => a + b;

const maiquin = User();
const mark = User();

maiquin.sumar === mark.sumar; // FALSE