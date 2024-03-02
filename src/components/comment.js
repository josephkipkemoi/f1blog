import { useEffect, useState } from 'react'
import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const CommentComponent = ({ articleId }) => {
    const [commentBtnDisabled, setCommentBtnDisabled] = useState(false)
    const [comment, setComment] = useState('')
    const [wordCounter, setWordCounter] = useState(300)

    const onchange = e => setComment(e.target.value)

    const changeWordCount = () => {
        let start = 300
        let count = wordCounter
        count -= comment.length
        setWordCounter(start - comment.length)
        if(start - comment.length < 0) {
            setCommentBtnDisabled(true)
            return
        } 
            setCommentBtnDisabled(false)
    }

    useEffect(() => {
        changeWordCount()
    }, [comment.length])

    return (
        <div className="card shadow p-2 mt-2">
            <div className="card card-header border-0 p-1 mb-2">
                <h6>Comments (1)</h6>
            </div>
            <div className='comment_textarea'>
                <textarea 
                    placeholder="Add comment..." 
                    className="form-control p-3"
                    onChange={onchange}
                    value={comment}
                />
                <small className='word_counter text-secondary'>{wordCounter}</small>
            </div>
            <div className="d-flex justify-content-end">
                <button 
                    className="btn btn-outline-primary btn-sm mt-2 p-2 shadow-sm"
                    disabled={commentBtnDisabled}
                >
                    Comment
                </button>
            </div>
            <div>
                <div className="card card-body border-0">
                <div className=" comment_img">
                   
                   <div>
                    <div>
                        <img 
                            src="https://images.ps-aws.com/c?url=https%3A%2F%2Fd3cm515ijfiu6w.cloudfront.net%2Fwp-content%2Fuploads%2F2023%2F06%2F05122007%2Flewis-hamilton-smiling-cap-planetf1.jpg" 
                            alt="profile" 
                            className="img-fluid"
                        />
                        <small className="fw-bold">Mark Maasai</small>
                    </div>
                    <div className='comment_text'>
                        <small >
                            It is a long establishedestablishedestablishedestablished establishedestablishedestablished established fact that a reader will be distracted by the readable content of a page when looking at its layout.           
                        </small>
                        <div className='d-flex align-items-center justify-content-end'>
                            <button className='btn btn-sm'> 
                                <FontAwesomeIcon icon={faThumbsUp}/> 
                            </button>
                            <button className='btn btn-sm'>
                                <small className="btn">Report</small>
                            </button>
                        </div>
                        <hr/>
                    </div>
                   </div>
                </div>
                   
                </div>
            </div>
        </div>
    )
}


export default CommentComponent