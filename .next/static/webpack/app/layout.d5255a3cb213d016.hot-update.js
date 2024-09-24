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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=RiArrowDropDownLine!=!react-icons/ri */ \"(app-pages-browser)/./node_modules/react-icons/ri/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BiSearch!=!react-icons/bi */ \"(app-pages-browser)/./node_modules/react-icons/bi/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=IoNotificationsOutline!=!react-icons/io5 */ \"(app-pages-browser)/./node_modules/react-icons/io5/index.mjs\");\n/* harmony import */ var _app_styles_navbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/styles/navbar.css */ \"(app-pages-browser)/./app/styles/navbar.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Navbar() {\n    _s();\n    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [dropdownOpen, setDropdownOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"All\");\n    const [profileOpen, setProfileOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const profileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const options = [\n        \"All\",\n        \"Mobile\",\n        \"Desktop\"\n    ];\n    const profileOptions = [\n        \"Notifications\",\n        \"Settings\"\n    ];\n    const handleOptionClick = (option)=>{\n        setSelectedOption(option);\n        setDropdownOpen(false);\n    };\n    const handleProfileOptionClick = (option)=>{\n        // Add functionality for profile options here\n        if (option === \"Notifications\") {\n            // Handle notifications action\n            console.log(\"Opening Notifications\");\n        } else if (option === \"Settings\") {\n            // Handle settings action\n            console.log(\"Opening Settings\");\n        }\n        setProfileOpen(false); // Close the profile dropdown after selection\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleClickOutside = (event)=>{\n            if (dropdownRef.current && !dropdownRef.current.contains(event.target) || profileRef.current && !profileRef.current.contains(event.target)) {\n                setDropdownOpen(false);\n                setProfileOpen(false);\n            }\n        };\n        if (dropdownOpen || profileOpen) {\n            document.addEventListener(\"click\", handleClickOutside);\n        }\n        return ()=>{\n            document.removeEventListener(\"click\", handleClickOutside);\n        };\n    }, [\n        dropdownOpen,\n        profileOpen\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"navbar\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"dropdown\",\n                ref: dropdownRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"dropbtn\",\n                        onClick: ()=>setDropdownOpen(!dropdownOpen),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"navbar-text\",\n                                children: selectedOption\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 64,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__.RiArrowDropDownLine, {\n                                className: \"dropdown-icon\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 65,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 60,\n                        columnNumber: 9\n                    }, this),\n                    dropdownOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"dropdown-menu\",\n                        children: options.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"dropdown-item\",\n                                onClick: ()=>handleOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 70,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 68,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 59,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"search-container\",\n                action: \"#\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: \"search-bar\",\n                        type: \"text\",\n                        placeholder: \"Search\",\n                        value: searchValue,\n                        onChange: (e)=>setSearchValue(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__.BiSearch, {\n                        className: \"search-icon\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 89,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notification\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoNotificationsOutline, {\n                    className: \"notification-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 92,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"profile\",\n                ref: profileRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: \"/images/profile-image.jpeg\",\n                        alt: \"Profile Picture\",\n                        onClick: ()=>setProfileOpen(!profileOpen)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 95,\n                        columnNumber: 9\n                    }, this),\n                    profileOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"profile-menu\",\n                        children: profileOptions.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"profile-item\",\n                                onClick: ()=>handleProfileOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 103,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 101,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 94,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n        lineNumber: 58,\n        columnNumber: 5\n    }, this);\n}\n_s(Navbar, \"skW2pIO5RhuMXg2SqfULzUbPnd4=\");\n_c = Navbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUMyRDtBQUNOO0FBQ1g7QUFDZTtBQUN4QjtBQUVqQyxTQUFTTzs7SUFDUCxNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUyxjQUFjQyxnQkFBZ0IsR0FBR1YsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDVyxnQkFBZ0JDLGtCQUFrQixHQUFHWiwrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNLENBQUNhLGFBQWFDLGVBQWUsR0FBR2QsK0NBQVFBLENBQUM7SUFFL0MsTUFBTWUsY0FBY2IsNkNBQU1BLENBQUM7SUFDM0IsTUFBTWMsYUFBYWQsNkNBQU1BLENBQUM7SUFFMUIsTUFBTWUsVUFBVTtRQUFDO1FBQU87UUFBVTtLQUFVO0lBQzVDLE1BQU1DLGlCQUFpQjtRQUFDO1FBQWlCO0tBQVc7SUFFcEQsTUFBTUMsb0JBQW9CLENBQUNDO1FBQ3pCUixrQkFBa0JRO1FBQ2xCVixnQkFBZ0I7SUFDbEI7SUFFQSxNQUFNVywyQkFBMkIsQ0FBQ0Q7UUFDaEMsNkNBQTZDO1FBQzdDLElBQUlBLFdBQVcsaUJBQWlCO1lBQzlCLDhCQUE4QjtZQUM5QkUsUUFBUUMsR0FBRyxDQUFDO1FBQ2QsT0FBTyxJQUFJSCxXQUFXLFlBQVk7WUFDaEMseUJBQXlCO1lBQ3pCRSxRQUFRQyxHQUFHLENBQUM7UUFDZDtRQUNBVCxlQUFlLFFBQVEsNkNBQTZDO0lBQ3RFO0lBRUFiLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTXVCLHFCQUFxQixDQUFDQztZQUMxQixJQUNFLFlBQWFDLE9BQU8sSUFBSSxDQUFDWCxZQUFZVyxPQUFPLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTUcsTUFBTSxLQUNqRVosV0FBV1UsT0FBTyxJQUFJLENBQUNWLFdBQVdVLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDRixNQUFNRyxNQUFNLEdBQ2hFO2dCQUNBbEIsZ0JBQWdCO2dCQUNoQkksZUFBZTtZQUNqQjtRQUNGO1FBRUEsSUFBSUwsZ0JBQWdCSSxhQUFhO1lBQy9CZ0IsU0FBU0MsZ0JBQWdCLENBQUMsU0FBU047UUFDckM7UUFFQSxPQUFPO1lBQ0xLLFNBQVNFLG1CQUFtQixDQUFDLFNBQVNQO1FBQ3hDO0lBQ0YsR0FBRztRQUFDZjtRQUFjSTtLQUFZO0lBRTlCLHFCQUNFLDhEQUFDbUI7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVO2dCQUFXQyxLQUFLbkI7O2tDQUM3Qiw4REFBQ29CO3dCQUNDRixXQUFVO3dCQUNWRyxTQUFTLElBQU0xQixnQkFBZ0IsQ0FBQ0Q7OzBDQUVoQyw4REFBQzRCO2dDQUFLSixXQUFVOzBDQUFldEI7Ozs7OzswQ0FDL0IsOERBQUNSLDBHQUFtQkE7Z0NBQUM4QixXQUFVOzs7Ozs7Ozs7Ozs7b0JBRWhDeEIsOEJBQ0MsOERBQUN1Qjt3QkFBSUMsV0FBVTtrQ0FDWmhCLFFBQVFxQixHQUFHLENBQUMsQ0FBQ2xCLFFBQVFtQixzQkFDcEIsOERBQUNQO2dDQUVDQyxXQUFVO2dDQUNWRyxTQUFTLElBQU1qQixrQkFBa0JDOzBDQUVoQ0E7K0JBSkltQjs7Ozs7Ozs7Ozs7Ozs7OzswQkFVZiw4REFBQ0M7Z0JBQUtQLFdBQVU7Z0JBQW1CUSxRQUFPOztrQ0FDeEMsOERBQUNDO3dCQUNDVCxXQUFVO3dCQUNWVSxNQUFLO3dCQUNMQyxhQUFZO3dCQUNaQyxPQUFPdEM7d0JBQ1B1QyxVQUFVLENBQUNDLElBQU12QyxlQUFldUMsRUFBRW5CLE1BQU0sQ0FBQ2lCLEtBQUs7Ozs7OztrQ0FFaEQsOERBQUN6QyxvRkFBUUE7d0JBQUM2QixXQUFVOzs7Ozs7Ozs7Ozs7MEJBRXRCLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQzVCLGlIQUFzQkE7b0JBQUM0QixXQUFVOzs7Ozs7Ozs7OzswQkFFcEMsOERBQUNEO2dCQUFJQyxXQUFVO2dCQUFVQyxLQUFLbEI7O2tDQUM1Qiw4REFBQ2dDO3dCQUNDQyxLQUFJO3dCQUNKQyxLQUFJO3dCQUNKZCxTQUFTLElBQU10QixlQUFlLENBQUNEOzs7Ozs7b0JBRWhDQSw2QkFDQyw4REFBQ21CO3dCQUFJQyxXQUFVO2tDQUNaZixlQUFlb0IsR0FBRyxDQUFDLENBQUNsQixRQUFRbUIsc0JBQzNCLDhEQUFDUDtnQ0FFQ0MsV0FBVTtnQ0FDVkcsU0FBUyxJQUFNZix5QkFBeUJEOzBDQUV2Q0E7K0JBSkltQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlyQjtHQTVHU2pDO0tBQUFBO0FBOEdULCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3g/NjBlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSaUFycm93RHJvcERvd25MaW5lIH0gZnJvbSBcInJlYWN0LWljb25zL3JpXCI7XHJcbmltcG9ydCB7IEJpU2VhcmNoIH0gZnJvbSBcInJlYWN0LWljb25zL2JpXCI7XHJcbmltcG9ydCB7IElvTm90aWZpY2F0aW9uc091dGxpbmUgfSBmcm9tIFwicmVhY3QtaWNvbnMvaW81XCI7XHJcbmltcG9ydCBcIkAvYXBwL3N0eWxlcy9uYXZiYXIuY3NzXCI7XHJcblxyXG5mdW5jdGlvbiBOYXZiYXIoKSB7XHJcbiAgY29uc3QgW3NlYXJjaFZhbHVlLCBzZXRTZWFyY2hWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJvcGRvd25PcGVuLCBzZXREcm9wZG93bk9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9wdGlvbiwgc2V0U2VsZWN0ZWRPcHRpb25dID0gdXNlU3RhdGUoXCJBbGxcIik7XHJcbiAgY29uc3QgW3Byb2ZpbGVPcGVuLCBzZXRQcm9maWxlT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGRyb3Bkb3duUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHByb2ZpbGVSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSBbXCJBbGxcIiwgXCJNb2JpbGVcIiwgXCJEZXNrdG9wXCJdO1xyXG4gIGNvbnN0IHByb2ZpbGVPcHRpb25zID0gW1wiTm90aWZpY2F0aW9uc1wiLCBcIlNldHRpbmdzXCJdO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcHRpb25DbGljayA9IChvcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkT3B0aW9uKG9wdGlvbik7XHJcbiAgICBzZXREcm9wZG93bk9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByb2ZpbGVPcHRpb25DbGljayA9IChvcHRpb24pID0+IHtcclxuICAgIC8vIEFkZCBmdW5jdGlvbmFsaXR5IGZvciBwcm9maWxlIG9wdGlvbnMgaGVyZVxyXG4gICAgaWYgKG9wdGlvbiA9PT0gXCJOb3RpZmljYXRpb25zXCIpIHtcclxuICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgYWN0aW9uXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBOb3RpZmljYXRpb25zXCIpO1xyXG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09IFwiU2V0dGluZ3NcIikge1xyXG4gICAgICAvLyBIYW5kbGUgc2V0dGluZ3MgYWN0aW9uXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBTZXR0aW5nc1wiKTtcclxuICAgIH1cclxuICAgIHNldFByb2ZpbGVPcGVuKGZhbHNlKTsgLy8gQ2xvc2UgdGhlIHByb2ZpbGUgZHJvcGRvd24gYWZ0ZXIgc2VsZWN0aW9uXHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGRyb3Bkb3duUmVmLmN1cnJlbnQgJiYgIWRyb3Bkb3duUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkgfHxcclxuICAgICAgICAocHJvZmlsZVJlZi5jdXJyZW50ICYmICFwcm9maWxlUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2V0RHJvcGRvd25PcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9maWxlT3BlbihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRyb3Bkb3duT3BlbiB8fCBwcm9maWxlT3Blbikge1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcclxuICAgIH07XHJcbiAgfSwgW2Ryb3Bkb3duT3BlbiwgcHJvZmlsZU9wZW5dKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd25cIiByZWY9e2Ryb3Bkb3duUmVmfT5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wYnRuXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldERyb3Bkb3duT3BlbighZHJvcGRvd25PcGVuKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdGV4dFwiPntzZWxlY3RlZE9wdGlvbn08L3NwYW4+XHJcbiAgICAgICAgICA8UmlBcnJvd0Ryb3BEb3duTGluZSBjbGFzc05hbWU9XCJkcm9wZG93bi1pY29uXCIgLz5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICB7ZHJvcGRvd25PcGVuICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcHRpb25DbGljayhvcHRpb24pfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtvcHRpb259XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzZWFyY2gtYmFyXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcclxuICAgICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVmFsdWUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJpU2VhcmNoIGNsYXNzTmFtZT1cInNlYXJjaC1pY29uXCIgLz5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvblwiPlxyXG4gICAgICAgIDxJb05vdGlmaWNhdGlvbnNPdXRsaW5lIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1pY29uXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZVwiIHJlZj17cHJvZmlsZVJlZn0+XHJcbiAgICAgICAgPGltZ1xyXG4gICAgICAgICAgc3JjPVwiL2ltYWdlcy9wcm9maWxlLWltYWdlLmpwZWdcIlxyXG4gICAgICAgICAgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFByb2ZpbGVPcGVuKCFwcm9maWxlT3Blbil9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7cHJvZmlsZU9wZW4gJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlLW1lbnVcIj5cclxuICAgICAgICAgICAge3Byb2ZpbGVPcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9maWxlLWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUHJvZmlsZU9wdGlvbkNsaWNrKG9wdGlvbil9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge29wdGlvbn1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJSaUFycm93RHJvcERvd25MaW5lIiwiQmlTZWFyY2giLCJJb05vdGlmaWNhdGlvbnNPdXRsaW5lIiwiTmF2YmFyIiwic2VhcmNoVmFsdWUiLCJzZXRTZWFyY2hWYWx1ZSIsImRyb3Bkb3duT3BlbiIsInNldERyb3Bkb3duT3BlbiIsInNlbGVjdGVkT3B0aW9uIiwic2V0U2VsZWN0ZWRPcHRpb24iLCJwcm9maWxlT3BlbiIsInNldFByb2ZpbGVPcGVuIiwiZHJvcGRvd25SZWYiLCJwcm9maWxlUmVmIiwib3B0aW9ucyIsInByb2ZpbGVPcHRpb25zIiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb24iLCJoYW5kbGVQcm9maWxlT3B0aW9uQ2xpY2siLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2tPdXRzaWRlIiwiZXZlbnQiLCJjdXJyZW50IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGl2IiwiY2xhc3NOYW1lIiwicmVmIiwiYnV0dG9uIiwib25DbGljayIsInNwYW4iLCJtYXAiLCJpbmRleCIsImZvcm0iLCJhY3Rpb24iLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwiaW1nIiwic3JjIiwiYWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/Navbar.jsx\n"));

/***/ })

});