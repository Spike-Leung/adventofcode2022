const count: { [index: string]: number } = {};
const charCode_a = "a".charCodeAt(0);
const charCode_z = "z".charCodeAt(0);
const charCode_A = "A".charCodeAt(0);
const charCode_Z = "Z".charCodeAt(0);

for (let i = charCode_a; i <= charCode_z; i++) {
  count[String.fromCharCode(i)] = i - charCode_a + 1;
}

for (let i = charCode_A; i <= charCode_Z; i++) {
  count[String.fromCharCode(i)] = i - charCode_A + 27;
}

export default count;
