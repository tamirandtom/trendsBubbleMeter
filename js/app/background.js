
// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;
console.log(Engine);

// create a Matter.js engine
var w = window.innerWidth;
var h = window.innerHeight;

var engine = Engine.create(document.body, {
    render: {
        options: {
            height: h,
            width: w,
            showDebug: true,
            wireframes: false,
            background: 'transparent'
        }
    }
});



// add a mouse controlled constraint

var offset = 10,
    options = {
        isStatic: true,
        render: {
            visible: false
        }
    };

engine.world.bodies = [];
World.add(engine.world, [
		  Bodies.rectangle(window.innerWidth / 2, -offset, window.innerWidth, 20, { isStatic: true }),
		  Bodies.rectangle(window.innerWidth / 2, window.innerHeight + offset, window.innerWidth, 20, { isStatic: true }),
		  Bodies.rectangle(window.innerWidth + offset, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
		  Bodies.rectangle(-offset, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true })
]);

// these static walls will not be rendered in this sprites example, see options
// World.add(engine.world, [
//     Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
//     Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
//     Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
//     Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
// ]);

var boxes = [];

function addCircle(Cid, Ccolor, Cradius) {
    lineWidthVar = 6;
    if (isMobile)
    {
        lineWidthVar = 4;
    }
    boxes[Cid] = Bodies.circle((w / 2), (h / 2), Cradius, {
        density: 0.0005,
        frictionAir: 0.06,
        restitution: 0.3,
        friction: 0.01,
        render: {
            fillStyle:'rgba(0,0,0,0)' , strokeStyle: Ccolor,
            lineWidth: lineWidthVar,
        }
    });
    boxes[Cid].angle = Math.random() * 0.5;
    boxes[Cid].force.y -= 0.0001;
    World.add(engine.world, boxes[Cid]);
    //World.remove(engine.world, boxes[Cid]);  <-- This one works
}


function removeCircle(Cid) {
    //console.log(boxes[Cid]);
    World.remove(engine.world, boxes[Cid]); // <-- This one doesn't
    //boxes.splice(Cid, 1);
}

$(window).resize(function () {
    w = window.innerWidth;
    h = window.innerHeight;
    //World.bounds.max = { x: width, y: height };
    // Engine.render.width = w;
    // Engine.render.height = h;
    // Engine.render.style.width = w + 'px';
    // Engine.render.style.height = h + 'px';
});




var renderOptions = engine.render.options;
renderOptions.showAngleIndicator = false;
renderOptions.wireframes = false;

// run the engine
Engine.run(engine);

$(".research_arrow").hover(function() {
     $(".research_link").css("color", "#ffffff");
  }, function() {
     $(".research_link").css("color", "#000000");
  });

