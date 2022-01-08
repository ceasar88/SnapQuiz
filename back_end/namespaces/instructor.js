module.exports = function(io) {
  const student = io.of('/instructor');

  student.on('connect', socket => {
    console.log('An instructor connected');
  })
}
