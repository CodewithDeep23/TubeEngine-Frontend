import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../store/Slices/videoSlice";
import { VideoGrid } from "../components";

const FeedVideo = () => {
  const dispatch = useDispatch();
  const observer = useRef();
  const pageRef = useRef(1); // Track current page
  const limit = 8; // You can change this as needed

  const { videos, loading } = useSelector((state) => state.video);
  const hasNextPage = videos?.pagingInfo?.hasNextPage;

  const loadVideos = useCallback(() => {
    dispatch(getAllVideos({ page: pageRef.current, limit }));
  }, [dispatch]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          pageRef.current += 1;
          loadVideos();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasNextPage, loadVideos]
  );

  return (
    <div className="p-4">
      {videos?.docs?.length === 0 && !loading && (
        <p className="text-center text-gray-500">No videos found.</p>
      )}
      <VideoGrid
        videos={videos?.docs}
        lastVideoRef={lastVideoRef}
        loading={loading}
      />
      {loading && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-400">Loading more videos...</span>
        </div>
      )}
    </div>
  );
};

export default FeedVideo;
