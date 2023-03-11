import React from "react";
import { NextPage } from "next";

type TLayoudProps = {
    children: React.ReactNode;
};

const Layout: NextPage<TLayoudProps> = ({ children }) => {
    return <>{children}</>;
};

export default Layout;
