import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import path from "path";
import stream, { Stream } from "stream";

const saveImageLocally = async (source: string): Promise<string> => {
    const response = await fetch(source);
    const buffer = await response.buffer();
    const filename = path.basename(source);
    const filepath = path.join(process.cwd(), "public", filename);
    await fs.promises.writeFile(filepath, buffer);
    return filepath;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { source } = req.query;
    const sourceUrl = decodeURIComponent(source as string);

    if (!sourceUrl || typeof sourceUrl !== "string") {
        return res
            .status(400)
            .json({ message: "Missing image source in request-query" });
    }

    const filepath = await saveImageLocally(sourceUrl);

    const rStream = fs.createReadStream(filepath);

    if (!rStream) {
        /* Failed to fetch
         We could either redirect to the source URL (or some other 
        fallback url e.g. res.redirect(https://example.com/someImage.png)
        or error: */
        return res.status(500).json({ message: "Internal server error" });
    }

    const pt = new Stream.PassThrough();

    stream.pipeline(rStream, pt, (err) => {
        if (err) return res.status(500).json({ message: "Internal server error" });
    });

    pt.pipe(res);
}