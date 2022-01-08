module.exports = function(io) {
  const student = io.of('/student');

  student.on('connect', socket => {
    console.log('A student connected');
  })
}
