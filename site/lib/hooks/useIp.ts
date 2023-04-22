import { useEffect, useState } from "react";

export function useIp() {
    const [ip, setIp] = useState<string | null>(null);
    useEffect(() => {
        fetch("https://www.cloudflare.com/cdn-cgi/trace")
            .then((res) => res.text())
            .then((data) => {
                const match = data.match(/ip=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
                const result = match ? match[1] : null;
                setIp(result);
            })
            .catch((err) => {
                console.error("Unable to retrieve IP from Cloudflare:", err);
            });
    }, []);

    return ip;
}