'use client';

import React, { useState, useEffect } from "react";
import { IconArrowTop } from "@/app/components/icons";

export function ScrollToTop(): JSX.Element {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const backToTop = () => {
        document.documentElement.style.scrollBehavior = "smooth";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/* <!-- Back to top button --> */}
            {showButton && (
                <button
                    type="button"
                    onClick={backToTop}
                    className={` ${showButton ? `inline-block` : `hidden`
                        } fixed bottom-[40px] right-[40px] p-3 bg-gray-200 text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                >
                    <IconArrowTop />
                </button>
            )}
        </>
    );
}