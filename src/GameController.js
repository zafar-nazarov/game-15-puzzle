"use strict";

$.fn.game15 = function (numberSettings) {
    var settings = numberSettings;
    var game = {
        initialize: function (wrap) {
            this.wrapper = wrap;
            this.builder();
            this.createMixButtons();
            this.rotation(this);
            this.events(this);
        },
        builder: function () {
            var numbers = 0;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    numbers++;
                    var positions = {
                        x: this.percentToPix(
                            this.intToPercent(i)
                        ),
                        y: this.percentToPix(
                            this.intToPercent(j)
                        )
                    };
                    var color = this.randomColors();
                    if (numbers !== 16) {
                        this.wrapper.append('<div ' +
                            'class="size" ' +
                            'style="top: ' +
                            positions.x + 'px; left: ' +
                            positions.y + 'px; background-color: ' + color + '">' + settings[ numbers - 1 ] + '</div>');
                    }
                }
            }
            this.knuckles = this.wrapper.find('.size');
        },
        rotation: function (parent) {
            setInterval(function () {
                if (parent.rotationTrigger === true) {
                    var side = parent.selectSide();
                    eval("parent.key" + side + "();");
                }
            }, 140)
        },
        selectSide: function () {
            var availableSides = [], empty = this.emptyKnuckle.px, count = 0;
            if (empty.y - 100 >= 0) availableSides.push("Top");
            if (empty.y + 100 <= 300) availableSides.push("Bottom");
            if (empty.x + 100 <= 300) availableSides.push("Right");
            if (empty.x - 100 >= 0) availableSides.push("Left");
            do {
                var rand = _.random(0, availableSides.length - 1);
                if(this.uniqueRandomValue(this.lastRandomValue, rand)) {
                    this.lastRandomValue = rand; break;
                }
            }
            while(true);
            return availableSides[this.lastRandomValue];
        },
        uniqueRandomValue: function (cuurent, last) {
              if(cuurent != last){
                  return true;
              } else return false;
        },
        createMixButtons: function () {
            this.wrapper.after("<div class='button-wrapper'></div>");
            this.buttonWrapper = this.wrapper.next('.button-wrapper');

            this.buttonWrapper.append('<div id="mix-button" class="stylization">Mix</div>');
            this.buttonWrapper.append('<div id="stop-button" class="stylization">Stop Mix</div>');

            this.startMix = $(this.buttonWrapper).children().first();
            this.stopMix = $(this.buttonWrapper).children().last();
        },
        randomColors: function () {
            var colors = ["#59323c", "#260126", "#f2eeb3", "#bfaf80", "#8c6954", "#59323c", "#260126", "#f2eeb3", "#bfaf80", "#8c6954"];
            return colors[_.random(0, 9)];
        },
        intToPercent: function (int) {
            return 100 * int / 4;
        },
        percentToPix: function (percent) {
            return 400 / 100 * percent;
        },
        pixToPercent: function (pixel) {
            return (100 / 400) * pixel;
        },
        movementControl: function (parent) {
            var current = parent.currentKnuckle.px,
                empty = parent.emptyKnuckle.px;
            if ((current.x === empty.x) || (current.y === empty.y )) {
                if (current.x === empty.x) {
                    if (current.y < empty.y) {
                        // Вверх
                        this.top(current, empty);
                    } else {
                        //Вниз
                        this.bottom(current, empty);
                    }
                } else {
                    if (current.x < empty.x) {
                        // Вправо
                        this.right(current, empty);
                    } else {
                        //Влево
                        this.left(current, empty);
                    }
                }
            } else console.log("Error");
        },
        moveEmpty: function (mode, count) {
            switch (mode) {
                case "left":
                    this.emptyKnuckle.px.x -= count * 100;
                    this.emptyKnuckle.percent.x -= count * 25;
                    break;
                case "top":
                    this.emptyKnuckle.px.y -= count * 100;
                    this.emptyKnuckle.percent.y -= count * 25;
                    break;
                case "right":
                    this.emptyKnuckle.px.x += count * 100;
                    this.emptyKnuckle.percent.x += count * 25;
                    break;
                case "bottom":
                    this.emptyKnuckle.px.y += count * 100;
                    this.emptyKnuckle.percent.y += count * 25;
                    break;
                default:
            }
        },
        top: function (current, empty) {
            var currPos = {
                x: null,
                y: null
            }, count = 0;
            this.knuckles.each(function () {

                currPos.x = parseInt($(this).css('left'));
                currPos.y = parseInt($(this).css('top'));


                if ((currPos.y >= current.y && currPos.y < empty.y ) && current.x === currPos.x) {
                    $(this).animate({top: currPos.y + 100 + 'px'}, 300);
                    count++;
                }
            });
            this.moveEmpty('top', count);
            count = 0;
        },
        bottom: function (current, empty) {
            var currPos = {
                x: null,
                y: null
            }, count = 0;
            this.knuckles.each(function () {
                currPos.x = parseInt($(this).css('left'));
                currPos.y = parseInt($(this).css('top'));
                if ((currPos.y <= current.y && currPos.y > empty.y ) && current.x === currPos.x) {
                    $(this).animate({top: currPos.y - 100 + 'px'}, 300);
                    count++;
                }
            });
            this.moveEmpty('bottom', count);
            count = 0;
        },
        left: function (current, empty) {
            var currPos = {
                x: null,
                y: null
            }, count = 0;
            this.knuckles.each(function () {

                currPos.x = parseInt($(this).css('left'));
                currPos.y = parseInt($(this).css('top'));


                if ((currPos.x <= current.x && currPos.x > empty.x ) && current.y === currPos.y) {
                    $(this).animate({left: currPos.x - 100 + 'px'}, 300);
                    count++;
                }
            });
            this.moveEmpty('right', count);
            count = 0;
        },
        right: function (current, empty) {
            var currPos = {
                x: null,
                y: null
            }, count = 0;
            this.knuckles.each(function () {

                currPos.x = parseInt($(this).css('left'));
                currPos.y = parseInt($(this).css('top'));


                if ((currPos.x >= current.x && currPos.x < empty.x ) && current.y === currPos.y) {
                    $(this).animate({left: currPos.x + 100 + 'px'}, 300);
                    count++;
                }
            });
            this.moveEmpty('left', count);
            count = 0;
        },
        keyTop: function () {
            if (this.emptyKnuckle.px.y - 100 >= 0) {
                var parent = this;
                var currPos = {
                    x: null,
                    y: null
                };
                this.knuckles.each(function () {
                    currPos.x = parseInt($(this).css('left'));
                    currPos.y = parseInt($(this).css('top'));
                    if (currPos.y === parent.emptyKnuckle.px.y - 100 && currPos.x === parent.emptyKnuckle.px.x) {
                        $(this).animate({top: currPos.y + 100});
                        parent.moveEmpty('top', 1);
                        return false;
                    }
                });
            }
        },
        keyBottom: function () {
            if (this.emptyKnuckle.px.y + 100 <= 300) {
                var parent = this;
                var currPos = {
                    x: null,
                    y: null
                };
                this.knuckles.each(function () {
                    currPos.x = parseInt($(this).css('left'));
                    currPos.y = parseInt($(this).css('top'));
                    if (currPos.y === parent.emptyKnuckle.px.y + 100 && currPos.x === parent.emptyKnuckle.px.x) {
                        $(this).animate({top: currPos.y - 100});
                        parent.moveEmpty('bottom', 1);
                        return false;
                    }
                });
            }

        },
        keyRight: function () {
            if (this.emptyKnuckle.px.x + 100 <= 300) {
                var parent = this;
                var currPos = {
                    x: null,
                    y: null
                };
                this.knuckles.each(function () {
                    currPos.x = parseInt($(this).css('left'));
                    currPos.y = parseInt($(this).css('top'));
                    if ((currPos.x === parent.emptyKnuckle.px.x + 100) && (currPos.y === parent.emptyKnuckle.px.y)) {
                        $(this).animate({left: currPos.x - 100});
                        parent.moveEmpty('right', 1);
                        return false;
                    }
                });
            }
        },
        keyLeft: function () {
            if (this.emptyKnuckle.px.x - 100 >= 0) {

                var parent = this;
                var currPos = {
                    x: null,
                    y: null
                };
                this.knuckles.each(function () {
                    currPos.x = parseInt($(this).css('left'));
                    currPos.y = parseInt($(this).css('top'));
                    if (currPos.x === parent.emptyKnuckle.px.x - 100 && currPos.y === parent.emptyKnuckle.px.y) {
                        $(this).animate({left: currPos.x + 100});
                        parent.moveEmpty('left', 1);
                        return false;
                    }
                });
            }
        },
        events: function (parent) {
            this.registerEvents(this.knuckles, 'click', function () {
                var x, y;
                x = parseInt($(this).css('left'));
                y = parseInt($(this).css('top'));
                parent.currentKnuckle.px.x = x;
                parent.currentKnuckle.px.y = y;
                parent.currentKnuckle.percent.x = parent.pixToPercent(x);
                parent.currentKnuckle.percent.y = parent.pixToPercent(y);
                parent.movementControl(parent);
            });

            this.registerEvents(this.startMix, 'click', function () {
                    parent.rotationTrigger = true;
                }
            );

            this.registerEvents(this.stopMix, 'click', function () {
                parent.rotationTrigger = false;
            });

            this.registerEvents($('body'), 'keydown', function () {
                switch (event.which) {
                    case 37 :
                        parent.keyRight();
                        break;
                    case 38 :
                        parent.keyBottom();
                        break;
                    case 39 :
                        parent.keyLeft();
                        break;
                    case 40 :
                        parent.keyTop();
                        break;
                }
            });
        },
        registerEvents: function (e, event, hendler) {
            $(e).on(event, hendler);
        },
        wrapper: undefined,
        buttonWrapper: undefined,
        rotationTrigger: false,
        startMix: undefined,
        stopMix: undefined,
        lastRandomValue: 0,
        knuckles: {},
        complatedKnuckles: {},
        emptyKnuckle: {
            percent: {
                x: 75,
                y: 75
            },
            px: {
                x: 300,
                y: 300
            }
        },
        currentKnuckle: {
            percent: {
                x: null,
                y: null
            },
            px: {
                x: null,
                y: null
            }
        }
    };
    return game.initialize($(this));
};
$.fn.game15.defaultOptions = {

};