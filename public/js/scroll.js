/** @format */
const Templates = {};

async function render(templateName, data) {
  if (!Templates[templateName]) {
    const str = await (await fetch(`/view/${templateName}.hbs`)).text();
    Templates[templateName] = Handlebars.compile(str);
  }

  return Templates[templateName](data);
}

let obj = {
  title: "Иммерсивное шоу «Зеркало Карлоса Сантоса»",
  short_description:
    "Театральный променад с ужином в финале представляют режиссёр Талгат Баталов и драматург Максим Курочкин. Зрителям предстоит сделать то, чего мы все очень сильно боимся. Погрузиться в самих себя.",
  arr_img: [
    "https://kudago.com/media/thumbs/xl/images/list/e4/e1/e4e171392c9261ade9bd1318fdcd196d.jpg",
    "https://kudago.com/media/thumbs/xl/images/event/0f/3c/0f3ca971baff287f4323dc0ad62ba21f.jpg",
    "https://kudago.com/media/thumbs/xl/images/event/4b/d5/4bd59e591e6725494b09bb2a1ff7d04e.jpg",
  ],
  main_img:
    "https://kudago.com/media/thumbs/xl/images/event/75/50/7550df2733552b785c84849c7dd1989c.jpg",
  long_description:
    "Спектакль по пьесе Максима Курочкина, лауреата «Антибукера», поставил номинант «Золотой Маски» Талгат Баталов. Создатели постановки предлагают зрителям пережить необычный и в каком-то смысле пугающий опыт. На площади в тысячу квадратных метров в течение полутора часов разворачивается действо, участниками которого становятся только двенадцать зрителей. Променад завершается ужином для всех участников. Во время спектакля зрители проходят через различные комнаты-состояния. В некоторых — им может быть по-настоящему страшно. Но это шанс вспомнить свои ценности, свои настоящие цели, забытые или отложенные в нескончаемом процессе важных ежедневных дел. По мнению режиссёра Талгата Баталова, этот спектакль — возможность шагнуть в самого себя и встретиться лицом к лицу со своими страхами и внутренним диалогом. Шоу представляет собой новую форму развлечения, связанную с самопознанием. Что именно будет происходить в комнатах — тайна, но кое-что всё-таки известно: каждого зрителя ждёт личный, ни с чем не сравнимый опыт, который зависит только от его собственных воспоминаний, переживаний и вовлечённости. А финальный ужин будет самым настоящим, в меню включены мясные блюда, различные овощные закуски, сыры и напитки.",
  dates: ["13 мая 18:15, 19:45, 20:30", "14 мая 18:15, 19:00", "15 мая"],
  place: "",
  videos: null,
  tags: ["экскурсия", "крыша", "фото"],
  status: "published",
};

let title = obj.title;
let shortDes = obj.short_description;
let imgArr = obj.arr_img;
let longDesc = obj.long_description;





function Sim(sldrId) {
  let id = document.getElementById(sldrId);
  if (id) {
    this.sldrRoot = id;
  } else {
    this.sldrRoot = document.querySelector(".sim-slider");
  }

  // Carousel objects
  this.sldrList = this.sldrRoot.querySelector(".sim-slider-list");
  this.sldrElements = this.sldrList.querySelectorAll(".sim-slider-element");
  this.sldrElemFirst = this.sldrList.querySelector(".sim-slider-element");
  this.leftArrow = this.sldrRoot.querySelector("div.sim-slider-arrow-left");
  this.rightArrow = this.sldrRoot.querySelector("div.sim-slider-arrow-right");
  this.indicatorDots = this.sldrRoot.querySelector("div.sim-slider-dots");

  // Initialization
  this.options = Sim.defaults;
  Sim.initialize(this);
}

Sim.defaults = {
  // Default options for the carousel
  loop: true, // Бесконечное зацикливание слайдера
  auto: true, // Автоматическое пролистывание
  interval: 5000, // Интервал между пролистыванием элементов (мс)
  arrows: true, // Пролистывание стрелками
  dots: true, // Индикаторные точки
};

Sim.prototype.elemPrev = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

  if (!this.options.loop) {
    if (this.currentElement == 0) {
      this.leftArrow.style.display = "none";
    }
    this.rightArrow.style.display = "block";
  }

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.elemNext = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement >= this.elemCount) this.currentElement = 0;

  if (!this.options.loop) {
    if (this.currentElement == this.elemCount - 1) {
      this.rightArrow.style.display = "none";
    }
    this.leftArrow.style.display = "block";
  }

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#BBB; cursor:pointer;";
};

Sim.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#556; cursor:default;";
};

Sim.initialize = function (that) {
  // Constants
  that.elemCount = that.sldrElements.length; // Количество элементов

  // Variables
  that.currentElement = 0;
  let bgTime = getTime();

  // Functions
  function getTime() {
    return new Date().getTime();
  }
  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, that.options.interval);
  }

  // Start initialization
  if (that.elemCount <= 1) {
    // Отключить навигацию
    that.options.auto = false;
    that.options.arrows = false;
    that.options.dots = false;
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }
  if (that.elemCount >= 1) {
    // показать первый элемент
    that.sldrElemFirst.style.opacity = "1";
  }

  if (!that.options.loop) {
    that.leftArrow.style.display = "none"; // отключить левую стрелку
    that.options.auto = false; // отключить автопркрутку
  } else if (that.options.auto) {
    // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.sldrList.addEventListener(
      "mouseenter",
      function () {
        clearInterval(that.autoScroll);
      },
      false
    );
    that.sldrList.addEventListener("mouseleave", setAutoScroll, false);
  }

  if (that.options.arrows) {
    // инициализация стрелок
    that.leftArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemPrev();
        }
      },
      false
    );
    that.rightArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemNext();
        }
      },
      false
    );
  } else {
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }

  if (that.options.dots) {
    // инициализация индикаторных точек
    let sum = "",
      diffNum;
    for (let i = 0; i < that.elemCount; i++) {
      sum += '<span class="sim-dot"></span>';
    }
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.sldrRoot.querySelectorAll("span.sim-dot");
    // Назначаем точкам обработчик события 'click'
    for (let n = 0; n < that.elemCount; n++) {
      that.indicatorDotsAll[n].addEventListener(
        "click",
        function () {
          diffNum = Math.abs(n - that.currentElement);
          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          }
          // Если n == that.currentElement ничего не делаем
        },
        false
      );
    }
    that.dotOff(0); // точка[0] выключена, остальные включены
    for (let i = 1; i < that.elemCount; i++) {
      that.dotOn(i);
    }
  }
};

new Sim();
