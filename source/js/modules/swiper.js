/* eslint-disable */

const swiper = () => {
  const mySwiper = new Swiper(`.slider__content`, {
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
    },

    autoheight: true,
    loop: true,
  });
};

export {swiper};

/* eslint-disable */
