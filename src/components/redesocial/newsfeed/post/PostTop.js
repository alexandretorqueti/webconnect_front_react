import  { useState } from 'react';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import { PostPaginado } from '../../../../services/RedeSocial.js';
import img1 from '../../../../assets/images/small/07.png';

import './PostTop.css';

function PostTopComponent({ pessoa_logada, posts, setPosts }) {
  const [showSend, setShowSend] = useState(false);
  const [postText, setPostText] = useState('');
  const [files, setFiles] = useState([]);

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('content', postText);
   
    if (files.length > 0) {
      const filesArray = Array.from(files);
      filesArray.forEach((file) => {
        formData.append('fotos', file);
      });
    }
    const newPost = await (new PostPaginado()).post(formData);
    setPosts([newPost, ...posts]);
    setPostText('');
    setFiles([]);
    setShowSend(!showSend);
  };

  return (
    <Col sm={12}>
      <Card id="post-modal-data" className="card-block card-stretch card-height">
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            {(!showSend) &&
                <Button variant="soft-primary" className="mt-2" onClick={() => setShowSend(!showSend)}>
                    <img src={img1} alt="icon" className="img-fluid me-2"/> Create Post
                </Button>
            }
          </div>
        </Card.Header>
        <Card.Body>
            <div className={`collapse-custom ${showSend ? 'open' : ''}`}>
            {showSend &&
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                      <div className="d-flex align-items-center">
                      <div className="user-img">
                          {pessoa_logada !== undefined &&
                          <img src={pessoa_logada.foto_url} alt={pessoa_logada.nome} className="avatar-60 rounded-circle"/>
                          }
                      </div>
                      <Form.Control
                          as="textarea"
                          className="ms-3 w-100"
                          placeholder="Write something here..."
                          onChange={(e) => setPostText(e.target.value)}
                      />
                    </div>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Photo/Video</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control multiple type="file" onChange={(e) => setFiles(e.target.files)} />
                        </Col>
                      </Row>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                    <Button variant="primary" type="button" className="mt-2" onClick={() => setShowSend(!showSend)}>Cancel</Button>
                    <Button variant="primary" type="submit" className="mt-2" disabled={postText === ''}>Confirm</Button>
                    </div>
                </Form>
            }
            </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PostTopComponent;
