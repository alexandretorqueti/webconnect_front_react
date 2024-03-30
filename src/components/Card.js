import PropTypes from 'prop-types';

const Card = (props) => <div className={`card ${props.className ? props.className : ''}`}> {props.children} </div>
Card.displayName = 'Card';
Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

Card.Header = (props) => <div className={`card-header d-flex justify-content-between ${props.className ? props.className : ''}`}> {props.children} </div>
Card.Header.displayName = 'Card.Header';
Card.Header.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

Card.Body = (props) => <div className={`card-body ${props.className ? props.className :''}`}> {props.children} </div>
Card.Body.displayName = 'Card.Body';
Card.Body.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}
Card.Footer = (props) => <div className="card-footer"> {props.children} </div>
Card.Footer.displayName = 'Card.Footer';
Card.Footer.propTypes = {
    children: PropTypes.node
}

Card.Header.Title = ({className, children}) => {
    return <div className={`header-title ${className ? className : ''}`}>
        {children}
    </div>
}
Card.Header.Title.displayName = 'Card.Header.Title';
Card.Header.Title.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}


Card.Header.Action = (props) => <div className={`header-action ${props.className ? props.className : ''}`}> {props.children} </div>
Card.Header.Action.displayName = 'Card.Header.Action';    
Card.Header.Action.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}


export default Card;