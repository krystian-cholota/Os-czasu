'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TIMELINE class - CONVERTY ES6 TO ES5
var Timeline = function () {
		function Timeline(container, start, end) {
				_classCallCheck(this, Timeline);

				this.container = container;
				this.start = start;
				this.end = end;
		}

		_createClass(Timeline, [{
				key: 'render',
				value: function render(current) {
						var _this = this;

						var stops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
						var mq = window.matchMedia( "(min-width: 500px)" );

						var start = this.start;
						var end = this.end;
						var allDays = Math.floor((end - start) / 1000 / 60 / 60 / 24);
						var currentDays = Math.floor((Math.min(current, end) - start) / 1000 / 60 / 60 / 24);
						var perCent = Math.round(currentDays / allDays * 100);
						this.container.querySelector('.timeline-progress').style.width = perCent + '%';

						[].slice.call(this.container.querySelectorAll('.icon')).forEach(function(icon) {return icon.parentNode.removeChild(icon);});


						if (mq.matches) {
						// window width is at least 500px
						stops.forEach(function (stop) {
								var icon = document.createElement('span');
								var name = stop[1];
								icon.classList.add('icon');
								icon.icon = stop[2];
								icon.innerHTML = '<i class="fa ' + icon.icon + '" aria-hidden="true"></i>';
								var date = stop[0];
								var days = Math.floor((date - start) / 1000 / 60 / 60 / 24);
								var iconPerCent = Math.round(days / allDays * 100);
								icon.style.left = iconPerCent + '%';

								icon.setAttribute('title', "<p class=\"data_title\">" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "." + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "." + date.getFullYear() + '</p><p class=\"name_title\">' + name + "</p>");
								icon.setAttribute('rel', 'tooltip');

								if (iconPerCent <= perCent) {
										icon.classList.add('past');
								}

								_this.container.appendChild(icon);
						});
						} else {
						// window width is less than 500px
						stops.forEach(function (stop) {
								var box = document.createElement('div');
								var icon = document.createElement('span');
								var name = stop[1];
								icon.classList.add('icon');
								icon.icon = stop[2];
								icon.innerHTML = '<i class="fa ' + icon.icon + '" aria-hidden="true"></i>';
								var date = stop[0];
								var days = Math.floor((date - start) / 1000 / 60 / 60 / 24);
								var iconPerCent = Math.round(days / allDays * 100);

								box.classList.add('info');
								box.innerHTML = "<p class=\"data_title\">" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "." + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "." + date.getFullYear() + '</p><p class=\"name_title\">' + name + "</p>";
								icon.setAttribute('style', 'clear: both;');

								if (iconPerCent <= perCent) {
										icon.classList.add('past');
								}

								_this.container.appendChild(icon);
								_this.container.appendChild(box);
						});
						}
				}
		}]);

		return Timeline;
}();
