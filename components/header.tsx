import React from 'react';

const Header = () => {
    return (
        <div className="flex items-center px-5 py-4 border-b-[1px] border-awhite">
            <span className="font-moderan text-2xl text-contrastAlt">K_DevStack</span>

            <img className="ml-auto" src="/gamburger.svg" />
        </div>
    );
};

export default Header;