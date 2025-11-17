import React, { useEffect, useState } from "react";

function Youtube() {
  const API_KEY = "AIzaSyCc9CBjki6QZga5_eBFXZoGK5Ii0ZZlV78";
  const APPLE_CHANNEL_ID = "UCE_M8A5yxnLfW0KghEeajjw";
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${APPLE_CHANNEL_ID}&part=snippet&order=date&maxResults=8`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          const youtubeVideos = data.items;
          setVideos(youtubeVideos);
        } else {
          console.error("No video data found!");
        }
      })

      .catch((error) => console.error("Error fetching videos: ", error));
  }, []);

  return (
    <>
      <div className="container mx-5 p-4 text-center w-100 ">
        <h1>Latest Videos</h1>
        <br />
        <div className="row g-3  ">
          {videos?.map((singleVideo, i) => {
            let vidId = singleVideo.id.videoId;
            let vidLink = `https://www.youtube.com/watch?v=${vidId}`;

            return (
              <div key={i} className="col-md-6  col-sm-12 ">
                <div className="card">
                  <a
                    href={vidLink}
                    className="btn-black
                    "
                  >
                    <img
                      src={singleVideo.snippet.thumbnails.high.url}
                      className="card-img-top"
                      alt={singleVideo.snippet.title}
                    />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title"> {singleVideo.snippet.title}</h5>
                    <p className="card-text">
                      {singleVideo.snippet.description}
                      {/* .substring(0, 100)}... */}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Youtube;

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyCc9CBjki6QZga5_eBFXZoGK5Ii0ZZlV78&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet&order=date&maxResults=8


//https://www.googleapis.com/youtube/v3/channels?key=AIzaSyCc9CBjki6QZga5_eBFXZoGK5Ii0ZZlV78&forUsername=Apple&part=id //to find the channel id of apple
