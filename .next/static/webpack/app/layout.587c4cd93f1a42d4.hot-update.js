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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=RiArrowDropDownLine!=!react-icons/ri */ \"(app-pages-browser)/./node_modules/react-icons/ri/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BiSearch!=!react-icons/bi */ \"(app-pages-browser)/./node_modules/react-icons/bi/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=IoNotificationsOutline!=!react-icons/io5 */ \"(app-pages-browser)/./node_modules/react-icons/io5/index.mjs\");\n/* harmony import */ var _app_styles_navbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/styles/navbar.css */ \"(app-pages-browser)/./app/styles/navbar.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Navbar() {\n    _s();\n    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [dropdownOpen, setDropdownOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"All\");\n    const [profileOpen, setprofileOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const profileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const options = [\n        \"All\",\n        \"Mobile\",\n        \"Desktop\"\n    ];\n    const profileOptions = [\n        \"Notifications\",\n        \"Settings\"\n    ];\n    const handleOptionClick = (option)=>{\n        setSelectedOption(option);\n        setDropdownOpen(false);\n        setprofileOpen(false);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleClickOutside = (event)=>{\n            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {\n                setDropdownOpen(false);\n                setprofileOpen(false);\n            }\n        };\n        if (dropdownOpen) {\n            document.addEventListener(\"click\", handleClickOutside);\n        }\n        return ()=>{\n            document.removeEventListener(\"click\", handleClickOutside);\n        };\n    }, [\n        dropdownOpen,\n        profileOpen\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"navbar\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"dropdown\",\n                ref: dropdownRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"dropbtn\",\n                        onClick: ()=>setDropdownOpen(!dropdownOpen),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"navbar-text\",\n                                children: selectedOption\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 50,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__.RiArrowDropDownLine, {\n                                className: \"dropdown-icon\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 51,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 46,\n                        columnNumber: 9\n                    }, this),\n                    dropdownOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"dropdown-menu\",\n                        children: options.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"dropdown-item\",\n                                onClick: ()=>handleOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 56,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 54,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"search-container\",\n                action: \"#\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: \"search-bar\",\n                        type: \"text\",\n                        placeholder: \"Search\",\n                        value: searchValue,\n                        onChange: (e)=>setSearchValue(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 68,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__.BiSearch, {\n                        className: \"search-icon\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 75,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 67,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notification\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoNotificationsOutline, {\n                    className: \"notification-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 78,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"profile\",\n                ref: profileRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"profile-button\",\n                        onClick: ()=>console.log(object),\n                        children: \" \"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 81,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: \"/images/profile-image.jpeg\",\n                        alt: \"Profile Picture\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 84,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, this);\n}\n_s(Navbar, \"ndgOqXj3HgmzyRrymkREeMetdQc=\");\n_c = Navbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUMyRDtBQUNOO0FBQ1g7QUFDZTtBQUN4QjtBQUVqQyxTQUFTTzs7SUFDUCxNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUyxjQUFjQyxnQkFBZ0IsR0FBR1YsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDVyxnQkFBZ0JDLGtCQUFrQixHQUFHWiwrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNLENBQUNhLGFBQWFDLGVBQWUsR0FBR2QsK0NBQVFBLENBQUM7SUFFL0MsTUFBTWUsY0FBY2IsNkNBQU1BLENBQUM7SUFDM0IsTUFBTWMsYUFBYWQsNkNBQU1BLENBQUM7SUFFMUIsTUFBTWUsVUFBVTtRQUFDO1FBQU87UUFBVTtLQUFVO0lBQzVDLE1BQU1DLGlCQUFpQjtRQUFDO1FBQWlCO0tBQVc7SUFFcEQsTUFBTUMsb0JBQW9CLENBQUNDO1FBQ3pCUixrQkFBa0JRO1FBQ2xCVixnQkFBZ0I7UUFDaEJJLGVBQWU7SUFDakI7SUFFQWIsZ0RBQVNBLENBQUM7UUFDUixNQUFNb0IscUJBQXFCLENBQUNDO1lBQzFCLElBQUlQLFlBQVlRLE9BQU8sSUFBSSxDQUFDUixZQUFZUSxPQUFPLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTUcsTUFBTSxHQUFHO2dCQUN0RWYsZ0JBQWdCO2dCQUNoQkksZUFBZTtZQUNqQjtRQUNGO1FBRUEsSUFBSUwsY0FBYztZQUNoQmlCLFNBQVNDLGdCQUFnQixDQUFDLFNBQVNOO1FBQ3JDO1FBRUEsT0FBTztZQUNMSyxTQUFTRSxtQkFBbUIsQ0FBQyxTQUFTUDtRQUN4QztJQUNGLEdBQUc7UUFBQ1o7UUFBY0k7S0FBWTtJQUU5QixxQkFDRSw4REFBQ2dCO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTtnQkFBV0MsS0FBS2hCOztrQ0FDN0IsOERBQUNpQjt3QkFDQ0YsV0FBVTt3QkFDVkcsU0FBUyxJQUFNdkIsZ0JBQWdCLENBQUNEOzswQ0FFaEMsOERBQUN5QjtnQ0FBS0osV0FBVTswQ0FBZW5COzs7Ozs7MENBQy9CLDhEQUFDUiwwR0FBbUJBO2dDQUFDMkIsV0FBVTs7Ozs7Ozs7Ozs7O29CQUVoQ3JCLDhCQUNDLDhEQUFDb0I7d0JBQUlDLFdBQVU7a0NBQ1piLFFBQVFrQixHQUFHLENBQUMsQ0FBQ2YsUUFBUWdCLHNCQUNwQiw4REFBQ1A7Z0NBRUNDLFdBQVU7Z0NBQ1ZHLFNBQVMsSUFBTWQsa0JBQWtCQzswQ0FFaENBOytCQUpJZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBVWYsOERBQUNDO2dCQUFLUCxXQUFVO2dCQUFtQlEsUUFBTzs7a0NBQ3hDLDhEQUFDQzt3QkFDQ1QsV0FBVTt3QkFDVlUsTUFBSzt3QkFDTEMsYUFBWTt3QkFDWkMsT0FBT25DO3dCQUNQb0MsVUFBVSxDQUFDQyxJQUFNcEMsZUFBZW9DLEVBQUVuQixNQUFNLENBQUNpQixLQUFLOzs7Ozs7a0NBRWhELDhEQUFDdEMsb0ZBQVFBO3dCQUFDMEIsV0FBVTs7Ozs7Ozs7Ozs7OzBCQUV0Qiw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUN6QixpSEFBc0JBO29CQUFDeUIsV0FBVTs7Ozs7Ozs7Ozs7MEJBRXBDLDhEQUFDRDtnQkFBSUMsV0FBVTtnQkFBVUMsS0FBS2Y7O2tDQUM1Qiw4REFBQ2dCO3dCQUFPRixXQUFVO3dCQUFpQkcsU0FBUyxJQUFNWSxRQUFRQyxHQUFHLENBQUNDO2tDQUMzRDs7Ozs7O2tDQUVILDhEQUFDQzt3QkFBSUMsS0FBSTt3QkFBNkJDLEtBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlsRDtHQWhGUzVDO0tBQUFBO0FBa0ZULCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3g/NjBlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSaUFycm93RHJvcERvd25MaW5lIH0gZnJvbSBcInJlYWN0LWljb25zL3JpXCI7XHJcbmltcG9ydCB7IEJpU2VhcmNoIH0gZnJvbSBcInJlYWN0LWljb25zL2JpXCI7XHJcbmltcG9ydCB7IElvTm90aWZpY2F0aW9uc091dGxpbmUgfSBmcm9tIFwicmVhY3QtaWNvbnMvaW81XCI7XHJcbmltcG9ydCBcIkAvYXBwL3N0eWxlcy9uYXZiYXIuY3NzXCI7XHJcblxyXG5mdW5jdGlvbiBOYXZiYXIoKSB7XHJcbiAgY29uc3QgW3NlYXJjaFZhbHVlLCBzZXRTZWFyY2hWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJvcGRvd25PcGVuLCBzZXREcm9wZG93bk9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9wdGlvbiwgc2V0U2VsZWN0ZWRPcHRpb25dID0gdXNlU3RhdGUoXCJBbGxcIik7XHJcbiAgY29uc3QgW3Byb2ZpbGVPcGVuLCBzZXRwcm9maWxlT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGRyb3Bkb3duUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHByb2ZpbGVSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSBbXCJBbGxcIiwgXCJNb2JpbGVcIiwgXCJEZXNrdG9wXCJdO1xyXG4gIGNvbnN0IHByb2ZpbGVPcHRpb25zID0gW1wiTm90aWZpY2F0aW9uc1wiLCBcIlNldHRpbmdzXCJdO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcHRpb25DbGljayA9IChvcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkT3B0aW9uKG9wdGlvbik7XHJcbiAgICBzZXREcm9wZG93bk9wZW4oZmFsc2UpO1xyXG4gICAgc2V0cHJvZmlsZU9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGRyb3Bkb3duUmVmLmN1cnJlbnQgJiYgIWRyb3Bkb3duUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIHNldERyb3Bkb3duT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0cHJvZmlsZU9wZW4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkcm9wZG93bk9wZW4pIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtkcm9wZG93bk9wZW4sIHByb2ZpbGVPcGVuXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCIgcmVmPXtkcm9wZG93blJlZn0+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGJ0blwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXREcm9wZG93bk9wZW4oIWRyb3Bkb3duT3Blbil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLXRleHRcIj57c2VsZWN0ZWRPcHRpb259PC9zcGFuPlxyXG4gICAgICAgICAgPFJpQXJyb3dEcm9wRG93bkxpbmUgY2xhc3NOYW1lPVwiZHJvcGRvd24taWNvblwiIC8+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAge2Ryb3Bkb3duT3BlbiAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cclxuICAgICAgICAgICAge29wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7b3B0aW9ufVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCIgYWN0aW9uPVwiI1wiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwic2VhcmNoLWJhclwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXHJcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoVmFsdWV9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFZhbHVlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxCaVNlYXJjaCBjbGFzc05hbWU9XCJzZWFyY2gtaWNvblwiIC8+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RpZmljYXRpb25cIj5cclxuICAgICAgICA8SW9Ob3RpZmljYXRpb25zT3V0bGluZSBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taWNvblwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVcIiByZWY9e3Byb2ZpbGVSZWZ9PlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvZmlsZS1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBjb25zb2xlLmxvZyhvYmplY3QpfT5cclxuICAgICAgICAgIHtcIiBcIn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8aW1nIHNyYz1cIi9pbWFnZXMvcHJvZmlsZS1pbWFnZS5qcGVnXCIgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiUmlBcnJvd0Ryb3BEb3duTGluZSIsIkJpU2VhcmNoIiwiSW9Ob3RpZmljYXRpb25zT3V0bGluZSIsIk5hdmJhciIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJkcm9wZG93bk9wZW4iLCJzZXREcm9wZG93bk9wZW4iLCJzZWxlY3RlZE9wdGlvbiIsInNldFNlbGVjdGVkT3B0aW9uIiwicHJvZmlsZU9wZW4iLCJzZXRwcm9maWxlT3BlbiIsImRyb3Bkb3duUmVmIiwicHJvZmlsZVJlZiIsIm9wdGlvbnMiLCJwcm9maWxlT3B0aW9ucyIsImhhbmRsZU9wdGlvbkNsaWNrIiwib3B0aW9uIiwiaGFuZGxlQ2xpY2tPdXRzaWRlIiwiZXZlbnQiLCJjdXJyZW50IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGl2IiwiY2xhc3NOYW1lIiwicmVmIiwiYnV0dG9uIiwib25DbGljayIsInNwYW4iLCJtYXAiLCJpbmRleCIsImZvcm0iLCJhY3Rpb24iLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsIm9iamVjdCIsImltZyIsInNyYyIsImFsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/Navbar.jsx\n"));

/***/ })

});