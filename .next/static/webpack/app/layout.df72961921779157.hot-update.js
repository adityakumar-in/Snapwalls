"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/components/Navbar.jsx":
/*!***********************************!*\
  !*** ./app/components/Navbar.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=RiArrowDropDownLine!=!react-icons/ri */ \"(app-pages-browser)/./node_modules/react-icons/ri/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BiSearch!=!react-icons/bi */ \"(app-pages-browser)/./node_modules/react-icons/bi/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=IoNotificationsOutline!=!react-icons/io5 */ \"(app-pages-browser)/./node_modules/react-icons/io5/index.mjs\");\n/* harmony import */ var _app_styles_navbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/styles/navbar.css */ \"(app-pages-browser)/./app/styles/navbar.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Navbar() {\n    _s();\n    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [dropdownOpen, setDropdownOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"All\");\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const options = [\n        \"All\",\n        \"Mobile\",\n        \"Desktop\"\n    ];\n    const handleOptionClick = (option)=>{\n        setSelectedOption(option);\n        setDropdownOpen(false);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleClickOutside = (event)=>{\n            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {\n                setDropdownOpen(false);\n            }\n        };\n        if (dropdownOpen) {\n            document.addEventListener(\"click\", handleClickOutside);\n        }\n        return ()=>{\n            document.removeEventListener(\"click\", handleClickOutside);\n        };\n    }, [\n        dropdownOpen\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"navbar\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"dropdown\",\n                ref: dropdownRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"dropbtn\",\n                        onClick: ()=>setDropdownOpen(!dropdownOpen),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"navbar-text\",\n                                children: selectedOption\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 45,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__.RiArrowDropDownLine, {\n                                className: \"dropdown-icon\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 46,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 41,\n                        columnNumber: 9\n                    }, this),\n                    dropdownOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"dropdown-menu\",\n                        children: options.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"dropdown-item\",\n                                onClick: ()=>handleOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 51,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 49,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"search-container\",\n                action: \"#\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: \"search-bar\",\n                        type: \"text\",\n                        placeholder: \"Search\",\n                        value: searchValue,\n                        onChange: (e)=>setSearchValue(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 63,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__.BiSearch, {\n                        className: \"search-icon\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 70,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notification\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoNotificationsOutline, {\n                    className: \"notification-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 73,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 72,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"profile\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                    src: \"/images/profile-image.jpeg\",\n                    alt: \"Profile Picture\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 76,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n        lineNumber: 39,\n        columnNumber: 5\n    }, this);\n}\n_s(Navbar, \"AmrJB9A40dB/lZa70YjBguESvX8=\");\n_c = Navbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUMyRDtBQUNOO0FBQ1g7QUFDZTtBQUN4QjtBQUVqQyxTQUFTTzs7SUFDUCxNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUyxjQUFjQyxnQkFBZ0IsR0FBR1YsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDVyxnQkFBZ0JDLGtCQUFrQixHQUFHWiwrQ0FBUUEsQ0FBQztJQUVyRCxNQUFNYSxjQUFjWCw2Q0FBTUEsQ0FBQztJQUUzQixNQUFNWSxVQUFVO1FBQUM7UUFBTztRQUFVO0tBQVU7SUFFNUMsTUFBTUMsb0JBQW9CLENBQUNDO1FBQ3pCSixrQkFBa0JJO1FBQ2xCTixnQkFBZ0I7SUFDbEI7SUFFQVQsZ0RBQVNBLENBQUM7UUFDUixNQUFNZ0IscUJBQXFCLENBQUNDO1lBQzFCLElBQUlMLFlBQVlNLE9BQU8sSUFBSSxDQUFDTixZQUFZTSxPQUFPLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTUcsTUFBTSxHQUFHO2dCQUN0RVgsZ0JBQWdCO1lBQ2xCO1FBQ0Y7UUFFQSxJQUFJRCxjQUFjO1lBQ2hCYSxTQUFTQyxnQkFBZ0IsQ0FBQyxTQUFTTjtRQUNyQztRQUVBLE9BQU87WUFDTEssU0FBU0UsbUJBQW1CLENBQUMsU0FBU1A7UUFDeEM7SUFDRixHQUFHO1FBQUNSO0tBQWE7SUFFakIscUJBQ0UsOERBQUNnQjtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7Z0JBQVdDLEtBQUtkOztrQ0FDN0IsOERBQUNlO3dCQUNDRixXQUFVO3dCQUNWRyxTQUFTLElBQU1uQixnQkFBZ0IsQ0FBQ0Q7OzBDQUVoQyw4REFBQ3FCO2dDQUFLSixXQUFVOzBDQUFlZjs7Ozs7OzBDQUMvQiw4REFBQ1IsMEdBQW1CQTtnQ0FBQ3VCLFdBQVU7Ozs7Ozs7Ozs7OztvQkFFaENqQiw4QkFDQyw4REFBQ2dCO3dCQUFJQyxXQUFVO2tDQUNaWixRQUFRaUIsR0FBRyxDQUFDLENBQUNmLFFBQVFnQixzQkFDcEIsOERBQUNQO2dDQUVDQyxXQUFVO2dDQUNWRyxTQUFTLElBQU1kLGtCQUFrQkM7MENBRWhDQTsrQkFKSWdCOzs7Ozs7Ozs7Ozs7Ozs7OzBCQVVmLDhEQUFDQztnQkFBS1AsV0FBVTtnQkFBbUJRLFFBQU87O2tDQUN4Qyw4REFBQ0M7d0JBQ0NULFdBQVU7d0JBQ1ZVLE1BQUs7d0JBQ0xDLGFBQVk7d0JBQ1pDLE9BQU8vQjt3QkFDUGdDLFVBQVUsQ0FBQ0MsSUFBTWhDLGVBQWVnQyxFQUFFbkIsTUFBTSxDQUFDaUIsS0FBSzs7Ozs7O2tDQUVoRCw4REFBQ2xDLG9GQUFRQTt3QkFBQ3NCLFdBQVU7Ozs7Ozs7Ozs7OzswQkFFdEIsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDckIsaUhBQXNCQTtvQkFBQ3FCLFdBQVU7Ozs7Ozs7Ozs7OzBCQUVwQyw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNlO29CQUFJQyxLQUFJO29CQUE2QkMsS0FBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJbEQ7R0F4RVNyQztLQUFBQTtBQTBFVCwrREFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9OYXZiYXIuanN4PzYwZTEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgUmlBcnJvd0Ryb3BEb3duTGluZSB9IGZyb20gXCJyZWFjdC1pY29ucy9yaVwiO1xyXG5pbXBvcnQgeyBCaVNlYXJjaCB9IGZyb20gXCJyZWFjdC1pY29ucy9iaVwiO1xyXG5pbXBvcnQgeyBJb05vdGlmaWNhdGlvbnNPdXRsaW5lIH0gZnJvbSBcInJlYWN0LWljb25zL2lvNVwiO1xyXG5pbXBvcnQgXCJAL2FwcC9zdHlsZXMvbmF2YmFyLmNzc1wiO1xyXG5cclxuZnVuY3Rpb24gTmF2YmFyKCkge1xyXG4gIGNvbnN0IFtzZWFyY2hWYWx1ZSwgc2V0U2VhcmNoVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duT3Blbiwgc2V0RHJvcGRvd25PcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0ZWRPcHRpb24sIHNldFNlbGVjdGVkT3B0aW9uXSA9IHVzZVN0YXRlKFwiQWxsXCIpO1xyXG5cclxuICBjb25zdCBkcm9wZG93blJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3Qgb3B0aW9ucyA9IFtcIkFsbFwiLCBcIk1vYmlsZVwiLCBcIkRlc2t0b3BcIl07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wdGlvbkNsaWNrID0gKG9wdGlvbikgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRPcHRpb24ob3B0aW9uKTtcclxuICAgIHNldERyb3Bkb3duT3BlbihmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoZHJvcGRvd25SZWYuY3VycmVudCAmJiAhZHJvcGRvd25SZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgc2V0RHJvcGRvd25PcGVuKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25PcGVuKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja091dHNpZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja091dHNpZGUpO1xyXG4gICAgfTtcclxuICB9LCBbZHJvcGRvd25PcGVuXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCIgcmVmPXtkcm9wZG93blJlZn0+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGJ0blwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXREcm9wZG93bk9wZW4oIWRyb3Bkb3duT3Blbil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLXRleHRcIj57c2VsZWN0ZWRPcHRpb259PC9zcGFuPlxyXG4gICAgICAgICAgPFJpQXJyb3dEcm9wRG93bkxpbmUgY2xhc3NOYW1lPVwiZHJvcGRvd24taWNvblwiIC8+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAge2Ryb3Bkb3duT3BlbiAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cclxuICAgICAgICAgICAge29wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7b3B0aW9ufVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCIgYWN0aW9uPVwiI1wiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwic2VhcmNoLWJhclwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXHJcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoVmFsdWV9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFZhbHVlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxCaVNlYXJjaCBjbGFzc05hbWU9XCJzZWFyY2gtaWNvblwiIC8+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RpZmljYXRpb25cIj5cclxuICAgICAgICA8SW9Ob3RpZmljYXRpb25zT3V0bGluZSBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taWNvblwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVcIj5cclxuICAgICAgICA8aW1nIHNyYz1cIi9pbWFnZXMvcHJvZmlsZS1pbWFnZS5qcGVnXCIgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiUmlBcnJvd0Ryb3BEb3duTGluZSIsIkJpU2VhcmNoIiwiSW9Ob3RpZmljYXRpb25zT3V0bGluZSIsIk5hdmJhciIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJkcm9wZG93bk9wZW4iLCJzZXREcm9wZG93bk9wZW4iLCJzZWxlY3RlZE9wdGlvbiIsInNldFNlbGVjdGVkT3B0aW9uIiwiZHJvcGRvd25SZWYiLCJvcHRpb25zIiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb24iLCJoYW5kbGVDbGlja091dHNpZGUiLCJldmVudCIsImN1cnJlbnQiLCJjb250YWlucyIsInRhcmdldCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJyZWYiLCJidXR0b24iLCJvbkNsaWNrIiwic3BhbiIsIm1hcCIsImluZGV4IiwiZm9ybSIsImFjdGlvbiIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJpbWciLCJzcmMiLCJhbHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/Navbar.jsx\n"));

/***/ })

});