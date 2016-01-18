$(function() {

  interact('.timesheet-box')

  .draggable({
    inertia: false,
    restrict: {
      restriction: "parent",
      endOnly: true
    },
    autoScroll: false,
    onend: function(event) {}
  })

  .on('dragmove', function(event) {
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      hour = parseFloat(target.getAttribute('data-scale')),
      start = parseInt(target.getAttribute('data-oldstart')),
      scale = hour / 12,
      roundX = Math.round(x / scale) * scale,
      newMins = start + (60 * roundX / hour),
      startSpan = target.nextElementSibling;

    target.style.webkitTransform =
      target.style.transform =
      'translate(' + roundX + 'px, 0px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-start', newMins);
    startSpan.style.transform =
      'translate(' + roundX + 'px, 0px)';
    showTime(target);
  })

  .resizable({
    preserveAspectRatio: false,
    edges: {
      left: false,
      right: true,
      bottom: false,
      top: false
    }
  })

  .on('resizemove', function(event) {
    var target = event.target,
      dragLen = event.rect.width,
      hour = parseFloat(target.getAttribute('data-scale')),
      scale = hour / 12,
      roundLen = Math.round(dragLen / scale) * scale,
      newMins = 60 * roundLen / hour;

    target.setAttribute('data-length', newMins);
    target.style.width = roundLen + 'px';
    showTime(target);
  })

  .('drop', function(event) {
    console.log(event);
  })

  ;

  function showTime(target) {
    var start = parseInt(target.getAttribute('data-start')),
      len = parseInt(target.getAttribute('data-length')),
      startSpan = target.nextElementSibling;
    var newTime = (start % 60).toString();
    if (newTime.length < 2) {
      newTime = '0' + newTime
    }
    newTime = (Math.floor(start / 60)).toString() + ':' + newTime + ' ';
    newTime += (Math.floor(len / 60)).toString() + ':' + (len % 60).toString();
    startSpan.innerHTML = newTime;
  }

});
