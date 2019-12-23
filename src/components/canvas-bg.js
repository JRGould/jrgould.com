export default function runCanvas(canvas) {
  return setTimeout(() => {
    let context = canvas.getContext('2d', { alpha: false });
    let mid = 0.15 + Math.random() * 0.2;

    let size = Math.max(document.body.scrollWidth, document.body.scrollHeight) * 2;
    let step = 70;

    canvas.width = size;
    canvas.height = size;
    window.jginfo = {
      loops: 0,
      calls: 0,
    };

    const lineWidth = 40 + Math.random() * 10;
    let strokeStyle = 'rgb(255,251,250)';
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, size, size);

    let draw = (x, y, width, height, leftToRight, delayed = false) => {
      window.jginfo.calls += 1;
      if (leftToRight) {
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);
      } else {
        context.moveTo(x + width, y);
        context.lineTo(x, y + height);
      }
      if (delayed) {
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();
      }
    };

    for (let y = 0; y < size; y += step) {
      for (let x = 0; x < size; x += step) {
        window.jginfo.loops += 1;
        let leftToRight = Math.random() >= mid;
        let stuff = { x, y, step, leftToRight };

        if (leftToRight) {
          draw(stuff.x, stuff.y, stuff.step, stuff.step, stuff.leftToRight);
          continue;
        }
        setTimeout(
          () => draw(stuff.x, stuff.y, stuff.step, stuff.step, stuff.leftToRight, true),
          Math.random() * 100000,
        );
      }
    }
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
  }, 200);
}
