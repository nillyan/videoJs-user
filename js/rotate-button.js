/**
 * Created by wangna on 2016/11/8.
 */
'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _menuMenuButtonJs = _dereq_('../../menu/menu-button.js');

var _menuMenuButtonJs2 = _interopRequireDefault(_menuMenuButtonJs);

var _menuMenuJs = _dereq_('../../menu/menu.js');

var _menuMenuJs2 = _interopRequireDefault(_menuMenuJs);

var _playbackRateMenuItemJs = _dereq_('./playback-rate-menu-item.js');

var _playbackRateMenuItemJs2 = _interopRequireDefault(_playbackRateMenuItemJs);

var _componentJs = _dereq_('../../component.js');

var _componentJs2 = _interopRequireDefault(_componentJs);

var _utilsDomJs = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_utilsDomJs);

/**
 * The component for controlling the playback rate
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class PlaybackRateMenuButton
 */

var PlaybackRateMenuButton = (function (_MenuButton) {
  _inherits(PlaybackRateMenuButton, _MenuButton);

  function PlaybackRateMenuButton(player, options) {
    _classCallCheck(this, PlaybackRateMenuButton);

    _MenuButton.call(this, player, options);

    this.updateVisibility();
    this.updateLabel();

    this.on(player, 'loadstart', this.updateVisibility);
    this.on(player, 'ratechange', this.updateLabel);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */

  PlaybackRateMenuButton.prototype.createEl = function createEl() {
    var el = _MenuButton.prototype.createEl.call(this);

    this.labelEl_ = Dom.createEl('div', {
      className: 'vjs-playback-rate-value',
      innerHTML: 1.0
    });

    el.appendChild(this.labelEl_);

    return el;
  };

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */

  PlaybackRateMenuButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-playback-rate ' + _MenuButton.prototype.buildCSSClass.call(this);
  };

  /**
   * Create the playback rate menu
   *
   * @return {Menu} Menu object populated with items
   * @method createMenu
   */

  PlaybackRateMenuButton.prototype.createMenu = function createMenu() {
    var menu = new _menuMenuJs2['default'](this.player());
    var rates = this.playbackRates();

    if (rates) {
      for (var i = rates.length - 1; i >= 0; i--) {
        menu.addChild(new _playbackRateMenuItemJs2['default'](this.player(), { 'rate': rates[i] + 'x' }));
      }
    }

    return menu;
  };

  /**
   * Updates ARIA accessibility attributes
   *
   * @method updateARIAAttributes
   */

  PlaybackRateMenuButton.prototype.updateARIAAttributes = function updateARIAAttributes() {
    // Current playback rate
    this.el().setAttribute('aria-valuenow', this.player().playbackRate());
  };

  /**
   * Handle menu item click
   *
   * @method handleClick
   */

  PlaybackRateMenuButton.prototype.handleClick = function handleClick() {
    // select next rate option
    var currentRate = this.player().playbackRate();
    var rates = this.playbackRates();

    // this will select first one if the last one currently selected
    var newRate = rates[0];
    for (var i = 0; i < rates.length; i++) {
      if (rates[i] > currentRate) {
        newRate = rates[i];
        break;
      }
    }
    this.player().playbackRate(newRate);
  };

  /**
   * Get possible playback rates
   *
   * @return {Array} Possible playback rates
   * @method playbackRates
   */

  PlaybackRateMenuButton.prototype.playbackRates = function playbackRates() {
    return this.options_['playbackRates'] || this.options_.playerOptions && this.options_.playerOptions['playbackRates'];
  };

  /**
   * Get whether playback rates is supported by the tech
   * and an array of playback rates exists
   *
   * @return {Boolean} Whether changing playback rate is supported
   * @method playbackRateSupported
   */

  PlaybackRateMenuButton.prototype.playbackRateSupported = function playbackRateSupported() {
    return this.player().tech_ && this.player().tech_['featuresPlaybackRate'] && this.playbackRates() && this.playbackRates().length > 0;
  };

  /**
   * Hide playback rate controls when they're no playback rate options to select
   *
   * @method updateVisibility
   */

  PlaybackRateMenuButton.prototype.updateVisibility = function updateVisibility() {
    if (this.playbackRateSupported()) {
      this.removeClass('vjs-hidden');
    } else {
      this.addClass('vjs-hidden');
    }
  };

  /**
   * Update button label when rate changed
   *
   * @method updateLabel
   */

  PlaybackRateMenuButton.prototype.updateLabel = function updateLabel() {
    if (this.playbackRateSupported()) {
      this.labelEl_.innerHTML = this.player().playbackRate() + 'x';
    }
  };

  return PlaybackRateMenuButton;
})(_menuMenuButtonJs2['default']);

PlaybackRateMenuButton.prototype.controlText_ = 'Playback Rate';

_componentJs2['default'].registerComponent('PlaybackRateMenuButton', PlaybackRateMenuButton);
exports['default'] = PlaybackRateMenuButton;
module.exports = exports['default'];

},{"../../component.js":67,"../../menu/menu-button.js":109,"../../menu/menu.js":111,"../../utils/dom.js":142,"./playback-rate-menu-item.js":76}],76:[function(_dereq_,module,exports){
  /**
   * @file playback-rate-menu-item.js
   */
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _menuMenuItemJs = _dereq_('../../menu/menu-item.js');

  var _menuMenuItemJs2 = _interopRequireDefault(_menuMenuItemJs);

  var _componentJs = _dereq_('../../component.js');

  var _componentJs2 = _interopRequireDefault(_componentJs);

  /**
   * The specific menu item type for selecting a playback rate
   *
   * @param {Player|Object} player
   * @param {Object=} options
   * @extends MenuItem
   * @class PlaybackRateMenuItem
   */

  var PlaybackRateMenuItem = (function (_MenuItem) {
    _inherits(PlaybackRateMenuItem, _MenuItem);

    function PlaybackRateMenuItem(player, options) {
      _classCallCheck(this, PlaybackRateMenuItem);

      var label = options['rate'];
      var rate = parseFloat(label, 10);

      // Modify options for parent MenuItem class's init.
      options['label'] = label;
      options['selected'] = rate === 1;
      _MenuItem.call(this, player, options);

      this.label = label;
      this.rate = rate;

      this.on(player, 'ratechange', this.update);
    }

    /**
     * Handle click on menu item
     *
     * @method handleClick
     */

    PlaybackRateMenuItem.prototype.handleClick = function handleClick() {
      _MenuItem.prototype.handleClick.call(this);
      this.player().playbackRate(this.rate);
    };

    /**
     * Update playback rate with selected rate
     *
     * @method update
     */

    PlaybackRateMenuItem.prototype.update = function update() {
      this.selected(this.player().playbackRate() === this.rate);
    };

    return PlaybackRateMenuItem;
  })(_menuMenuItemJs2['default']);

  PlaybackRateMenuItem.prototype.contentElType = 'button';

  _componentJs2['default'].registerComponent('PlaybackRateMenuItem', PlaybackRateMenuItem);
  exports['default'] = PlaybackRateMenuItem;
  module.exports = exports['default'];

},{"../../component.js":67,"../../menu/menu-item.js":110}],77:[function(_dereq_,module,exports){
  /**
   * @file load-progress-bar.js
   */
  'use strict';

  exports.__esModule = true;

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _componentJs = _dereq_('../../component.js');

  var _componentJs2 = _interopRequireDefault(_componentJs);

  var _utilsDomJs = _dereq_('../../utils/dom.js');

  var Dom = _interopRequireWildcard(_utilsDomJs);

  /**
   * Shows load progress
   *
   * @param {Player|Object} player
   * @param {Object=} options
   * @extends Component
   * @class LoadProgressBar
   */

  var LoadProgressBar = (function (_Component) {
    _inherits(LoadProgressBar, _Component);

    function LoadProgressBar(player, options) {
      _classCallCheck(this, LoadProgressBar);

      _Component.call(this, player, options);
      this.on(player, 'progress', this.update);
    }

