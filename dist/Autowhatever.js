'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sectionIterator = require('section-iterator');

var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

var _reactThemeable = require('react-themeable');

var _reactThemeable2 = _interopRequireDefault(_reactThemeable);

var _SectionTitle = require('./SectionTitle');

var _SectionTitle2 = _interopRequireDefault(_SectionTitle);

var _ItemsList = require('./ItemsList');

var _ItemsList2 = _interopRequireDefault(_ItemsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var alwaysTrue = function alwaysTrue() {
  return true;
};
var emptyObject = {};
var defaultRenderInputComponent = function defaultRenderInputComponent(props) {
  return _react2.default.createElement(SimpleInput, props);
};
var defaultRenderItemsContainer = function defaultRenderItemsContainer(props) {
  return _react2.default.createElement('div', props);
};
var defaultTheme = {
  container: 'react-autowhatever__container',
  containerOpen: 'react-autowhatever__container--open',
  input: 'react-autowhatever__input',
  itemsContainer: 'react-autowhatever__items-container',
  itemsList: 'react-autowhatever__items-list',
  item: 'react-autowhatever__item',
  itemFocused: 'react-autowhatever__item--focused',
  sectionContainer: 'react-autowhatever__section-container',
  sectionTitle: 'react-autowhatever__section-title'
};

var SimpleInput = function (_Component) {
  _inherits(SimpleInput, _Component);

  function SimpleInput() {
    _classCallCheck(this, SimpleInput);

    return _possibleConstructorReturn(this, (SimpleInput.__proto__ || Object.getPrototypeOf(SimpleInput)).apply(this, arguments));
  }

  _createClass(SimpleInput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return this.props.value !== props.value;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', this.props);
    }
  }]);

  return SimpleInput;
}(_react.Component);

var Autowhatever = function (_Component2) {
  _inherits(Autowhatever, _Component2);

  function Autowhatever(props) {
    _classCallCheck(this, Autowhatever);

    var _this2 = _possibleConstructorReturn(this, (Autowhatever.__proto__ || Object.getPrototypeOf(Autowhatever)).call(this, props));

    _this2.focusedItem = null;

    _this2.setSectionsItems(props);
    _this2.setSectionIterator(props);
    _this2.setTheme(props);

    _this2.onKeyDown = _this2.onKeyDown.bind(_this2);
    _this2.storeInputReference = _this2.storeInputReference.bind(_this2);
    _this2.storeItemsContainerReference = _this2.storeItemsContainerReference.bind(_this2);
    _this2.onFocusedItemChange = _this2.onFocusedItemChange.bind(_this2);
    _this2.getItemId = _this2.getItemId.bind(_this2);
    return _this2;
  }

  _createClass(Autowhatever, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ensureFocusedItemIsVisible();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.props.items) {
        this.setSectionsItems(nextProps);
      }

      if (nextProps.items !== this.props.items || nextProps.multiSection !== this.props.multiSection) {
        this.setSectionIterator(nextProps);
      }

      if (nextProps.theme !== this.props.theme) {
        this.setTheme(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.ensureFocusedItemIsVisible();
    }
  }, {
    key: 'setSectionsItems',
    value: function setSectionsItems(props) {
      if (props.multiSection) {
        this.sectionsItems = props.items.map(function (section) {
          return props.getSectionItems(section);
        });
        this.sectionsLengths = this.sectionsItems.map(function (items) {
          return items.length;
        });
        this.allSectionsAreEmpty = this.sectionsLengths.every(function (itemsCount) {
          return itemsCount === 0;
        });
      }
    }
  }, {
    key: 'setSectionIterator',
    value: function setSectionIterator(props) {
      this.sectionIterator = (0, _sectionIterator2.default)({
        multiSection: props.multiSection,
        data: props.multiSection ? this.sectionsLengths : props.items.length
      });
    }
  }, {
    key: 'setTheme',
    value: function setTheme(props) {
      this.theme = (0, _reactThemeable2.default)(props.theme);
    }
  }, {
    key: 'storeInputReference',
    value: function storeInputReference(input) {
      if (input !== null) {
        this.input = input;
      }
    }
  }, {
    key: 'storeItemsContainerReference',
    value: function storeItemsContainerReference(itemsContainer) {
      if (itemsContainer !== null) {
        this.itemsContainer = itemsContainer;
      }
    }
  }, {
    key: 'onFocusedItemChange',
    value: function onFocusedItemChange(focusedItem) {
      this.focusedItem = focusedItem;
    }
  }, {
    key: 'getItemId',
    value: function getItemId(sectionIndex, itemIndex) {
      if (itemIndex === null) {
        return null;
      }

      var id = this.props.id;

      var section = sectionIndex === null ? '' : 'section-' + sectionIndex;

      return 'react-autowhatever-' + id + '-' + section + '-item-' + itemIndex;
    }
  }, {
    key: 'renderSections',
    value: function renderSections() {
      var _this3 = this;

      if (this.allSectionsAreEmpty) {
        return null;
      }

      var theme = this.theme;
      var _props = this.props,
          id = _props.id,
          items = _props.items,
          renderItem = _props.renderItem,
          renderItemData = _props.renderItemData,
          shouldRenderSection = _props.shouldRenderSection,
          renderSectionTitle = _props.renderSectionTitle,
          focusedSectionIndex = _props.focusedSectionIndex,
          focusedItemIndex = _props.focusedItemIndex,
          itemProps = _props.itemProps;


      return items.map(function (section, sectionIndex) {
        if (!shouldRenderSection(section)) {
          return null;
        }

        var keyPrefix = 'react-autowhatever-' + id + '-';
        var sectionKeyPrefix = keyPrefix + 'section-' + sectionIndex + '-';

        // `key` is provided by theme()
        /* eslint-disable react/jsx-key */
        return _react2.default.createElement(
          'div',
          theme(sectionKeyPrefix + 'container', 'sectionContainer'),
          _react2.default.createElement(_SectionTitle2.default, {
            section: section,
            renderSectionTitle: renderSectionTitle,
            theme: theme,
            sectionKeyPrefix: sectionKeyPrefix
          }),
          _react2.default.createElement(_ItemsList2.default, {
            items: _this3.sectionsItems[sectionIndex],
            itemProps: itemProps,
            renderItem: renderItem,
            renderItemData: renderItemData,
            sectionIndex: sectionIndex,
            focusedItemIndex: focusedSectionIndex === sectionIndex ? focusedItemIndex : null,
            onFocusedItemChange: _this3.onFocusedItemChange,
            getItemId: _this3.getItemId,
            theme: theme,
            keyPrefix: keyPrefix,
            ref: _this3.storeItemsListReference
          })
        );
        /* eslint-enable react/jsx-key */
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var items = this.props.items;


      if (items.length === 0) {
        return null;
      }

      var theme = this.theme;
      var _props2 = this.props,
          id = _props2.id,
          renderItem = _props2.renderItem,
          renderItemData = _props2.renderItemData,
          focusedSectionIndex = _props2.focusedSectionIndex,
          focusedItemIndex = _props2.focusedItemIndex,
          itemProps = _props2.itemProps;


      return _react2.default.createElement(_ItemsList2.default, {
        items: items,
        itemProps: itemProps,
        renderItem: renderItem,
        renderItemData: renderItemData,
        focusedItemIndex: focusedSectionIndex === null ? focusedItemIndex : null,
        onFocusedItemChange: this.onFocusedItemChange,
        getItemId: this.getItemId,
        theme: theme,
        keyPrefix: 'react-autowhatever-' + id + '-'
      });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      var _props3 = this.props,
          inputProps = _props3.inputProps,
          focusedSectionIndex = _props3.focusedSectionIndex,
          focusedItemIndex = _props3.focusedItemIndex;


      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          {
            var nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev';

            var _sectionIterator$next = this.sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]),
                _sectionIterator$next2 = _slicedToArray(_sectionIterator$next, 2),
                newFocusedSectionIndex = _sectionIterator$next2[0],
                newFocusedItemIndex = _sectionIterator$next2[1];

            inputProps.onKeyDown(event, { newFocusedSectionIndex: newFocusedSectionIndex, newFocusedItemIndex: newFocusedItemIndex });
            break;
          }

        default:
          inputProps.onKeyDown(event, { focusedSectionIndex: focusedSectionIndex, focusedItemIndex: focusedItemIndex });
      }
    }
  }, {
    key: 'ensureFocusedItemIsVisible',
    value: function ensureFocusedItemIsVisible() {
      var focusedItem = this.focusedItem;


      if (!focusedItem) {
        return;
      }

      var itemsContainer = this.itemsContainer;

      var itemOffsetRelativeToContainer = focusedItem.offsetParent === itemsContainer ? focusedItem.offsetTop : focusedItem.offsetTop - itemsContainer.offsetTop;

      var scrollTop = itemsContainer.scrollTop; // Top of the visible area

      if (itemOffsetRelativeToContainer < scrollTop) {
        // Item is off the top of the visible area
        scrollTop = itemOffsetRelativeToContainer;
      } else if (itemOffsetRelativeToContainer + focusedItem.offsetHeight > scrollTop + itemsContainer.offsetHeight) {
        // Item is off the bottom of the visible area
        scrollTop = itemOffsetRelativeToContainer + focusedItem.offsetHeight - itemsContainer.offsetHeight;
      }

      if (scrollTop !== itemsContainer.scrollTop) {
        itemsContainer.scrollTop = scrollTop;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var theme = this.theme;
      var _props4 = this.props,
          id = _props4.id,
          multiSection = _props4.multiSection,
          renderInputComponent = _props4.renderInputComponent,
          renderItemsContainer = _props4.renderItemsContainer,
          focusedSectionIndex = _props4.focusedSectionIndex,
          focusedItemIndex = _props4.focusedItemIndex;

      var renderedItems = multiSection ? this.renderSections() : this.renderItems();
      var isOpen = renderedItems !== null;
      var ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
      var containerProps = theme('react-autowhatever-' + id + '-container', 'container', isOpen && 'containerOpen');
      var itemsContainerId = 'react-autowhatever-' + id;
      var inputComponent = renderInputComponent(_extends({
        type: 'text',
        value: '',
        autoComplete: 'off',
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-owns': itemsContainerId,
        'aria-expanded': isOpen,
        'aria-haspopup': isOpen,
        'aria-activedescendant': ariaActivedescendant
      }, theme('react-autowhatever-' + id + '-input', 'input'), this.props.inputProps, {
        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
        ref: this.storeInputReference
      }));
      var itemsContainer = renderItemsContainer(_extends({
        id: itemsContainerId
      }, theme('react-autowhatever-' + id + '-items-container', 'itemsContainer'), {
        ref: this.storeItemsContainerReference,
        children: renderedItems
      }));

      return _react2.default.createElement(
        'div',
        containerProps,
        inputComponent,
        itemsContainer
      );
    }
  }]);

  return Autowhatever;
}(_react.Component);

Autowhatever.propTypes = {
  id: _react.PropTypes.string, // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
  multiSection: _react.PropTypes.bool, // Indicates whether a multi section layout should be rendered.
  renderInputComponent: _react.PropTypes.func, // Renders the input component.
  items: _react.PropTypes.array.isRequired, // Array of items or sections to render.
  renderItemsContainer: _react.PropTypes.func, // Renders the items container.
  renderItem: _react.PropTypes.func, // This function renders a single item.
  renderItemData: _react.PropTypes.object, // Arbitrary data that will be passed to renderItem()
  shouldRenderSection: _react.PropTypes.func, // This function gets a section and returns whether it should be rendered, or not.
  renderSectionTitle: _react.PropTypes.func, // This function gets a section and renders its title.
  getSectionItems: _react.PropTypes.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
  inputComponent: _react.PropTypes.func, // When specified, it is used to render the input element
  inputProps: _react.PropTypes.object, // Arbitrary input props
  itemProps: _react.PropTypes.oneOfType([// Arbitrary item props
  _react.PropTypes.object, _react.PropTypes.func]),
  focusedSectionIndex: _react.PropTypes.number, // Section index of the focused item
  focusedItemIndex: _react.PropTypes.number, // Focused item index (within a section)
  theme: _react.PropTypes.oneOfType([// Styles. See: https://github.com/markdalgleish/react-themeable
  _react.PropTypes.object, _react.PropTypes.array])
};
Autowhatever.defaultProps = {
  id: '1',
  multiSection: false,
  renderInputComponent: defaultRenderInputComponent,
  renderItemsContainer: defaultRenderItemsContainer,
  shouldRenderSection: alwaysTrue,
  renderItem: function renderItem() {
    throw new Error('`renderItem` must be provided');
  },
  renderItemData: emptyObject,
  renderSectionTitle: function renderSectionTitle() {
    throw new Error('`renderSectionTitle` must be provided');
  },
  getSectionItems: function getSectionItems() {
    throw new Error('`getSectionItems` must be provided');
  },
  inputProps: emptyObject,
  itemProps: emptyObject,
  focusedSectionIndex: null,
  focusedItemIndex: null,
  theme: defaultTheme
};
exports.default = Autowhatever;