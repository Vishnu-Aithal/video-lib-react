import { requiresAuth } from "backend/utils/authUtils";
import { Response } from "miragejs";
import { v4 } from "uuid";

/**
 * All the routes related to Videos are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/videos
 * */

export const getAllVideosHandler = function () {
    try {
        return new Response(200, {}, { videos: this.db.videos });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles uploads a new video to the db.
 * send POST Request at /api/user/videos/
 * */

// TODO: postVideoHandler

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/user/videos/:videoId
 * */

export const getVideoHandler = function (schema, request) {
    const { videoId } = request.params;
    try {
        const video = schema.videos.findBy({ _id: videoId }).attrs;
        return new Response(200, {}, { video });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};
export const addCommentHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    const { videoId } = request.params;
    const { comment } = JSON.parse(request.requestBody);

    try {
        const video = schema.videos.findBy({ _id: videoId }).attrs;
        video.comments.push({
            author: user.firstName,
            body: comment,
            _id: v4(),
            createdAt: new Date().toLocaleString(),
        });
        this.db.videos.update({ _id: videoId }, { comments: video.comments });
        return new Response(200, {}, { video });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};
