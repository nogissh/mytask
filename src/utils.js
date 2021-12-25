function toISOStringOnAsiaTokyoTimezone(d) {
  return (new Date(d.getTime() + (9 * 60 * 60 * 1000))).toISOString().split('Z')[0] + '+09:00'
}

// function getDateAsJST() {
//   return new Date((new Date()).getTime() + (9 * 60 * 60 * 1000));
// }

function createNewTask (id, name) {
  return {
    id: id,
    tags: [],
    name: name,
    description: null,
    reference: null,
    done: false,
    archive: false,
    dueDate: null,
    doneDate: null,
    createdat: Date.now(),
    createDate: null,
    updateDate: null,
  }
}

function createNewTag (id, name) {
  return {
    id: id,
    name: name,
    // createDate: getDateAsJST(),
    createDate: null,
  }
}

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function daygap(a, b) {
  if (a == null || b == null)
    return null;
  let da = new Date(a);
  let db = new Date(b);
  let days = Math.floor((da.getTime() - db.getTime()) / (1000 * 60 * 60 * 24));
  return days;
}

export {
  createNewTask,
  createNewTag,
  toISOStringOnAsiaTokyoTimezone,
  intersection,
  daygap,
}
