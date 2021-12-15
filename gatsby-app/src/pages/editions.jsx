import * as React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/ui/navbar/navbar";
import * as classes from "./editions.module.css";
import * as rootClasses from "./app.module.css";
import LatestPostImage from "../images/post-2021-10-12.jpg";
import Post33img from "../images/post-33-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThumbsUp,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

const EditionsPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // get data from GitHub api
    fetch(`https://nearweek.com/wp-json/wp/v2/posts`)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setPosts(resultData);
      }); // set data for the number of stars
  }, []);

  return (
    <>
      <NavBar />
      <main className={rootClasses.wrapper}>
        <div className={rootClasses.container}>
          <div className={classes.latestPost}>
            <div className={classes.latestPostImage}>
              <img src={LatestPostImage} />
            </div>
            <div className={classes.latestPostContent}>
              <div className={classes.postDate}>
                <div>29 NOV – 5 DEC 2021</div>
              </div>
              <h2 className={classes.latestPostTitle}>
                <a href="#">
                  {" "}
                  Edition <span className={classes.postNumber}>#34</span>
                </a>
              </h2>
              <p className={classes.latestPostBody}>
                NEARWEEK is aggregating and curating information across the NEAR
                ecosystem. This edition was made possible via 32 news
                contributions from our community to the NEWS DAO.
              </p>
            </div>
            <div className={classes.latestPostFooter}>
              <div className={classes.latestPostWidgets}>
                <span className={classes.postWidget}>
                  <FontAwesomeIcon icon={faEye} /> 0
                </span>
                <span className={classes.postWidget}>
                  <FontAwesomeIcon icon={faThumbsUp} /> 0
                </span>
                <span className={classes.postWidget}>
                  <FontAwesomeIcon icon={faCommentAlt} /> 0
                </span>
              </div>
            </div>
          </div>
          <div className={classes.latestEditions}>
            <div className={classes.blockTitle}>Latest Editions</div>
            <div className={classes.editionsList}>
              <div className={classes.postItem}>
                <div className={classes.postImage}>
                  <img src={Post33img} />
                </div>
                <div className={classes.postContent}>
                  <div className={classes.postDate}>22 – 28 NOV 2021</div>
                  <h3 className={classes.postTitle}>
                    <a href="#">
                      Edition <span className={classes.postNumber}>#33</span>
                    </a>
                  </h3>
                  <p className={classes.postBody}>
                    NEARWEEK is aggregating and curating information across the
                    NEAR ecosystem. This edition was made ...
                  </p>
                  <div className={classes.postFooter}>
                    <div className={classes.latestPostWidgets}>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faEye} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faThumbsUp} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faCommentAlt} /> 0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.postItem}>
                <div className={classes.postImage}>
                  <img src={Post33img} />
                </div>
                <div className={classes.postContent}>
                  <div className={classes.postDate}>15 – 21 NOV 2021</div>
                  <h3 className={classes.postTitle}>
                    <a href="#">
                      Edition <span className={classes.postNumber}>#32</span>
                    </a>
                  </h3>
                  <p className={classes.postBody}>
                    NEARWEEK is aggregating and curating information across the
                    NEAR ecosystem. This edition was made ...
                  </p>
                  <div className={classes.postFooter}>
                    <div className={classes.latestPostWidgets}>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faEye} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faThumbsUp} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faCommentAlt} /> 0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.postItem}>
                <div className={classes.postImage}>
                  <img src={Post33img} />
                </div>
                <div className={classes.postContent}>
                  <div className={classes.postDate}>8 – 14 NOV 2021</div>
                  <h3 className={classes.postTitle}>
                    <a href="#">
                      Edition <span className={classes.postNumber}>#31</span>
                    </a>
                  </h3>
                  <p className={classes.postBody}>
                    NEARWEEK is aggregating and curating information across the
                    NEAR ecosystem. This edition was made ...
                  </p>
                  <div className={classes.postFooter}>
                    <div className={classes.latestPostWidgets}>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faEye} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faThumbsUp} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faCommentAlt} /> 0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.postItem}>
                <div className={classes.postImage}>
                  <img src={Post33img} />
                </div>
                <div className={classes.postContent}>
                  <div className={classes.postDate}>1 – 7 NOV 2021</div>
                  <h3 className={classes.postTitle}>
                    <a href="#">
                      Edition <span className={classes.postNumber}>#30</span>
                    </a>
                  </h3>
                  <p className={classes.postBody}>
                    NEARWEEK is aggregating and curating information across the
                    NEAR ecosystem. This edition was made ...
                  </p>
                  <div className={classes.postFooter}>
                    <div className={classes.latestPostWidgets}>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faEye} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faThumbsUp} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faCommentAlt} /> 0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.postItem}>
                <div className={classes.postImage}>
                  <img src={Post33img} />
                </div>
                <div className={classes.postContent}>
                  <div className={classes.postDate}>25 – 31 OCT 2021</div>
                  <h3 className={classes.postTitle}>
                    <a href="#">
                      Edition <span className={classes.postNumber}>#29</span>
                    </a>
                  </h3>
                  <p className={classes.postBody}>
                    NEARWEEK is aggregating and curating information across the
                    NEAR ecosystem. This edition was made ...
                  </p>
                  <div className={classes.postFooter}>
                    <div className={classes.latestPostWidgets}>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faEye} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faThumbsUp} /> 0
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faCommentAlt} /> 0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.showMoreBlock}>
                <h3>
                  <a className={classes.showMoreLink} href="#">
                    Show More
                  </a>
                </h3>
              </div>
              <div className={classes.subscribeBlock}>
                <div className={classes.formTitle}>
                  Subscribe to The NEARWEEK newsletter{" "}
                </div>
                <div className={classes.formWrapper}>
                  <input className={classes.formInput} type="text" />
                  <button className={classes.formBtn}>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditionsPage;
