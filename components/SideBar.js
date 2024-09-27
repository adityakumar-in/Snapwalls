'use client'
import { React, useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '@/app/styles/sidebar.css';

// TODO fix window.innerWidth error 

const SideBar = () => {
    const sidebarBottomRef = useRef()
    const categoryRef = useRef()
    const categoryCloseRef = useRef()
    const smallCategoryRef = useRef()
    const categoriesRef = useRef([]);
    const [category, setCategory] = useState(window.innerWidth <= 1100 || window.innerHeight <= 670);
    const [activeCategory, setActiveCategory] = useState(null);

    const path = usePathname()


    // Function to handle the click event on each category
    const handleCategoryClick = (index) => {
        setActiveCategory(index); // Set the clicked index as active

        if(window.innerWidth <= 1100 || window.innerHeight <= 670)
            setCategory(false);
            console.log(`category in height & width ${category}`)
    };



    useEffect(() => {
        const handleResize = () => {
            if (sidebarBottomRef.current) {
                setCategory(window.getComputedStyle(sidebarBottomRef.current).display === 'none');
                if(window.innerWidth > 1100 && window.innerHeight > 670) {
                    setCategory(true)
                    console.log(`category in resize ${category}`)
                }
            }
        };
    
        const handleClickOutside = (event) => {
            if (window.innerWidth <= 1100 || window.innerHeight <= 670) {
                const isOutsideSidebarBottom = sidebarBottomRef.current && !sidebarBottomRef.current.contains(event.target);
                const isOutsideSmallCategory = smallCategoryRef.current && !smallCategoryRef.current.contains(event.target);
                
                if ((isOutsideSidebarBottom && (isOutsideSmallCategory))) {
                    setCategory(false);
                    console.log(`category in click outside ${category}`)
                }
            }
        };
    
        // Set initial value of category
        handleResize();
    
        // Add event listeners
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
    
        // Clean up event listeners
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const toggleCategory = () => {
        setCategory(!category)
        console.log(`category in icon click toggle ${category}`)
    }
    const closeCategory = () => {
        setCategory(false)
    }

  return (
    <div className="sidebar">
        <div className='sidebar-container'>
            <div className="sidebar-top">
                <div className="site-name">
                    <img className='site-logo' src='site-logo.png' alt="" />
                    <Link href="/">
                        <span className='site-title'>Snap<span className='site-title-right'>walls</span></span>
                    </Link>
                </div>

                <nav>
                    <ul className='sidebar-nav'>
                        <Link href="/home">
                            <li className={path==='/home' ? 'sidebar-home-container sidebar-nav-items active-nav' : 'sidebar-home-container sidebar-nav-items'}>
                                <svg className='sidebar-nav-icon sidebar-nav-icons' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#eaeaea" stroke-width="0.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00009 17.2498C8.58588 17.2498 8.25009 17.5856 8.25009 17.9998C8.25009 18.414 8.58588 18.7498 9.00009 18.7498H15.0001C15.4143 18.7498 15.7501 18.414 15.7501 17.9998C15.7501 17.5856 15.4143 17.2498 15.0001 17.2498H9.00009Z" fill="#eaeaea"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C11.2749 1.25 10.6134 1.44911 9.88928 1.7871C9.18832 2.11428 8.37772 2.59716 7.36183 3.20233L5.90622 4.06943C4.78711 4.73606 3.89535 5.26727 3.22015 5.77524C2.52314 6.29963 1.99999 6.8396 1.65907 7.55072C1.31799 8.26219 1.22554 9.0068 1.25519 9.87584C1.2839 10.717 1.43105 11.7397 1.61556 13.0219L1.90792 15.0537C2.14531 16.7036 2.33368 18.0128 2.61512 19.0322C2.90523 20.0829 3.31686 20.9169 4.05965 21.5565C4.80184 22.1956 5.68984 22.4814 6.77634 22.6177C7.83154 22.75 9.16281 22.75 10.8423 22.75H13.1577C14.8372 22.75 16.1685 22.75 17.2237 22.6177C18.3102 22.4814 19.1982 22.1956 19.9404 21.5565C20.6831 20.9169 21.0948 20.0829 21.3849 19.0322C21.6663 18.0129 21.8547 16.7036 22.0921 15.0537L22.3844 13.0219C22.569 11.7396 22.7161 10.717 22.7448 9.87584C22.7745 9.0068 22.682 8.26219 22.3409 7.55072C22 6.8396 21.4769 6.29963 20.7799 5.77524C20.1047 5.26727 19.2129 4.73606 18.0938 4.06943L16.6382 3.20233C15.6223 2.59716 14.8117 2.11428 14.1107 1.7871C13.3866 1.44911 12.7251 1.25 12 1.25ZM8.09558 4.51121C9.15309 3.88126 9.89923 3.43781 10.5237 3.14633C11.1328 2.86203 11.5708 2.75 12 2.75C12.4293 2.75 12.8672 2.86203 13.4763 3.14633C14.1008 3.43781 14.8469 3.88126 15.9044 4.51121L17.2893 5.33615C18.4536 6.02973 19.2752 6.52034 19.8781 6.9739C20.4665 7.41662 20.7888 7.78294 20.9883 8.19917C21.1877 8.61505 21.2706 9.09337 21.2457 9.82469C21.2201 10.5745 21.0856 11.5163 20.8936 12.8511L20.6148 14.7884C20.3683 16.5016 20.1921 17.7162 19.939 18.633C19.6916 19.5289 19.3939 20.0476 18.9616 20.4198C18.5287 20.7926 17.9676 21.0127 17.037 21.1294C16.086 21.2486 14.8488 21.25 13.1061 21.25H10.8939C9.15124 21.25 7.91405 21.2486 6.963 21.1294C6.03246 21.0127 5.47129 20.7926 5.03841 20.4198C4.60614 20.0476 4.30838 19.5289 4.06102 18.633C3.80791 17.7162 3.6317 16.5016 3.3852 14.7884L3.10643 12.851C2.91437 11.5163 2.77991 10.5745 2.75432 9.82469C2.72937 9.09337 2.81229 8.61505 3.01167 8.19917C3.21121 7.78294 3.53347 7.41662 4.12194 6.9739C4.72482 6.52034 5.54643 6.02973 6.71074 5.33615L8.09558 4.51121Z" fill="#eaeaea"></path> </g></svg>
                                <svg className='sidebar-nav-icon-hovered sidebar-nav-icons' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495C22.2051 9.00229 22.0154 10.3208 21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22ZM8.39757 15.5532C8.64423 15.2204 9.11395 15.1506 9.44671 15.3973C10.1751 15.9371 11.0542 16.2498 12.0001 16.2498C12.946 16.2498 13.8251 15.9371 14.5535 15.3973C14.8863 15.1506 15.356 15.2204 15.6026 15.5532C15.8493 15.8859 15.7795 16.3557 15.4467 16.6023C14.4743 17.3231 13.2851 17.7498 12.0001 17.7498C10.7151 17.7498 9.5259 17.3231 8.55349 16.6023C8.22072 16.3557 8.15092 15.8859 8.39757 15.5532Z" fill="#efefef"></path> </g></svg>
                                <span className='sidebar-nav-titles'>Home</span>
                            </li>
                        </Link>

                        <Link href="/explore">
                            <li className={path==='/explore' ? 'sidebar-home-container sidebar-nav-items active-nav' : 'sidebar-home-container sidebar-nav-items'}>
                                <svg className='sidebar-nav-icon sidebar-nav-icons' viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#eaeaea"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>explore</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,6A18,18,0,1,1,6,24,18.1,18.1,0,0,1,24,6m0-4A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Z"></path> <path d="M33.3,13.3,20,20,13.3,33.3a1.1,1.1,0,0,0,1.4,1.4L28,28l6.7-13.3A1.1,1.1,0,0,0,33.3,13.3ZM24,26a2,2,0,1,1,2-2A2,2,0,0,1,24,26Z"></path> </g> </g> </g></svg>
                                <svg className='sidebar-nav-icon-hovered sidebar-nav-icons' viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#eaeaea"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>explore-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM34.7,14.7,28,28,14.7,34.7a1.1,1.1,0,0,1-1.4-1.4L20,20l13.3-6.7A1.1,1.1,0,0,1,34.7,14.7ZM24,22a2,2,0,1,0,2,2A2,2,0,0,0,24,22Z"></path> <path d="M24,22a2,2,0,1,0,2,2A2,2,0,0,0,24,22Zm0,0a2,2,0,1,0,2,2A2,2,0,0,0,24,22Z"></path> </g> </g> </g></svg>
                                <span className='sidebar-nav-titles'>Explore</span>
                            </li>
                        </Link>

                        <Link href="/favourites">
                            <li className={path==='/favourites' ? 'sidebar-home-container sidebar-nav-items active-nav' : 'sidebar-home-container sidebar-nav-items'}>
                                <svg className='sidebar-nav-icon sidebar-nav-icons' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#eaeaea"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z" fill="#eaeaea"></path> </g></svg>
                                <svg className='sidebar-nav-icon-hovered sidebar-nav-icons' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.36129 3.46995C6.03579 3.16081 6.76287 3 7.50002 3C8.23718 3 8.96425 3.16081 9.63875 3.46995C10.3129 3.77893 10.9185 4.22861 11.4239 4.78788C11.7322 5.12902 12.2678 5.12902 12.5761 4.78788C13.5979 3.65726 15.0068 3.00001 16.5 3.00001C17.9932 3.00001 19.4021 3.65726 20.4239 4.78788C21.4427 5.91515 22 7.42425 22 8.9792C22 10.5342 21.4427 12.0433 20.4239 13.1705L14.2257 20.0287C13.0346 21.3467 10.9654 21.3467 9.77429 20.0287L3.57613 13.1705C3.07086 12.6115 2.67474 11.9531 2.40602 11.2353C2.13731 10.5175 2 9.75113 2 8.9792C2 8.20728 2.13731 7.44094 2.40602 6.72315C2.67474 6.00531 3.07086 5.34694 3.57613 4.78788C4.08157 4.22861 4.68716 3.77893 5.36129 3.46995Z" fill="#eaeaea"></path> </g></svg>
                                <span className='sidebar-nav-titles'>Favourites</span>
                            </li>
                        </Link>

                        {/* Show only in small screens */}
                        <li ref={sidebarBottomRef} onClick={toggleCategory} className={category  ? 'sidebar-home-container sidebar-nav-items active-nav category' : 'sidebar-home-container sidebar-nav-items category'}>
                            <svg className='sidebar-nav-icon sidebar-nav-icons' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 3.57143C5.78277 3.57143 4.77634 3.74256 4.09054 3.88071C4.00982 3.89696 3.94486 3.96042 3.93067 4.05126C3.79347 4.92993 3.58824 6.43203 3.58824 7.5C3.58824 8.56797 3.79347 10.0701 3.93067 10.9487C3.94486 11.0396 4.00982 11.103 4.09054 11.1193C4.77634 11.2574 5.78277 11.4286 6.5 11.4286C7.21723 11.4286 8.22366 11.2574 8.90946 11.1193C8.99018 11.103 9.05514 11.0396 9.06933 10.9487C9.20653 10.0701 9.41177 8.56797 9.41177 7.5C9.41177 6.43203 9.20653 4.92993 9.06933 4.05126C9.05514 3.96042 8.99018 3.89696 8.90946 3.88071C8.22366 3.74256 7.21723 3.57143 6.5 3.57143ZM3.77369 2.34087C4.46212 2.20219 5.60739 2 6.5 2C7.39261 2 8.53788 2.20219 9.22631 2.34087C9.9687 2.49041 10.5249 3.08082 10.6389 3.81133C10.7759 4.68826 11 6.29813 11 7.5C11 8.70187 10.7759 10.3117 10.6389 11.1887C10.5249 11.9192 9.9687 12.5096 9.22631 12.6591C8.53788 12.7978 7.39261 13 6.5 13C5.60739 13 4.46212 12.7978 3.77369 12.6591C3.0313 12.5096 2.47513 11.9192 2.36106 11.1887C2.22412 10.3117 2 8.70187 2 7.5C2 6.29813 2.22412 4.68826 2.36106 3.81133C2.47513 3.08082 3.0313 2.49041 3.77369 2.34087Z" fill="#efefef"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 20.4286C16.7828 20.4286 15.7763 20.2574 15.0905 20.1193C15.0098 20.103 14.9449 20.0396 14.9307 19.9487C14.7935 19.0701 14.5882 17.568 14.5882 16.5C14.5882 15.432 14.7935 13.9299 14.9307 13.0513C14.9449 12.9604 15.0098 12.897 15.0905 12.8807C15.7763 12.7426 16.7828 12.5714 17.5 12.5714C18.2172 12.5714 19.2237 12.7426 19.9095 12.8807C19.9902 12.897 20.0551 12.9604 20.0693 13.0513C20.2065 13.9299 20.4118 15.432 20.4118 16.5C20.4118 17.568 20.2065 19.0701 20.0693 19.9487C20.0551 20.0396 19.9902 20.103 19.9095 20.1193C19.2237 20.2574 18.2172 20.4286 17.5 20.4286ZM14.7737 21.6591C15.4621 21.7978 16.6074 22 17.5 22C18.3926 22 19.5379 21.7978 20.2263 21.6591C20.9687 21.5096 21.5249 20.9192 21.6389 20.1887C21.7759 19.3117 22 17.7019 22 16.5C22 15.2981 21.7759 13.6883 21.6389 12.8113C21.5249 12.0808 20.9687 11.4904 20.2263 11.3409C19.5379 11.2022 18.3926 11 17.5 11C16.6074 11 15.4621 11.2022 14.7737 11.3409C14.0313 11.4904 13.4751 12.0808 13.3611 12.8113C13.2241 13.6883 13 15.2981 13 16.5C13 17.7019 13.2241 19.3117 13.3611 20.1887C13.4751 20.9192 14.0313 21.5096 14.7737 21.6591Z" fill="#efefef"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 16.6154C5.73888 16.6154 4.66241 16.7965 3.98316 16.9294C3.90741 16.9443 3.86241 16.9941 3.84775 17.0469C3.71755 17.5158 3.58824 18.0994 3.58824 18.5C3.58824 18.9006 3.71755 19.4842 3.84775 19.9531C3.86241 20.0059 3.90741 20.0557 3.98316 20.0706C4.66241 20.2035 5.73888 20.3846 6.5 20.3846C7.26112 20.3846 8.33759 20.2035 9.01684 20.0706C9.09259 20.0557 9.13759 20.0059 9.15225 19.9531C9.28245 19.4842 9.41177 18.9006 9.41177 18.5C9.41177 18.0994 9.28245 17.5158 9.15225 17.0469C9.13759 16.9941 9.09259 16.9443 9.01684 16.9294C8.33759 16.7965 7.26112 16.6154 6.5 16.6154ZM3.68301 15.3432C4.36186 15.2103 5.57165 15 6.5 15C7.42835 15 8.63814 15.2103 9.31699 15.3432C9.95957 15.4689 10.4966 15.9447 10.6807 16.6079C10.8134 17.0857 11 17.857 11 18.5C11 19.143 10.8134 19.9143 10.6807 20.3921C10.4966 21.0553 9.95957 21.5311 9.31699 21.6568C8.63814 21.7897 7.42835 22 6.5 22C5.57165 22 4.36186 21.7897 3.68301 21.6568C3.04043 21.5311 2.50344 21.0553 2.31929 20.3921C2.18661 19.9143 2 19.143 2 18.5C2 17.857 2.18661 17.0857 2.31929 16.6079C2.50344 15.9447 3.04043 15.4689 3.68301 15.3432Z" fill="#efefef"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 7.38462C16.7389 7.38462 15.6624 7.20353 14.9832 7.07057C14.9074 7.05575 14.8624 7.00592 14.8477 6.95312C14.7176 6.4842 14.5882 5.90057 14.5882 5.5C14.5882 5.09943 14.7176 4.5158 14.8477 4.04688C14.8624 3.99408 14.9074 3.94425 14.9832 3.92943C15.6624 3.79647 16.7389 3.61538 17.5 3.61538C18.2611 3.61538 19.3376 3.79647 20.0168 3.92943C20.0926 3.94425 20.1376 3.99408 20.1523 4.04688C20.2824 4.5158 20.4118 5.09943 20.4118 5.5C20.4118 5.90057 20.2824 6.4842 20.1523 6.95312C20.1376 7.00592 20.0926 7.05575 20.0168 7.07057C19.3376 7.20353 18.2611 7.38462 17.5 7.38462ZM14.683 8.65685C15.3619 8.78973 16.5717 9 17.5 9C18.4283 9 19.6381 8.78973 20.317 8.65685C20.9596 8.53107 21.4966 8.05534 21.6807 7.39214C21.8134 6.91427 22 6.14299 22 5.5C22 4.85701 21.8134 4.08573 21.6807 3.60786C21.4966 2.94466 20.9596 2.46893 20.317 2.34315C19.6381 2.21027 18.4283 2 17.5 2C16.5717 2 15.3619 2.21027 14.683 2.34315C14.0404 2.46893 13.5034 2.94466 13.3193 3.60786C13.1866 4.08573 13 4.85701 13 5.5C13 6.14299 13.1866 6.91427 13.3193 7.39214C13.5034 8.05534 14.0404 8.53107 14.683 8.65685Z" fill="#efefef"></path> </g></svg>
                            <svg className='sidebar-nav-icon-hovered sidebar-nav-icons' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.04082 2.50506C8.22449 2.30304 7.20408 2.10102 6.38776 2.10102C5.57143 2.10102 4.55102 2.30304 3.73469 2.50506C3.02041 2.60607 2.5102 3.21213 2.40816 3.9192C2.30612 4.72728 2 6.34344 2 7.45455C2 8.56566 2.20408 9.97981 2.30612 10.9899C2.40816 11.697 2.91837 12.303 3.63265 12.404C4.34694 12.6061 5.46939 12.7071 6.28571 12.7071C7.10204 12.7071 8.12245 12.5051 8.93878 12.404C9.65306 12.303 10.1633 11.697 10.2653 10.9899C10.4694 9.97981 10.5714 8.56566 10.5714 7.45455C10.5714 6.34344 10.3673 4.72728 10.2653 3.9192C10.2653 3.21213 9.7551 2.60607 9.04082 2.50506Z" fill="#efefef"></path> <path d="M20.2653 11.5958C19.551 11.3938 18.4286 11.2928 17.6123 11.2928C16.7959 11.2928 15.7755 11.4948 14.9592 11.5958C14.2449 11.6968 13.7347 12.3029 13.6327 13.01C13.4286 14.0201 13.3265 15.4342 13.3265 16.5453C13.3265 17.6564 13.5306 19.0706 13.6327 20.0807C13.7347 20.7877 14.2449 21.3938 14.9592 21.4948C15.6735 21.6968 16.7959 21.7978 17.6123 21.7978C18.4286 21.7978 19.449 21.5958 20.2653 21.4948C20.9796 21.3938 21.4898 20.7877 21.5918 20.0807C21.7959 19.0706 21.898 17.6564 21.898 16.5453C21.898 15.4342 21.7959 14.0201 21.5918 13.01C21.4898 12.3029 20.9796 11.6968 20.2653 11.5958Z" fill="#efefef"></path> <path d="M9.14286 15.6362C8.32653 15.4342 7.30612 15.3332 6.38776 15.3332C5.46939 15.3332 4.44898 15.5352 3.63265 15.6362C3.02041 15.7372 2.5102 16.2423 2.30612 16.8483C2.10204 17.5554 2 18.1615 2 18.6665C2 19.1716 2.10204 19.6766 2.30612 20.4847C2.5102 21.0908 3.02041 21.4948 3.63265 21.6968C4.44898 21.8989 5.46939 21.9999 6.38776 21.9999C7.30612 21.9999 8.32653 21.7978 9.14286 21.6968C9.7551 21.5958 10.2653 21.0908 10.4694 20.4847C10.6735 19.7776 10.7755 19.1716 10.7755 18.6665C10.7755 18.1615 10.6735 17.6564 10.4694 16.8483C10.2653 16.1413 9.7551 15.7372 9.14286 15.6362Z" fill="#efefef"></path> <path d="M14.8571 8.36354C15.6735 8.56557 16.6939 8.66658 17.6122 8.66658C18.5306 8.66658 19.551 8.46456 20.3673 8.36354C20.9796 8.26253 21.4898 7.75748 21.6939 7.15142C21.898 6.44435 22 5.83829 22 5.33324C22 4.82819 21.898 4.32314 21.6939 3.51506C21.4898 2.909 20.9796 2.50496 20.3673 2.30294C19.551 2.10092 18.5306 1.99991 17.6122 1.99991C16.6939 1.99991 15.6735 2.20193 14.8571 2.30294C14.2449 2.40395 13.7347 2.909 13.5306 3.51506C13.3265 4.22213 13.2245 4.82819 13.2245 5.33324C13.2245 5.83829 13.3265 6.34334 13.5306 7.15142C13.7347 7.85849 14.2449 8.26253 14.8571 8.36354Z" fill="#efefef"></path> </g></svg>
                            <span className='sidebar-nav-titles'>Category</span>
                        </li>
                    </ul>
                </nav>
            </div>

            {category && <div ref={categoryRef} className='sidebar-outer-category'><div className="sidebar-category" ref={smallCategoryRef}>
                <span className='sidebar-nav-items sidebar-category-title'>
                    <span>Trending</span>
                    <span ref={categoryCloseRef} onClick={closeCategory} className='category-close'><svg viewBox="0 0 24 24" fill="none" width={25} height={25}  xmlns="http://www.w3.org/2000/svg" stroke="#efefef"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="#929292" stroke-width="2" stroke-linecap="round"></path> </g></svg></span>
                </span>

                {['marvel.png', 'dc.png', 'the-boys.png', 'money-heist.png', 'stranger-things.png'].map((imageSrc, index) => (
                    <div key={index} ref={(el) => (categoriesRef.current[index] = el)} className={`sidebar-category-items ${activeCategory === index ? 'active-category' : ''}`} onClick={() => handleCategoryClick(index)}>
                        <img className="sidebar-category-items-image" src={imageSrc} alt="" />
                        <span className='sidebar-category-items-title'>
                            {imageSrc.replace('.png', '').replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                    </div>
                ))}
            </div></div>}
        </div>
    </div>
  )
}

export default SideBar
