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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=RiArrowDropDownLine!=!react-icons/ri */ \"(app-pages-browser)/./node_modules/react-icons/ri/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BiSearch!=!react-icons/bi */ \"(app-pages-browser)/./node_modules/react-icons/bi/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_IoNotifications_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=IoNotifications!=!react-icons/io5 */ \"(app-pages-browser)/./node_modules/react-icons/io5/index.mjs\");\n/* harmony import */ var _app_styles_navbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/styles/navbar.css */ \"(app-pages-browser)/./app/styles/navbar.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction Navbar() {\n    _s();\n    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [dropdownOpen, setDropdownOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"All\");\n    const [profileOpen, setProfileOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedProfileOption, setSelectedProfileOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [notificationsOpen, setNotificationsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const profileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const options = [\n        \"All\",\n        \"Mobile\",\n        \"Desktop\"\n    ];\n    const profileOptions = [\n        \"Notifications\",\n        \"Themes\",\n        \"Logout\"\n    ];\n    // Handle Option Clicks for Dropdown\n    const handleOptionClick = (option)=>{\n        setSelectedOption(option);\n        setDropdownOpen(false);\n    };\n    // Handle Profile Option Clicks (like Profile, Settings, Logout)\n    const handleProfileOptionClick = (option)=>{\n        if (option === \"Logout\") {\n            alert(\"Logged out successfully!\");\n        } else if (option === \"Notifications\") {\n            setNotificationsOpen((prevState)=>!prevState);\n            setSelectedProfileOption((prevOption)=>prevOption === \"Notifications\" ? null : \"Notifications\");\n        } else {\n            setSelectedProfileOption((prevOption)=>prevOption === option ? null : option);\n            setNotificationsOpen(false);\n        }\n        setProfileOpen(false);\n    };\n    const handleNotificationClick = ()=>{\n        setNotificationsOpen(!notificationsOpen);\n        setSelectedProfileOption((prevOption)=>prevOption === \"Notifications\" ? null : \"Notifications\");\n        setProfileOpen(false);\n    };\n    // Close Dropdowns and Profile on Outside Click\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleClickOutside = (event)=>{\n            if (dropdownRef.current && !dropdownRef.current.contains(event.target) || profileRef.current && !profileRef.current.contains(event.target)) {\n                setDropdownOpen(false);\n                setProfileOpen(false);\n            }\n        };\n        document.addEventListener(\"click\", handleClickOutside);\n        return ()=>{\n            document.removeEventListener(\"click\", handleClickOutside);\n        };\n    }, [\n        dropdownOpen,\n        profileOpen\n    ]);\n    const handleProfileImageClick = ()=>{\n        setSelectedProfileOption(null);\n        setNotificationsOpen(false);\n        setProfileOpen(!profileOpen);\n        setDropdownOpen(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"navbar\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"dropdown\",\n                ref: dropdownRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"dropbtn\",\n                        onClick: ()=>{\n                            setDropdownOpen(!dropdownOpen);\n                            setProfileOpen(false); // Close profile if dropdown is opened\n                            setSelectedProfileOption(null); // Close profile content if dropdown opens\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"navbar-text\",\n                                children: selectedOption\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 92,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_RiArrowDropDownLine_react_icons_ri__WEBPACK_IMPORTED_MODULE_3__.RiArrowDropDownLine, {\n                                className: \"dropdown-icon\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 93,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 84,\n                        columnNumber: 9\n                    }, this),\n                    dropdownOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"dropdown-menu\",\n                        children: options.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"dropdown-item\",\n                                onClick: ()=>handleOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 98,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 96,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 83,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"search-container\",\n                action: \"#\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: \"search-bar\",\n                        type: \"text\",\n                        placeholder: \"Search\",\n                        value: searchValue,\n                        onChange: (e)=>setSearchValue(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 111,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BiSearch_react_icons_bi__WEBPACK_IMPORTED_MODULE_4__.BiSearch, {\n                        className: \"search-icon\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 118,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 110,\n                columnNumber: 7\n            }, this),\n            \" \",\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notification\",\n                onClick: handleNotificationClick,\n                children: notificationsOpen ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoNotifications_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoNotifications, {\n                    className: \"notification-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 131,\n                    columnNumber: 11\n                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoNotifications_react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoNotificationsOutline, {\n                    className: \"notification-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                    lineNumber: 133,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 129,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"profile\",\n                ref: profileRef,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        className: \"profile-image\",\n                        src: \"/images/profile-image.jpeg\",\n                        alt: \"Profile\",\n                        onClick: handleProfileImageClick\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 138,\n                        columnNumber: 9\n                    }, this),\n                    profileOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"profile-menu\",\n                        children: profileOptions.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"profile-item \".concat(option === \"Notifications\" ? \"small-screen-only\" : \"\"),\n                                onClick: ()=>handleProfileOptionClick(option),\n                                children: option\n                            }, index, false, {\n                                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                                lineNumber: 147,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 145,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 137,\n                columnNumber: 7\n            }, this),\n            (notificationsOpen || selectedProfileOption === \"Notifications\") && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notifications-content\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Notifications\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 163,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"Check your recent notifications here.\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 164,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 162,\n                columnNumber: 9\n            }, this),\n            selectedProfileOption === \"Themes\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"themes-content\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Themes\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 169,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"Change your themes here.\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                        lineNumber: 170,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n                lineNumber: 168,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Abhishek\\\\Desktop\\\\Snap Walls\\\\Snapwalls\\\\app\\\\components\\\\Navbar.jsx\",\n        lineNumber: 81,\n        columnNumber: 5\n    }, this);\n}\n_s(Navbar, \"IyxrMP6xKI6GHvdfbJMT6d2m58A=\");\n_c = Navbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL05hdmJhci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUMyRDtBQUNOO0FBQ1g7QUFDZTtBQUNQO0FBQ2pCO0FBRWpDLFNBQVNROztJQUNQLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHVCwrQ0FBUUEsQ0FBQztJQUMvQyxNQUFNLENBQUNVLGNBQWNDLGdCQUFnQixHQUFHWCwrQ0FBUUEsQ0FBQztJQUNqRCxNQUFNLENBQUNZLGdCQUFnQkMsa0JBQWtCLEdBQUdiLCtDQUFRQSxDQUFDO0lBQ3JELE1BQU0sQ0FBQ2MsYUFBYUMsZUFBZSxHQUFHZiwrQ0FBUUEsQ0FBQztJQUMvQyxNQUFNLENBQUNnQix1QkFBdUJDLHlCQUF5QixHQUFHakIsK0NBQVFBLENBQUM7SUFDbkUsTUFBTSxDQUFDa0IsbUJBQW1CQyxxQkFBcUIsR0FBR25CLCtDQUFRQSxDQUFDO0lBRTNELE1BQU1vQixjQUFjbEIsNkNBQU1BLENBQUM7SUFDM0IsTUFBTW1CLGFBQWFuQiw2Q0FBTUEsQ0FBQztJQUUxQixNQUFNb0IsVUFBVTtRQUFDO1FBQU87UUFBVTtLQUFVO0lBQzVDLE1BQU1DLGlCQUFpQjtRQUFDO1FBQWlCO1FBQVU7S0FBUztJQUU1RCxvQ0FBb0M7SUFDcEMsTUFBTUMsb0JBQW9CLENBQUNDO1FBQ3pCWixrQkFBa0JZO1FBQ2xCZCxnQkFBZ0I7SUFDbEI7SUFFQSxnRUFBZ0U7SUFDaEUsTUFBTWUsMkJBQTJCLENBQUNEO1FBQ2hDLElBQUlBLFdBQVcsVUFBVTtZQUN2QkUsTUFBTTtRQUNSLE9BQU8sSUFBSUYsV0FBVyxpQkFBaUI7WUFDckNOLHFCQUFxQixDQUFDUyxZQUFjLENBQUNBO1lBQ3JDWCx5QkFBeUIsQ0FBQ1ksYUFDeEJBLGVBQWUsa0JBQWtCLE9BQU87UUFFNUMsT0FBTztZQUNMWix5QkFBeUIsQ0FBQ1ksYUFDeEJBLGVBQWVKLFNBQVMsT0FBT0E7WUFFakNOLHFCQUFxQjtRQUN2QjtRQUNBSixl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QUc7Ozs7OztrQ0FDSiw4REFBQ0M7a0NBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtiO0dBdEtTckQ7S0FBQUE7QUF3S1QsK0RBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NvbXBvbmVudHMvTmF2YmFyLmpzeD82MGUxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFJpQXJyb3dEcm9wRG93bkxpbmUgfSBmcm9tIFwicmVhY3QtaWNvbnMvcmlcIjtcclxuaW1wb3J0IHsgQmlTZWFyY2ggfSBmcm9tIFwicmVhY3QtaWNvbnMvYmlcIjtcclxuaW1wb3J0IHsgSW9Ob3RpZmljYXRpb25zT3V0bGluZSB9IGZyb20gXCJyZWFjdC1pY29ucy9pbzVcIjtcclxuaW1wb3J0IHsgSW9Ob3RpZmljYXRpb25zIH0gZnJvbSBcInJlYWN0LWljb25zL2lvNVwiO1xyXG5pbXBvcnQgXCJAL2FwcC9zdHlsZXMvbmF2YmFyLmNzc1wiO1xyXG5cclxuZnVuY3Rpb24gTmF2YmFyKCkge1xyXG4gIGNvbnN0IFtzZWFyY2hWYWx1ZSwgc2V0U2VhcmNoVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2Ryb3Bkb3duT3Blbiwgc2V0RHJvcGRvd25PcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0ZWRPcHRpb24sIHNldFNlbGVjdGVkT3B0aW9uXSA9IHVzZVN0YXRlKFwiQWxsXCIpO1xyXG4gIGNvbnN0IFtwcm9maWxlT3Blbiwgc2V0UHJvZmlsZU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFByb2ZpbGVPcHRpb24sIHNldFNlbGVjdGVkUHJvZmlsZU9wdGlvbl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbbm90aWZpY2F0aW9uc09wZW4sIHNldE5vdGlmaWNhdGlvbnNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgZHJvcGRvd25SZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgcHJvZmlsZVJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3Qgb3B0aW9ucyA9IFtcIkFsbFwiLCBcIk1vYmlsZVwiLCBcIkRlc2t0b3BcIl07XHJcbiAgY29uc3QgcHJvZmlsZU9wdGlvbnMgPSBbXCJOb3RpZmljYXRpb25zXCIsIFwiVGhlbWVzXCIsIFwiTG9nb3V0XCJdO1xyXG5cclxuICAvLyBIYW5kbGUgT3B0aW9uIENsaWNrcyBmb3IgRHJvcGRvd25cclxuICBjb25zdCBoYW5kbGVPcHRpb25DbGljayA9IChvcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkT3B0aW9uKG9wdGlvbik7XHJcbiAgICBzZXREcm9wZG93bk9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIEhhbmRsZSBQcm9maWxlIE9wdGlvbiBDbGlja3MgKGxpa2UgUHJvZmlsZSwgU2V0dGluZ3MsIExvZ291dClcclxuICBjb25zdCBoYW5kbGVQcm9maWxlT3B0aW9uQ2xpY2sgPSAob3B0aW9uKSA9PiB7XHJcbiAgICBpZiAob3B0aW9uID09PSBcIkxvZ291dFwiKSB7XHJcbiAgICAgIGFsZXJ0KFwiTG9nZ2VkIG91dCBzdWNjZXNzZnVsbHkhXCIpO1xyXG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09IFwiTm90aWZpY2F0aW9uc1wiKSB7XHJcbiAgICAgIHNldE5vdGlmaWNhdGlvbnNPcGVuKChwcmV2U3RhdGUpID0+ICFwcmV2U3RhdGUpO1xyXG4gICAgICBzZXRTZWxlY3RlZFByb2ZpbGVPcHRpb24oKHByZXZPcHRpb24pID0+XHJcbiAgICAgICAgcHJldk9wdGlvbiA9PT0gXCJOb3RpZmljYXRpb25zXCIgPyBudWxsIDogXCJOb3RpZmljYXRpb25zXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFNlbGVjdGVkUHJvZmlsZU9wdGlvbigocHJldk9wdGlvbikgPT5cclxuICAgICAgICBwcmV2T3B0aW9uID09PSBvcHRpb24gPyBudWxsIDogb3B0aW9uXHJcbiAgICAgICk7XHJcbiAgICAgIHNldE5vdGlmaWNhdGlvbnNPcGVuKGZhbHNlKTtcclxuICAgIH1cclxuICAgIHNldFByb2ZpbGVPcGVuKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVOb3RpZmljYXRpb25DbGljayA9ICgpID0+IHtcclxuICAgIHNldE5vdGlmaWNhdGlvbnNPcGVuKCFub3RpZmljYXRpb25zT3Blbik7XHJcbiAgICBzZXRTZWxlY3RlZFByb2ZpbGVPcHRpb24oKHByZXZPcHRpb24pID0+XHJcbiAgICAgIHByZXZPcHRpb24gPT09IFwiTm90aWZpY2F0aW9uc1wiID8gbnVsbCA6IFwiTm90aWZpY2F0aW9uc1wiXHJcbiAgICApO1xyXG4gICAgc2V0UHJvZmlsZU9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIENsb3NlIERyb3Bkb3ducyBhbmQgUHJvZmlsZSBvbiBPdXRzaWRlIENsaWNrXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGRyb3Bkb3duUmVmLmN1cnJlbnQgJiYgIWRyb3Bkb3duUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkgfHxcclxuICAgICAgICAocHJvZmlsZVJlZi5jdXJyZW50ICYmICFwcm9maWxlUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2V0RHJvcGRvd25PcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9maWxlT3BlbihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcclxuICAgIH07XHJcbiAgfSwgW2Ryb3Bkb3duT3BlbiwgcHJvZmlsZU9wZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJvZmlsZUltYWdlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZFByb2ZpbGVPcHRpb24obnVsbCk7XHJcbiAgICBzZXROb3RpZmljYXRpb25zT3BlbihmYWxzZSk7XHJcbiAgICBzZXRQcm9maWxlT3BlbighcHJvZmlsZU9wZW4pO1xyXG4gICAgc2V0RHJvcGRvd25PcGVuKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXJcIj5cclxuICAgICAgey8qIERyb3Bkb3duICovfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCIgcmVmPXtkcm9wZG93blJlZn0+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGJ0blwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldERyb3Bkb3duT3BlbighZHJvcGRvd25PcGVuKTtcclxuICAgICAgICAgICAgc2V0UHJvZmlsZU9wZW4oZmFsc2UpOyAvLyBDbG9zZSBwcm9maWxlIGlmIGRyb3Bkb3duIGlzIG9wZW5lZFxyXG4gICAgICAgICAgICBzZXRTZWxlY3RlZFByb2ZpbGVPcHRpb24obnVsbCk7IC8vIENsb3NlIHByb2ZpbGUgY29udGVudCBpZiBkcm9wZG93biBvcGVuc1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdGV4dFwiPntzZWxlY3RlZE9wdGlvbn08L3NwYW4+XHJcbiAgICAgICAgICA8UmlBcnJvd0Ryb3BEb3duTGluZSBjbGFzc05hbWU9XCJkcm9wZG93bi1pY29uXCIgLz5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICB7ZHJvcGRvd25PcGVuICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcHRpb25DbGljayhvcHRpb24pfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtvcHRpb259XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHsvKiBTZWFyY2ggKi99XHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzZWFyY2gtYmFyXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcclxuICAgICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVmFsdWUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJpU2VhcmNoIGNsYXNzTmFtZT1cInNlYXJjaC1pY29uXCIgLz5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgICB7LyogTm90aWZpY2F0aW9ucyAqL31cclxuICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uXCI+XHJcbiAgICAgICAge3NlbGVjdGVkUHJvZmlsZU9wdGlvbiA9PT0gXCJOb3RpZmljYXRpb25zXCIgPyAoXHJcbiAgICAgICAgICA8SW9Ob3RpZmljYXRpb25zIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1pY29uXCIgLz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPElvTm90aWZpY2F0aW9uc091dGxpbmUgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWljb25cIiAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PiAqL317XCIgXCJ9XHJcbiAgICAgIHsvKiBETyBOT1QgREVMRVRFIFRISVMgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uXCIgb25DbGljaz17aGFuZGxlTm90aWZpY2F0aW9uQ2xpY2t9PlxyXG4gICAgICAgIHtub3RpZmljYXRpb25zT3BlbiA/IChcclxuICAgICAgICAgIDxJb05vdGlmaWNhdGlvbnMgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWljb25cIiAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8SW9Ob3RpZmljYXRpb25zT3V0bGluZSBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taWNvblwiIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHsvKiBQcm9maWxlIE1lbnUgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZVwiIHJlZj17cHJvZmlsZVJlZn0+XHJcbiAgICAgICAgPGltZ1xyXG4gICAgICAgICAgY2xhc3NOYW1lPVwicHJvZmlsZS1pbWFnZVwiXHJcbiAgICAgICAgICBzcmM9XCIvaW1hZ2VzL3Byb2ZpbGUtaW1hZ2UuanBlZ1wiXHJcbiAgICAgICAgICBhbHQ9XCJQcm9maWxlXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVByb2ZpbGVJbWFnZUNsaWNrfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAge3Byb2ZpbGVPcGVuICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZS1tZW51XCI+XHJcbiAgICAgICAgICAgIHtwcm9maWxlT3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHJvZmlsZS1pdGVtICR7XHJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbiA9PT0gXCJOb3RpZmljYXRpb25zXCIgPyBcInNtYWxsLXNjcmVlbi1vbmx5XCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVByb2ZpbGVPcHRpb25DbGljayhvcHRpb24pfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtvcHRpb259XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHsvKiBQcm9maWxlIE9wdGlvbiBDb250ZW50ICovfVxyXG4gICAgICB7KG5vdGlmaWNhdGlvbnNPcGVuIHx8IHNlbGVjdGVkUHJvZmlsZU9wdGlvbiA9PT0gXCJOb3RpZmljYXRpb25zXCIpICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbnMtY29udGVudFwiPlxyXG4gICAgICAgICAgPGgyPk5vdGlmaWNhdGlvbnM8L2gyPlxyXG4gICAgICAgICAgPHA+Q2hlY2sgeW91ciByZWNlbnQgbm90aWZpY2F0aW9ucyBoZXJlLjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgICAge3NlbGVjdGVkUHJvZmlsZU9wdGlvbiA9PT0gXCJUaGVtZXNcIiAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aGVtZXMtY29udGVudFwiPlxyXG4gICAgICAgICAgPGgyPlRoZW1lczwvaDI+XHJcbiAgICAgICAgICA8cD5DaGFuZ2UgeW91ciB0aGVtZXMgaGVyZS48L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiUmlBcnJvd0Ryb3BEb3duTGluZSIsIkJpU2VhcmNoIiwiSW9Ob3RpZmljYXRpb25zT3V0bGluZSIsIklvTm90aWZpY2F0aW9ucyIsIk5hdmJhciIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJkcm9wZG93bk9wZW4iLCJzZXREcm9wZG93bk9wZW4iLCJzZWxlY3RlZE9wdGlvbiIsInNldFNlbGVjdGVkT3B0aW9uIiwicHJvZmlsZU9wZW4iLCJzZXRQcm9maWxlT3BlbiIsInNlbGVjdGVkUHJvZmlsZU9wdGlvbiIsInNldFNlbGVjdGVkUHJvZmlsZU9wdGlvbiIsIm5vdGlmaWNhdGlvbnNPcGVuIiwic2V0Tm90aWZpY2F0aW9uc09wZW4iLCJkcm9wZG93blJlZiIsInByb2ZpbGVSZWYiLCJvcHRpb25zIiwicHJvZmlsZU9wdGlvbnMiLCJoYW5kbGVPcHRpb25DbGljayIsIm9wdGlvbiIsImhhbmRsZVByb2ZpbGVPcHRpb25DbGljayIsImFsZXJ0IiwicHJldlN0YXRlIiwicHJldk9wdGlvbiIsImhhbmRsZU5vdGlmaWNhdGlvbkNsaWNrIiwiaGFuZGxlQ2xpY2tPdXRzaWRlIiwiZXZlbnQiLCJjdXJyZW50IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlUHJvZmlsZUltYWdlQ2xpY2siLCJkaXYiLCJjbGFzc05hbWUiLCJyZWYiLCJidXR0b24iLCJvbkNsaWNrIiwic3BhbiIsIm1hcCIsImluZGV4IiwiZm9ybSIsImFjdGlvbiIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJpbWciLCJzcmMiLCJhbHQiLCJoMiIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/Navbar.jsx\n"));

/***/ })

});