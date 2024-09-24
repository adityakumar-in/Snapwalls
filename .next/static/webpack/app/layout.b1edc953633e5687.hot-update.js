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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=RiArrowDropDownLine!=!react-icons/ri */ \"(app-pages-browser)/./node_modules/react-icons/ri/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BiSearch!=!react-icons/bi */ \"(app-pages-browser)/./node_modules/react-icons/bi/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=IoNotificationsOutline!=!react-icons/io5 */ \"(app-pages-browser)/./node_modules/react-icons/io5/index.mjs\");\n/* harmony import */ var _app_styles_navbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/styles/navbar.css */ \"(app-pages-browser)/./app/styles/navbar.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Navbar() {\n    _s();\n    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [dropdownOpen, setDropdownOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"All\");\n    const [profileOpen, setProfileOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedProfileOption, setSelectedProfileOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const profileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const options = [\n        \"All\",\n        \"Mobile\",\n        \"Desktop\"\n    ];\n    const profileOptions = [\n        \"Notifications\",\n        \"Themes\",\n        \"Logout\"\n    ];\n    // Handle Option Clicks for Dropdown\n    const handleOptionClick = (option)=>{\n        setSelectedOption(option);\n        setDropdownOpen(false);\n    };\n    // Handle Profile Option Clicks (like Profile, Settings, Logout)\n    const handleProfileOptionClick = (option)=>{\n        if (option === \"Logout\") {\n            alert(\"Logged out successfully!\");\n        } else {\n            setSelectedProfileOption(option);\n        }\n    // setProfileOpen(false); // Close the profile menu after clicking an option\n    };\n    // Close Dropdowns and Profile on Outside Click\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleClickOutside = (event)=>{\n            if (dropdownRef.current && !dropdownRef.current.contains(event.target) || profileRef.current && !profileRef.current.contains(event.target)) {\n                setDropdownOpen(false);\n                setProfileOpen(false);\n            // setSelectedProfileOption(null);\n            }\n        };\n        document.addEventListener(\"click\", handleClickOutside);\n        return ()=>{\n            document.removeEventListener(\"click\", handleClickOutside);\n        };\n    }, [\n        dropdownOpen,\n        profileOpen\n    ]);\n    // Close all opened elements when clicking on the profile image\n    const handleProfileImageClick = ()=>{\n        if (profileOpen) {\n            setSelectedProfileOption(null); // If profile is already open, close everything in sequence\n        }\n        setProfileOpen(!profileOpen); // Toggle profile menu\n        setDropdownOpen(false); // Close the dropdown\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"navbar\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"dropdown\",\n                ref: dropdownRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"dropbtn\",\n                        onClick: ()=>{\n                            setDropdownOpen(!dropdownOpen);\n                            setProfileOpen(false); // Close profile if dropdown is opened\n                            setSelectedProfileOption(null); // Close profile content if dropdown opens\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"navbar-text\",\n                                children: selectedOption\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 77,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__.RiArrowDropDownLine, {\n                                className: \"dropdown-icon\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 78,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 69,\n                        columnNumber: 9\n                    }, this),\n                    dropdownOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"dropdown-menu\",\n                        children: options.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"dropdown-item\",\n                                onClick: ()=>handleOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 83,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 81,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 68,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"search-container\",\n                action: \"#\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: \"search-bar\",\n                        type: \"text\",\n                        placeholder: \"Search\",\n                        value: searchValue,\n                        onChange: (e)=>setSearchValue(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 97,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__.BiSearch, {\n                        className: \"search-icon\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 104,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 96,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notification\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoNotificationsOutline_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoNotificationsOutline, {\n                    className: \"notification-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 109,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 108,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"profile\",\n                ref: profileRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        className: \"profile-image\",\n                        src: \"/images/profile-image.jpeg\",\n                        alt: \"Profile\",\n                        onClick: handleProfileImageClick\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 114,\n                        columnNumber: 9\n                    }, this),\n                    profileOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"profile-menu\",\n                        children: profileOptions.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"profile-item\",\n                                onClick: ()=>handleProfileOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 123,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 121,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, this),\n            selectedProfileOption === \"Notifications\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notifications-content\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Notifications\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 138,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"Check your recent notifications here.\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 139,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 137,\n                columnNumber: 9\n            }, this),\n            selectedProfileOption === \"Themes\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"themes-content\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Themes\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 144,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"Change your themes here.\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 145,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 143,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n        lineNumber: 66,\n        columnNumber: 5\n    }, this);\n}\n_s(Navbar, \"GGgC+Vh12faofxG1Dpmf9fARBUU=\");\n_c = Navbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUMyRDtBQUNOO0FBQ1g7QUFDZTtBQUN4QjtBQUVqQyxTQUFTTzs7SUFDUCxNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUyxjQUFjQyxnQkFBZ0IsR0FBR1YsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDVyxnQkFBZ0JDLGtCQUFrQixHQUFHWiwrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNLENBQUNhLGFBQWFDLGVBQWUsR0FBR2QsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDZSx1QkFBdUJDLHlCQUF5QixHQUFHaEIsK0NBQVFBLENBQUM7SUFFbkUsTUFBTWlCLGNBQWNmLDZDQUFNQSxDQUFDO0lBQzNCLE1BQU1nQixhQUFhaEIsNkNBQU1BLENBQUM7SUFFMUIsTUFBTWlCLFVBQVU7UUFBQztRQUFPO1FBQVU7S0FBVTtJQUM1QyxNQUFNQyxpQkFBaUI7UUFBQztRQUFpQjtRQUFVO0tBQVM7SUFFNUQsb0NBQW9DO0lBQ3BDLE1BQU1DLG9CQUFvQixDQUFDQztRQUN6QlYsa0JBQWtCVTtRQUNsQlosZ0JBQWdCO0lBQ2xCO0lBRUEsZ0VBQWdFO0lBQ2hFLE1BQU1hLDJCQUEyQixDQUFDRDtRQUNoQyxJQUFJQSxXQUFXLFVBQVU7WUFDdkJFLE1BQU07UUFDUixPQUFPO1lBQ0xSLHlCQUF5Qk07UUFDM0I7SUFDQSw0RUFBNEU7SUFDOUU7SUFFQSwrQ0FBK0M7SUFDL0NyQixnREFBU0EsQ0FBQztRQUNSLE1BQU13QixxQkFBcUIsQ0FBQ0M7WUFDMUIsSUFDRSxZQUFhQyxPQUFPLElBQUksQ0FBQ1YsWUFBWVUsT0FBTyxDQUFDQyxRQUFRLENBQUNGLE1BQU1HLE1BQU0sS0FDakVYLFdBQVdTLE9BQU8sSUFBSSxDQUFDVCxXQUFXUyxPQUFPLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTUcsTUFBTSxHQUNoRTtnQkFDQW5CLGdCQUFnQjtnQkFDaEJJLGVBQWU7WUFDZixrQ0FBa0M7WUFDcEM7UUFDRjtRQUVBZ0IsU0FBU0MsZ0JBQWdCLENBQUMsU0FBU047UUFDbkMsT0FBTztZQUNMSyxTQUFTRSxtQkFBbUIsQ0FBQyxTQUFTUDtRQUN4QztJQUNGLEdBQUc7UUFBQ2hCO1FBQWNJO0tBQVk7SUFFOUIsK0RBQStEO0lBQy9ELE1BQU1vQiwwQkFBMEI7UUFDOUIsSUFBSXBCLGFBQWE7WUFDZkcseUJBQXlCLE9BQU8sMkRBQTJEO1FBQzdGO1FBQ0FGLGVBQWUsQ0FBQ0QsY0FBYyxzQkFBc0I7UUFDcERILGdCQUFnQixRQUFRLHFCQUFxQjtJQUMvQztJQUVBLHFCQUNFLDhEQUFDd0I7UUFBSUMsV0FBVTs7MEJBRWIsOERBQUNEO2dCQUFJQyxXQUFVO2dCQUFXQyxLQUFLbkI7O2tDQUM3Qiw4REFBQ29CO3dCQUNDRixXQUFVO3dCQUNWRyxTQUFTOzRCQUNQNUIsZ0JBQWdCLENBQUNEOzRCQUNqQkssZUFBZSxRQUFRLHNDQUFzQzs0QkFDN0RFLHlCQUF5QixPQUFPLDBDQUEwQzt3QkFDNUU7OzBDQUVBLDhEQUFDdUI7Z0NBQUtKLFdBQVU7MENBQWV4Qjs7Ozs7OzBDQUMvQiw4REFBQ1IsMEdBQW1CQTtnQ0FBQ2dDLFdBQVU7Ozs7Ozs7Ozs7OztvQkFFaEMxQiw4QkFDQyw4REFBQ3lCO3dCQUFJQyxXQUFVO2tDQUNaaEIsUUFBUXFCLEdBQUcsQ0FBQyxDQUFDbEIsUUFBUW1CLHNCQUNwQiw4REFBQ1A7Z0NBRUNDLFdBQVU7Z0NBQ1ZHLFNBQVMsSUFBTWpCLGtCQUFrQkM7MENBRWhDQTsrQkFKSW1COzs7Ozs7Ozs7Ozs7Ozs7OzBCQVlmLDhEQUFDQztnQkFBS1AsV0FBVTtnQkFBbUJRLFFBQU87O2tDQUN4Qyw4REFBQ0M7d0JBQ0NULFdBQVU7d0JBQ1ZVLE1BQUs7d0JBQ0xDLGFBQVk7d0JBQ1pDLE9BQU94Qzt3QkFDUHlDLFVBQVUsQ0FBQ0MsSUFBTXpDLGVBQWV5QyxFQUFFcEIsTUFBTSxDQUFDa0IsS0FBSzs7Ozs7O2tDQUVoRCw4REFBQzNDLG9GQUFRQTt3QkFBQytCLFdBQVU7Ozs7Ozs7Ozs7OzswQkFJdEIsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDOUIsaUhBQXNCQTtvQkFBQzhCLFdBQVU7Ozs7Ozs7Ozs7OzBCQUlwQyw4REFBQ0Q7Z0JBQUlDLFdBQVU7Z0JBQVVDLEtBQUtsQjs7a0NBQzVCLDhEQUFDZ0M7d0JBQ0NmLFdBQVU7d0JBQ1ZnQixLQUFJO3dCQUNKQyxLQUFJO3dCQUNKZCxTQUFTTDs7Ozs7O29CQUVWcEIsNkJBQ0MsOERBQUNxQjt3QkFBSUMsV0FBVTtrQ0FDWmYsZUFBZW9CLEdBQUcsQ0FBQyxDQUFDbEIsUUFBUW1CLHNCQUMzQiw4REFBQ1A7Z0NBRUNDLFdBQVU7Z0NBQ1ZHLFNBQVMsSUFBTWYseUJBQXlCRDswQ0FFdkNBOytCQUpJbUI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZZDFCLDBCQUEwQixpQ0FDekIsOERBQUNtQjtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNrQjtrQ0FBRzs7Ozs7O2tDQUNKLDhEQUFDQztrQ0FBRTs7Ozs7Ozs7Ozs7O1lBR052QywwQkFBMEIsMEJBQ3pCLDhEQUFDbUI7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDa0I7a0NBQUc7Ozs7OztrQ0FDSiw4REFBQ0M7a0NBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtiO0dBOUlTaEQ7S0FBQUE7QUFnSlQsK0RBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NvbXBvbmVudHMvTmF2YmFyLmpzeD82MGUxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFJpQXJyb3dEcm9wRG93bkxpbmUgfSBmcm9tIFwicmVhY3QtaWNvbnMvcmlcIjtcclxuaW1wb3J0IHsgQmlTZWFyY2ggfSBmcm9tIFwicmVhY3QtaWNvbnMvYmlcIjtcclxuaW1wb3J0IHsgSW9Ob3RpZmljYXRpb25zT3V0bGluZSB9IGZyb20gXCJyZWFjdC1pY29ucy9pbzVcIjtcclxuaW1wb3J0IFwiQC9hcHAvc3R5bGVzL25hdmJhci5jc3NcIjtcclxuXHJcbmZ1bmN0aW9uIE5hdmJhcigpIHtcclxuICBjb25zdCBbc2VhcmNoVmFsdWUsIHNldFNlYXJjaFZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcm9wZG93bk9wZW4sIHNldERyb3Bkb3duT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkT3B0aW9uLCBzZXRTZWxlY3RlZE9wdGlvbl0gPSB1c2VTdGF0ZShcIkFsbFwiKTtcclxuICBjb25zdCBbcHJvZmlsZU9wZW4sIHNldFByb2ZpbGVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0ZWRQcm9maWxlT3B0aW9uLCBzZXRTZWxlY3RlZFByb2ZpbGVPcHRpb25dID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIGNvbnN0IGRyb3Bkb3duUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHByb2ZpbGVSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSBbXCJBbGxcIiwgXCJNb2JpbGVcIiwgXCJEZXNrdG9wXCJdO1xyXG4gIGNvbnN0IHByb2ZpbGVPcHRpb25zID0gW1wiTm90aWZpY2F0aW9uc1wiLCBcIlRoZW1lc1wiLCBcIkxvZ291dFwiXTtcclxuXHJcbiAgLy8gSGFuZGxlIE9wdGlvbiBDbGlja3MgZm9yIERyb3Bkb3duXHJcbiAgY29uc3QgaGFuZGxlT3B0aW9uQ2xpY2sgPSAob3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZE9wdGlvbihvcHRpb24pO1xyXG4gICAgc2V0RHJvcGRvd25PcGVuKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyBIYW5kbGUgUHJvZmlsZSBPcHRpb24gQ2xpY2tzIChsaWtlIFByb2ZpbGUsIFNldHRpbmdzLCBMb2dvdXQpXHJcbiAgY29uc3QgaGFuZGxlUHJvZmlsZU9wdGlvbkNsaWNrID0gKG9wdGlvbikgPT4ge1xyXG4gICAgaWYgKG9wdGlvbiA9PT0gXCJMb2dvdXRcIikge1xyXG4gICAgICBhbGVydChcIkxvZ2dlZCBvdXQgc3VjY2Vzc2Z1bGx5IVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFNlbGVjdGVkUHJvZmlsZU9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG4gICAgLy8gc2V0UHJvZmlsZU9wZW4oZmFsc2UpOyAvLyBDbG9zZSB0aGUgcHJvZmlsZSBtZW51IGFmdGVyIGNsaWNraW5nIGFuIG9wdGlvblxyXG4gIH07XHJcblxyXG4gIC8vIENsb3NlIERyb3Bkb3ducyBhbmQgUHJvZmlsZSBvbiBPdXRzaWRlIENsaWNrXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGRyb3Bkb3duUmVmLmN1cnJlbnQgJiYgIWRyb3Bkb3duUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkgfHxcclxuICAgICAgICAocHJvZmlsZVJlZi5jdXJyZW50ICYmICFwcm9maWxlUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2V0RHJvcGRvd25PcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9maWxlT3BlbihmYWxzZSk7XHJcbiAgICAgICAgLy8gc2V0U2VsZWN0ZWRQcm9maWxlT3B0aW9uKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja091dHNpZGUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtkcm9wZG93bk9wZW4sIHByb2ZpbGVPcGVuXSk7XHJcblxyXG4gIC8vIENsb3NlIGFsbCBvcGVuZWQgZWxlbWVudHMgd2hlbiBjbGlja2luZyBvbiB0aGUgcHJvZmlsZSBpbWFnZVxyXG4gIGNvbnN0IGhhbmRsZVByb2ZpbGVJbWFnZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgaWYgKHByb2ZpbGVPcGVuKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkUHJvZmlsZU9wdGlvbihudWxsKTsgLy8gSWYgcHJvZmlsZSBpcyBhbHJlYWR5IG9wZW4sIGNsb3NlIGV2ZXJ5dGhpbmcgaW4gc2VxdWVuY2VcclxuICAgIH1cclxuICAgIHNldFByb2ZpbGVPcGVuKCFwcm9maWxlT3Blbik7IC8vIFRvZ2dsZSBwcm9maWxlIG1lbnVcclxuICAgIHNldERyb3Bkb3duT3BlbihmYWxzZSk7IC8vIENsb3NlIHRoZSBkcm9wZG93blxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhclwiPlxyXG4gICAgICB7LyogRHJvcGRvd24gKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd25cIiByZWY9e2Ryb3Bkb3duUmVmfT5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wYnRuXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgc2V0RHJvcGRvd25PcGVuKCFkcm9wZG93bk9wZW4pO1xyXG4gICAgICAgICAgICBzZXRQcm9maWxlT3BlbihmYWxzZSk7IC8vIENsb3NlIHByb2ZpbGUgaWYgZHJvcGRvd24gaXMgb3BlbmVkXHJcbiAgICAgICAgICAgIHNldFNlbGVjdGVkUHJvZmlsZU9wdGlvbihudWxsKTsgLy8gQ2xvc2UgcHJvZmlsZSBjb250ZW50IGlmIGRyb3Bkb3duIG9wZW5zXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci10ZXh0XCI+e3NlbGVjdGVkT3B0aW9ufTwvc3Bhbj5cclxuICAgICAgICAgIDxSaUFycm93RHJvcERvd25MaW5lIGNsYXNzTmFtZT1cImRyb3Bkb3duLWljb25cIiAvPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIHtkcm9wZG93bk9wZW4gJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbil9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge29wdGlvbn1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBTZWFyY2ggKi99XHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzZWFyY2gtYmFyXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcclxuICAgICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVmFsdWUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJpU2VhcmNoIGNsYXNzTmFtZT1cInNlYXJjaC1pY29uXCIgLz5cclxuICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgey8qIE5vdGlmaWNhdGlvbnMgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uXCI+XHJcbiAgICAgICAgPElvTm90aWZpY2F0aW9uc091dGxpbmUgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWljb25cIiAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBQcm9maWxlIE1lbnUgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZVwiIHJlZj17cHJvZmlsZVJlZn0+XHJcbiAgICAgICAgPGltZ1xyXG4gICAgICAgICAgY2xhc3NOYW1lPVwicHJvZmlsZS1pbWFnZVwiXHJcbiAgICAgICAgICBzcmM9XCIvaW1hZ2VzL3Byb2ZpbGUtaW1hZ2UuanBlZ1wiXHJcbiAgICAgICAgICBhbHQ9XCJQcm9maWxlXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVByb2ZpbGVJbWFnZUNsaWNrfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAge3Byb2ZpbGVPcGVuICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZS1tZW51XCI+XHJcbiAgICAgICAgICAgIHtwcm9maWxlT3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZmlsZS1pdGVtXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVByb2ZpbGVPcHRpb25DbGljayhvcHRpb24pfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtvcHRpb259XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogUHJvZmlsZSBPcHRpb24gQ29udGVudCAqL31cclxuICAgICAge3NlbGVjdGVkUHJvZmlsZU9wdGlvbiA9PT0gXCJOb3RpZmljYXRpb25zXCIgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9ucy1jb250ZW50XCI+XHJcbiAgICAgICAgICA8aDI+Tm90aWZpY2F0aW9uczwvaDI+XHJcbiAgICAgICAgICA8cD5DaGVjayB5b3VyIHJlY2VudCBub3RpZmljYXRpb25zIGhlcmUuPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICB7c2VsZWN0ZWRQcm9maWxlT3B0aW9uID09PSBcIlRoZW1lc1wiICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoZW1lcy1jb250ZW50XCI+XHJcbiAgICAgICAgICA8aDI+VGhlbWVzPC9oMj5cclxuICAgICAgICAgIDxwPkNoYW5nZSB5b3VyIHRoZW1lcyBoZXJlLjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJSaUFycm93RHJvcERvd25MaW5lIiwiQmlTZWFyY2giLCJJb05vdGlmaWNhdGlvbnNPdXRsaW5lIiwiTmF2YmFyIiwic2VhcmNoVmFsdWUiLCJzZXRTZWFyY2hWYWx1ZSIsImRyb3Bkb3duT3BlbiIsInNldERyb3Bkb3duT3BlbiIsInNlbGVjdGVkT3B0aW9uIiwic2V0U2VsZWN0ZWRPcHRpb24iLCJwcm9maWxlT3BlbiIsInNldFByb2ZpbGVPcGVuIiwic2VsZWN0ZWRQcm9maWxlT3B0aW9uIiwic2V0U2VsZWN0ZWRQcm9maWxlT3B0aW9uIiwiZHJvcGRvd25SZWYiLCJwcm9maWxlUmVmIiwib3B0aW9ucyIsInByb2ZpbGVPcHRpb25zIiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb24iLCJoYW5kbGVQcm9maWxlT3B0aW9uQ2xpY2siLCJhbGVydCIsImhhbmRsZUNsaWNrT3V0c2lkZSIsImV2ZW50IiwiY3VycmVudCIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZVByb2ZpbGVJbWFnZUNsaWNrIiwiZGl2IiwiY2xhc3NOYW1lIiwicmVmIiwiYnV0dG9uIiwib25DbGljayIsInNwYW4iLCJtYXAiLCJpbmRleCIsImZvcm0iLCJhY3Rpb24iLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwiaW1nIiwic3JjIiwiYWx0IiwiaDIiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/Navbar.jsx\n"));

/***/ })

});