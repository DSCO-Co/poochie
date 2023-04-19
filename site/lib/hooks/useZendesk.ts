import { useEffect } from "react";
import { useDOM } from "./useDom";


const useZendesk = ({ zendeskKey, defer, onLoaded }) => {

    useEffect(() => {
        const insertScript = () => {
            const script = document.createElement("script");
            if (defer) {
                script.defer = true;
            } else {
                script.async = true;
            }
            script.id = "ze-snippet";
            script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
            script.addEventListener("load", onLoaded);
            document.body.appendChild(script);
        };

        if (useDOM() && !window.zE) {
            insertScript();
            window.zESettings = { zendeskKey, defer };
        }

        return () => {
            if (!useDOM() || !window.zE) {
                return;
            }
            delete window.zE;
            delete window.zESettings;
        };
    }, [zendeskKey, defer, onLoaded]);
};
