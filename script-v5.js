// // kaboom as pure rendering lib (no component / game obj etc.)
//
// kaboom();
//
// const draw = [];
// const trail = [];
//
// const outline = {
//   width: 4,
//   color: rgb(0, 0, 0),
// };
//
// // this'll run every frame
// render(() => {
//   // TODO: show a custom shader quad here
//
//   // pop to not affect the mouse trail and draw
//   if (keyIsDown("space")) {
//     popTransform();
//   }
//
//   drawLines({
//     ...outline,
//     pts: trail,
//   });
//
//   draw.forEach((pts) => {
//     drawLines({
//       ...outline,
//       pts: pts,
//     });
//   });
//
// });
//
// // this'll also run every frame, but before all renders
// action(() => {
//
//   trail.push(mousePos());
//
//   if (trail.length > 16) {
//     trail.shift();
//   }
//
//   if (mouseIsClicked()) {
//     draw.push([]);
//   }
//
//   if (mouseIsDown() && mouseIsMoved()) {
//     draw[draw.length - 1].push(mousePos());
//   }
//
// });

kaboom({
  width: 600,
  height: 500,
  scale: 1,
  debug: true,
  // background: [255, 255, 255],

});

// loadSprite("square", "sprites/s.png");
//
// const square = add([
//   sprite("square"),
//   pos(30, 35),
//   origin("center")
// ])

const p1 = vec2(100, 200)
const p2 = vec2(200, 300)
const p3 = vec2(300, 500)

const outline = {
  width: 4,
  color: rgb(0, 0, 0),
};

const trail = [p1, p2, p3]
  render(() => {
    drawLines({
    ...outline,
    pts: trail,
  });

  // draw.forEach((pts) => {
  //   drawLines({
  //     ...outline,
  //     pts: pts,
  //   });
  // });
})

action(() => {
  trail.push(mousePos());
})
