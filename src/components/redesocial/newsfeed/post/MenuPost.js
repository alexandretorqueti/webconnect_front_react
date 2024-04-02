import  { useState, useEffect } from 'react';
import Menu  from '../../../Menu';
import { PostPaginado } from '../../../../services/RedeSocial';

function MenuPostComponent({post, setPostAtual}) {
    const [itens, setItens] = useState([]);
    const action = () => {
        alert('Action');
    }
    const deletePost = async () => {
        // Solicito a confirmação do usuário
        if (window.confirm('Are you sure you want to delete this post?')) {
            // Se o usuário confirmar, eu deleto o post
            const result = await (new PostPaginado()).delete(post.id);
            if (result.status === 'success') {
                setPostAtual({ id : post.id, deleted : true});
            }
        }
    }
    useEffect(() => {
       setItens([{
            id: 1,
            title: 'Save Post',
            content: 'Add this to your saved items',
            icon: 'ri-save-line',
            enabled: false,
            visible: false,
            action: action
        }, {
            id: 2,
            title: 'Hide Post',
            content: 'See fewer posts like this.',
            icon: 'ri-eye-close-line',
            enabled: false,
            visible: false,
            action: action
        }, {
            id: 3,
            title: 'Unfollow User',
            content: 'Stop seeing posts but stay friends.',
            icon: 'ri-user-unfollow-line',
            enabled: false,
            visible: false,
            action: action
        }, {
            id: 4,
            title: 'Report Post',
            content: 'I\'m concerned about this post.',
            icon: 'ri-flag-2-line',
            enabled: false,
            visible: false,
            action: action
        }, {
            id: 5,
            title: 'Copy Link',
            content: 'Copy this link to share.',
            icon: 'ri-share-box-line',
            enabled: false,
            visible: false,
            action: action
        }, {
            id: 6,
            title: 'Embed Post',
            content: 'Embed this post.',
            icon: 'ri-code-box-line',
            enabled: false,
            visible: false,
            action: action
        }, {
            id: 7,
            title: 'Notifications',
            content: 'Receive notifications for new comments on this post.',
            icon: 'ri-notification-line',
            visible: false,
            action: action
        }, {
            id: 8,
            title: 'Delete Post',
            content: 'Delete this post.',
            icon: 'ri-delete-bin-line',
            enabled: true,
            visible: true,
            action: deletePost
        }]);
    }, []);

    return (
        <Menu itens={itens} />
    );
}

export default MenuPostComponent;