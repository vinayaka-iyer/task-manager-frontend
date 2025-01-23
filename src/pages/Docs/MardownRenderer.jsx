import React, { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import rehypeHighlight from "rehype-highlight";
import { useTheme } from "../../components/theme/theme-provider";



const MarkdownRenderer = () => {
    const { theme } = useTheme(); // Get current theme (assuming dark/light modes)

    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        // Load GitHub Markdown styles
        let markdownLink = document.getElementById("github-markdown-css");
        if (!markdownLink) {
            markdownLink = document.createElement("link");
            markdownLink.id = "github-markdown-css";
            markdownLink.rel = "stylesheet";
            document.head.appendChild(markdownLink);
        }
    
        // Set the href dynamically for GitHub Markdown styles
        markdownLink.href =
            theme === "dark"
                ? "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css"
                : "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css";
    
        // Load Code Highlighting styles
        let highlightLink = document.getElementById("highlight-css");
        if (!highlightLink) {
            highlightLink = document.createElement("link");
            highlightLink.id = "highlight-css";
            highlightLink.rel = "stylesheet";
            document.head.appendChild(highlightLink);
        }
    
        // Set the href dynamically for code highlighting styles
        highlightLink.href =
            theme === "dark"
                ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
                : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css";
    
        // Cleanup function to remove the old styles when the component unmounts or theme changes
        return () => {
            if (highlightLink) {
                document.head.removeChild(highlightLink);
            }
            if (markdownLink) {
                document.head.removeChild(markdownLink);
            }
        };
    }, [theme]);
    
    useEffect(() => {
        // Fetch the markdown file
        fetch("/APIDocs.md")
            .then((response) => response.text())
            .then((text) => setMarkdownContent(text))
            .catch((error) => console.error("Error fetching markdown:", error));
    }, []);

    return (
        <div className="p-10 sm:w-1/2 mx-auto">
            <Markdown className="markdown-body sm:p-5 p-2"  remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>   
                {markdownContent}
            </Markdown>
        </div>
    );
};

export default MarkdownRenderer;
