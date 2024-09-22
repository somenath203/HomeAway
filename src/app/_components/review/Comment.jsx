'use client';

import { useState } from "react";

import { Button } from "@/components/ui/button";


const Comment = ({ comment }) => {

  const [ isCommentExpanded, setIsCommentExpanded ] = useState();

  const toggleExpandComment = () => {

    setIsCommentExpanded(!isCommentExpanded);

  }

  const longCommentConstraint = comment.length >= 50;

  const displayCommentInShortByApplyingLongCommentConstraint = longCommentConstraint && !isCommentExpanded ? `${comment.slice(0, 50)}... ` : comment;


  return (
    <div>
      
      <p className="text-sm">{displayCommentInShortByApplyingLongCommentConstraint}</p>

      {longCommentConstraint && <Button 
                                  variant='link'
                                  className='pl-0 text-muted-foreground'
                                  onClick={toggleExpandComment}
                                >{isCommentExpanded ? 'Show Less' : 'Show More'}</Button>}

    </div>
  )
}

export default Comment;