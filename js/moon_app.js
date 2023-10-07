// Custom A-Frame component to navigate to Mars experience on click
AFRAME.registerComponent("navigate-on-click", {
    init: function () {
      const el = this.el;
      // Check if the element has the 'teleport' id, indicating it is the "Go back" link
      const isGoBackLink = el.getAttribute("id") === "teleport";
  
      el.addEventListener("click", function () {
        if (isGoBackLink) {
          window.location.href = "index.html"; // Redirect to the index page
        } else {
          window.location.href = "moon_experience.html"; // Redirect to the Mars experience page
        }
      });
    },
  });
  
  // Additional A-Frame components and interactions can be defined here if needed
  
  // Example: A-Frame component for rotating an entity
  AFRAME.registerComponent("rotate-on-timer", {
    schema: {
      speed: { default: 0.005 }, // Rotation speed in radians per frame
    },
    tick: function () {
      this.el.object3D.rotation.y += this.data.speed;
    },
  });
  
  // Example: A-Frame component for scaling an entity on hover
//   AFRAME.registerComponent("scale-on-hover", {
//     schema: {
//       scale: { default: "1.2 1.2 1.2" }, // Scale factor on hover
//     },
//     init: function () {
//       const el = this.el;
//       el.addEventListener("mouseenter", function () {
//         el.object3D.scale.set(...this.data.scale.split(" ").map(parseFloat));
//       });
//       el.addEventListener("mouseleave", function () {
//         el.object3D.scale.set(1, 1, 1);
//       });
//     },
//   });
  
//   AFRAME.registerComponent("hover-show-info", {
//     init: function () {
//       const el = this.el;
//       const infoBox = document.getElementById("infoBox");
  
//       el.addEventListener("mouseenter", function () {
//         infoBox.setAttribute("visible", "true");
//       });
  
//       el.addEventListener("mouseleave", function () {
//         infoBox.setAttribute("visible", "false");
//       });
//     },
//   });
  
//   // Apply the hover-show-info component to the rover entity
//   const roverEntity = document.getElementById("rover");
//   roverEntity.setAttribute("hover-show-info", "");
  