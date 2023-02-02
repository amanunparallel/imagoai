function slider1() {
  let splides = $(".slider1");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      perPage: 2,
      perMove: 1,
      focus: 0,
      type: "loop",
      gap: "2rem",
      arrows: "slider",
      pagination: false,
      speed: 600,
      dragAngleThreshold: 30,
      autoWidth: false,
      rewind: true,
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false,
      breakpoints: {
        991: {
          perPage: 1,
        },
        767: {
          perPage: 1,
        },
        479: {
          perPage: 1,
        },
      },
    }).mount();
  }
}
slider1();
