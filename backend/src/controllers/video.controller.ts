import { Request, Response } from "express";
import { processVideoForHLS } from "../services/video.service";
import fs from 'fs';

export const uploadVideoController = async (req: Request, res: Response) => {
    if(!req.file) {
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
        return;
    }

    const videoPath = req.file.path;
    const outputPath = `output/${Date.now()}`;

    processVideoForHLS(videoPath, outputPath, (err, _) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while processing the video'
            });
            return;
        }

        //Delete the video file after processing
        fs.unlink(videoPath, (err) => {
            if(err) {
                console.log('An error occurred while deleting the video file:', err);  
            }
        });
    });

    res.status(200).json({
        success: true,
        message: 'Video processed successfully',
    });
}