// This is a minimal set of functions to look like a Map.
class MathScope {
  constructor() {
    this.localScope = new Map();
  }

  get(key) {
    return this.localScope.get(key);
  }

  set(key, value) {
    const probUseless = this.localScope.set(key, value);
    this.toJSON();
    return probUseless;
  }

  has(key) {
    return this.localScope.has(key);
  }

  keys() {
    return this.localScope.keys();
  }

  indexOf(key) {
    let i = 0;
    for (const [k, v] of this.localScope) {
      if (k === key) break;
      i++;
    }
    return i;
  }

  delete(key) {
    const probUseless = this.localScope.delete(key);
    this.toJSON();
    console.log(this.localScope);
    return probUseless;
  }

  replace(prev, name) {
    let index = 0,
      val;
    for (const [key, value] of this.localScope) {
      if (key === prev) break;
      index++;
      console.log(key, value);
    }

    val = this.get(prev);
    this.delete(prev);
    this.set(name, val);
    this.reinsert(this.localScope.size - 1, index);
  }

  deleteAll() {
    this.localScope.clear();
    localStorage.removeItem('calc_variables');
  }

  // takes element at [start] and moves it to [end]
  reinsert(start, end) {
    let result = Array.from(this.localScope, ([name, value]) => ({
      name,
      value,
    }));

    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);

    this.localScope.clear();

    for (let i = 0; i < result.length; i++) {
      this.localScope.set(result[i].name, result[i].value);
    }

    this.toJSON();
  }

  fromJSON() {
    if (!localStorage.getItem('calc_variables')) return;
    this.localScope = new Map(
      JSON.parse(localStorage.getItem('calc_variables'))
    );
  }

  toJSON() {
    localStorage.setItem(
      'calc_variables',
      JSON.stringify(Array.from(this.localScope.entries()))
    );
  }
}

export default MathScope;
