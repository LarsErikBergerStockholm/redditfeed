import React, { useEffect, useState } from 'react';

import Modal from './Modal';

import useModal from './useModal';


function Entry() {
  const [posts, setPosts] = useState([]);
  const [afterId, setAfterId] = useState('');
  const [page, setPage] = useState(0);
  const [modalDescr, setModalDescr] = useState(null);

  const getData = (nextPageNum) => {
    const url = `https://www.reddit.com/r/sweden.json?limit=9${afterId === '' ? '' : `&after=${afterId}`}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        const { kind, data: { children } } = json;
        const newArr = [];
        for (let i = 0; i < posts.length; i++) {
          newArr.push(posts[i]);
        }

        newArr.push(children);

        setPosts(newArr);

        const lastId = json.data.after;
        setAfterId(lastId);

        if (nextPageNum) {
          setPage(nextPageNum);
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(posts);

  const onPreviousClick = () => {
    const pageNum = page > 0 ? page - 1 : 0;

    setPage(pageNum);
  };

  const onNextClick = () => {
    const nextPageNum = page + 1;
    if (posts[nextPageNum]) {
      setPage(nextPageNum);
    } else {
      getData(nextPageNum);
    }
  };


  const {isShowing, toggle} = useModal();

  const onViewPostClick = (postItem) => {
      setModalDescr(postItem);
      toggle();
  };

  const pagePosts = posts[page] ? posts[page] : [];
  const childrenRender = pagePosts.map((t, i) => {
    const { data: { title, selftext, thumbnail, created, author, num_comments, score, permalink, url } } = t;

    return (
      <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }} key={`${i}`}>
        <button type="button" onClick={() => onViewPostClick(t)}><h1>{title}</h1></button>
        <img src={thumbnail} alt="thumbnail" height="100" width="100" />
        <p>{author} - {new Date (created * 1000).toLocaleString()} - {score} Points</p>
        <p>{num_comments} Comments</p>
        <a href={`https://www.reddit.com${permalink}`}>{url}</a>
        <hr />
      </div>
    );
  });

  console.log('descr modal: ', modalDescr);

  return (
    <div>
      <div className="feedWrapper">
      <h1>Reddit Feed</h1>
      <hr />
        {childrenRender}
        <button type="button" onClick={onPreviousClick}>Previous</button>
        <button type="button" onClick={onNextClick}>Next</button>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        postItem={modalDescr}
      />
    </div>
  )
}

export default Entry;
