import { Avatar } from './Avatar';
import { Commment } from './Comment';
import styles from './Post.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

export function Post({ author, publishedAt, content }) {

  const [comment, setComment] = useState([
    'Olá tudo bem com vocês?'
  ]);

  const [newComment, setNewComment] = useState('');

  function deleteComment(commentToDelete){
    const commentWithoutDeletedOne = comment.filter(comment => {
      return comment !== commentToDelete;
    })
    setComment(commentWithoutDeletedOne)
  }

  function handleCreateNewComment() {
    event.preventDefault();
    setComment([...comment, newComment]);
    setNewComment("");
  }

  function handleNewCommentChange(){
    setNewComment(event.target.value)
  }


  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        {/* <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time> */}
      </header>
      <div className={styles.content}>

        {
          content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="">{line.content}</a></p>;
            }
          })
        }
      </div>

      <form
        className={styles.commentForm}
        onSubmit = {handleCreateNewComment}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário...'
          name="comment"
          onChange = {handleNewCommentChange}
          value = {newComment}
          required
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comment.map(value=>{
            return (<Commment 
              key = {value}
              comment = {value}
              onDeleteComment = {deleteComment}
            />)
          })
        }
       
      </div>

    </article>
  )
}