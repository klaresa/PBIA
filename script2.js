// kaboom as pure rendering lib (no component / game obj etc.)

kaboom();

const draw = [];
const trail = [];

const outline = {
  width: 4,
  color: rgb(0, 0, 0),
};

// this'll run every frame
render(() => {
  // TODO: show a custom shader quad here

  // pop to not affect the mouse trail and draw
  if (keyIsDown("space")) {
    popTransform();
  }

  drawLines({
    ...outline,
    pts: trail,
  });

  draw.forEach((pts) => {
    drawLines({
      ...outline,
      pts: pts,
    });
  });

});

// this'll also run every frame, but before all renders
action(() => {

  trail.push(mousePos());

  if (trail.length > 16) {
    trail.shift();
  }

  if (mouseIsClicked()) {
    draw.push([]);
  }

  if (mouseIsDown() && mouseIsMoved()) {
    draw[draw.length - 1].push(mousePos());
  }

});
