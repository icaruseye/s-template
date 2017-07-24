var render = function (tpl, data) {
  // var tpl = document.getElementById(tpl).innerHTML,
  var reg = /{{([^{{}}]+)?}}/g,
    code = 'var r=[];\n',
    cursor = 0;

  var add = function (line, flag) {
    flag ? code += 'r.push(' + line + ');\n' :
      code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n'
  }

  while (match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index))
    add(match[1], true)
    cursor = match.index + match[0].length
  }

  add(tpl.substr(cursor, tpl.length - cursor))
  code += 'return r.join("");'

  return new Function(code).call(data)
}

var template = '<p>Hello, my name {{} is {{this.name}}. I\'m {{this.profile.age}} years old.</p>';
console.log(render(template, {
  name: "icarus",
  profile: {
    age: 18
  }
}));