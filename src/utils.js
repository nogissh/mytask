const monthdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
  return year % 4 == 0;
}

function toISOStringOnAsiaTokyoTimezone(d) {
  return (new Date(d.getTime() + (9 * 60 * 60 * 1000))).toISOString().split('Z')[0] + '+09:00'
}

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

function datediff(lower, upper) {
  if (lower == null || upper == null)
    return null;

  if (lower > upper)
    return -1;

  let dlower = new Date(lower);
  let dupper = new Date(upper);

  if (dlower.getFullYear() == dupper.getFullYear())
  {
    if (dlower.getMonth() == dupper.getMonth())
      return dupper.getDate() - dlower.getDate();

    if (dlower.getMonth() < dupper.getMonth())
    {
      let basedays = 0;
      for (let m = dupper.getMonth(); m > dlower.getMonth(); m--)
      {
        basedays += monthdays[m - 1];
        if (m == 2 && isLeapYear(m))
          basedays += 1;
      }
      return basedays - dlower.getDate() + dupper.getDate();
    }
  }

  return 999;
}

export {
  createNewTask,
  createNewTag,
  toISOStringOnAsiaTokyoTimezone,
  intersection,
  datediff,
}
