import { SVG } from "@svgdotjs/svg.js"

let draw = SVG().addTo("#app").size('100%', '100%');

let rect = draw.rect(100, 100).move(20, 20).fill('#f35');