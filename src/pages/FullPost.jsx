import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import instance from "../axios";
export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    instance
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("ОШИБКА ПРИ ПОЛУЧЕНИИ СТАТЬИ");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        key={data?._id}
        isLoading={isLoading}
        _id={data?._id}
        title={data?.title}
        imageUrl={ data.imageUrl ? `http://localhost:3001${data?.imageUrl}` : ''}
        user={{
          avatarUrl: data?.user?.avatarUrl,
          fullName: data?.user?.fullName,
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isEditable
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
