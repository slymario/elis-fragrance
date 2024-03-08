import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "85vh", width: '90%', marginLeft: '20px', margin: '20px' }}> {children} </main>
            <Toaster
                containerStyle={{
                    top: 50,
                    left: 50,
                    bottom: 60,
                    right: 60,
                }}
                />

            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "ElisFragrance - shop now",
    description: "Fragrance website",
    keywords: ["elis",  "shop"],
    author: "Slymario",
};

export default Layout;